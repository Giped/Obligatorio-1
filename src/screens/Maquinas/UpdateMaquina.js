import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const UpdateMaquina = () => {
    
    const [maquinaIdSearch, setMaquinaIdSearch] = useState('')
    const [maquinaId, setMaquinaId] = useState('');
    const [tipoMaq, setTipoMaq] = useState('');
    const [nroSala, setNroSala] = useState('');

    const searchMaquina = async () => {
        console.log('searchMaquina')
        if(!maquinaIdSearch.trim()){
            Alert.alert('El Id de la Maquina es requerida')
            return;
        }

        try{
            const maquina = await AsyncStorage.getItem(maquinaIdSearch)
            if(maquina)
            {
                const maquinaData = JSON.parse(maquina)
                setMaquinaId(maquinaData.maquinaId)
                setTipoMaq(maquinaData.tipoMaq)
                setNroSala(maquinaData.nroSala)
            }
            else
            {
                Alert.alert('Maquina no encontrado')
            }
        }
        catch(error){
            console.error(error)
            Alert.alert('Error al buscar Maquina')
        }
    };

    const updateMaquina = async () =>
        {
            console.log('updateMaquina')

            if(!maquinaId.trim())
            {
                Alert.alert('El Id de la maquina es requerido');
                return;
            }
            if(!tipoMaq.trim())
            {
                Alert.alert('El tipo de maquina es requerido');
                return;
            }
            if(!nroSala.trim())
                {
                    Alert.alert('El numero de sala donde esta la maquina es requerido');
                    return;
                }

            try
            {
                const maquina = {maquinaId,tipoMaq,nroSala};
                await AsyncStorage.setItem(maquinaId, JSON.stringify(maquina))
                Alert.alert('Maqunia actualizada')
            }
            catch(error)
            {
                console.error(error)
                Alert.alert('Error al actualizar Maquina')
            }
        };

        return(
            <SafeAreaView style={styles.container}>
                <View style = {styles.viewContainer}>
                    <View style = {styles.generalView}>
                        <ScrollView keyboardShouldPersistTaps = 'handled'>
                            <KeyboardAvoidingView behavior="padding">
                                <MyText 
                                    text = 'Buscar Maquina'
                                    style = {styles.text}
                                />
                                <MyInputText 
                                    placeholder = 'Ingrese el Id de la maquina'
                                    style={styles.inputStyle}
                                    onChangeText= {(text) => setMaquinaIdSearch(text)}
                                />
                                <MySingleButton
                                    title = 'Buscar'
                                    customPress = {searchMaquina}
                                 />
                                <MyInputText 
                                    placeholder = 'Ingrese el Id de la maquina'
                                    value = {maquinaId}
                                    onChangeText= {(text) => setMaquinaId(text)}
                                />
                                <MyInputText 
                                    placeholder = 'Ingrese el tipo de maquina'
                                    value = {tipoMaq}
                                    onChangeText= {(text) => setTipoMaq(text)}
                                />
                                <MyInputText 
                                    placeholder = 'Ingrese el nro de salsa donde esta la maquina'
                                    value = {nroSala}
                                    onChangeText= {(text) => setNroSala(text)}
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