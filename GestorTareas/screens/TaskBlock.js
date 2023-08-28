// TaskBlock.js file is dedicate to build the view of a task block..

// React imports.
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function TaskBlock(
    { 
        index, 
        data, 
        handleTitleInputChange, 
        handleDescriptionInputChange, 
        handleFinishedTaskPress,
        handleUpPress,
        handleDownPress
     }) {

    const [isPanelVisible, setPanelVisible] = useState(false);
    const [isRemoveTaskVisible, setRemoveTaskVisible] = useState(false);

    const togglePanel = () => {
        setPanelVisible(!isPanelVisible);

        if (isRemoveTaskVisible)
            setRemoveTaskVisible(!isRemoveTaskVisible);
    };

    const toggleRemoveTask = () => {
        setRemoveTaskVisible(!isRemoveTaskVisible);
    }

    const hidePanels = () => {
        setPanelVisible(false);
        setRemoveTaskVisible(false);
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder='Título de la tarea'
                    value={data.title}
                    onChangeText={(text) => handleTitleInputChange(index, text)}
                    fontSize={18}
                    multiline={true}
                    style={styles.titleInput}
                    onFocus={hidePanels}
                />
                <TouchableOpacity onPress={togglePanel}>
                    <Ionicons name="ellipsis-vertical" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.textAreaContainerPadding}>
                <View style={styles.textAreaContainer}>
                    <TextInput
                        placeholder='Descripción de la tarea'
                        value={data.description}
                        onChangeText={(text) => handleDescriptionInputChange(index, text)}
                        multiline={true}
                        onFocus={hidePanels}
                    />
                </View>
            </View>

            {isPanelVisible && (
                <View style={styles.subContainer}>
                    <View style={styles.panel}>
                        <TouchableOpacity style={styles.buttonPanel} onPress={toggleRemoveTask}>
                            <Ionicons name="checkmark-done-sharp" size={24} color="green" />
                            <Text style={[styles.buttonPanelText, { color: 'green' }]}>    Terminado</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonPanel} onPress={() => {togglePanel(); handleUpPress(index);}}>
                            <Ionicons name="arrow-up" size={24} color="black" />
                            <Text style={styles.buttonPanelText}> Subir puesto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonPanel} onPress={() => {togglePanel(); handleDownPress(index);}}>
                            <Ionicons name="arrow-down" size={24} color="black" />
                            <Text style={styles.buttonPanelText}> Bajar puesto</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {isRemoveTaskVisible && (
                <View style={styles.subContainer}>
                    <View style={styles.panel}>
                        <Text style={{ marginTop: 5, marginLeft: -10, fontSize: 15 }}>¿Eliminar tarea?</Text>
                        <TouchableOpacity style={styles.buttonPanel} onPress={() => {togglePanel(); handleFinishedTaskPress(index);}}>
                            <Ionicons name="checkmark" size={24} color="green" />
                            <Text style={[styles.buttonPanelText, { color: 'green' }]}>  Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonPanel, { marginBottom: 2 }]} onPress={togglePanel}>
                            <Ionicons name="close" size={24} color="red" />
                            <Text style={[styles.buttonPanelText, { color: 'red' }]}> Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 5,
        marginBottom: 18
    },
    textInputContainer: {
        padding: 10,
        paddingStart: 20,
        paddingEnd: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textAreaContainer: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10
    },
    textAreaContainerPadding: {
        padding: 10,
        paddingStart: 30,
        paddingEnd: 30,
    },
    titleInput: {
        width: 280
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        position: 'absolute',
        marginTop: 37,
        paddingLeft: 180,
    },
    panel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 5,
        borderRadius: 10
    },
    buttonPanel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 1
    },
    buttonPanelText: {
        fontSize: 15
    }
});