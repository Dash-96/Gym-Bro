import { useArrowRotate } from "@/src/hooks/homeHooks/editWorkoutHooks";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import CustomText from "@/src/app/components/sharedComponents/customText";
import Animated from "react-native-reanimated";
import { appStyle, cardStyles, fontStyles } from "../../constants/theme";

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
          <CustomText style={[fontStyles.semibold, styles.inputText]}>{selectedValue}</CustomText>
          <Animated.View style={arrowRotateStyle}>
            <AntDesign name="down" size={18} color="black" />
          </Animated.View>
        </View>
      </Pressable>

      <ScrollView
        nestedScrollEnabled
        style={[styles.dropdownContainer, cardStyles, { display: isVisible ? "flex" : "none" }]}
      >
        {list.map((section, sectionIndex) => (
          <View key={section.title ?? sectionIndex}>
            {section.title && <CustomText variant="sectionHeader" style={styles.sectionHeader}>{section.title}</CustomText>}
            {sectionIndex > 0 && <View style={styles.sectionSeprator} />}
            {section.data.map((item, itemIndex) => (
              <View key={getKey(item).toString()}>
                {itemIndex > 0 && <View style={styles.itemSeprator} />}
                <Pressable
                  style={styles.dropDownItem}
                  onPress={() => {
                    onSelect(item);
                    setSelectedValue(getValue(item));
                    rotateArrow();
                    setIsVisible(false);
                  }}
                >
                  <CustomText style={[fontStyles.regular, styles.sectionText]}>{getValue(item)}</CustomText>
                </Pressable>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
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
