import { AnimatedLegendList } from '@legendapp/list/reanimated';
import { PaginatedQueryReference, usePaginatedQuery } from 'convex/react';
import React from 'react';
import { api } from '../../../../../convex/_generated/api';
import Empty from '@/components/common/Empty';
import Loader from '@/components/common/Loader';
import RenderTaskCard from '@/components/common/RenderTaskCard';
import { styles } from '@/styles/common/TaskTabs.styles';

const OverdueTasks = () => {
  const {
    results: tasks,
    status,
    loadMore,
    isLoading,
  } = usePaginatedQuery(
    api.tasks.fetchOverdueTasks as PaginatedQueryReference,
    {},
    { initialNumItems: 10 }
  );

  return (
    <AnimatedLegendList
      data={tasks}
      renderItem={RenderTaskCard}
      keyExtractor={item => item._id}
      style={styles.flatList}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      onEndReached={() => loadMore(10)}
      ListEmptyComponent={
        isLoading ? <Loader size="small" /> : <Empty text="No overdue tasks found" />
      }
      ListFooterComponent={
        status === 'LoadingMore' ? (
          <Loader size="small" />
        ) : status === 'Exhausted' && tasks.length !== 0 ? (
          <Empty text="You don't have any more overdue tasks" />
        ) : null
      }
    />
  );
};

export default OverdueTasks;
