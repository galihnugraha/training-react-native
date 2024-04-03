import { View, Button } from 'react-native'
import React from 'react'

import COMPONENTS from '../../components'

export default function ForgotPasswordScreen({ navigation, route}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <COMPONENTS.Text>Forgot Password Screen</COMPONENTS.Text>
      <Button style={{ marginTop:15 }} title='Go Back' onPress={() => navigation.goBack()}></Button>
    </View>
  )
}