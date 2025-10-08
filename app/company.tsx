import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CompanyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Company Page</Text>
      <Text style={styles.text}>
        Here you’ll add notes, recruiter info, and QR uploads later.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});
