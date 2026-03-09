import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { Pressable, SectionList, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useArrowRotate } from "../(tabs)/home/custom-hooks/editWorkoutHooks";
import { appStyle, cardStyles, fontStyles } from "../constants/theme";

type DropDownProps<T> = {
  list: { title?: string; data: T[] }[];
  getKey: (item: T) => number | string;
  getValue: (item: T) => string;
  onSelect: (item: T) => void;
  withCategory?: boolean | undefined;
};

// Generic dropdown backed by a SectionList. Use getKey/getValue to adapt any item type.
// Sections without a title are treated as ungrouped.
export default function DropDown<T>({ list, getKey, getValue, withCategory, onSelect }: DropDownProps<T>) {
  // let sections: SectionListData<{ data: T }>[];
  // sections = list.map((listItem) => ({ data: listItem }));
  const { arrowRotateStyle, rotateArrow } = useArrowRotate();
  const [selectedValue, setSelectedValue] = useState("Choose an Exercise");
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View>
      <Pressable
        style={styles.input}
        onPress={() => {
          rotateArrow();
          setIsVisible((prev) => !prev);
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={[fontStyles.semibold, styles.inputText]}>{selectedValue}</Text>
          <Animated.View style={arrowRotateStyle}>
            <AntDesign name="down" size={18} color="black" />
          </Animated.View>
        </View>
      </Pressable>

      <SectionList
        style={[styles.dropdownContainer, cardStyles, { display: isVisible ? "flex" : "none" }]}
        sections={list}
        SectionSeparatorComponent={() => <View style={styles.sectionSeprator}></View>}
        ItemSeparatorComponent={() => <View style={styles.itemSeprator}></View>}
        renderItem={({ item }) => (
          <Pressable
            style={styles.dropDownItem}
            onPress={() => {
              onSelect(item);
              setSelectedValue(getValue(item));
              rotateArrow();
              setIsVisible(false);
            }}
          >
            <Text style={[fontStyles.regular, styles.sectionText]}>{getValue(item)}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => getKey(item).toString()}
        renderSectionHeader={({ section: { title } }) => <Text style={[fontStyles.semibold, styles.sectionHeader]}>{title ?? ""}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: {
    fontSize: 17,
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
  dropdownContainer: {
    borderRadius: 15,
    position: "absolute",
    width: "100%",
    height: 300,
    top: 50,
    gap: 15,
    paddingHorizontal: 10,
    alignSelf: "center",
    zIndex: 1,
    backgroundColor: "white",
  },
  dropDownItem: {
    paddingVertical: 7,
  },
  sectionHeader: {
    fontSize: 22,
    color: appStyle.colors.primaryColor,
    marginVertical: 10,
    backgroundColor: appStyle.colors.primaryTintColor,
    paddingVertical: 5,
  },
  sectionText: {
    fontSize: 15,
  },
  sectionSeprator: {
    height: 3,
    backgroundColor: "#f3f4f6",
  },
  itemSeprator: {
    height: 2,
    width: "90%",
    backgroundColor: "#f3f4f6",
  },
});
