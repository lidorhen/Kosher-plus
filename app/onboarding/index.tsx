import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NumberWheel } from '@/components/NumberWheel';
import Colors from '@/constants/Colors';

type Gender = 'male' | 'female';
type Goal = 'weight_loss' | 'tone' | 'strength' | 'general';
type BodyType = 'lean' | 'athletic' | 'average' | 'soft';
type Step =
  | 'gender'
  | 'goal'
  | 'body'
  | 'weight'
  | 'height'
  | 'days';

const STEPS: Step[] = ['gender', 'goal', 'body', 'weight', 'height', 'days'];

const KG_TO_LB = 2.2046226218;
const CM_PER_IN = 2.54;

const GOALS: { id: Goal; label: string }[] = [
  { id: 'weight_loss', label: 'ירידה במשקל' },
  { id: 'tone', label: 'חיטוב' },
  { id: 'strength', label: 'כוח' },
  { id: 'general', label: 'כללי' },
];

const BODY_TYPES: { id: BodyType; label: string; hint: string }[] = [
  { id: 'lean', label: 'רזה', hint: 'מבנה דק / רזה' },
  { id: 'athletic', label: 'חטוב', hint: 'שרירי / חטוב' },
  { id: 'average', label: 'ממוצע', hint: 'מבנה ממוצע' },
  { id: 'soft', label: 'רך יותר', hint: 'רך / עגלגל יותר' },
];

/** Hebrew weekday labels א׳–ש׳ (Sun–Sat) */
const WEEKDAYS: { id: number; label: string }[] = [
  { id: 0, label: 'א׳' },
  { id: 1, label: 'ב׳' },
  { id: 2, label: 'ג׳' },
  { id: 3, label: 'ד׳' },
  { id: 4, label: 'ה׳' },
  { id: 5, label: 'ו׳' },
  { id: 6, label: 'ש׳' },
];

function range(start: number, end: number, step: number): number[] {
  const out: number[] = [];
  for (let v = start; v <= end + 1e-9; v = Math.round((v + step) * 10) / 10) {
    out.push(Number(v.toFixed(1)));
  }
  return out;
}

function kgToLb(kg: number): number {
  return Math.round(kg * KG_TO_LB * 10) / 10;
}

function lbToKg(lb: number): number {
  return Math.round((lb / KG_TO_LB) * 10) / 10;
}

function cmToTotalInches(cm: number): number {
  return Math.round(cm / CM_PER_IN);
}

function inchesToCm(inches: number): number {
  return Math.round(inches * CM_PER_IN);
}

function formatFtIn(totalInches: number): string {
  const ft = Math.floor(totalInches / 12);
  const inch = totalInches % 12;
  return `${ft}'${inch}"`;
}

