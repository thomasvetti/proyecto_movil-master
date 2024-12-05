import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// Importar las pantallas
import PantallaInicio from './screens/PantallaInicio';
import InicioSesion from './screens/InicioSesion';
import Registro from './screens/Registro';
import FeedPantalla from './screens/FeedPantalla';
import ConfiguracionPantalla from './screens/ConfiguracionPantalla';
import BuscarPantalla from './screens/BuscarPantalla';
import PerfilPantalla from './screens/PerfilPantalla';
import DetallesPantalla from './screens/DetallesPantalla';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#356E4D', // Color de fondo del encabezado para todas las pantallas
      },
      headerTitleStyle: {
        color: '#fff', // Color del título para todas las pantallas
      },
      tabBarStyle: { backgroundColor: '#356E4D' }, // Color de fondo del tab
      tabBarActiveTintColor: '#ffffff', // Color del ícono activo
      tabBarInactiveTintColor: '#8e8e93', // Color del ícono inactivo
    }}
  >
      <Tab.Screen
        name="Feed"
        component={FeedPantalla}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />, // Ícono para Feed
          headerShown: false, // 
        }}
      />
      <Tab.Screen
        name="Publicar"
        component={BuscarPantalla}
        options={{
          tabBarIcon: ({ color }) => <Icon name="upload" size={24} color={color} />, // Ícono para Publicar
          headerShown: false, // 
        }}
      />
      <Tab.Screen
        name="Configuración"
        component={ConfiguracionPantalla}
        options={{
          tabBarIcon: ({ color }) => <Icon name="cog" size={24} color={color} />, // Ícono para Configuración
          headerShown: false, // 
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilPantalla}
        options={{
          tabBarIcon: ({ color }) => <Icon name="user" size={24} color={color} />, // Ícono para Perfil
          headerShown: false, // 
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          
          component={PantallaInicio} 
          options={{ headerShown: false }} // Aquí ocultamos la barra de encabezado
        />
        <Stack.Screen 
          name="InicioSesion"
          component={InicioSesion} 
          options={{
            headerTintColor: 'white',
            headerTitle: '', 
            headerTransparent: true, }} 
        />
        <Stack.Screen 
          name="Registro" 
          component={Registro} 
          options={{
            headerTintColor: 'white',
            headerTitle: '', 
            headerTransparent: true, }} 
        />
        <Stack.Screen 
          name="Tabs" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="DetallesPantalla" 
          component={DetallesPantalla} 
          options={{
            headerTintColor: 'white',
            headerTitle: '', 
            headerTransparent: true, }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

