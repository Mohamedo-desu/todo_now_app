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
