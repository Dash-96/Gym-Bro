import { ScrollView, StyleSheet } from "react-native";
import CompeteMainCard from "../../components/compete/competeMainCard";
import FriendsLeaderBoard from "../../components/compete/friendsLeaderboard";

export default function CompeteScreen() {
  // const router = useRouter();
  // useEffect(() => {
  //   (async () => {
  //     let testValue = await AsyncStorage.getItem("test-key");
  //     if (testValue) {
  //       console.log("entered condition");
  //       router.replace("/(tabs)/social");
  //     }
  //     console.log(testValue);
  //   })();
  // }, []);
  return (
    <ScrollView style={styles.screenContaienr}>
      <CompeteMainCard />
      <FriendsLeaderBoard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContaienr: {
    paddingHorizontal: 10,
  },
});
