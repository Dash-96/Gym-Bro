import { getAllUsers } from "@/src/api/socialApi";
import { useDebounce } from "@/src/hooks/sharedHooks/debounce/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CustomText from "../../components/sharedComponents/customText";
import SearchBar from "../../components/sharedComponents/searchBar";
import FriendCard from "../../components/social/friendCard";

export default function AddFriendsScreen() {
  const [search, setSearch] = useState("");

  const debouncedValue = useDebounce<string>(search, 1000);
  console.log(debouncedValue);
  const { data: usersList } = useQuery({ queryKey: ["users-list", debouncedValue], queryFn: () => getAllUsers(debouncedValue) });

  return (
    <View style={styles.screenWraper}>
      <CustomText variant="screenTitle" style={styles.headers}>
        Add Friends
      </CustomText>
      <CustomText variant="sectionHeader" color="secondary" style={[styles.headers, styles.subTitle]}>
        Find training partners and grow your circle
      </CustomText>
      <View style={styles.searchWrapper}>
        <SearchBar value={search} onChangeText={setSearch} />
        <FlatList
          data={usersList}
          renderItem={({ item, index }) => (
            <FriendCard key={item.friendId} cardNumber={index} friendName={item.userName} friendId={item.friendId} variant="addFriend" />
          )}
          style={styles.userList}
          contentContainerStyle={{ gap: 15 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWraper: {
    alignItems: "center",
  },

  headers: {
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
  },
  searchWrapper: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 20,
  },

  userList: {
    marginTop: 20,
  },
});
