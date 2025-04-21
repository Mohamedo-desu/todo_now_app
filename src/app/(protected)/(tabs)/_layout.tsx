import { Ionicons } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarButton: props => <Pressable {...props} android_ripple={null} />,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addTask"
        options={{
          title: 'Add Task',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            router.navigate('/(protected)/AddTask');
          },
        })}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: 'Task',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="checkmark-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create((theme, rt) => ({
  tabBarStyle: {
    backgroundColor: theme.Colors.background,
    position: 'absolute',
    height: 50,
    paddingBottom: 8,
    elevation: 0,
    bottom: rt.insets.bottom,
  },
}));
