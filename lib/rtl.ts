import { I18nManager, Platform } from 'react-native';

/** Force Hebrew-first RTL for the whole app (M1). */
export function forceRtl(): void {
  try {
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      void Platform.OS;
    }
  } catch {
    // ignore
  }
}

export const isRtl = (): boolean => I18nManager.isRTL;
