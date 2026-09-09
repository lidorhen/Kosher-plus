import { Link } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import { clearOnboardingCache } from '@/lib/authGate';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export default function ProfileScreen() {
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
    // AuthGate redirects to sign-in on SIGNED_OUT
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.brand}>{Colors.brand}</Text>
      <Text style={styles.title}>פרופיל</Text>
      <Text style={styles.sub}>
        {isSupabaseConfigured
          ? 'Supabase מוגדר — אפשר להתחבר.'
          : 'מצב מקומי: חסרים EXPO_PUBLIC_SUPABASE_URL / ANON_KEY.'}
      </Text>

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

      {isSupabaseConfigured ? (
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
