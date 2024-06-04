//Controla la estructura de navegacion
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import HomeUsers from '../screens/HomeUsers';
import RegisterUser from '../screens/Users/RegisterUser';
import UpdateUser from '../screens/Users/UpdateUser';
import DeleteUser from '../screens/Users/DeleteUser';
import ViewUsers from '../screens/Users/ViewUsers';
import ViewAllUsers from '../screens/Users/ViewAllUsers';
import HomeMaquinas from '../screens/HomeMaquinas';
import RegisterMaquina from '../screens/Maquinas/RegisterMaquina';
import UpdateMaquina from '../screens/Maquinas/UpdateMaquina';
import DeleteMaquina from '../screens/Maquinas/DeleteMaquina';
import ViewMaquina from '../screens/Maquinas/ViewMaquina';
import ViewAllMaquinas from '../screens/Maquinas/ViewAllMaquinas';

const Stack = createStackNavigator();
const RootStack = () => 
    {
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName='HomeScreen'>
                    <Stack.Screen name='HomeScreen' component={HomeScreen} options={{title: 'Menu Principal'}}/>
                    <Stack.Screen name='HomeUsers' component={HomeUsers} options={{title: 'Usuarios'}}/>
                    <Stack.Screen name='RegisterUser' component={RegisterUser} options={{title: 'Registro de Usuarios'}}/>
                    <Stack.Screen name='UpdateUser' component={UpdateUser} options={{title: 'Actualizacion de Usuarios'}}/>
                    <Stack.Screen name='DeleteUser' component={DeleteUser} options={{title: 'Eliminacion de Usuarios'}}/>
                    <Stack.Screen name='ViewUsers' component={ViewUsers} options={{title: 'Ver Usuario'}}/>
                    <Stack.Screen name='ViewAllUsers' component={ViewAllUsers} options={{title: 'Ver todos los Usuarios'}}/>
                    <Stack.Screen name='HomeMaquinas' component={HomeMaquinas} options={{title: 'Maquinas'}}/>
                    <Stack.Screen name='RegisterMaquina' component={RegisterMaquina} options={{title: 'Registro de Maquinas'}}/>
                    <Stack.Screen name='UpdateMaquina' component={UpdateMaquina} options={{title: 'Actualizacion de Maquinas'}}/>
                    <Stack.Screen name='DeleteMaquina' component={DeleteMaquina} options={{title: 'Eliminacion de Maquinas'}}/>
                    <Stack.Screen name='ViewMaquina' component={ViewMaquina} options={{title: 'Ver Maquina'}}/>
                    <Stack.Screen name='ViewAllMaquinas' component={ViewAllMaquinas} options={{title: 'Ver todos los Maquinas'}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );   
    };

export default RootStack;