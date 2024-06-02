import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LogTabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="Mapa"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              library="MaterialCommunityIcons"
              name={focused ? 'map-marker-radius' : 'google-maps'} 
              color={color}
              focused={focused} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Comunidade"
        options={{
          title: 'Comunidade',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              library="MaterialCommunityIcons"
              name={focused ? 'human-queue' : 'account-group-outline'} 
              color={color}
              focused={focused} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
