import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const RegisterMaquina = ({navigation}) => {
    const [maquinaName, setMaquinaName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const clearData = () => {
        setMaquinaName('');
        setPassword('');
        setEmail('');
    }

    const registerMaquina = async () => {
        console.log('states', maquinaName, password, email);
        if (!maquinaName.trim()) {
            Alert.alert('Ingrese su nombre de usuario');
            return;
        }
        if (!password.trim()) {
            Alert.alert('Ingrese su contraseña');
            return;
        }
        if (!email.trim() || email.indexOf('@') === -1) {
            Alert.alert('Ingrese su email');
            return;
        }

        try {
            const maquina = {maquinaName, password, email};

            await AsyncStorage.setItem(maquinaName, JSON.stringify(maquina));
            clearData();
            Alert.alert(
                'Éxito',
                'Usuario Registrado',
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
                                placeholder='Nombre de Usuario'
                                onChangeText={setMaquinaName}
                                style={styles.nameInput}
                                value={maquinaName}
                            />
                            <MyInputText
                                placeholder='Contraseña'
                                minLength={8}
                                maxLength={16}
                                secureTextEntry={true}
                                onChangeText={setPassword}
                                style={styles.passwordInput}
                                value={password}
                            />
                            <MyInputText
                                placeholder='Email'
                                keyboardType='email-address'
                                onChangeText={setEmail}
                                style={styles.emailInput}
                                value={email}
                            />
                            <MySingleButton
                                title='Guardar Usuario'
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
    passwordInput: {
        padding: 15,
        textAlignVertical: 'top'
    },
    emailInput: {
        padding: 15,
        textAlignVertical: 'top'
    }
});
