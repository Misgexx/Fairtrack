import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../providers/auth";

export default function Signup() {
  const router = useRouter();
  const { signUpEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit() {
    try {
      await signUpEmail(email.trim(), password);
      router.replace("/(tabs)");
    } catch (e: any) {
      Alert.alert("Sign up failed", e?.message ?? "Please try again.");
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#fff" }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#2f80ed" />
        </TouchableOpacity>
        <Text style={styles.title}>Create your account</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="you@example.com" />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="At least 8 characters" secureTextEntry />

        <TouchableOpacity style={styles.cta} onPress={onSubmit}>
          <Text style={styles.ctaText}>Create account</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Link href="/(auth)/login">I already have an account</Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  top: { paddingTop: 52, paddingHorizontal: 16 },
  backBtn: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  title: { marginTop: 10, fontSize: 24, fontWeight: "800" },
  body: { padding: 16, gap: 8 },
  label: { fontWeight: "700", fontSize: 13, color: "#444", marginTop: 6 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 12, fontSize: 15, backgroundColor: "#fff" },
  cta: { marginTop: 10, height: 48, backgroundColor: "#2f80ed", borderRadius: 10, alignItems: "center", justifyContent: "center" },
  ctaText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
