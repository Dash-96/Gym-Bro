import { appStyle, cardStyles, fontSizes, fontStyles } from "@/src/app/constants/theme";
import { useArrowRotate, useCardExpand } from "@/src/hooks/homeHooks/editWorkoutHooks";
import { Exercise } from "@/src/models/workoutModel";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CircleCheckBig, Dot } from "lucide-react-native";
import { Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useWorkoutTrackerContext } from "./excerciseCountContext";

interface Props {
  exerciseData: Exercise;
  ref: Ref<CardRef>;
  onCardFocus: (index: number) => void;
}

export type CardRef = {
  rotateArrow: () => void;
  isExpanded: boolean;
  changeCardSize: () => void;
};

export default function WorkoutExerciseCard({ exerciseData, ref, onCardFocus }: Props) {
  const { setCount } = useWorkoutTrackerContext();
  const { count: currentExerciseCount } = useWorkoutTrackerContext();
  const setsNumber = exerciseData.sets.length;
  const { cardAnimatedStyle, changeCardSize, isExpanded, meassureExpandedHeight } = useCardExpand(setsNumber, 60);
  const { arrowRotateStyle, rotateArrow, isDisabled } = useArrowRotate();
  const [currentSet, updateCurrentSet] = useState(0);
  const isCompleted = useRef(false);
  const isCurrentExercise = currentExerciseCount + 1 == exerciseData.orderIndex;
  useEffect(() => {
    if (isCurrentExercise) {
      changeCardSize();
    } else if (currentExerciseCount == exerciseData.orderIndex) {
      changeCardSize();
    }
  }, [isCurrentExercise]);

  /// Creates a ref to expose functions that the parent can invoke
  useImperativeHandle(
    ref,
    () => ({
      rotateArrow,
      changeCardSize,
      isExpanded,
    }),
    [isExpanded],
  );

  // Advances to the next set; fires onExerciseComplete once all sets are done (guarded by ref to prevent double-firing)
  function startNextSet() {
    const newSet = currentSet + 1;
    updateCurrentSet(newSet);
    if (newSet === setsNumber && !isCompleted.current) {
      isCompleted.current = true;
      setCount((prev) => prev + 1);
    }
  }

  return (
    <Animated.View style={[styles.cardContainer, cardStyles, cardAnimatedStyle, isCurrentExercise && styles.currentExerciseCard]}>
      <View
        onLayout={(event) => {
          meassureExpandedHeight(event);
        }}
      >
        <View style={styles.headerWraper}>
          <View style={styles.exerciseNameCol}>
            <Text style={styles.exerciseName}>{exerciseData.excerciseName}</Text>
          </View>
          {/* Set counter */}
          <View style={styles.setCounterColumn}>
            <Dot size={24} color={"black"} />
            <View style={styles.setCounter}>
              <Text style={styles.setCounterText}>{currentSet}/</Text>
              <Text style={styles.setCounterText}>{setsNumber}</Text>
            </View>
            <CircleCheckBig size={18} color={currentSet == setsNumber ? "green" : "gray"} />
          </View>
          <Pressable
            hitSlop={15}
            style={[styles.arrowIcon, isCurrentExercise && { transform: [{ rotateZ: "180deg" }] }]}
            onPress={() => {
              onCardFocus(exerciseData.orderIndex);
            }}
            disabled={isDisabled}
          >
            <Animated.View style={arrowRotateStyle}>
              <AntDesign name="down" size={18} color="black" />
            </Animated.View>
          </Pressable>
        </View>

        <View style={[styles.bodyWraper]}>
          <View style={styles.row}>
            <View style={styles.columnSet}>
              <Text style={styles.columnHeader}>Set</Text>
            </View>
            <View style={styles.columnReps}>
              <Text style={styles.columnHeader}>Reps</Text>
            </View>
            <View style={styles.columnWeight}>
              <Text style={styles.columnHeader}>Weight (kg)</Text>
            </View>
            <View style={styles.columnStatus}>
              <Text style={styles.columnHeader}>Status</Text>
            </View>
          </View>
          {/* Active set gets an orange shadow; completed sets get a blue shadow */}
          {exerciseData.sets.map((setData) => (
            <View
              key={setData.id}
              style={[styles.setRow, setData.setNumber - 1 == currentSet ? styles.activeSet : setData.setNumber - 1 < currentSet ? styles.completedSet : ""]}
            >
              <View style={styles.columnSet}>
                <Text style={styles.cellText}>{setData.setNumber}</Text>
              </View>
              <View style={styles.columnReps}>
                <Text style={styles.cellText}>{setData.reps}</Text>
              </View>
              <View style={styles.columnWeight}>
                <Text style={styles.cellText} numberOfLines={1}>
                  {setData.weight}
                </Text>
              </View>
              <View style={styles.columnStatus}>
                <CircleCheckBig size={18} color={setData.setNumber - 1 < currentSet ? "green" : "gray"} />
              </View>
            </View>
          ))}
        </View>

        <Pressable style={[styles.nextSetButton]} onPress={startNextSet}>
          <Text style={{ color: "white" }}>Finish Set</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "95%",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "red",
    overflow: "hidden",
  },

  currentExerciseCard: {
    boxShadow: `0px 0px 12px 4px ${appStyle.colors.accentColor}`,
  },

  row: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: appStyle.colors.primaryTintColor,
    alignItems: "center",
    // paddingBottom: 5,
  },

  headerWraper: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
  },
  bodyWraper: { gap: 10 },

  arrowIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  exerciseNameCol: {
    flex: 3,
  },

  setCounterColumn: {
    flex: 2,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  setCounter: {
    flexDirection: "row",
  },

  setRow: {
    flexDirection: "row",
    borderRadius: 10,
    paddingVertical: 5,
    boxShadow: `0px 1px 4px rgba(0,0,0,0.1)`,
  },
  columnStatus: {
    flex: 1,
    alignItems: "center",
  },
  columnSet: {
    flex: 1,
    alignItems: "center",
  },
  columnReps: {
    flex: 1,
    alignItems: "center",
  },
  columnWeight: {
    flex: 2,
    alignItems: "center",
  },
  activeSet: {
    boxShadow: `0px 1px 4px ${appStyle.colors.accentColor}`,
    // borderRadius: 10,
  },

  completedSet: {
    boxShadow: `0px 1px 4px ${appStyle.colors.primaryColor}`,
  },
  exerciseName: {
    fontSize: fontSizes.cardSubTitle,
    ...fontStyles.semibold,
    color: appStyle.text.textColor,
  },
  setCounterText: {
    fontSize: fontSizes.metaText,
    ...fontStyles.medium,
    color: appStyle.text.mutedTextColor,
  },
  columnHeader: {
    fontSize: fontSizes.metaText,
    ...fontStyles.medium,
    color: appStyle.text.secondaryTextColor,
  },
  cellText: {
    fontSize: fontSizes.bodyText,
    ...fontStyles.regular,
    color: appStyle.text.textColor,
  },

  nextSetButton: {
    alignSelf: "center",
    backgroundColor: appStyle.colors.primaryColor,
    padding: 5,
    borderRadius: 10,
    marginVertical: 20,
  },
});
