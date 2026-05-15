import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SettingsScreen() {
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // Account
  const [username, setUsername] = useState("yiuernnn");
  const [password, setPassword] = useState("123456");

  // Email
  const [workEmail, setWorkEmail] = useState("yiuernnn@gmail.com");
  const [generalEmail, setGeneralEmail] = useState("yiuernnn@gmail.com");

  return (
    <ScrollView 
    style={{ 
      flex: 1, 
      backgroundColor: "#f5f5f5",
      paddingTop:60, }}>
      <View style={{ padding: 20 }}>

         {/* HEADER */}
        <View style={{
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 20
}}>
  
  {/* 🔙 BACK BUTTON */}
  <TouchableOpacity onPress={() => router.back()}>
    <Ionicons name="arrow-back" size={24} />
  </TouchableOpacity>

  <Text style={{
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10
  }}>
    Settings
  </Text>

</View>

        {/* ================= ACCOUNT ================= */}
        <View style={{ marginBottom: 30 }}>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "bold" }}>Account</Text>

            <TouchableOpacity onPress={() => setIsEditingAccount(!isEditingAccount)}>
              <Text style={{ color: "#007AFF" }}>
                {isEditingAccount ? "Cancel" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Username */}
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 10
          }}>
            <Ionicons name="person-outline" size={18} />

            {isEditingAccount ? (
              <TextInput
                value={username}
                onChangeText={setUsername}
                style={{ marginLeft: 10, flex: 1 }}
              />
            ) : (
              <Text style={{ marginLeft: 10 }}>{username}</Text>
            )}
          </View>

          {/* Password */}
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 10
          }}>
            <Ionicons name="lock-closed-outline" size={18} />

            {isEditingAccount ? (
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ marginLeft: 10, flex: 1 }}
              />
            ) : (
              <Text style={{ marginLeft: 10 }}>••••••••</Text>
            )}
          </View>

          {/* Save Button */}
          {isEditingAccount && (
            <TouchableOpacity
              style={{
                marginTop: 15,
                backgroundColor: "#007AFF",
                padding: 12,
                borderRadius: 10,
                alignItems: "center"
              }}
              onPress={() => setIsEditingAccount(false)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Save Account
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ================= EMAIL ================= */}
        <View>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "bold" }}>Email Configuration</Text>

            <TouchableOpacity onPress={() => setIsEditingEmail(!isEditingEmail)}>
              <Text style={{ color: "#007AFF" }}>
                {isEditingEmail ? "Cancel" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Work Email */}
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 10
          }}>
            <Ionicons name="briefcase-outline" size={18} />

            <TextInput
              value={workEmail}
              onChangeText={setWorkEmail}
              editable={isEditingEmail}
              style={{ marginLeft: 10, flex: 1 }}
            />
          </View>

          {/* General Email */}
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 10
          }}>
            <Ionicons name="mail-outline" size={18} />

            <TextInput
              value={generalEmail}
              onChangeText={setGeneralEmail}
              editable={isEditingEmail}
              style={{ marginLeft: 10, flex: 1 }}
            />
          </View>

          {/* Save Button */}
          {isEditingEmail && (
            <TouchableOpacity
              style={{
                marginTop: 15,
                backgroundColor: "#007AFF",
                padding: 12,
                borderRadius: 10,
                alignItems: "center"
              }}
              onPress={() => setIsEditingEmail(false)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Save Email Settings
              </Text>
            </TouchableOpacity>
          )}
        </View>

      </View>

      {/* LOGOUT */}
<View style={{ marginTop: 40, paddingHorizontal: 20 }}>
  <TouchableOpacity
    onPress={() => router.replace("/")}
    style={{
      backgroundColor: "#EF4444",
      padding: 14,
      borderRadius: 10,
      alignItems: "center",
      width: "100%", // 🔥 FULL WIDTH
    }}
  >
    <Text style={{ color: "#fff", fontWeight: "600" }}>
      Logout
    </Text>
  </TouchableOpacity>
</View>
    </ScrollView>
  );
}