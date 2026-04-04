import { appStyle, cardStyles, fontSizes, fontStyles } from "@/src/app/constants/theme";
import { useArrowRotate } from "@/src/hooks/homeHooks/editWorkoutHooks";
import { useDateTimePicker } from "@/src/hooks/sharedHooks/useCalendar";
import { useWorkoutStore } from "@/src/stateStore/workoutStore/workoutStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Calendar } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Animated from "react-native-reanimated";

export default function EditHeaderCard() {
  const { openCalendar: openStartCalendar, date: startTime } = useDateTimePicker();
  const { openCalendar: openEndCalendar, date: endTime } = useDateTimePicker();
  const updateWorkoutState = useWorkoutStore((state) => state.setWorkout);
  const currentType = useWorkoutStore((state) => state.workout.workoutType);
  // console.log(currentType != "");
  const workoutTypeList = ["Push", "Pull", "Legs", "Full Body", "Upper", "Lower", "Custom"];
  const { arrowRotateStyle, rotateArrow } = useArrowRotate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [workoutType, setWorkoutType] = useState(currentType);
  // Sync the locally selected workout type into the global workout store whenever it changes
  useEffect(() => {
    updateWorkoutState({ workoutType: workoutType });
  }, [workoutType]);

  useEffect(() => {
    updateWorkoutState({ startedAt: startTime, finishedAt: endTime });
  }, [startTime, endTime]);

  const dropDownData = [{ data: workoutTypeList }];

  return (
    <View style={[styles.cardContainer, cardStyles]}>
      <View style={{ width: "100%", gap: 10 }}>
        <Text style={[fontStyles.medium, styles.cardSubtitle]}>Workout Type</Text>
        <Pressable
          style={styles.input}
          onPress={() => {
            rotateArrow();
            setIsExpanded((prev) => !prev);
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={[fontStyles.semibold, styles.inputText]}>{currentType != "" ? currentType : "choose workout"}</Text>
            <Animated.View style={arrowRotateStyle}>
              <AntDesign name="down" size={18} color="black" />
            </Animated.View>
          </View>
        </Pressable>
      </View>

      <View style={[styles.typesContainer, cardStyles, { display: isExpanded ? "flex" : "none" }]}>
        {workoutTypeList.map((type) => (
          <Pressable
            key={type}
            style={{ padding: 5, borderRadius: 5 }}
            onPress={() => {
              setWorkoutType(type);
              setIsExpanded(false);
              rotateArrow();
            }}
          >
            <Text style={[fontStyles.semibold, styles.inputText]}>{type}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ width: "100%", gap: 10 }}>
        <Text style={[fontStyles.medium, styles.cardSubtitle]}>
          Workout Alias <Text style={{ color: appStyle.text.mutedTextColor }}>(optional)</Text>
        </Text>
        <TextInput placeholder="e.g, Push A" placeholderTextColor={appStyle.text.mutedTextColor} style={[styles.input, styles.inputText]}></TextInput>
        <Text style={{ color: appStyle.text.secondaryTextColor }}>You can edit this later</Text>
      </View>

      <Pressable style={[styles.input, styles.dateInput]} onPress={openStartCalendar}>
        <Calendar />
        <Text style={[fontStyles.medium, styles.cardSubtitle]}>{startTime != null ? startTime.toLocaleString() : "Update Start Time"}</Text>
      </Pressable>

      <Pressable style={[styles.input, styles.dateInput]} onPress={openEndCalendar}>
        <Calendar />
        <Text style={[fontStyles.medium, styles.cardSubtitle]}>{endTime != null ? endTime?.toLocaleString() : "Update End Time"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    width: "100%",
    alignItems: "flex-start",
    paddingVertical: 15,
    paddingHorizontal: 15,
    gap: 20,
  },

  cardSubtitle: {
    fontSize: fontSizes.cardSubTitle,
  },

  inputText: {
    fontSize: 17,
  },

  typesContainer: {
    borderRadius: 15,
    position: "absolute",
    width: "100%",
    top: 100,
    gap: 15,
    paddingHorizontal: 10,
    alignSelf: "center",
    zIndex: 1,
  },

  input: {
    backgroundColor: appStyle.colors.inputBg,
    borderWidth: 1,
    borderColor: appStyle.colors.primaryTintColor,
    borderRadius: 10,
    width: "100%",
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  dateInput: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
});
