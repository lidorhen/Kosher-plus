import { Link, useRouter } from 'expo-router';
import { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '@/constants/Colors';
import { getTodayPlan } from '@/lib/todayPlan';

const BOX_BREATHING_COPY =
  'נשימת קופסה — 2 דקות (שאיפה 4 · החזקה 4 · נשיפה 4 · החזקה 4)';

export default function WorkoutsScreen() {
  const router = useRouter();
  const plan = useMemo(() => getTodayPlan(), []);

  const onStartWorkout = () => {
    router.push({
      pathname: '/workout-session',
      params: { dayKey: plan.dayKey },
    });
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.brand}>{Colors.brand}</Text>

      {plan.isRest ? (
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>היום</Text>
          <Text style={styles.title}>{plan.titleHe}</Text>
          {plan.restNote ? (
            <Text style={styles.greeting}>{plan.restNote}</Text>
          ) : null}
          <View style={styles.metaRow}>
            {plan.minutes != null ? (
              <Text style={styles.minutes}>{plan.minutes} דק׳</Text>
            ) : null}
            {plan.tags.map((tag) => (
              <Text key={tag} style={styles.chip}>
                {tag}
              </Text>
            ))}
          </View>
          <View style={styles.breathBox}>
            <Text style={styles.breathTitle}>Mind מינימלי</Text>
            <Text style={styles.breathCopy}>{BOX_BREATHING_COPY}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>האימון של היום</Text>
          <Text style={styles.title}>{plan.titleHe}</Text>
          <View style={styles.metaRow}>
            {plan.minutes != null ? (
              <Text style={styles.minutes}>~{plan.minutes} דק׳</Text>
            ) : null}
            {plan.tags.map((tag) => (
              <Text key={tag} style={styles.chip}>
                {tag}
              </Text>
            ))}
          </View>
          <View style={styles.exerciseList}>
            {plan.exercises.map((ex, i) => (
              <View
                key={ex.exerciseId ?? `${ex.nameHe}-${i}`}
                style={[
                  styles.exerciseRow,
                  i < plan.exercises.length - 1 && styles.exerciseRowBorder,
                ]}
              >
                <Text style={styles.exerciseName}>{ex.nameHe}</Text>
                <Text style={styles.exerciseSets}>
                  {ex.sets}×{ex.reps}
                </Text>
              </View>
            ))}
          </View>
          <Pressable
            style={styles.primaryCta}
            onPress={onStartWorkout}
            accessibilityRole="button"
          >
            <Text style={styles.primaryCtaText}>התחל אימון</Text>
          </Pressable>
        </View>
      )}

      <Link href="/(tabs)/library" asChild>
        <Pressable style={styles.secondaryCta} accessibilityRole="button">
          <Text style={styles.secondaryCtaText}>עבור לספרייה</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  brand: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.lime,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: 16,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.lime,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.light.textSecondary,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
    alignItems: 'center',
  },
  minutes: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.lime,
    writingDirection: 'rtl',
  },
  chip: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
    writingDirection: 'rtl',
  },
  breathBox: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: 14,
  },
  breathTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 6,
  },
  breathCopy: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.light.textSecondary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  exerciseList: {
    marginBottom: 16,
  },
  exerciseRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  exerciseRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  exerciseName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.text,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginLeft: 12,
  },
  exerciseSets: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    writingDirection: 'rtl',
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
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryCtaText: {
    color: Colors.lime,
    fontWeight: '700',
    fontSize: 16,
    writingDirection: 'rtl',
  },
});
