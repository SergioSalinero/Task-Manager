// PasswordRecovery.js file is dedicated to manage user password change.

// React imports.
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Firebase imports.
import {
    auth,
    sendPasswordResetEmail
} from '../FirebaseCredentials';


function PasswordRecovery() {

    // Set email and user password.
    const [email, setEmail] = useState('');

    // Initialize screens navigation component (react-navigation).
    const navigation = useNavigation();


    const handleEmailSending = () => {
        console.log(email);
        sendPasswordResetEmail(auth, email)
            .then(() => { console.log('Hecho');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    const handleLoginBack = () => {
        navigation.replace('Login');
    };

    return (
        <View style={styles.container} behavior='padding'>
            
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleEmailSending}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Enviar correo</Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity
                onPress={handleLoginBack}
                style={styles.loginBack}
            >
                <Text style={styles.loginBackText}>Volver</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}

// Export password recovery function to be renderer in App.js
export default PasswordRecovery;

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
    loginBack: {
        marginTop: 15,
        padding: 15
    },
    loginBackText: {
        color: 'black'
    }
});