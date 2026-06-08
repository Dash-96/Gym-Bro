import CustomText from "@/src/app/components/sharedComponents/customText";
import { appStyle, fontStyles } from "@/src/app/constants/theme";
import { useArrowRotate, useCardExpand, useCardPan, useExerciseUpdate } from "@/src/hooks/homeHooks/editWorkoutHooks";
import { Exercise } from "@/src/models/workoutModel";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GestureDetector, TextInput } from "react-native-gesture-handler";
import Animated, { LinearTransition, SharedValue } from "react-native-reanimated";

// Props passed to ExerciseCard from the parent workout edit screen
interface Props {
  excerciseData: Exercise; // The exercise data to display (name, sets, reps, weight)
  index: number; // Position of this card in the list, used for drag ordering
  activeIndex: SharedValue<number | null>; // Shared value tracking which card is currently being dragged
  dragY: SharedValue<number>; // Shared value tracking the vertical drag offset
}

/// Card component representing a single exercise in the workout edit screen.
/// Supports expand/collapse, inline editing of set data, and drag-to-reorder.
export default function ExerciseCard({ excerciseData, index: id, activeIndex, dragY }: Props) {
  const cardHeight = 50;

  /// Controls the card's expand/collapse animation
  const { cardAnimatedStyle, changeCardSize, isExpanded, meassureExpandedHeight } = useCardExpand(excerciseData.sets.length);
  /// Controls the expand arrow rotation animation and disabled state
  const { arrowRotateStyle, rotateArrow, isDisabled } = useArrowRotate();
  /// Provides the pan gesture and animated style for drag-to-reorder
  const { cardPanStyle, pan } = useCardPan(id, activeIndex, dragY, cardHeight);
  /// Whether the card's set fields are currently editable
  const [isEditOn, setEditMode] = useState(false);
  /// Handlers for updating set fields and persisting changes
  const { handleSetDataChange, saveExerciseChanges } = useExerciseUpdate(excerciseData);

  /// Handles both expand and edit actions from the card header.
  /// Expanding always triggers card size + arrow animation.
  /// Edit mode is toggled independently via the edit icon.
  function compoundAction(action: string = "") {
    if (action === "expand" || (!isEditOn && !isExpanded)) {
      changeCardSize();
      rotateArrow();
      // disableArrow();
    }
    if (action === "edit") {
      setEditMode((prev) => !prev);
    }
  }

  return (
    //= Animated card with expand/collapse and drag-reorder styles applied
    <Animated.View style={[styles.animatedCard, cardAnimatedStyle, cardPanStyle]} layout={LinearTransition.springify()}>
      {/* This wrapper must enclose every part of the card (including the Save button) so its
          onLayout reports the full natural height the expand animation grows to. */}
      <View onLayout={(event) => meassureExpandedHeight(event)}>
        <View style={styles.cardContainer}>
          {/* Card header: drag handle, exercise name, expand arrow, edit/delete icons */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              {/* Drag handle — wrapped in GestureDetector to enable pan gesture */}
              <GestureDetector gesture={pan}>
                <Animated.View>
                  <Entypo name="menu" size={24} color="black" />
                </Animated.View>
              </GestureDetector>
              <CustomText variant="cardTitle" style={{ marginLeft: 20 }}>
                {excerciseData.excerciseName}
              </CustomText>
              {/* Expand/collapse arrow — disabled while an animation is in progress */}
              <Pressable
                disabled={isDisabled}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() => {
                  compoundAction("expand");
                }}
              >
                <Animated.View style={arrowRotateStyle}>
                  <AntDesign name="down" size={18} color="black" />
                </Animated.View>
              </Pressable>
            </View>
            {/* Edit and delete action icons */}
            <View style={styles.updateIconsContainer}>
              <Pressable onPress={() => compoundAction("edit")}>
                <FontAwesome5 name="edit" size={24} color="black" />
              </Pressable>
              <FontAwesome name="trash-o" size={24} color="black" />
            </View>
          </View>
          {/* Column headers for the sets table */}
          <View style={styles.titlesWraper}>
            <CustomText color="secondary" style={{ width: "33%", textAlign: "center" }}>
              Sets
            </CustomText>
            <CustomText color="secondary" style={{ width: "33%", textAlign: "center" }}>
              Reps
            </CustomText>
            <CustomText color="secondary" style={{ width: "33%", textAlign: "center" }}>
              Weight {"(kg)"}
            </CustomText>
          </View>
          {/* Rows for each set — reps and weight are editable when edit mode is on */}
          <View style={styles.setContentWraper}>
            {excerciseData.sets.map((set) => (
              <View key={set.setNumber} style={styles.setRow}>
                <Text style={[styles.setTextContent, fontStyles.semibold]}>{set.setNumber}</Text>
                <TextInput
                  style={[styles.setTextContent, fontStyles.semibold, styles.textInput]}
                  editable={isEditOn ? true : false}
                  onChangeText={(text) => handleSetDataChange(text, "reps", set.setNumber)}
                >
                  {set.reps}
                </TextInput>
                <TextInput
                  style={[styles.setTextContent, fontStyles.semibold, styles.textInput]}
                  editable={isEditOn ? true : false}
                  onChangeText={(text) => handleSetDataChange(text, "weight", set.setNumber)}
                >
                  {set.weight} <CustomText color="secondary">kg</CustomText>
                </TextInput>
              </View>
            ))}
          </View>
          {/* Save button — highlighted (accent color) only when edit mode is active */}
          <Pressable
            style={[styles.saveButton, { backgroundColor: isEditOn ? appStyle.colors.accentColor : appStyle.colors.primaryTintColor }]}
            onPress={saveExerciseChanges}
          >
            <CustomText color={isEditOn ? "default" : "muted"} style={fontStyles.medium}>
              Save Changes
            </CustomText>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedCard: {
    overflow: "hidden",
    boxShadow: appStyle.card.cardShadow,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: appStyle.card.cardBorderColor,
    marginTop: 10,
  },
  cardContainer: {
    backgroundColor: appStyle.card.cardBackground,
    gap: 10,
    padding: 20,
  },
  titlesWraper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },
  setRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },
  setTextContent: {
    textAlign: "center",
    width: "30%",
    // height: 30,

    borderWidth: 2,
    borderRadius: 5,
    borderColor: appStyle.card.cardBorderColor,
  },
  textInput: {
    lineHeight: 16,
    textAlignVertical: "top",
    paddingVertical: 0,
  },
  setContentWraper: {
    gap: 5,
  },

  saveButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    justifyContent: "center",
    height: 30,
    // paddingVertical: 10,
    borderRadius: 10,
  },
  updateIconsContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
