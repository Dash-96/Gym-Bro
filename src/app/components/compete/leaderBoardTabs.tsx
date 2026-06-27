import { leaderBoardTabs, leaderBoardTabValue } from "@/src/utils/competeUtils";
import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { appStyle } from "../../constants/theme";
import CustomText from "../sharedComponents/customText";

type Props = {
  setSelectedTab: Dispatch<SetStateAction<leaderBoardTabValue>>;
  selectedTab: leaderBoardTabValue;
};
export function LeaderBoardtabs({ setSelectedTab, selectedTab }: Props) {
  return (
    <View style={styles.tabsWraper}>
      {leaderBoardTabs.map((tab, index) => (
        <Pressable key={index} style={[styles.tab, selectedTab == tab && styles.tabActive]} onPress={() => setSelectedTab(tab)}>
          <CustomText variant="button" color={selectedTab == tab ? "light" : "muted"} style={{ fontWeight: 600 }}>
            {tab}
          </CustomText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabsWraper: {
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 10,
  },

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
