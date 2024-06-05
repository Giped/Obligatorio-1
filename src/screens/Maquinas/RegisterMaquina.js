import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const RegisterMaquina = ({navigation}) => {
    const [maquinaId, setMaquinaId] = useState('');
    const [tipoMaq, setTipoMaq] = useState('');
    const [nroSala, setNroSala] = useState('');

    const clearData = () => {
        setMaquinaId('');
        setTipoMaq('');
        setNroSala('');
    }

    const registerMaquina = async () => {
        console.log('states', maquinaId, tipoMaq, nroSala);
        if (!maquinaId.trim()) {
            Alert.alert('Ingrese el Id de la maquina');
            return;
        }
        if (!tipoMaq.trim()) {
            Alert.alert('Ingrese el tipo de maquina');
            return;
        }
        if (!nroSala.trim()) {
            Alert.alert('Ingrese el numero de sala de la maquina');
            return;
        }

        try {
            const maquina = {maquinaId, tipoMaq, nroSala};

            await AsyncStorage.setItem(maquinaId, JSON.stringify(maquina));
            clearData();
            Alert.alert(
                'Éxito',
                'Maquina Registrada',
                [{ text: 'Ok', onPress: () => navigation.navigate('HomeScreen') }],
                { cancelable: false }
            );
        } catch (error) {
            console.error(error);
            Alert.alert('Error al registrar usuario');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder='Id de la Maquina'
                                onChangeText={setMaquinaId}
                                style={styles.nameInput}
                                value={maquinaId}
                            />
                            <MyInputText
                                placeholder='Tipo de Maquina'
                                onChangeText={setTipoMaq}
                                style={styles.nameInput}
                                value={tipoMaq}
                            />
                            <MyInputText
                                placeholder='Nro de sala de la Maquina'
                                onChangeText={setNroSala}
                                style={styles.nameInput}
                                value={nroSala}
                            />
                            <MySingleButton
                                title='Guardar Maquina'
                                customPress={registerMaquina}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterMaquina;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    generalView: {
        flex: 1
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'space-between'
    },
    nameInput: {
        padding: 15,
        textAlignVertical: 'top'
    },

});
