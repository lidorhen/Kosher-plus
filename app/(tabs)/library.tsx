import { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Colors from '@/constants/Colors';
import { searchExercises, type Exercise } from '@/data/exercises';

const LEVEL_HE: Record<Exercise['level'], string> = {
  beginner: 'מתחיל',
  intermediate: 'בינוני',
  advanced: 'מתקדם',
};

const CAT_HE: Record<Exercise['category'], string> = {
  push: 'דחיפה',
  pull: 'משיכה',
  legs: 'רגליים',
  core: 'ליבה',
  skills: 'מיומנויות',
};

export default function LibraryScreen() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchExercises(query), [query]);

  return (
    <View style={styles.wrap}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="חיפוש תרגילים (דיפים, מתח...)"
        placeholderTextColor={Colors.light.textSecondary}
        style={styles.search}
        textAlign="right"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Text style={styles.count}>{results.length} תרגילים</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListEmptyComponent={
          <Text style={styles.empty}>לא נמצאו תרגילים</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nameHe}</Text>
            <Text style={styles.en}>{item.nameEn}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.chip}>{CAT_HE[item.category]}</Text>
              <Text style={styles.chip}>{LEVEL_HE[item.level]}</Text>
            </View>
            {item.cueHe ? <Text style={styles.cue}>{item.cueHe}</Text> : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  search: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 8,
    writingDirection: 'rtl',
  },
  count: {
    textAlign: 'right',
    color: Colors.light.textSecondary,
    marginBottom: 8,
    writingDirection: 'rtl',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: Colors.light.textSecondary,
    writingDirection: 'rtl',
  },
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  en: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    textAlign: 'right',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row-reverse',
    gap: 8,
    marginTop: 10,
  },
  chip: {
    backgroundColor: 'rgba(34,197,94,0.15)',
    color: Colors.lime,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '600',
  },
  cue: {
    marginTop: 8,
    fontSize: 13,
    color: Colors.light.textSecondary,
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 20,
  },
});
