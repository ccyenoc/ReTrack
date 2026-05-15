import { Image , View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      router.replace("/homepage"); // adjust if your home route is different
    } else {
      Alert.alert("Error", "Please enter email and password");
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
          Login
        </Text>

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
            marginBottom: 20,
          }}
        />

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: "#2563EB",
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            Login
          </Text>
        </TouchableOpacity>

        {/* REGISTER */}
        <TouchableOpacity
          onPress={() => router.push("/register" as any)}
          style={{ marginTop: 15, alignItems: "center" }}
        >
          <Text style={{ color: "#2563EB" }}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}