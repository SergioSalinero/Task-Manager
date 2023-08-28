// Profile.js file is dedicated to configure and display the user profile data.

// React imports.
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Firebase imports.
import { getAuth, signOut } from 'firebase/auth';
import {
  collection,
  db,
  getDocs,
  query,
  where,
  updateDoc,
  onSnapshot
} from '../FirebaseCredentials';


export default function Profile() {

  const [username, setUsername] = useState('');
  const [finishedTasks, setFinishedTasks] = useState('');
  const [isSave, setIsSave] = useState(false);

  const navigation = useNavigation();

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const queryUser = async () => {
      const querySnapshot = await getDocs(query(collection(db, 'user'), where('id', '==', user.uid)));

      querySnapshot.forEach((doc) => {
        setUsername(doc.data().username);
        setFinishedTasks(doc.data().finishedTasks);
      })
    };
    queryUser();
  }, []);


    const firebaseUserListener = async () => {
      const q = await query(collection(db, 'user'), where('id', '==', user.uid));

      // Real time Firebase change listener.
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setFinishedTasks(doc.data().finishedTasks);
        });
      });
    };
    firebaseUserListener();


  const handleUsernameInputChange = (text) => {
    setUsername(text)
  };

  const handleSaveUsername = async () => {
    setIsSave(true);

    const querySnapshot = await getDocs(query(collection(db, 'user'), where('id', '==', user.uid)));

    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        username: username
      }).then((docRef) => {
        setIsSave(false);
      });
    });
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigation.replace('Login')
    }).catch((error) => {
      console.log(error);
    });
  };


  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
      },
    ],
  };
  
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#0782F9" barStyle="white-content" />

      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil</Text>
      </View>

      <View style={styles.containerPadding}>
        <View style={styles.container}>
          <View style={styles.usernameInputContainer}>
            <TextInput
              value={username}
              style={styles.usernameInput}
              onChangeText={handleUsernameInputChange}
            />
            <TouchableOpacity style={styles.usernameButton} onPress={handleSaveUsername}>
              <Ionicons
                name={!isSave ? 'checkmark-sharp' : 'thumbs-up-sharp'}
                size={20}
                color={!isSave ? 'gray' : 'black'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>{user.email}</Text>
          <Text style={[styles.text, {fontWeight: 'bold', fontSize: 18}]}>Tareas terminadas: {finishedTasks}</Text>
        </View>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  containerPadding: {
    padding: 15
  },
  container: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    elevation: 5,
    marginBottom: 18,
    padding: 10
  },
  usernameInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
  },
  usernameInput: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: 250
  },
  usernameButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10
  },
  text: {
    marginLeft: 18,
    fontSize: 15,
    marginBottom: 10,
  },
  logoutContainer: {
    paddingLeft: 100,
    paddingRight: 100
  },
  logoutButton: {
    padding: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    elevation: 5
  },
  logoutText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});