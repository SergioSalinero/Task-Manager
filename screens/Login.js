// Login.js file is dedicated to manage user login. Login is necessary to differentiate users in database.

// React imports.
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Firebase imports.
import {
    auth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from '../FirebaseCredentials';


function Login() {

    // Set email and user password.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Initialize screens navigation component (react-navigation).
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

    const handleSignup = () => {
        navigation.replace('Signup');
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const handlePasswordRecovery = () => {
        sendPasswordResetEmail(auth, 'sergiosalisan@gmail.com')
            .then(() => {
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (
        <View style={styles.container} behavior='padding'>
            <Image 
                source={require('../images/tareas.png')}
                style={{width: 200, height: 200, marginBottom: 100, marginTop: 50}}
            />

            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSignup}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Registarse</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handlePasswordRecovery}
                style={styles.passwordRecovery}
            >
                <Text style={styles.passwordRecoveryText}>¿Olvidaste al contraseña? Recupérala</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}

// Export login function to be renderer in App.js
export default Login;

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
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
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
    passwordRecovery: {
        marginTop: 100,
        padding: 15
    },
    passwordRecoveryText: {
        color: 'black'
    }
});