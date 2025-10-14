import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import {
    ImageBackground,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Landing() {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../assets/images/landing-bg.png")}
          style={styles.bg}
          resizeMode="cover"
        >
          {/* Subtle overlay so text is readable on any art */}
          <LinearGradient
            colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.7)"]}
            style={StyleSheet.absoluteFill}
          />

          {/* Spacer for Android status bar */}
          <View style={{ height: Platform.select({ ios: 0, android: 24 }) }} />

          {/* Headline */}
          <View style={styles.headerWrap}>
            <Text style={styles.title}>Maximize your career fair experience</Text>
          </View>

          {/* Single CTA (no email/Google here) */}
          <View style={styles.bottomCard}>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.9}>
                <Text style={styles.primaryText}>Get started</Text>
              </TouchableOpacity>
            </Link>

            {/* soft hint without mentioning email/name */}
            <Text style={styles.caption}>
              You can sign in or create an account next.
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: "space-between" },

  headerWrap: {
    paddingHorizontal: 22,
    paddingTop: 28,
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "800",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 2 },
  },

  bottomCard: {
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  primaryBtn: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#2f80ed",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  caption: {
    textAlign: "center",
    color: "#d7e1f8",
    marginTop: 10,
    fontSize: 12,
  },
});
