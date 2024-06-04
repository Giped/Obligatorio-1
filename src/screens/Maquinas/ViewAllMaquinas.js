import React, { useState, useEffect} from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyText from "../../components/MyText";

const ViewAllMaquinas = ({navigation}) => 
    {
        const [maquinas, setMaquinas] = useState([]);

        useEffect(() => 
        {
            const fetchMaquina = async () => 
            {
                try
                {
                    const keys = await AsyncStorage.getAllKeys();
                    const result = await AsyncStorage.multiGet(keys);
                    const maquinaList = result.map(req => JSON.parse(req[1]));
                    
                    if(maquinaList.length > 0)
                    {
                        setMaquinas(maquinaList);
                    }
                    else
                    {
                        Alert.alert(
                            'Mensaje',
                            'No hay usuarios',
                            [{text: 'Ok', onPress: () => navigation.navigate('HomeScreen')}], {cancelable : false}
                        )
                    }
                }
                catch(error)
                {
                    console.error(error);
                    Alert.alert('Error al cargar usuarios');
                }
            };
            fetchMaquina();
        }, []);

        const listItemView = (item) =>
            {
                return(
                    <View key = {item.MaquinaName} style={StyleSheet.listItemView}>
                        <MyText
                        text = 'Nombre de Usuario'
                        style={styles.text}
                        />
                        <MyText
                         text={item.MaquinaName} style={styles.text}
                         />
                        <MyText
                         text = 'Email'
                         style = {styles.text}
                         />
                        <MyText
                         text= {item.email} 
                         style={styles.text}
                         />
                    </View>
                );
            };

        return(
            <SafeAreaView style = {styles.container}> 
                <View>
                    <View>
                        <FlatList
                        contentContainerStyle = {{paddingHorizontal: 20}}
                        data = {maquinas}
                        keyExtractor={(item) => item.MaquinaName} 
                        renderItem={({item}) => listItemView(item)}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    };

export default ViewAllMaquinas;

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
    listView:{
        marginTop: 20
    },
    listItemView:{
        backgroundColor: 'white',
        margin: 5,
        padding: 10,
        borderRadius: 10
    },
    text: {
        padding: 5,
        marginLeft: 10,
        color: 'black',
        alignContent: 'center',
        alignItems: 'center'
    }
});