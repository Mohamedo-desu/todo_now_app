import { useMutation } from 'convex/react';
import { format } from 'date-fns';
import React, { FC, useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { withUnistyles } from 'react-native-unistyles';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { styles } from '@/styles/components/TaskCard.styles';
import { TaskCardProps } from '@/types/TaskCard.types';

const CheckBoxUnistyle = withUnistyles(BouncyCheckbox, theme => ({
  fillColor: theme.Colors.success,
  unFillColor: 'transparent',
}));

const TaskCard: FC<TaskCardProps> = ({ item, onEdit }) => {
  const formattedDate = format(new Date(item.dueDate), 'hh:mm a dd MMMM, yyyy');
  const [completed, setCompleted] = useState(item.status === 'done');

  const editTask = useMutation(api.tasks.editTask);
  const deleteTask = useMutation(api.tasks.deleteTask);

  // Sync with prop
  useEffect(() => {
    setCompleted(item.status === 'done');
  }, [item.status]);

  const handleToggle = async (checked: boolean) => {
    setCompleted(checked);
    try {
      await editTask({
        id: item._id as Id<'tasks'>,
        status: checked ? 'done' : 'in-progress',
      });
    } catch (err) {
      console.error('Failed to update status', err);
      Alert.alert('Error', 'Could not update task status.');
      setCompleted(!checked);
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTask({ id: item._id as Id<'tasks'> });
          } catch (err) {
            console.error('Failed to delete task', err);
            Alert.alert('Error', 'Could not delete task.');
          }
        },
      },
    ]);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleEdit} style={styles.actionBtn} hitSlop={10}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.actionBtn} hitSlop={10}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.date}>{formattedDate}</Text>
        <CheckBoxUnistyle
          isChecked={completed}
          onPress={handleToggle}
          text="Mark as completed"
          textStyle={styles.taskStatusLabel}
          size={20}
        />
      </View>
    </View>
  );
};

export default TaskCard;
