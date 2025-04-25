import { Colors } from '@/constants/Colors';
import { styles } from '@/styles/components/TaskCard.styles';
import { TaskCardProps } from '@/types/TaskCard.types';
import { useMutation } from 'convex/react';
import { format } from 'date-fns';
import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { withUnistyles } from 'react-native-unistyles';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

const CheckBoxUnistyle = withUnistyles(BouncyCheckbox, theme => ({
  fillColor: theme.Colors.success,
  unFillColor: 'transparent',
}));

const TaskCard: FC<TaskCardProps> = ({ item, index }) => {
  const formattedDate = format(new Date(item.dueDate), 'hh:mm a dd MMMM, yyyy');
  const [completed, setCompleted] = useState(item.status === 'done');
  const [priorityOn, setPriorityOn] = useState(item.priority);

  const editTask = useMutation(api.tasks.editTask);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [editDescription, setEditDescription] = useState(item.description);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCompleted(item.status === 'done');
    setPriorityOn(item.priority);
    setEditTitle(item.title);
    setEditDescription(item.description);
  }, [item]);

  const handleToggle = async (checked: boolean) => {
    setCompleted(checked);
    try {
      await editTask({
        id: item._id as Id<'tasks'>,
        status: checked ? 'done' : 'in-progress',
      });
    } catch (err) {
      setCompleted(!checked);
      console.error('Failed to update status', err);
      Alert.alert('Error', 'Could not update task status.');
    }
  };

  const handlePriorityToggle = async (checked: boolean) => {
    setPriorityOn(checked);
  };

  const handleDelete = () => {
    if (deleting) return;

    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            setDeleting(true);
            await deleteTask({ id: item._id as Id<'tasks'> });
          } catch (err) {
            console.error('Failed to delete task', err);
            Alert.alert('Error', 'Could not delete task.');
          } finally {
            setDeleting(false);
          }
        },
      },
    ]);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    // Reset edits and exit edit mode
    setEditTitle(item.title);
    setEditDescription(item.description);
    setIsEditing(false);
  };

  const handleSaveTask = async () => {
    if (!editTitle.trim() || !editDescription.trim()) {
      Alert.alert('Validation Error', 'Title and description cannot be empty.');
      return;
    }
    if (saving) return;

    setSaving(true);

    try {
      await editTask({
        id: item._id as Id<'tasks'>,
        title: editTitle.trim(),
        description: editDescription.trim(),
        priority: priorityOn,
      });
    } catch (err) {
      console.error('Failed to save task edits', err);
      Alert.alert('Error', 'Could not save task changes.');
    } finally {
      setSaving(false);
      setIsEditing(false);
    }
  };

  return (
    <Animated.View style={styles.container} entering={ZoomIn.delay(index * 100)} exiting={ZoomOut}>
      <View style={styles.header}>
        {isEditing ? (
          <TextInput
            value={editTitle}
            onChangeText={setEditTitle}
            maxLength={25}
            style={styles.editTitleInput}
            autoFocus
          />
        ) : (
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
        )}
        <View style={styles.actions}>
          {isEditing ? (
            <>
              {saving ? (
                <ActivityIndicator size={12} color={Colors.success} />
              ) : (
                <TouchableOpacity onPress={handleSaveTask} style={styles.actionBtn} hitSlop={10}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={handleCancelEditing} style={styles.actionBtn} hitSlop={10}>
                <Text style={styles.deleteText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={handleEdit} style={styles.actionBtn} hitSlop={10}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              {deleting ? (
                <ActivityIndicator size={12} color={Colors.error} />
              ) : (
                <TouchableOpacity onPress={handleDelete} style={styles.actionBtn} hitSlop={10}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>

      {isEditing ? (
        <TextInput
          value={editDescription}
          onChangeText={setEditDescription}
          maxLength={100}
          multiline
          textAlignVertical="top"
          style={styles.editDescriptionInput}
        />
      ) : (
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      )}

      <View style={styles.footer}>
        <Text style={styles.date}>{formattedDate}</Text>
        <CheckBoxUnistyle
          isChecked={completed}
          onPress={handleToggle}
          text="Mark as completed"
          textStyle={styles.taskStatusLabel}
          size={20}
        />
        {isEditing && (
          <CheckBoxUnistyle
            isChecked={priorityOn}
            onPress={handlePriorityToggle}
            text="Set as priority"
            textStyle={styles.taskStatusLabel}
            size={20}
            fillColor={Colors.primary}
          />
        )}
      </View>
    </Animated.View>
  );
};

export default TaskCard;
