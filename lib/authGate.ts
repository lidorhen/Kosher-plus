import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SupabaseClient } from '@supabase/supabase-js';

/** Offline message (Hebrew) — AUTH_GATE_DESIGN.md */
export const OFFLINE_HEBREW =
  'אין חיבור לרשת. בדקו את החיבור ונסו שוב.';

/** AsyncStorage key prefix pattern: kosher-plus:onboarding_completed:{userId} */
export function STORAGE_KEY(userId: string): string {
  return `kosher-plus:onboarding_completed:${userId}`;
}

export async function getCachedOnboardingCompleted(
  userId: string,
): Promise<boolean | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY(userId));
    if (raw === 'true') return true;
    if (raw === 'false') return false;
    return null;
  } catch {
    return null;
  }
}

export async function setCachedOnboardingCompleted(
  userId: string,
  completed: boolean,
): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY(userId), completed ? 'true' : 'false');
  } catch {
    // ignore cache write failures
  }
}

export async function clearOnboardingCache(userId: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY(userId));
  } catch {
    // ignore
  }
}

export type OnboardingStatusResult =
  | { kind: 'ok'; completed: boolean }
  | { kind: 'missing' }
  | { kind: 'offline' }
  | { kind: 'error'; message: string };

function isLikelyOffline(err: unknown): boolean {
  const msg =
    typeof err === 'object' && err !== null && 'message' in err
      ? String((err as { message: unknown }).message)
      : String(err ?? '');
  const lower = msg.toLowerCase();
  return (
    lower.includes('network request failed') ||
    lower.includes('failed to fetch') ||
    lower.includes('network error') ||
    lower.includes('offline') ||
    lower.includes('fetch failed') ||
    lower.includes('network')
  );
}

/**
 * Fetch onboarding_completed for the user. Missing row → kind 'missing'
 * (treat as incomplete). Network failures → 'offline' (never guess).
 */
export async function fetchOnboardingStatus(
  client: SupabaseClient,
  userId: string,
): Promise<OnboardingStatusResult> {
  try {
    const { data, error } = await client
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      if (isLikelyOffline(error)) return { kind: 'offline' };
      return { kind: 'error', message: error.message };
    }
    if (!data) return { kind: 'missing' };

    const completed = Boolean(data.onboarding_completed);
    await setCachedOnboardingCompleted(userId, completed);
    return { kind: 'ok', completed };
  } catch (e) {
    if (isLikelyOffline(e)) return { kind: 'offline' };
    return {
      kind: 'error',
      message: e instanceof Error ? e.message : 'unknown',
    };
  }
}

export type GateTarget = '/auth/sign-in' | '/onboarding' | '/(tabs)';

/**
 * Resolve navigation target after session + profile settle.
 * Offline without cached completed=true → null (caller shows retry UI).
 */
export async function resolveGateTarget(
  client: SupabaseClient,
  userId: string | undefined,
): Promise<{ target: GateTarget } | { offline: true }> {
  if (!userId) {
    return { target: '/auth/sign-in' };
  }

  const status = await fetchOnboardingStatus(client, userId);

  if (status.kind === 'offline') {
    const cached = await getCachedOnboardingCompleted(userId);
    if (cached === true) {
      return { target: '/(tabs)' };
    }
    return { offline: true };
  }

  if (status.kind === 'ok' && status.completed) {
    return { target: '/(tabs)' };
  }

  // missing profile, !completed, or known non-offline error → onboarding
  // (never guess completed=true)
  return { target: '/onboarding' };
}
