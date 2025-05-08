import Empty from '@/components/common/Empty';
import Loader from '@/components/common/Loader';
import RenderTaskCard from '@/components/common/RenderTaskCard';
import { styles } from '@/styles/SearchScreen.styles';
import { IconProps } from '@/types/AuthHeader.types';
import { TaskCardProps } from '@/types/TaskCard.types';
import { Ionicons } from '@expo/vector-icons';
import { useConvex } from 'convex/react';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { withUnistyles } from 'react-native-unistyles';
import { api } from '../../../convex/_generated/api';

// Define a type that matches what the TaskCard component expects
type Task = TaskCardProps['item'];

const TextInputUnistyles = withUnistyles(TextInput, theme => ({
  placeholderTextColor: theme.Colors.gray[400],
  cursorColor: theme.Colors.secondary,
}));

const Icon: FC<IconProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.iconBtn} hitSlop={10}>
    <Ionicons name="search-outline" size={20} style={styles.icon} />
  </TouchableOpacity>
);

export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const [tasks, setTasks] = useState<Task[]>([]);

  const convex = useConvex();

  const handleSearch = useCallback(async () => {
    const trimmed = query.trim();

    if (!trimmed) {
      setTasks([]);
      return;
    }

    setLoading(true);
    try {
      const res = await convex.query(api.tasks.searchTask, { taskTitle: trimmed });

      // Convert the Convex document to the format expected by TaskCard
      const formattedTasks = res.map(task => ({
        _id: task._id,
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate),
        status: task.status,
        priority: task.priority,
      }));

      setTasks(formattedTasks);
    } catch (e) {
      console.error('Search failed: ', e);
    } finally {
      setLoading(false);
    }
  }, [query, convex]);

  const debouncedHandleSearch = useMemo(() => debounce(handleSearch, 500), [handleSearch]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInputUnistyles
          style={styles.searchInput}
          placeholder="Search for your tasks"
          value={query}
          onChangeText={text => {
            setQuery(text);
            debouncedHandleSearch();
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Icon onPress={handleSearch} />
      </View>
      {loading ? (
        <Loader size="small" />
      ) : (
        <Animated.FlatList
          data={tasks}
          renderItem={RenderTaskCard}
          keyExtractor={item => item._id}
          style={styles.flatList}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Empty text="No results found" />}
          itemLayoutAnimation={LinearTransition}
        />
      )}
    </View>
  );
};

export default SearchScreen;
