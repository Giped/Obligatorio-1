import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const UpdateMaquina = () => {
    
    const [maquinaNameSearch, setMaquinaNameSearch] = useState('')
    const [maquinaName, setMaquinaName] = useState('')
    const [maquinaEmail, setEmail] = useState('')

    const searchMaquina = async () => {
        console.log('searchMaquina')
        if(!maquinaNameSearch.trim()){
            Alert.alert('El nombre de usuario es requerido')
            return;
        }

        try{
            const maquina = await AsyncStorage.getItem(maquinaNameSearch)
            if(maquina)
            {
                const maquinaData = JSON.parse(maquina)
                setMaquinaName(maquinaData.maquinaName)
                setEmail(maquinaData.email)
            }
            else
            {
                Alert.alert('Usuario no encontrado')
            }
        }
        catch(error){
            console.error(error)
            Alert.alert('Error al buscar Usuario')
        }
    };

    const updateMaquina = async () =>
        {
            console.log('updateMaquina')

            if(!maquinaName.trim())
            {
                Alert.alert('El nombre de usuario es requerido');
                return;
            }
            if(!maquinaEmail.trim())
            {
                Alert.alert('El email es requerido');
                return;
            }

            try
            {
                const maquina = {maquinaName, email: maquinaEmail};
                await AsyncStorage.setItem(maquinaName, JSON.stringify(maquina))
                Alert.alert('Usuario actualizado')
            }
            catch(error)
            {
                console.error(error)
                Alert.alert('Error al actualizar el usuario')
            }
        };

        return(
            <SafeAreaView style={styles.container}>
                <View style = {styles.viewContainer}>
                    <View style = {styles.generalView}>
                        <ScrollView keyboardShouldPersistTaps = 'handled'>
                            <KeyboardAvoidingView behavior="padding">
                                <MyText 
                                    text = 'Buscar Usuario'
                                    style = {styles.text}
                                />
                                <MyInputText 
                                    placeholder = 'Ingrese el nombre de usuario'
                                    style={styles.inputStyle}
                                    onChangeText= {(text) => setMaquinaNameSearch(text)}
                                />
                                <MySingleButton
                                    title = 'Buscar'
                                    customPress = {searchMaquina}
                                 />
                                <MyInputText 
                                    placeholder = 'Ingrese el nombre de usuario'
                                    value = {maquinaName}
                                    onChangeText= {(text) => setMaquinaName(text)}
                                />
                                <MyInputText 
                                    placeholder = 'Ingrese el email'
                                    value = {maquinaEmail}
                                    onChangeText= {(text) => setEmail(text)}
                                />
                                <MySingleButton
                                    title = 'Actualizar'
                                    customPress = {updateMaquina}
                                 />
                            </KeyboardAvoidingView>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        )
}

export default UpdateMaquina;

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    viewContainer: {
        flex:1,
        backgroundColor: 'white'
    },
    generalView: {
        flex:1
    },
    text: {
        padding: 10,
        marginLeft: 25,
        color: 'black'
    },
    inputStyle: {
        padding: 25
    },
    keyboardView: {
        flex:1,
        justifyContent: 'space-between'
    }
});