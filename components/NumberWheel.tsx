import { useMemo, useRef } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
  type ViewToken,
} from 'react-native';
import Colors from '@/constants/Colors';

const ITEM_H = 44;

type Props = {
  values: number[];
  value: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  unit?: string;
};

export function NumberWheel({ values, value, onChange, format, unit }: Props) {
  const listRef = useRef<FlatList<number>>(null);
  const initialIndex = Math.max(0, values.indexOf(value));

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const mid = viewableItems.find((v) => v.isViewable && v.index != null);
    if (mid?.item != null) onChange(mid.item as number);
  }).current;

  const viewConfig = useRef({ itemVisiblePercentThreshold: 60, minimumViewTime: 50 }).current;

  const data = useMemo(() => values, [values]);

  return (
    <View style={styles.container}>
      <View style={styles.highlight} pointerEvents="none" />
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item) => String(item)}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_H}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({ length: ITEM_H, offset: ITEM_H * index, index })}
        initialScrollIndex={initialIndex}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        contentContainerStyle={{ paddingVertical: ITEM_H * 2 }}
        style={{ height: ITEM_H * 5 }}
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          const y = e.nativeEvent.contentOffset.y;
          const idx = Math.round(y / ITEM_H);
          const clamped = Math.max(0, Math.min(values.length - 1, idx));
          onChange(values[clamped]);
        }}
        renderItem={({ item }) => {
          const selected = item === value;
          return (
            <View style={styles.row}>
              <Text style={[styles.value, selected && styles.valueSelected]}>
                {format ? format(item) : String(item)}
                {unit ? ` ${unit}` : ''}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
  },
  highlight: {
    position: 'absolute',
    top: ITEM_H * 2,
    left: 8,
    right: 8,
    height: ITEM_H,
    borderRadius: 12,
    backgroundColor: 'rgba(34,197,94,0.15)',
    borderWidth: 1,
    borderColor: Colors.lime,
    zIndex: 1,
  },
  row: {
    height: ITEM_H,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 18,
    color: Colors.light.textSecondary,
  },
  valueSelected: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.light.text,
  },
});
