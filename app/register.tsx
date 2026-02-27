import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router, Link } from "expo-router";
import { register } from "../src/services/authService";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const e = email.trim();

    if (!e) return Alert.alert("Error", "Email is required.");
    if (!password) return Alert.alert("Error", "Password is required.");
    if (password.length < 6)
      return Alert.alert("Error", "Password must be at least 6 characters.");

    try {
      setLoading(true);
      await register(e, password);

      router.replace("/(tabs)/parcelles");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 26, fontWeight: "700" }}>Register</Text>
      <Text style={{ opacity: 0.7 }}>Create your farmer account</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderRadius: 10, padding: 12 }}
      />

      <TextInput
        placeholder="Password (min 6 characters)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, borderRadius: 10, padding: 12 }}
      />

      <TouchableOpacity
        onPress={handleRegister}
        disabled={loading}
        style={{
          padding: 14,
          borderRadius: 10,
          borderWidth: 1,
          alignItems: "center",
          opacity: loading ? 0.6 : 1,
        }}
      >
        <Text style={{ fontWeight: "700" }}>{loading ? "Creating..." : "Sign Up"}</Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ fontWeight: "700" }}>
          Login
        </Link>
      </Text>
    </View>
  );
}