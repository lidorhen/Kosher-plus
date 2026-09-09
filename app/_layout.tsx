import { useFonts } from 'expo-font';
import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
  useRouter,
  useSegments,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import {
  OFFLINE_HEBREW,
  resolveGateTarget,
  type GateTarget,
} from '@/lib/authGate';
import { forceRtl } from '@/lib/rtl';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export { ErrorBoundary } from 'expo-router';

/**
 * Without env: keep M1α tabs as initial route (no auth redirects).
 * With env: prefer auth/sign-in as initial to avoid tabs flash; AuthGate
 * holds splash until settle then replaces to the correct path.
 */
export const unstable_settings = {
  initialRouteName: isSupabaseConfigured ? 'auth/sign-in' : '(tabs)',
};

SplashScreen.preventAutoHideAsync();
forceRtl();

const LightNav = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.lime,
    background: Colors.light.background,
    card: Colors.light.background,
    text: Colors.light.text,
    border: Colors.light.border,
  },
};

const DarkNav = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.lime,
    background: Colors.dark.background,
    card: Colors.dark.background,
    text: Colors.dark.text,
    border: Colors.dark.border,
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Without Supabase env, hide splash when fonts are ready (M1α).
  // With env, AuthGate holds splash until session + profile settle.
  useEffect(() => {
    if (loaded && !isSupabaseConfigured) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return <RootLayoutNav />;
}

type GatePhase =
  | { phase: 'passthrough' }
  | { phase: 'booting' }
  | { phase: 'offline' }
  | { phase: 'ready'; target: GateTarget };

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [gate, setGate] = useState<GatePhase>(() =>
    isSupabaseConfigured ? { phase: 'booting' } : { phase: 'passthrough' },
  );
  const [retryKey, setRetryKey] = useState(0);
  const runSettle = useCallback(async (userId: string | undefined) => {
    const client = getSupabase();
    if (!client) {
      setGate({ phase: 'passthrough' });
      await SplashScreen.hideAsync();
      return;
    }

    const result = await resolveGateTarget(client, userId);
    if ('offline' in result) {
      setGate({ phase: 'offline' });
      await SplashScreen.hideAsync();
      return;
    }

    setGate((prev) => {
      if (prev.phase === 'ready' && prev.target === result.target) return prev;
      return { phase: 'ready', target: result.target };
    });
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const client = getSupabase();
    if (!client) {
      setGate({ phase: 'passthrough' });
      void SplashScreen.hideAsync();
      return;
    }

    let cancelled = false;

    async function initial() {
      setGate({ phase: 'booting' });
      const { data } = await client!.auth.getSession();
      if (cancelled) return;
      await runSettle(data.session?.user?.id);
    }

    void initial();

    const { data: sub } = client.auth.onAuthStateChange((event, session) => {
      if (cancelled) return;
      // Initial settle already handled via getSession — avoid double flash.
      if (event === 'INITIAL_SESSION') return;

      if (event === 'SIGNED_OUT') {
        // Cache clear is done by the logout caller (has userId before signOut).
        void runSettle(undefined);
        return;
      }

      if (event === 'SIGNED_IN') {
        void runSettle(session?.user?.id);
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [runSettle, retryKey]);

  const segments = useSegments();

  // After settle: hide splash, then redirect only when the user is on the wrong
  // side of the gate. Do NOT hijack in-app routes (tabs / workout-session) once
  // onboarding is complete — that was kicking M2 session deep links back to today.
  useEffect(() => {
    if (gate.phase !== 'ready') return;
    void SplashScreen.hideAsync();

    const root = segments[0];
    const inAuth = root === 'auth';
    const inOnboarding = root === 'onboarding';
    if (gate.target === '/auth/sign-in') {
      if (!inAuth) router.replace(gate.target);
      return;
    }
    if (gate.target === '/onboarding') {
      if (!inOnboarding) router.replace(gate.target);
      return;
    }
    // Completed onboarding → tabs default; leave workout-session / tabs alone.
    if (gate.target === '/(tabs)/workouts') {
      if (inAuth || inOnboarding) router.replace(gate.target);
    }
  }, [gate, router, segments]);

  const onRetry = useCallback(() => {
    setGate({ phase: 'booting' });
    setRetryKey((k) => k + 1);
  }, []);

  const stackConfigured = isSupabaseConfigured && gate.phase !== 'passthrough';

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkNav : LightNav}>
      {gate.phase === 'booting' ? (
        <View style={styles.boot}>
          <ActivityIndicator size="large" color={Colors.lime} />
          <Text style={styles.bootText}>טוענים…</Text>
        </View>
      ) : gate.phase === 'offline' ? (
        <View style={styles.boot}>
          <Text style={styles.offlineText}>{OFFLINE_HEBREW}</Text>
          <Pressable style={styles.retryBtn} onPress={onRetry}>
            <Text style={styles.retryBtnText}>נסו שוב</Text>
          </Pressable>
        </View>
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="auth/sign-in"
            options={
              stackConfigured
                ? { headerShown: false }
                : { title: 'התחברות', presentation: 'modal' }
            }
          />
          <Stack.Screen
            name="auth/sign-up"
            options={
              stackConfigured
                ? { headerShown: false }
                : { title: 'הרשמה', presentation: 'modal' }
            }
          />
          <Stack.Screen
            name="onboarding/index"
            options={
              stackConfigured
                ? { headerShown: false }
                : { title: 'ברוכים הבאים', headerShown: true }
            }
          />
          <Stack.Screen
            name="workout-session"
            options={{ title: 'אימון', headerShown: true }}
          />
        </Stack>
      )}
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: Colors.light.background,
  },
  bootText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.light.textSecondary,
    writingDirection: 'rtl',
  },
  offlineText: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: 'center',
    writingDirection: 'rtl',
    lineHeight: 24,
    marginBottom: 20,
  },
  retryBtn: {
    backgroundColor: Colors.lime,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  retryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
