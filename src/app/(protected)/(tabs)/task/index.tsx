import Empty from '@/components/common/Empty';
import Loader from '@/components/common/Loader';
import RenderTaskCard from '@/components/common/RenderTaskCard';
import { styles } from '@/styles/common/TaskTabs.styles';
import { PaginatedQueryReference, usePaginatedQuery } from 'convex/react';
import React from 'react';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { api } from '../../../../../convex/_generated/api';

const PendingTasks = () => {
  const {
    results: tasks,
    status,
    loadMore,
    isLoading,
  } = usePaginatedQuery(
    api.tasks.fetchPendingTasks as PaginatedQueryReference,
    {},
    { initialNumItems: 10 }
  );

  return (
    <Animated.FlatList
      data={tasks}
      renderItem={RenderTaskCard}
      keyExtractor={item => item._id}
      style={styles.flatList}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      onEndReached={() => loadMore(10)}
      removeClippedSubviews={true}
      windowSize={5}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      ListEmptyComponent={
        isLoading ? <Loader size="small" /> : <Empty text="No pending tasks found" />
      }
      ListFooterComponent={
        status === 'LoadingMore' ? (
          <Loader size="small" />
        ) : status === 'Exhausted' && tasks.length !== 0 ? (
          <Empty text="You don't have any more pending tasks" />
        ) : null
      }
      itemLayoutAnimation={LinearTransition}
    />
  );
};

export default PendingTasks;
