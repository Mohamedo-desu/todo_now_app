import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation } from 'convex/react';
import { format } from 'date-fns';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox, { BouncyCheckboxHandle } from 'react-native-bouncy-checkbox';
import { withUnistyles } from 'react-native-unistyles';
import { api } from '../../../convex/_generated/api';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { styles } from '@/styles/AddTaskScreen.styles';
import { schema } from '@/validations/AddTaskScreen.validation';

const CheckBoxUnistyle = withUnistyles(BouncyCheckbox, theme => ({
  fillColor: theme.Colors.primary,
  unFillColor: 'transparent',
}));
const TextInputUnistyles = withUnistyles(TextInput, theme => ({
  placeholderTextColor: theme.Colors.gray[400],
  cursorColor: theme.Colors.secondary,
}));

type FormValues = {
  taskTitle: string;
  taskDescription: string;
  taskDate: Date;
};

const AddTask = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      taskTitle: '',
      taskDescription: '',
      taskDate: new Date(),
    },
    shouldFocusError: true,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [priority, setPriority] = useState(false);
  const bouncyCheckboxRef = useRef<BouncyCheckboxHandle>(null);

  const addTask = useMutation(api.tasks.addTask);

  const onSubmit = async (data: FormValues) => {
    try {
      const taskId = await addTask({
        title: data.taskTitle,
        description: data.taskDescription,
        status: 'in-progress',
        priority: priority,
        dueDate: data.taskDate.getTime(),
      });
      if (taskId) {
        reset(); //
        if (priority) {
          setPriority(false);
          bouncyCheckboxRef.current?.onCheckboxPress();
        }
        Alert.alert('Success', 'Task added successfully!');
      }
    } catch (error) {
      console.log('Error adding task:', error);
      Alert.alert('Error', 'An error occurred while adding the task. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Input
            label="Task Title"
            control={control}
            errors={errors.taskTitle}
            name="taskTitle"
            placeholder="Enter task title"
          />

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Task description</Text>
            {errors.taskDescription && (
              <Text style={styles.errorLabel}>{errors.taskDescription.message}</Text>
            )}
            <Controller
              control={control}
              name={'taskDescription'}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputUnistyles
                  style={styles.input}
                  placeholder={'Enter task description'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  textAlignVertical="top"
                  autoCapitalize="sentences"
                  autoCorrect
                  textBreakStrategy="highQuality"
                  multiline
                />
              )}
            />
          </View>

          <View style={styles.datePickerContainer}>
            <Text style={styles.inputLabel}>Set deadline</Text>

            <Controller
              control={control}
              name="taskDate"
              render={({ field: { value, onChange } }) => (
                <>
                  <TouchableOpacity
                    style={styles.datePicker}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={styles.datePickerText}>{format(value, 'd MMMM yyyy')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.datePicker}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Text style={styles.datePickerText}>{format(value, 'h:mm a')}</Text>
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      value={value}
                      mode="date"
                      display="default"
                      onChange={(_, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                          const newDate = new Date(value);
                          newDate.setFullYear(
                            selectedDate.getFullYear(),
                            selectedDate.getMonth(),
                            selectedDate.getDate()
                          );
                          onChange(newDate);
                        }
                      }}
                    />
                  )}

                  {showTimePicker && (
                    <DateTimePicker
                      value={value}
                      mode="time"
                      display="default"
                      onChange={(_, selectedTime) => {
                        setShowTimePicker(false);
                        if (selectedTime) {
                          const newDate = new Date(value);
                          newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
                          onChange(newDate);
                        }
                      }}
                    />
                  )}

                  {errors.taskDate && (
                    <Text style={styles.errorLabel}>{errors.taskDate.message}</Text>
                  )}
                </>
              )}
            />
          </View>

          <View style={styles.priorityContainer}>
            <CheckBoxUnistyle
              text="Set as priority"
              onPress={(isChecked: boolean) => {
                setPriority(isChecked);
              }}
              textStyle={styles.priorityLabel}
              size={20}
              ref={bouncyCheckboxRef}
            />
          </View>
        </View>
        <View style={styles.height} />
        <Button
          onPress={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          isValid={isValid}
          label={'Add Task'}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddTask;
