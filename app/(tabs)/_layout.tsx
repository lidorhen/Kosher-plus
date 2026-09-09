import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

function TabBarIcon(props: {
  name: ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginBottom: -2 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.tabIconSelected,
        tabBarInactiveTintColor: palette.tabIconDefault,
        tabBarStyle: {
          backgroundColor: palette.background,
          borderTopColor: palette.border,
        },
        headerStyle: { backgroundColor: palette.background },
        headerTintColor: palette.text,
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'אימונים',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="heartbeat" color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'ספרייה',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="book" color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'צ׳אט',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="comments" color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'תזונה',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cutlery" color={String(color)} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'פרופיל',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user" color={String(color)} />
          ),
        }}
      />
    </Tabs>
  );
}
