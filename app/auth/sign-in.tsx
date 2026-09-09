import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '@/constants/Colors';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit() {
    if (!isSupabaseConfigured) {
      Alert.alert('כושר פלוס', 'חסרים משתני סביבה של Supabase. המסך הוא placeholder ל-M1.');
      return;
    }
    const client = getSupabase();
    if (!client) return;
    setBusy(true);
    try {
      const { error } = await client.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert('שגיאה', error.message);
        return;
      }
      // AuthGate listens to onAuthStateChange and redirects — no success Alert.
    } finally {
      setBusy(false);
    }
  }

  function onOAuthStub() {
    Alert.alert('כושר פלוס', 'בקרוב');
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>התחברות</Text>
      <Text style={styles.hint}>
        {isSupabaseConfigured ? 'הזינו אימייל וסיסמה' : 'מצב מקומי — Supabase לא מוגדר'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="אימייל"
        placeholderTextColor={Colors.light.textSecondary}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        textAlign="right"
      />
      <TextInput
        style={styles.input}
        placeholder="סיסמה"
        placeholderTextColor={Colors.light.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textAlign="right"
      />
      <Pressable
        style={[styles.btn, busy && styles.btnDisabled]}
        onPress={onSubmit}
        disabled={busy}>
        <Text style={styles.btnText}>התחבר</Text>
      </Pressable>

      <Pressable style={styles.oauthBtn} onPress={onOAuthStub}>
        <Text style={styles.oauthText}>המשך עם Apple</Text>
      </Pressable>
      <Pressable style={styles.oauthBtn} onPress={onOAuthStub}>
        <Text style={styles.oauthText}>המשך עם Google</Text>
      </Pressable>

      <Link href="/auth/sign-up" style={styles.link}>
        אין חשבון? להרשמה
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 24, backgroundColor: Colors.light.background },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
    color: Colors.light.text,
  },
  hint: {
    textAlign: 'right',
    writingDirection: 'rtl',
    color: Colors.light.textSecondary,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: Colors.light.card,
    color: Colors.light.text,
  },
  btn: {
    backgroundColor: Colors.lime,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  oauthBtn: {
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.card,
  },
  oauthText: {
    color: Colors.light.text,
    fontWeight: '600',
    fontSize: 16,
    writingDirection: 'rtl',
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
    color: Colors.lime,
    fontWeight: '600',
  },
});
