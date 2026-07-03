import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { appStyle } from "../../constants/theme";

type CategoryItem = {
  text: string;
  value: string | number;
};

type CategoryProps<T extends CategoryItem> = {
  list: T[];
  onSelect: (item: T) => void;
  style?: object;
};

export default function CategoriesBar<T extends CategoryItem>({ list, onSelect, style }: CategoryProps<T>) {
  const [maxWidthBtn, setMaxButtonWidth] = useState(0);
  const [selectedItemState, setSelectedItemState] = useState<CategoryItem>(list[0]);

  function setWidth(width: number) {
    console.log(width, maxWidthBtn);
    setMaxButtonWidth((prev) => {
      return Math.max(prev, width);
    });
  }
  return (
    <ScrollView horizontal contentContainerStyle={{ gap: 50 }} showsHorizontalScrollIndicator={false} style={style}>
      {list.map((item) => (
        <Pressable
          key={item.value}
          style={[styles.caterogyBtn, selectedItemState.value == item.value && styles.activeBtn, maxWidthBtn > 0 && { width: maxWidthBtn }]}
          onPress={() => {
            onSelect(item);
            setSelectedItemState(item);
          }}
          //   onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
        >
          <Text style={[styles.categoryText, selectedItemState.value == item.value && styles.activeText]}>{item.text}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  caterogyBtn: {
    backgroundColor: "white",
    borderColor: appStyle.colors.primaryColor,
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  categoryText: {
    fontFamily: appStyle.fontStyles.semibold,
    textAlign: "center",
    color: appStyle.colors.primaryColor,
    fontSize: appStyle.fontSizes.medium,
  },

  activeBtn: {
    backgroundColor: appStyle.colors.primaryColor,
  },

  activeText: {
    color: "white",
  },
});
