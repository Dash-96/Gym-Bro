import { Login } from "@/src/api/authApi";
import { useMutation } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useRef } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import SimpleCard from "../components/sharedComponents/simpleCard";
import { appStyle } from "../constants/theme";

export default function LoginScreen() {
  const nameRef = useRef("");
  const passwordRef = useRef("");

  const mutation = useMutation({
    mutationFn: async ({ userName, password }: { userName: string; password: string }) => {
      return await Login(userName, password);
    },
  });

  async function register() {
    console.log("button pressed");
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.pageContainer}>
          <SimpleCard customStyle={styles.cardContainer}>
            <Text style={styles.title}>Login</Text>
            <TextInput style={styles.inputContainer} placeholder="user name" onChangeText={(text) => (nameRef.current = text)} />
            <TextInput style={styles.inputContainer} placeholder="password" onChangeText={(text) => (passwordRef.current = text)} />
            <Pressable style={styles.submitButton} onPress={register}>
              <Text style={styles.submitText}>Lets Go!</Text>
            </Pressable>

            <Link href={"/register"} replace>
              Create a user
            </Link>
          </SimpleCard>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  cardContainer: { width: "90%", gap: 20 },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: appStyle.colors.primaryColor,
  },

  inputContainer: {
    backgroundColor: appStyle.colors.primaryTintColor,
    width: "100%",
  },

  submitButton: {
    backgroundColor: appStyle.colors.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
