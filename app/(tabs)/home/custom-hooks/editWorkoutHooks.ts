import { getExercisesMeta, getNextWorkout, updateSets } from "@/app/repositories/workoutRepo";
import { useEffect, useState } from "react";
import { Gesture } from "react-native-gesture-handler";
import { clamp, SharedValue, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { Exercise, ExerciseMeta } from "../models/workoutModel";
import { useActiveCardStore, useWorkoutStore } from "../store/workoutStore";

//= This hook controls the expansion of the ExerciseCard component
export function useCardExpand(setCount = 1, offset = 0) {
  const shrinkedSize = 50;
  const expandedSize = 60 * setCount + shrinkedSize + offset;
  const [isExpanded, setIsExpanded] = useState(false);
  const cardHeight = useSharedValue(shrinkedSize);
  const cardAnimatedStyle = useAnimatedStyle(() => ({
    height: cardHeight.value,
  }));
  function changeCardSize() {
    setIsExpanded((prev) => !prev);
    cardHeight.value = withSpring(cardHeight.value === shrinkedSize ? expandedSize : shrinkedSize);
  }
  return { cardAnimatedStyle, changeCardSize, isExpanded };
}
//= This hook controls the rotation of the arrow when pressed
export function useArrowRotate() {
  const rotateDegree = useSharedValue(0);
  const [isDisabled, setDisabled] = useState(false);
  const upDegree = 180;
  const downDegree = 0;
  const arrowRotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotateDegree.value}deg` }],
  }));
  function rotateArrow() {
    rotateDegree.value = withTiming(rotateDegree.value === downDegree ? upDegree : downDegree, { duration: 200 });
    disableArrow();
  }
  function disableArrow() {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 700);
  }

  return { arrowRotateStyle, rotateArrow, isDisabled };
}

//= This hook is for dragging the excercise edit card
export function useCardPan(cardIndex: number, activeIndex: SharedValue<number | null>, dragY: SharedValue<number>, cardHeight: number) {
  /// reorder is the function to be called on card drop, to sync the actual data with the UI state
  const reorder = useWorkoutStore((state) => state.reorder);
  const storeActiveCard = useActiveCardStore((state) => state.setActiveCardIndex);
  const listLength = useWorkoutStore((state) => state.workout.exercises).length;
  const offsetY = useSharedValue(0);
  /// while dragging the card we diffrentiate between the dragged card and the others
  /// and apply styles accordingly
  const cardPanStyle = useAnimatedStyle(() => {
    let translate = 0;
    if (activeIndex.value === cardIndex) {
      translate = dragY.value;
    } else if (activeIndex.value !== null && activeIndex.value !== cardIndex) {
      /// diff -> is the index distane between the dragged card and the card this hook runs in
      const diff = cardIndex - activeIndex.value;

      /// based on diff we know if the dragged card is above or below each card
      /// i addition we check if the dragged sitance was greated than the distance between the two cards, and if so
      /// it means the dragged card reached the card
      if (diff > 0 && dragY.value > diff * cardHeight) {
        translate = -cardHeight;
      }

      if (diff < 0 && dragY.value < diff * cardHeight) {
        translate = cardHeight;
      }
    }
    return {
      transform: [{ translateY: withSpring(translate) }],
      zIndex: activeIndex.value === cardIndex ? 100 : 1,
      backgroundColor: "white",
    };
  });

  const pan = Gesture.Pan()
    .onStart(() => {
      // offsetY.value = evet.translationY;
      activeIndex.value = cardIndex;
      scheduleOnRN(storeActiveCard, activeIndex.value);
    })
    .onChange((event) => {
      if (activeIndex.value == cardIndex) {
        dragY.value = event.translationY;
      }
    })
    .onEnd(() => {
      let indexesMoved = Math.round(dragY.value / cardHeight);
      let targetIndex = clamp(cardIndex + indexesMoved, 0, listLength - 1);
      if (cardIndex != targetIndex) {
        scheduleOnRN(reorder, targetIndex, cardIndex);
      }
      activeIndex.value = null;
    });

  return { cardPanStyle, pan };
}

//= This hook allows the user to update data regarding the sets, e.g weight and reps
export function useExerciseUpdate(exercise: Exercise) {
  const [exerciseData, modifyExerciseData] = useState<Exercise>(exercise);
  function handleSetDataChange(valueText: string, field: "reps" | "weight", setNumber: number) {
    let newSetArr = [...exerciseData.sets];
    newSetArr[setNumber - 1][field] = parseInt(valueText);
    modifyExerciseData((prev) => ({ ...prev, sets: newSetArr }));
  }

  async function saveExerciseChanges() {
    updateSets(exerciseData);
  }

  return { handleSetDataChange, saveExerciseChanges };
}

//= This hook allows us to know which state the workout card should be in, create or edit
export function useCardType() {
  const [workoutState, setWorkoutState] = useState<"create" | "edit">("create");
  let workoutMetaData;
  useEffect(() => {
    (async () => {
      const workout = await getNextWorkout();
      if (workout) {
        setWorkoutState("edit");
        workoutMetaData = workout;
      }
    })();
  }, []);
  return { workoutState, workoutMetaData };
}

//= This hook preproccess the data before passing ot to the dropdoen component
export function useExerciseDropDown() {
  type DropDownItemData = { title: string; data: ExerciseMeta[] };
  const [exercises, setExercises] = useState<DropDownItemData[]>([]);

  useEffect(() => {
    (async () => {
      let data = await getExercisesMeta();
      let exerciseDropDownListData: DropDownItemData[] = [];
      data.forEach((exerciseMeta) => {
        let index = exerciseDropDownListData.findIndex((item) => item.title == exerciseMeta.targetMuscleGroup);
        if (index == -1) {
          exerciseDropDownListData.push({ title: exerciseMeta.targetMuscleGroup, data: [exerciseMeta] });
        } else {
          exerciseDropDownListData[index].data.push(exerciseMeta);
        }
      });
      setExercises(exerciseDropDownListData);
    })();
  }, []);

  return { exercises };
}

//= This hook allows to set and edit the deatils of sets on the create exercise modal
export function useEditSet() {
  const [sets, setSets] = useState([{ reps: "", weight: "" }]);
  //= update the number of sets
  const handleSetCountChange = (value: string) => {
    const count = parseInt(value);
    setSets((prev) => {
      if (count > prev.length) return [...prev, ...Array(count - prev.length).fill({ reps: "", weight: "" })];
      return prev.slice(0, count);
    });
  };

  //= change values of reps or weight
  const handleSetChange = (setNumber: number, field: "reps" | "weight", value: string) => {
    setSets((prev) => prev.map((set, index) => (index === setNumber ? { ...set, [field]: value } : set)));
  };

  return { sets, handleSetCountChange, handleSetChange };
}
