import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function NewCompany() {
  const [name, setName] = useState('');

  const handleContinue = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert('Missing Info', 'Please enter a company name.');
      return;
    }
    // Navigate to the detail page with the name as a param
    router.push({ pathname: '/company-detail', params: { name: trimmed } });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Add Company</Text>

        <Text style={styles.label}>Company name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Google"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoFocus
        />

        <TouchableOpacity style={styles.ctaBtn} onPress={handleContinue}>
          <Text style={styles.ctaText}>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          You can set priority and add details on the next page.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20, color: '#111' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, marginBottom: 20,
  },
  ctaBtn: {
    backgroundColor: '#2f80ed', paddingVertical: 12, borderRadius: 8, alignItems: 'center',
  },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  note: { marginTop: 12, fontSize: 12, color: '#666' },
});
