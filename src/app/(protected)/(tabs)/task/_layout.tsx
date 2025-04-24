import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import React from 'react';
import { Animated } from 'react-native';
import { StyleSheet, withUnistyles } from 'react-native-unistyles';
import { Colors } from '@/constants/Colors';

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

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    paddingTop: rt.insets.top,
    backgroundColor: theme.Colors.background,
  },
  indicator: {
    position: 'absolute',
    width: 85,
    height: 4,
    backgroundColor: Colors.primary,
    bottom: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  tabBarLabelStyle: {
    textTransform: 'capitalize',
    fontFamily: theme.fonts.Medium,
    fontSize: 15,
  },
}));
