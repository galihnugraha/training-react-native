import { View, Button } from 'react-native'
import React from 'react'

import COMPONENTS from '../../components'

export default function AddTaskScreen({ navigation, route}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <COMPONENTS.Text>Add Task Screen</COMPONENTS.Text>
      {/* <Button title='Go Back' onPress={() => navigation.goBack()} /> */}
      <Button title='Go Back' onPress={() => navigation.navigate('main', {screen: route.params.page})} />
    </View>
  )
}