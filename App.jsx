import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Registration from './src/screens/Register';
import Welcome from './src/screens/Welcome';
import MainScreen from './src/screens/MainScreen';
import ProfileScreen from './src/screens/Profile';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

function AuthLayout(){
  return(
    <AuthStack.Navigator initialRouteName='Register'>
      <AuthStack.Screen name = 'Login' component={Login} options={{headerShown: false}}/>
      <AuthStack.Screen name = 'Register' component={Registration} options={{headerShown: false}}/>
    </AuthStack.Navigator>
  );
}

function MainLayout(){
  return(
    <MainStack.Navigator initialRouteName='MainScreen'>
      <MainStack.Screen name = 'MainScreen' component={MainScreen} options={{headerShown: false}}/>
      <MainStack.Screen name = 'ProfileScreen' component={ProfileScreen} options={{headerShown: false}}/>
    </MainStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main' >
        <Stack.Screen name = 'Auth' component={AuthLayout} options={{headerShown: false}}/>
        <Stack.Screen name = 'Main' component={MainLayout} options={{headerShown: false}}/>
      </Stack.Navigator>

      <StatusBar style='auto' />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
