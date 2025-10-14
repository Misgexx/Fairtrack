import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "./providers/auth";

export default function SettingsScreen() {
  const { signOut } = useAuth();

  // Navigate to account info
  function goAccount() {
    router.push("/account");
  }

  // Sign-out logic
  async function handleSignOut() {
    try {
      await signOut();
      router.replace("/(auth)/landing");
    } catch (error) {
      console.error("Sign-out error:", error);
      Alert.alert("Error", "Something went wrong while signing out.");
    }
  }

  function help() {
    Alert.alert(
      "Help & Support",
      "Need assistance? Reach out to us at support@fairtrack.app (coming soon)."
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={22} color="#2f80ed" />
          </TouchableOpacity>

          <Text style={styles.title}>Settings</Text>

          {/* Right placeholder for symmetry */}
          <View style={{ width: 46 }} />
        </View>

        {/* Settings Card */}
        <View style={styles.card}>
          <ListItem
            icon="person-circle-outline"
            label="Account Information"
            onPress={goAccount}
          />
          <Separator />

          <ListItem
            icon="log-out-outline"
            label="Sign out"
            danger
            onPress={handleSignOut}
          />
          <Separator />

          <ListItem
            icon="help-circle-outline"
            label="Help & Support"
            onPress={help}
          />
        </View>

        <Text style={styles.footerText}>
          FairTrack v1.0.0 — built to help you organize your career fair journey.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function ListItem({
  icon,
  label,
  onPress,
  danger,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.rowLeft}>
        <Ionicons
          name={icon}
          size={20}
          color={danger ? "#d11a2a" : "#2f80ed"}
          style={{ marginRight: 10 }}
        />
        <Text style={[styles.rowText, danger && { color: "#d11a2a" }]}>
          {label}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#888" />
    </TouchableOpacity>
  );
}

function Separator() {
  return <View style={styles.sep} />;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f9fafc" },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#f9fafc",
  },

  // --- HEADER ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 6, // 👈 slightly brings it inward from edges
  },
  backBtn: {
    height: 38,
    width: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginLeft: 4, // 👈 adds small left gap
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111",
    marginRight: 4, // 👈 visually centered adjustment
  },

  // --- SETTINGS CARD ---
  card: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowLeft: { flexDirection: "row", alignItems: "center" },
  rowText: { fontSize: 16, color: "#222", fontWeight: "600" },
  sep: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#eee",
    marginLeft: 16,
  },

  // --- FOOTER ---
  footerText: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 12,
    color: "#888",
  },
});
