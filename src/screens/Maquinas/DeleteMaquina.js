import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const DeleteMaquina = ({navigation}) => 
{

    const [maquinaName, setMaquinaName] = useState('');

    const deleteMaquina = async () => 
        {
            console.log('deleteMaquina');

            try
            {
                const maquina =await AsyncStorage.getItem(maquinaName);

                if(maquina)
                    {
                        await AsyncStorage.removeItem(maquinaName);
                        Alert.alert('Usuario eliminado')
                    }
                else
                    Alert.alert('El usuario no existe');
            }
            catch(error)
            {
                console.error(error);
                Alert.alert('Error al eliminar el usuario')
            }
        };

        return(
            <SafeAreaView style={styles.container}>
                <View style= {styles.viewContainer}>
                    <View style={styles.generalView}>
                        <ScrollView>
                                <MyText 
                                    text= 'Buscar usuario a eliminar'
                                    style= {styles.text}
                                />
                                <KeyboardAvoidingView style={styles.keyboardView}>
                                    <MyInputText 
                                        placeholder = 'Nombre de usuario'
                                        style={styles.inputStyle}
                                        onChangeText= {(text) => setMaquinaName(text)}
                                    />
                                    <MySingleButton
                                        title='Borrar Usuario'
                                        customPress={deleteMaquina}
                                    />
                                </KeyboardAvoidingView>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        );
}

export default DeleteMaquina;

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
    keyboardView:{
        flex:1,
        justifyContent: 'space-between'
    },
    text: {
        padding: 10,
        marginLeft: 25,
        color: 'black',
    }
});