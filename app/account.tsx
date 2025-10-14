// app/account.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Information</Text>
      <Text style={styles.note}>Profile details coming soon…</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 8 },
  note: { color: "#666" },
});
