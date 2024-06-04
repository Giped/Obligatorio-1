import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

const ViewMaquina = ({navigation}) => {
    const [maquinaName, setMaquinaName] = useState('');
    const [maquinaData, setMaquinaData] = useState(null);

    const getMaquinaData = async () => {
        console.log('getMaquinaData')

        setMaquinaData(null);
        if(!maquinaName.trim())
            {
                Alert.alert('El nombre de usuario es requerido');
                return;
            }

        try
        {
            const maquina = await AsyncStorage.getItem(maquinaName);
            if(maquina)
                {
                    setMaquinaData(JSON.parse(maquina));
                }
            else
                Alert.alert('El usuario no existe')
        }
        catch(error)
        {
            console.error(error);
            Alert.alert('Error al buscar usuario');
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style= {styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyText 
                                text= 'Filtro de usuario'
                                style= {styles.text}
                            />
                            <MyInputText 
                                style={styles.inputStyle}
                                placeholder = 'Nombre de usuario a buscar'
                                onChangeText= {(text) => setMaquinaName(text)}
                            />
                            <MySingleButton
                                title='Buscar'
                                customPress={getMaquinaData}
                            />
                            <View style={styles.presenterView}>
                                <MyText 
                                    text= {`Email: ${!maquinaData ? '' : maquinaData.email}`} 
                                    style= {styles.presenterText}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewMaquina;

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
    inputStyle:{
        margin:10,
        padding: 14,
        color: 'black'
    },
    presenterView:{
        flex: 2,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15,
        fontSize: 30
    },
    presenterText:{
        fontSize: 20
    },
    text: {
        padding: 5,
        marginLeft: 10,
        color: 'black',
        alignContent: 'center',
        alignItems: 'center'
    }
});