import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const AddTaskScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  
  const handleAddTask = () => {
    if (!title) return;
    const newTask = { title, completed: false };
    route.params.addTask(newTask);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 20, fontSize: 18, padding: 8 }
});

export default AddTaskScreen;
