import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';

type Props = { title: string; subtitle?: string };

export function StubSoon({ title, subtitle = 'בקרוב' }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{subtitle}</Text>
      </View>
      <Text style={styles.hint}>פיצ׳ר זה יופיע בגרסאות הבאות של כושר פלוס.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 16,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  badge: {
    backgroundColor: Colors.lime,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    marginBottom: 16,
  },
  badgeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  hint: {
    fontSize: 15,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    writingDirection: 'rtl',
    lineHeight: 22,
  },
});
