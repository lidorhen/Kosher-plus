import {
  DAY_KEY_BY_JS_GET_DAY,
  TODAY_WORKOUTS,
  type DayKey,
  type DayPlan,
} from '@/data/todayWorkouts';

/** Map JS Date.getDay() (0=Sun … 6=Sat) → Hebrew week dayKey (א׳…ש׳). */
export function dayKeyFromDate(date: Date = new Date()): DayKey {
  return DAY_KEY_BY_JS_GET_DAY[date.getDay()];
}

/** Today's Week-1 plan card (static). Falls back to Sunday if missing. */
export function getTodayPlan(date: Date = new Date()): DayPlan {
  const key = dayKeyFromDate(date);
  return (
    TODAY_WORKOUTS.find((p) => p.dayKey === key) ?? TODAY_WORKOUTS[0]
  );
}

/** Look up a Week-1 plan by dayKey; falls back to Sunday if missing. */
export function getPlanByDayKey(dayKey: DayKey): DayPlan {
  return TODAY_WORKOUTS.find((p) => p.dayKey === dayKey) ?? TODAY_WORKOUTS[0];
}

const DAY_KEYS: readonly DayKey[] = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
];

export function isDayKey(value: string): value is DayKey {
  return (DAY_KEYS as readonly string[]).includes(value);
}
