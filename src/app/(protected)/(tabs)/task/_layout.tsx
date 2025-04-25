import { Colors } from '@/constants/Colors';
import { styles } from '@/styles/layouts/TasksLayout.styles';
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import React from 'react';
import { Animated } from 'react-native';
import { withUnistyles } from 'react-native-unistyles';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const MaterialTopTabsUniStyle = withUnistyles(MaterialTopTabs, theme => ({
  screenOptions: {
    tabBarActiveTintColor: Colors.primary,
    tabBarInactiveTintColor: theme.Colors.gray[500],
    activeColor: theme.Colors.primary,
    pressColor: 'transparent',
    tabBarPressColor: 'transparent',
    tabBarPressOpacity: 0,
    tabBarStyle: styles.container,
    tabBarLabelStyle: styles.tabBarLabelStyle,
    tabBarAllowFontScaling: true,
    tabBarIndicator: ({ state, position, getTabWidth }) => {
      const inputRange = state.routes.map((_, i) => i);

      const outputRange = state.routes.map((_, i) => {
        const offsetBefore = state.routes
          .slice(0, i)
          .reduce((sum, _, idx) => sum + getTabWidth(idx), 0);

        return offsetBefore + (getTabWidth(i) - 80) / 2;
      });

      const translateX = position.interpolate({
        inputRange,
        outputRange,
        extrapolate: 'clamp',
      });

      return <Animated.View style={[styles.indicator, { transform: [{ translateX }] }]} />;
    },
  },
}));
const TasksLayout = () => {
  return (
    <MaterialTopTabsUniStyle>
      <MaterialTopTabs.Screen name="index" options={{ title: 'Pending' }} />
      <MaterialTopTabs.Screen name="completed" options={{ title: 'Completed' }} />
      <MaterialTopTabs.Screen name="overdue" options={{ title: 'Overdue' }} />
    </MaterialTopTabsUniStyle>
  );
};

export default TasksLayout;
