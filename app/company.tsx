import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// This is UI-only for now; later we’ll load the company and save priority.
type Priority = 'high' | 'med' | 'low' | 'none';

export default function CompanyScreen() {
  const [priority, setPriority] = useState<Priority>('none');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Company</Text>

      {/* Priority is optional and settable here */}
      <Text style={styles.sectionTitle}>Priority (optional)</Text>
      <View style={styles.row}>
        {(['high', 'med', 'low', 'none'] as Priority[]).map(p => (
          <TouchableOpacity
            key={p}
            onPress={() => setPriority(p)}
            style={[styles.chip, priority === p && styles.chipActive]}
          >
            <Text style={[styles.chipText, priority === p && styles.chipTextActive]}>
              {p.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Placeholder sections you’ll fill later */}
      <Text style={styles.sectionTitle}>Notes</Text>
      <View style={styles.placeholderBox}><Text>Add notes here…</Text></View>

      <Text style={styles.sectionTitle}>LinkedIn / Links</Text>
      <View style={styles.placeholderBox}><Text>Save links here…</Text></View>

      <Text style={styles.sectionTitle}>Email</Text>
      <View style={styles.placeholderBox}><Text>Add recruiter email…</Text></View>

      <Text style={styles.sectionTitle}>Photos / QR</Text>
      <View style={styles.placeholderBox}><Text>Capture photos / scan QR…</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  sectionTitle: { marginTop: 14, marginBottom: 8, fontSize: 16, fontWeight: '600' },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: {
    borderWidth: 1, borderColor: '#bbb', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 8,
  },
  chipActive: { backgroundColor: '#2f80ed', borderColor: '#2f80ed' },
  chipText: { fontSize: 12, color: '#333' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  placeholderBox: {
    borderWidth: 1, borderColor: '#eee', borderRadius: 8,
    padding: 12, minHeight: 60, justifyContent: 'center',
  },
});
