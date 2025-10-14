// app/(tabs)/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.brand}>FairTrack</Text>

        {/* Settings button → /settings (pulled inward) */}
        <Link href="/settings" asChild>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Settings"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.settingsBtn}
            activeOpacity={0.85}
          >
            <Ionicons name="settings-outline" size={22} color="#222" />
          </TouchableOpacity>
        </Link>
      </View>

      {/* Center content */}
      <View style={styles.centerWrap}>
        <Text style={styles.headline}>Keep track of companies</Text>

        <Link href="/explore" asChild>
          <TouchableOpacity style={styles.exploreBtn} activeOpacity={0.85}>
            <Text style={styles.exploreText}>Explore</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Floating + button → new company */}
      <Link href="/new-company" asChild>
        <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: Platform.select({ ios: 40, android: 32 }),
    // keep a comfortable default padding but we'll add a bit more on the header itself
    paddingHorizontal: 16,
  },
  topBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // 👇 extra horizontal padding so items aren’t at the edges
    paddingHorizontal: 8,
  },
  brand: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  // 👇 small inset from the right edge
  settingsBtn: {
    marginRight: 6,
  },
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  headline: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  exploreBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cfd4da',
    backgroundColor: '#fff',
  },
  exploreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 35,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2f80ed',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});
