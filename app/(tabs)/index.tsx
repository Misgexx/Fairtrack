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

        {/* Settings/Profile icon (no action yet) */}
        <TouchableOpacity
          onPress={() => {}}
          accessibilityRole="button"
          accessibilityLabel="Settings"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="settings-outline" size={22} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Center content */}
      <View style={styles.centerWrap}>
        <Text style={styles.headline}>Keep track of companies</Text>

        <Link href="/explore" asChild>
          <TouchableOpacity style={styles.exploreBtn}>
            <Text style={styles.exploreText}>Explore</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Floating + button (routes to /company for now) */}
      <Link href="/company" asChild>
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
    paddingHorizontal: 20, // more left/right space
    paddingTop: Platform.select({ ios: 40, android: 32 }), // more top space
  },
  topBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.2,
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
    right: 25,  // pulled in from the edge
    bottom: 35, // lifted up a bit
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2f80ed',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});
