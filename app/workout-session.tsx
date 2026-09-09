import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '@/constants/Colors';
import type { PlanExercise } from '@/data/todayWorkouts';
import {
  getPlanByDayKey,
  getTodayPlan,
  isDayKey,
} from '@/lib/todayPlan';

const REST_SECONDS = 60;

function trainingExercises(exercises: PlanExercise[]): PlanExercise[] {
  return exercises.filter((ex) => !!ex.exerciseId);
}

export default function WorkoutSessionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ dayKey?: string }>();

  const plan = useMemo(() => {
    const raw = params.dayKey;
    const key =
      typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] : undefined;
    if (key && isDayKey(key)) return getPlanByDayKey(key);
    return getTodayPlan();
  }, [params.dayKey]);

  const exercises = useMemo(
    () => trainingExercises(plan.exercises),
    [plan.exercises],
  );

  const noWorkout = plan.isRest || exercises.length === 0;

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0); // 0-based
  const [resting, setResting] = useState(false);
  const [restLeft, setRestLeft] = useState(REST_SECONDS);
  const [done, setDone] = useState(false);

  const exerciseIndexRef = useRef(exerciseIndex);
  const setIndexRef = useRef(setIndex);
  exerciseIndexRef.current = exerciseIndex;
  setIndexRef.current = setIndex;

  const finishWorkout = useCallback(() => {
    setResting(false);
    setDone(true);
  }, []);

  const advanceAfterSet = useCallback(() => {
    const ei = exerciseIndexRef.current;
    const si = setIndexRef.current;
    const current = exercises[ei];
    if (!current) return;

    const isLastSet = si + 1 >= current.sets;
    const isLastExercise = ei + 1 >= exercises.length;

    if (isLastSet && isLastExercise) {
      finishWorkout();
      return;
    }

    if (isLastSet) {
      setExerciseIndex(ei + 1);
      setSetIndex(0);
    } else {
      setSetIndex(si + 1);
    }
  }, [exercises, finishWorkout]);

  // Countdown while resting
  useEffect(() => {
    if (!resting) return;
    if (restLeft <= 0) {
      setResting(false);
      advanceAfterSet();
      return;
    }
    const id = setTimeout(() => setRestLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [resting, restLeft, advanceAfterSet]);

  const startRest = useCallback(() => {
    setRestLeft(REST_SECONDS);
    setResting(true);
  }, []);

  const skipRest = useCallback(() => {
    setResting(false);
    advanceAfterSet();
  }, [advanceAfterSet]);

  const onCompleteSet = useCallback(() => {
    const current = exercises[exerciseIndex];
    if (!current) return;

    const isLastSet = setIndex + 1 >= current.sets;
    const isLastExercise = exerciseIndex + 1 >= exercises.length;

    // Last set of last exercise → finish (no rest)
    if (isLastSet && isLastExercise) {
      finishWorkout();
      return;
    }

    startRest();
  }, [
    exerciseIndex,
    exercises,
    finishWorkout,
    setIndex,
    startRest,
  ]);

  const onExit = useCallback(() => {
    const leave = () => router.back();
    // Alert.alert is flaky on web — prefer window.confirm there.
    if (typeof window !== 'undefined' && typeof window.confirm === 'function') {
      if (window.confirm('לצאת מהאימון? ההתקדמות לא תישמר.')) leave();
      return;
    }
    Alert.alert('לצאת מהאימון?', 'ההתקדמות לא תישמר.', [
      { text: 'המשך אימון', style: 'cancel' },
      { text: 'צא', style: 'destructive', onPress: leave },
    ]);
  }, [router]);

  if (done) {
    return (
      <View style={styles.wrap}>
        <View style={styles.card}>
          <Text style={styles.title}>כל הכבוד</Text>
          <Text style={styles.message}>סיימתם את האימון!</Text>
          <Pressable
            style={styles.primaryCta}
            onPress={() => router.replace('/(tabs)/workouts')}
            accessibilityRole="button"
          >
            <Text style={styles.primaryCtaText}>סגור</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (noWorkout) {
    return (
      <View style={styles.wrap}>
        <View style={styles.card}>
          <Text style={styles.title}>{plan.titleHe}</Text>
          <Text style={styles.message}>
            {plan.isRest
              ? 'היום יום מנוחה — אין אימון פעיל.'
              : 'אין תרגילים לאימון היום.'}
          </Text>
          <Pressable
            style={styles.primaryCta}
            onPress={() => router.back()}
            accessibilityRole="button"
          >
            <Text style={styles.primaryCtaText}>חזרה</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const current = exercises[exerciseIndex]!;
  const totalExercises = exercises.length;
  const totalSets = current.sets;
  const isLastAction =
    setIndex + 1 >= totalSets && exerciseIndex + 1 >= totalExercises;

  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <Text style={styles.sectionLabel}>{plan.titleHe}</Text>
        <Text style={styles.progress}>
          תרגיל {exerciseIndex + 1} מתוך {totalExercises}
        </Text>
        <Text style={styles.progressSecondary}>
          סט {setIndex + 1} מתוך {totalSets}
        </Text>

        <Text style={styles.exerciseName}>{current.nameHe}</Text>
        <Text style={styles.setsReps}>
          {current.sets}×{current.reps}
        </Text>

        {resting ? (
          <View style={styles.restBox}>
            <Text style={styles.restLabel}>מנוחה</Text>
            <Text style={styles.restTimer}>{restLeft}</Text>
            <Pressable
              style={styles.secondaryCta}
              onPress={skipRest}
              accessibilityRole="button"
            >
              <Text style={styles.secondaryCtaText}>דלג מנוחה</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={styles.primaryCta}
            onPress={onCompleteSet}
            accessibilityRole="button"
          >
            <Text style={styles.primaryCtaText}>
              {isLastAction ? 'סיים אימון' : 'השלם סט'}
            </Text>
          </Pressable>
        )}

        <Pressable
          style={[styles.exitBtn, resting && styles.exitBtnSpaced]}
          onPress={onExit}
          accessibilityRole="button"
        >
          <Text style={styles.exitBtnText}>צא</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 16,
  },
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.lime,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.light.textSecondary,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 16,
  },
  progress: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.text,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 4,
  },
  progressSecondary: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
  setsReps: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.lime,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 24,
  },
  restBox: {
    alignItems: 'center',
    marginBottom: 8,
  },
  restLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.textSecondary,
    writingDirection: 'rtl',
    marginBottom: 4,
  },
  restTimer: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 16,
  },
  primaryCta: {
    backgroundColor: Colors.lime,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryCtaText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    writingDirection: 'rtl',
  },
  secondaryCta: {
    borderWidth: 1,
    borderColor: Colors.lime,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  secondaryCtaText: {
    color: Colors.lime,
    fontWeight: '700',
    fontSize: 16,
    writingDirection: 'rtl',
  },
  exitBtn: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  exitBtnSpaced: {
    marginTop: 12,
  },
  exitBtnText: {
    color: Colors.light.textSecondary,
    fontWeight: '600',
    fontSize: 15,
    writingDirection: 'rtl',
  },
});
