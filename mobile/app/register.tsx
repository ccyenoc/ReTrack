import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
  if (!username || !email || !password || !confirmPassword) {
    Alert.alert("Error", "Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert("Error", "Passwords do not match");
    return;
  }

  try {
    // 🔐 create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // 💾 save extra data (username) in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      createdAt: new Date(),
    });

    Alert.alert("Success", "Account created!");

    router.replace("/");
  } catch (error: any) {
    Alert.alert("Error", error.message);
  }
};

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        padding: 20,
      }}
    >

       {/* 🔥 LOGO */}
       <View
  style={{
    width: 180,
    height: 180,
    borderRadius: 40,
    overflow: "hidden", // 🔥 KEY FIX
    marginBottom: 20,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Image
    source={require("../assets/images/retracklogo.png")}
    style={{
      width: "100%",
      height: "100%",
    }}
    resizeMode="cover"
  />
</View>

      {/* CARD */}
      <View
        style={{
          width: "100%",
          maxWidth: 350,
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 16,

          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 15,
          elevation: 5,
        }}
      >
        {/* TITLE */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Register
        </Text>

        {/* USERNAME */}
        <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={{
            backgroundColor: "#F1F5F9",
                padding: 12,
                borderRadius: 10,
                marginBottom: 15,
            }}
        />

        {/* EMAIL */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            backgroundColor: "#F1F5F9",
            padding: 12,
            borderRadius: 10,
            marginBottom: 15,
          }}
        />

        {/* PASSWORD */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            backgroundColor: "#F1F5F9",
            padding: 12,
            borderRadius: 10,
            marginBottom: 15,
          }}
        />

        {/* CONFIRM PASSWORD */}
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={{
            backgroundColor: "#F1F5F9",
            padding: 12,
            borderRadius: 10,
            marginBottom: 20,
          }}
        />

        {/* REGISTER BUTTON */}
        <TouchableOpacity
          onPress={handleRegister}
          style={{
            backgroundColor: "#2563EB",
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            Register
          </Text>
        </TouchableOpacity>

        {/* BACK TO LOGIN */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginTop: 15, alignItems: "center" }}
        >
          <Text style={{ color: "#2563EB" }}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}