import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

/** Expo web SSR has no window — creating the client there crashes AsyncStorage/WebSocket. */
function isWebSSR(): boolean {
  return Platform.OS === 'web' && typeof window === 'undefined';
}

/**
 * Returns a Supabase client when env vars are set; otherwise null.
 * Callers should handle the missing case gracefully (placeholders / local UI).
 * Safe to call on native and in the browser; returns null during web SSR.
 */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) {
    return null;
  }
  if (isWebSSR()) {
    return null;
  }
  if (!client) {
    client = createClient(url, anonKey, {
      auth: {
        storage: AsyncStorage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }
  return client;
}
