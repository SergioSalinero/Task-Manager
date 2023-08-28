// Signup.js file is dedicated to manage user signup.

// React imports.
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Firebase imports.
import {
    db,
    collection,
    addDoc,
    auth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
} from '../FirebaseCredentials';


export default function Signup() {

    // Set username, email and user password.
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    // Initialize screens navigation component.
    const navigation = useNavigation();

    // When component is rendered, useEffect is run once.
    useEffect(() => {
        // If the authentication status changes, it means that user is logged in the system.
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace('Lobby');
            }
        });

        return unsubscribe;
    }, []);

    const handleSingup = () => {
        const passwordEqual = password === rePassword;

        if(userName.length == 0) {
            Alert.alert('Introduzca un nombre de usuario');
            return;
        }

        if (passwordEqual) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredentials) => {
                    const user = userCredentials.user;
                    
                    await addDoc(collection(db, 'user'), {
                        id: user.uid,
                        username: userName,
                        finishedTasks: 0
                    });
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
        else {
            Alert.alert('Las contraseñas no coinciden');
        }
    };

    const handleLogin = () => {
        navigation.replace('Login');
    };

    return (
        <View style={styles.container} behavior='padding'>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Nombre de usuario'
                    value={userName}
                    onChangeText={text => setUserName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Correo electrónico'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Contraseña'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder='Repetir contraseña'
                    value={rePassword}
                    onChangeText={text => setRePassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSingup}
                    style={[styles.button]}
                >
                    <Text style={styles.buttonText}>Registarse</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.iHaveAccount}
                >
                    <Text style={styles.iHaveAccountText}>Ya tengo una cuenta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        marginTop: 5,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    },
    iHaveAccount: {
        marginTop: 10,
        padding: 15
    },
    iHaveAccountText: {
        color: 'black'
    }
});