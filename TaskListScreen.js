import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  };

  const toggleTaskCompletion = async (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const deleteTask = async (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <Text style={item.completed ? styles.completedTask : styles.task}>{item.title}</Text>
            <Button title="Complete" onPress={() => toggleTaskCompletion(index)} />
            <Button title="Delete" onPress={() => deleteTask(index)} color="red" />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask', { addTask: (newTask) => setTasks([...tasks, newTask]) })}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  taskContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  task: { fontSize: 16 },
  completedTask: { fontSize: 16, textDecorationLine: 'line-through', color: 'gray' },
  addButton: { backgroundColor: '#1e90ff', padding: 10, alignItems: 'center', marginTop: 20 },
  addButtonText: { color: '#fff', fontSize: 18 }
});

export default TaskListScreen;
