import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { 
  MainScreen, 
  LoginScreen,
  RegisterScreen,
  AddTaskScreen,
  ForgotPasswordScreen
} from '../../pages'

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator 
      initialRouteName="main"
      screenOptions={{ headerShown:false }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="forgotpass" component={ForgotPasswordScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="main" component={MainScreen} />
      <Stack.Screen name="addTask" component={AddTaskScreen} />
    </Stack.Navigator>
  )
}