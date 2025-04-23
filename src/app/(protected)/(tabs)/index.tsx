import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { PaginatedQueryReference, usePaginatedQuery } from 'convex/react';
import { router } from 'expo-router';
import React, { FC } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { api } from '../../../../convex/_generated/api';
import Empty from '@/components/common/Empty';
import Loader from '@/components/common/Loader';
import AuthHeader from '@/components/ui/AuthHeader';
import TaskCard from '@/components/ui/TaskCard';
import { styles } from '@/styles/HomeScreen.styles';
import { IconProps } from '@/types/AuthHeader.types';

const Icon: FC<IconProps> = ({ onPress, name }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.iconBtn} hitSlop={10}>
    <Ionicons name={name} size={24} style={styles.icon} />
  </TouchableOpacity>
);

const Home = () => {
  const { user } = useUser();

  const {
    results: tasks,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.tasks.fetchTasks as PaginatedQueryReference,
    {},
    { initialNumItems: 5 }
  );

  const renderItem = ({ item, index }) => <TaskCard item={item} index={index} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.navigate('/(protected)/profile')}
        >
          <Image source={{ uri: user?.imageUrl }} resizeMode="cover" style={styles.image} />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Icon onPress={() => router.navigate('/(protected)/search')} name="search-outline" />
          <Icon onPress={() => undefined} name="notifications-outline" />
        </View>
      </View>

      <AuthHeader
        showBackButton={false}
        title={`Hello ${user?.firstName}`}
        description="What do you want to do today?"
      />

      <Animated.FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        style={styles.flatList}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => loadMore(5)}
        ListEmptyComponent={<Loader size="small" />}
        ListFooterComponent={
          status === 'LoadingMore' ? (
            <Loader size="small" />
          ) : status === 'Exhausted' ? (
            <Empty text="No more tasks" />
          ) : null
        }
        itemLayoutAnimation={LinearTransition}
      />
    </View>
  );
};

export default Home;
