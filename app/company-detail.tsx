// app/company-detail.tsx
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type PositionType = 'Full-time' | 'Internship' | 'Co-op' | 'Research' | 'Other';
type FollowUpMethod = 'Email' | 'LinkedIn' | 'Call' | 'Other';
type AppStatus =
  | 'Not Applied'
  | 'Applied'
  | 'Assessment'
  | 'Interview'
  | 'Offer'
  | 'Rejected'
  | 'Other';
type Priority = 'High' | 'Medium' | 'Low' | 'None';
type FollowUpItem = { id: string; when: string; method: FollowUpMethod; note: string };

export default function CompanyDetailScreen() {
  const { name } = useLocalSearchParams<{ name?: string }>();
  const router = useRouter();

  // Company & position
  const [company, setCompany] = useState(name ?? '');
  const [positionType, setPositionType] = useState<PositionType>('Internship');
  const [positionOther, setPositionOther] = useState('');

  // Recruiter
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [recruiterLinkedIn, setRecruiterLinkedIn] = useState('');

  // Notes
  const [notes, setNotes] = useState('');

  // Follow-ups
  const [followUps, setFollowUps] = useState<FollowUpItem[]>([]);
  const [activePickerId, setActivePickerId] = useState<string | null>(null); // controls which picker is open

  // App status
  const [status, setStatus] = useState<AppStatus>('Not Applied');
  const [statusOther, setStatusOther] = useState('');

  // Priority & reminder
  const [priority, setPriority] = useState<Priority>('None');
  const [reminderDate, setReminderDate] = useState(''); // YYYY-MM-DD

  // Payload (autosave demo)
  const payload = useMemo(
    () => ({
      company,
      positionType,
      positionOther: positionType === 'Other' ? positionOther : undefined,
      recruiter: { name: recruiterName, email: recruiterEmail, linkedIn: recruiterLinkedIn },
      notes,
      followUps,
      application: { status, statusOther: status === 'Other' ? statusOther : undefined },
      priority,
      reminder: reminderDate ? { when: reminderDate } : undefined,
    }),
    [
      company,
      positionType,
      positionOther,
      recruiterName,
      recruiterEmail,
      recruiterLinkedIn,
      notes,
      followUps,
      status,
      statusOther,
      priority,
      reminderDate,
    ]
  );

  // Autosave (debounced)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    // clear previous
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    // set new
    saveTimer.current = setTimeout(() => {
      console.log('AUTO-SAVE Company Interaction:', payload);
      // TODO: persist (AsyncStorage/DB)
    }, 400);

    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
        saveTimer.current = null;
      }
    };
  }, [payload]);

  // Back button (guaranteed)
  const handleBack = useCallback(() => {
    try {
      if (router.canGoBack()) router.back();
      else router.replace('/(tabs)');
    } catch {
      router.replace('/(tabs)');
    }
  }, [router]);

  // Helpers
  function formatDate(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  // 👉 Toggle helper: open if closed, close if already open
  function togglePicker(id: string) {
    setActivePickerId(prev => (prev === id ? null : id));
  }

  function addFollowUp() {
    setFollowUps(prev => [
      ...prev,
      { id: String(Math.random()), when: '', method: 'Email', note: '' },
    ]);
  }
  function removeFollowUp(id: string) {
    setFollowUps(prev => prev.filter(f => f.id !== id));
  }

  function scanLinkedInQR() {
    Alert.alert('QR Scanner', 'Open camera & parse LinkedIn QR here (to implement).');
  }
  function captureArtifact() {
    Alert.alert('Camera', 'Open camera to capture & classify (to implement).');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Top black bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.iconBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>{company || 'Company'}</Text>

        <TouchableOpacity
          onPress={captureArtifact}
          style={styles.iconBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="camera-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        {/* Company & Position */}
        <View style={styles.card}>
          <Text style={styles.label}>Company</Text>
          <TextInput
            style={styles.input}
            value={company}
            onChangeText={setCompany}
            placeholder="Company name"
          />

          <Text style={[styles.label, { marginTop: 12 }]}>Position Type</Text>
          <View style={styles.rowWrap}>
            {(['Full-time', 'Internship', 'Co-op', 'Research', 'Other'] as PositionType[]).map(
              opt => (
                <Chip key={opt} active={positionType === opt} onPress={() => setPositionType(opt)}>
                  {opt}
                </Chip>
              )
            )}
          </View>

          {positionType === 'Other' && (
            <TextInput
              style={[styles.input, { marginTop: 8 }]}
              value={positionOther}
              onChangeText={setPositionOther}
              placeholder="Specify other position type"
            />
          )}
        </View>

        {/* Recruiter */}
        <View style={styles.card}>
          <Text style={styles.h2}>Recruiter</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={recruiterName}
            onChangeText={setRecruiterName}
            placeholder="Recruiter name"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={recruiterEmail}
            onChangeText={setRecruiterEmail}
            placeholder="Recruiter email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>LinkedIn</Text>
          <View style={styles.rowBetween}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={recruiterLinkedIn}
              onChangeText={setRecruiterLinkedIn}
              placeholder="LinkedIn profile URL"
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={scanLinkedInQR} style={[styles.iconBtnSmall, { marginLeft: 8 }]}>
              <Ionicons name="camera-outline" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.hint}>
            Tip: many recruiters show a LinkedIn QR — tap the camera to scan.
          </Text>
        </View>

        {/* Notes */}
        <View style={styles.card}>
          <Text style={styles.h2}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={notes}
            onChangeText={setNotes}
            multiline
            placeholder="Conversation highlights, roles, feedback, next steps…"
          />
        </View>

        {/* Follow-ups */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.h2}>Follow-ups</Text>
            <TouchableOpacity onPress={addFollowUp}>
              <Text style={styles.primary}>+ Add</Text>
            </TouchableOpacity>
          </View>

          {followUps.length === 0 && (
            <Text style={styles.hint}>
              No follow-ups yet. Add a specific action (email, LinkedIn, call) with a date.
            </Text>
          )}

          {followUps.map(fu => (
            <View key={fu.id} style={styles.followItem}>
              <Text style={styles.label}>When</Text>

              {/* Toggle open/close picker */}
              <TouchableOpacity
                style={[styles.input, styles.inputButton]}
                onPress={() => togglePicker(fu.id)}
              >
                <Text style={[styles.inputText, !fu.when && { color: '#888' }]}>
                  {fu.when || 'Select date'}
                </Text>
              </TouchableOpacity>

              {activePickerId === fu.id && (
                <DateTimePicker
                  value={fu.when ? new Date(fu.when) : new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
                  // @ts-ignore
                  themeVariant="light"
                  // @ts-ignore
                  textColor="#000"
                  style={{ backgroundColor: '#fff' }}
                  onChange={(event, date) => {
                    // Android modal → close after interaction
                    if (Platform.OS !== 'ios') setActivePickerId(null);
                    // If dismissed or no date, do nothing (acts as untouched)
                    // @ts-ignore
                    if (!date || event?.type === 'dismissed') return;

                    const iso = formatDate(date);
                    setFollowUps(prev =>
                      prev.map(x => (x.id === fu.id ? { ...x, when: iso } : x))
                    );
                  }}
                />
              )}

              <Text style={styles.label}>Method</Text>
              <View style={styles.rowWrap}>
                {(['Email', 'LinkedIn', 'Call', 'Other'] as FollowUpMethod[]).map(m => (
                  <Chip
                    key={m}
                    active={fu.method === m}
                    onPress={() =>
                      setFollowUps(prev =>
                        prev.map(x => (x.id === fu.id ? { ...x, method: m } : x))
                      )
                    }
                  >
                    {m}
                  </Chip>
                ))}
              </View>

              <Text style={styles.label}>Note</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                value={fu.note}
                onChangeText={v =>
                  setFollowUps(prev => prev.map(x => (x.id === fu.id ? { ...x, note: v } : x)))
                }
                placeholder="e.g., Send thank-you referencing resume comment"
                multiline
              />

              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => removeFollowUp(fu.id)}>
                  <Text style={styles.linkDanger}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Application Status */}
        <View style={styles.card}>
          <Text style={styles.h2}>Application Status</Text>
          <View style={styles.rowWrap}>
            {(
              ['Not Applied', 'Applied', 'Assessment', 'Interview', 'Offer', 'Rejected', 'Other'] as AppStatus[]
            ).map(s => (
              <Chip key={s} active={status === s} onPress={() => setStatus(s)}>
                {s}
              </Chip>
            ))}
          </View>
          {status === 'Other' && (
            <TextInput
              style={[styles.input, { marginTop: 8 }]}
              value={statusOther}
              onChangeText={setStatusOther}
              placeholder="Describe your status"
            />
          )}
        </View>

        {/* Priority & Reminder */}
        <View style={styles.card}>
          <Text style={styles.h2}>Priority (optional)</Text>
          <View style={styles.rowWrap}>
            {(['High', 'Medium', 'Low', 'None'] as Priority[]).map(p => (
              <Chip key={p} active={priority === p} onPress={() => setPriority(p)}>
                {p}
              </Chip>
            ))}
          </View>

          <Text style={[styles.h2, { marginTop: 12 }]}>Reminder (optional)</Text>

          {/* Toggle open/close picker */}
          <TouchableOpacity
            style={[styles.input, styles.inputButton]}
            onPress={() => togglePicker('REMINDER')}
          >
            <Text style={[styles.inputText, !reminderDate && { color: '#888' }]}>
              {reminderDate || 'Select date'}
            </Text>
          </TouchableOpacity>

          {activePickerId === 'REMINDER' && (
            <DateTimePicker
              value={reminderDate ? new Date(reminderDate) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
              // @ts-ignore
              themeVariant="light"
              // @ts-ignore
              textColor="#000"
              style={{ backgroundColor: '#fff' }}
              onChange={(event, date) => {
                if (Platform.OS !== 'ios') setActivePickerId(null);
                // @ts-ignore
                if (!date || event?.type === 'dismissed') return;
                setReminderDate(formatDate(date));
              }}
            />
          )}

          <Text style={styles.hint}>Reminders are nudges; follow-ups are specific actions.</Text>
        </View>

        {/* Debug JSON (dev only) */}
        {__DEV__ && (
          <View style={[styles.card, { marginBottom: 40 }]}>
            <Text style={styles.h2}>Debug JSON (dev)</Text>
            <Text style={styles.debug}>{JSON.stringify(payload, null, 2)}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function Chip({
  active,
  onPress,
  children,
}: {
  active?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && { backgroundColor: '#000', borderColor: '#000' }]}
    >
      <Text style={[styles.chipText, active && { color: '#fff', fontWeight: '700' }]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: '700', color: '#fff' },

  body: { padding: 16 },
  card: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    backgroundColor: '#fff',
  },
  h2: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  label: { fontSize: 12, fontWeight: '600', marginTop: 8, marginBottom: 6, color: '#444' },

  input: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#111',
  },
  inputButton: { justifyContent: 'center', minHeight: 44 },
  inputText: { color: '#111', fontSize: 14 },
  textarea: { minHeight: 100, textAlignVertical: 'top' },

  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

  iconBtn: {
    height: 38,
    width: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnSmall: {
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  followItem: {
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  linkDanger: { color: '#d11a2a', fontWeight: '600', paddingTop: 8 },
  primary: { color: '#2f80ed', fontWeight: '600' },
  hint: { color: '#777', fontSize: 12, marginTop: 6 },
  debug: { fontFamily: 'monospace', fontSize: 12, color: '#333' },

  chip: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: { fontSize: 12, color: '#333' },
});
