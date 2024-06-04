import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const RegisterUser = ({navigation}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const clearData = () => {
        setUserName('');
        setPassword('');
        setEmail('');
    }

    const registerUser = async () => {
        console.log('states', userName, password, email);
        if (!userName.trim()) {
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
            const user = {userName, password, email};

            await AsyncStorage.setItem(userName, JSON.stringify(user));
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
                                onChangeText={setUserName}
                                style={styles.nameInput}
                                value={userName}
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
                                customPress={registerUser}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterUser;

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
