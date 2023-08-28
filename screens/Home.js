// Home.js file is dedicate to show user tasks.

// React imports
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Firebase imports
import { getAuth } from 'firebase/auth';
import {
  collection,
  db,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  increment
} from '../FirebaseCredentials';

// Tasks block component
import TaskBlock from './TaskBlock';


export default function Home() {

  const [taskBlockCount, setTaskBlockCount] = useState(0);
  const [taskBlockData, setTaskBlockData] = useState([]);
  const [finishedTaskCount, setFinishedTaskCount] = useState(0);
  const [isSave, setIsSave] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;


  const queryTasks = async () => {
    var querySnapshot = await getDocs(query(collection(db, 'tasks'), where('id', '==', user.uid)));

    var tasks;
    querySnapshot.forEach((doc) => {
      tasks = doc.data().tasks;
    });

    if (typeof tasks != 'undefined') {
      const newData = tasks.map((task) => ({ title: task.title, description: task.description }));
      setTaskBlockData((prevData) => [...prevData, ...newData]);
      setTaskBlockCount(taskBlockCount + newData.length);
    }

    return;
  };

  useEffect(() => {
    queryTasks();
  }, []);


  const handleAddTaskBlock = () => {
    const newData = [...taskBlockData, { title: '', description: '' }];
    setTaskBlockData(newData);
    setTaskBlockCount(taskBlockCount + 1);
  }

  const handleTitleInputChange = (index, text) => {
    const newData = [...taskBlockData];
    newData[index].title = text;
    setTaskBlockData(newData);
  }

  const handleDescriptionInputChange = (index, text) => {
    const newData = [...taskBlockData];
    newData[index].description = text;
    setTaskBlockData(newData);
  };

  const handleFinishedTaskPress = async (indexToDelete) => {
    const updatedData = taskBlockData.filter((_, index) => index !== indexToDelete);
    setTaskBlockData(updatedData);
    setTaskBlockCount(taskBlockCount - 1);
    setFinishedTaskCount(finishedTaskCount + 1);
  };

  const handleUpPress = (index) => {
    if (index <= 0)
      return;

    const dataCopy = [...taskBlockData];

    const temp = dataCopy[index];
    dataCopy[index] = dataCopy[index - 1]
    dataCopy[index - 1] = temp;

    setTaskBlockData(dataCopy);
  };

  const handleDownPress = (index) => {
    if (index >= taskBlockData.length - 1)
      return;

    const dataCopy = [...taskBlockData];

    const temp = dataCopy[index];
    dataCopy[index] = dataCopy[index + 1]
    dataCopy[index + 1] = temp;

    setTaskBlockData(dataCopy);
  };

  const handleSaveDataPress = async () => {
    setIsSave(true);

    var querySnapshot = await getDocs(query(collection(db, 'tasks'), where('id', '==', user.uid)));

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    const tasks = [];
    for (let i = 0; i < taskBlockData.length; i++) {
      tasks.push(
        {
          description: taskBlockData[i].description,
          title: taskBlockData[i].title
        }
      );
    }

    await addDoc(collection(db, 'tasks'), {
      id: user.uid,
      tasks: tasks
    }).then(async (docRef) => {
      const querySnapshot = await getDocs(query(collection(db, 'user'), where('id', '==', user.uid)));

      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
          finishedTasks: increment(finishedTaskCount)
        }).then((docRef) => {
          setIsSave(false);
        });
      });
    });

    setFinishedTaskCount(0);
  };


  const renderTaskBlocks = () => {
    const blocks = [];
    for (let i = 0; i < taskBlockCount; i++) {
      blocks.push(
        <TaskBlock
          key={i}
          index={i}
          data={taskBlockData[i]}
          handleTitleInputChange={handleTitleInputChange}
          handleDescriptionInputChange={handleDescriptionInputChange}
          handleFinishedTaskPress={handleFinishedTaskPress}
          handleUpPress={handleUpPress}
          handleDownPress={handleDownPress}
        />
      );
    }

    return blocks;
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#0782F9" barStyle="white-content" />

      <View style={styles.header}>
        <Text style={styles.headerText}>{taskBlockCount} {taskBlockCount == 1 ? 'tarea pendiente' : 'tareas pendientes'}</Text>
        <TouchableOpacity style={styles.buttonPanel} onPress={handleSaveDataPress}>
          <Ionicons
            name={!isSave ? "save-sharp" : "checkmark-sharp"}
            size={20}
            color={!isSave ? "#0782F9" : "green"}
          />
          <Text style={styles.buttonPanelText}>  Guardar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.TaskContainer}>
        <View >
          {renderTaskBlocks()}
        </View>

        <View style={styles.addTaskContainer}>
          <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTaskBlock}>
            <Ionicons name="add-sharp" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0782F9',
    padding: 16
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  buttonPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    elevation: 5
  },
  buttonPanelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0782F9'
  },
  TaskContainer: {
    padding: 16,
  },
  addTaskButton: {
    padding: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    elevation: 5,
  },
  addTaskContainer: {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    elevation: 5,
    padding: 10,
    paddingLeft: 70,
    paddingRight: 70
  }
});