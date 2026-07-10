import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { appStyle } from "../../constants/theme";
import CustomText from "./customText";

type headerItem<T> = {
  text: string;
  value: keyof T;
};
type Props<T extends object> = {
  headersList: headerItem<T>[];
  dataList: T[];
  setDataList: Dispatch<SetStateAction<T[]>>;
};
export default function SortingHeader<T extends object>({ headersList, dataList, setDataList }: Props<T>) {
  type sortingField = keyof T;
  const [selectedTab, setSelectedTab] = useState<string>(headersList[0].text);

  useEffect(() => {
    sortDataList(headersList[0].value);
  }, []);

  function sortDataList(sortingField: sortingField) {
    const newArr = [...dataList].sort((a: T, b: T) => {
      if (typeof a[sortingField] == "number" && typeof b[sortingField] == "number") {
        return b[sortingField] - a[sortingField];
      } else if (typeof a[sortingField] == "string" && typeof b[sortingField] == "string") {
        return b[sortingField].localeCompare(a[sortingField]);
      } else {
        return 0;
      }
    });
    setDataList(newArr);
  }
  return (
    <ScrollView horizontal contentContainerStyle={{ gap: 10 }}>
      {headersList.map((tab, index) => (
        <Pressable
          key={index}
          style={[styles.tab, selectedTab == tab.text && styles.tabActive]}
          onPress={() => {
            setSelectedTab(tab.text);
            sortDataList(tab.value);
          }}
        >
          <CustomText variant="button" color={selectedTab == tab.text ? "light" : "muted"} style={{ fontWeight: 600 }}>
            {tab.text}
          </CustomText>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "#f5f5f5",
    paddingBlock: 5,
    paddingInline: 10,
    borderRadius: 10,
  },

  tabActive: {
    backgroundColor: appStyle.colors.accentColor,
  },
});
