import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import { clearOnboardingCache } from '@/lib/authGate';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export default function ProfileScreen() {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setHasSession(false);
      return;
    }
    const client = getSupabase();
    if (!client) {
      setHasSession(false);
      return;
    }

    let cancelled = false;

    async function loadSession() {
      const { data } = await client!.auth.getSession();
      if (!cancelled) {
        setHasSession(Boolean(data.session?.user));
      }
    }

    void loadSession();

    const { data: sub } = client.auth.onAuthStateChange((_event, session) => {
      if (!cancelled) {
        setHasSession(Boolean(session?.user));
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function onSignOut() {
    const client = getSupabase();
    if (!client) return;
    const { data } = await client.auth.getSession();
    const userId = data.session?.user?.id;
    const { error } = await client.auth.signOut();
    if (error) {
      Alert.alert('שגיאה', error.message);
      return;
    }
    if (userId) await clearOnboardingCache(userId);
    setHasSession(false);
    // AuthGate redirects to sign-in on SIGNED_OUT
  }

  const showAuthLinks = !isSupabaseConfigured || !hasSession;

  return (
    <View style={styles.wrap}>
      <Text style={styles.brand}>{Colors.brand}</Text>
      <Text style={styles.title}>פרופיל</Text>
      <Text style={styles.sub}>
        {isSupabaseConfigured
          ? hasSession
            ? 'מחובר ל־Supabase.'
            : 'Supabase מוגדר — אפשר להתחבר.'
          : 'מצב מקומי: חסרים EXPO_PUBLIC_SUPABASE_URL / ANON_KEY.'}
      </Text>

      {showAuthLinks ? (
        <>
          <Link href="/auth/sign-in" asChild>
            <Pressable style={styles.btn}>
              <Text style={styles.btnText}>התחברות</Text>
            </Pressable>
          </Link>
          <Link href="/auth/sign-up" asChild>
            <Pressable style={[styles.btn, styles.btnOutline]}>
              <Text style={[styles.btnText, styles.btnOutlineText]}>הרשמה</Text>
            </Pressable>
          </Link>
          <Link href="/onboarding" asChild>
            <Pressable style={[styles.btn, styles.btnGhost]}>
              <Text style={[styles.btnText, styles.btnGhostText]}>התחלת Onboarding</Text>
            </Pressable>
          </Link>
        </>
      ) : null}

      {isSupabaseConfigured && hasSession ? (
        <Pressable style={[styles.btn, styles.btnGhost]} onPress={onSignOut}>
          <Text style={[styles.btnText, styles.btnGhostText]}>התנתק</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.light.background,
  },
  brand: {
    color: Colors.lime,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
  sub: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 24,
    lineHeight: 20,
  },
  btn: {
    backgroundColor: Colors.lime,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.lime,
  },
  btnOutlineText: {
    color: Colors.lime,
  },
  btnGhost: {
    backgroundColor: Colors.light.card,
  },
  btnGhostText: {
    color: Colors.light.text,
  },
});