export default function OnboardingScreen() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];

  const [gender, setGender] = useState<Gender | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [bodyType, setBodyType] = useState<BodyType | null>(null);

  /** Canonical metric storage */
  const [weightKg, setWeightKg] = useState(70.0);
  const [heightCm, setHeightCm] = useState(170);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');

  const [trainingDays, setTrainingDays] = useState<number[]>([]);

  const weightKgValues = useMemo(() => range(30.0, 200.0, 0.1), []);
  const weightLbValues = useMemo(() => range(kgToLb(30), kgToLb(200), 0.1), []);
  const heightCmValues = useMemo(() => {
    const out: number[] = [];
    for (let h = 120; h <= 220; h += 1) out.push(h);
    return out;
  }, []);
  const heightInValues = useMemo(() => {
    const lo = cmToTotalInches(120);
    const hi = cmToTotalInches(220);
    const out: number[] = [];
    for (let i = lo; i <= hi; i += 1) out.push(i);
    return out;
  }, []);

  function canContinue(): boolean {
    switch (step) {
      case 'gender':
        return gender != null;
      case 'goal':
        return goal != null;
      case 'body':
        return bodyType != null;
      case 'weight':
      case 'height':
        return true;
      case 'days':
        return trainingDays.length > 0;
      default:
        return false;
    }
  }

  function finish() {
    // M1α: local state only — persist later (Supabase profiles)
    void { gender, goal, bodyType, weightKg, heightCm, trainingDays };
    router.replace('/(tabs)/workouts');
  }

  function next() {
    if (!canContinue()) return;
    if (stepIndex >= STEPS.length - 1) {
      finish();
      return;
    }
    setStepIndex((i) => i + 1);
  }

  function back() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  function toggleDay(id: number) {
    setTrainingDays((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id].sort((a, b) => a - b),
    );
  }

  const titles: Record<Step, string> = {
    gender: 'מה המגדר שלך?',
    goal: 'מה המטרה שלך?',
    body: 'איך נראה מבנה הגוף?',
    weight: 'מה המשקל שלך?',
    height: 'מה הגובה שלך?',
    days: 'באילו ימים מתאמנים?',
  };

  const subs: Record<Step, string> = {
    gender: 'ל stubים בעברית מגדרית בהמשך',
    goal: 'ירידה במשקל / חיטוב / כוח / כללי',
    body: 'כרטיסי סוג גוף — לא אחוזי שומן',
    weight: 'גלגל 30.0–200.0 · שמירה בק״ג',
    height: 'גלגל 120–220 ס״מ · שמירה במטרית',
    days: 'בחירה מרובה · א׳–ש׳',
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.brand}>{Colors.brand}</Text>
      <Text style={styles.progress}>
        {stepIndex + 1} / {STEPS.length}
      </Text>
      <Text style={styles.title}>{titles[step]}</Text>
      <Text style={styles.sub}>{subs[step]}</Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        {step === 'gender' && (
          <View style={styles.rowGap}>
            {(
              [
                { id: 'male' as const, label: 'זכר' },
                { id: 'female' as const, label: 'נקבה' },
              ] as const
            ).map((opt) => (
              <Pressable
                key={opt.id}
                style={[styles.card, gender === opt.id && styles.cardSelected]}
                onPress={() => setGender(opt.id)}>
                <Text style={[styles.cardText, gender === opt.id && styles.cardTextSelected]}>
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {step === 'goal' && (
          <View style={styles.rowGap}>
            {GOALS.map((opt) => (
              <Pressable
                key={opt.id}
                style={[styles.card, goal === opt.id && styles.cardSelected]}
                onPress={() => setGoal(opt.id)}>
                <Text style={[styles.cardText, goal === opt.id && styles.cardTextSelected]}>
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {step === 'body' && (
          <View style={styles.grid}>
            {BODY_TYPES.map((opt) => (
              <Pressable
                key={opt.id}
                style={[styles.bodyCard, bodyType === opt.id && styles.cardSelected]}
                onPress={() => setBodyType(opt.id)}>
                <Text
                  style={[styles.cardText, bodyType === opt.id && styles.cardTextSelected]}>
                  {opt.label}
                </Text>
                <Text style={styles.bodyHint}>{opt.hint}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {step === 'weight' && (
          <View style={styles.wheelBlock}>
            <View style={styles.toggleRow}>
              <Pressable
                style={[styles.toggle, weightUnit === 'kg' && styles.toggleOn]}
                onPress={() => setWeightUnit('kg')}>
                <Text style={[styles.toggleText, weightUnit === 'kg' && styles.toggleTextOn]}>
                  ק״ג
                </Text>
              </Pressable>
              <Pressable
                style={[styles.toggle, weightUnit === 'lb' && styles.toggleOn]}
                onPress={() => setWeightUnit('lb')}>
                <Text style={[styles.toggleText, weightUnit === 'lb' && styles.toggleTextOn]}>
                  lb
                </Text>
              </Pressable>
            </View>
            {weightUnit === 'kg' ? (
              <NumberWheel
                values={weightKgValues}
                value={weightKg}
                onChange={setWeightKg}
                format={(v) => v.toFixed(1)}
                unit="ק״ג"
              />
            ) : (
              <NumberWheel
                values={weightLbValues}
                value={kgToLb(weightKg)}
                onChange={(lb) => setWeightKg(lbToKg(lb))}
                format={(v) => v.toFixed(1)}
                unit="lb"
              />
            )}
            <Text style={styles.preview}>
              {weightKg.toFixed(1)} ק״ג
              {weightUnit === 'lb' ? ` · ${kgToLb(weightKg).toFixed(1)} lb` : ''}
            </Text>
          </View>
        )}

        {step === 'height' && (
          <View style={styles.wheelBlock}>
            <View style={styles.toggleRow}>
              <Pressable
                style={[styles.toggle, heightUnit === 'cm' && styles.toggleOn]}
                onPress={() => setHeightUnit('cm')}>
                <Text style={[styles.toggleText, heightUnit === 'cm' && styles.toggleTextOn]}>
                  ס״מ
                </Text>
              </Pressable>
              <Pressable
                style={[styles.toggle, heightUnit === 'ft' && styles.toggleOn]}
                onPress={() => setHeightUnit('ft')}>
                <Text style={[styles.toggleText, heightUnit === 'ft' && styles.toggleTextOn]}>
                  ft
                </Text>
              </Pressable>
            </View>
            {heightUnit === 'cm' ? (
              <NumberWheel
                values={heightCmValues}
                value={heightCm}
                onChange={setHeightCm}
                unit="ס״מ"
              />
            ) : (
              <NumberWheel
                values={heightInValues}
                value={cmToTotalInches(heightCm)}
                onChange={(inches) => setHeightCm(inchesToCm(inches))}
                format={formatFtIn}
              />
            )}
            <Text style={styles.preview}>
              {heightCm} ס״מ
              {heightUnit === 'ft' ? ` · ${formatFtIn(cmToTotalInches(heightCm))}` : ''}
            </Text>
          </View>
        )}

        {step === 'days' && (
          <View style={styles.daysRow}>
            {WEEKDAYS.map((d) => {
              const on = trainingDays.includes(d.id);
              return (
                <Pressable
                  key={d.id}
                  style={[styles.dayChip, on && styles.dayChipOn]}
                  onPress={() => toggleDay(d.id)}>
                  <Text style={[styles.dayText, on && styles.dayTextOn]}>{d.label}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>

      <View style={styles.nav}>
        {stepIndex > 0 ? (
          <Pressable style={styles.btnSecondary} onPress={back}>
            <Text style={styles.btnSecondaryText}>חזרה</Text>
          </Pressable>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        <Pressable
          style={[styles.btn, !canContinue() && styles.btnDisabled]}
          onPress={next}
          disabled={!canContinue()}>
          <Text style={styles.btnText}>
            {stepIndex >= STEPS.length - 1 ? 'סיום' : 'המשך'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 24,
    paddingBottom: 16,
    backgroundColor: Colors.light.background,
  },
  brand: {
    color: Colors.lime,
    fontWeight: '700',
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  progress: {
    alignSelf: 'flex-end',
    color: Colors.light.textSecondary,
    fontSize: 13,
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'center',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
  sub: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    writingDirection: 'rtl',
    marginBottom: 16,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 16, alignItems: 'stretch' },
  rowGap: { gap: 12 },
  card: {
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  cardSelected: {
    borderColor: Colors.lime,
    backgroundColor: 'rgba(34,197,94,0.12)',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    writingDirection: 'rtl',
  },
  cardTextSelected: { color: Colors.lime },
  grid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  bodyCard: {
    width: '46%',
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  bodyHint: {
    marginTop: 6,
    fontSize: 12,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  wheelBlock: { alignItems: 'center', gap: 12 },
  toggleRow: {
    flexDirection: 'row-reverse',
    gap: 8,
    marginBottom: 4,
  },
  toggle: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.card,
  },
  toggleOn: {
    borderColor: Colors.lime,
    backgroundColor: 'rgba(34,197,94,0.15)',
  },
  toggleText: { fontWeight: '600', color: Colors.light.textSecondary },
  toggleTextOn: { color: Colors.lime },
  preview: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.lime,
  },
  daysRow: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  dayChip: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayChipOn: {
    borderColor: Colors.lime,
    backgroundColor: Colors.lime,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  dayTextOn: { color: '#fff' },
  nav: {
    flexDirection: 'row-reverse',
    gap: 12,
    marginTop: 8,
  },
  btn: {
    flex: 1,
    backgroundColor: Colors.lime,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnDisabled: { opacity: 0.4 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  btnSecondary: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: Colors.light.text,
    fontWeight: '700',
    fontSize: 16,
  },
});
