import { View, Button } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import COMPONENTS from '../../components'

export default function TaskScreen({ navigation, route}) {
  const dataCount = useSelector(state => state.dataCount)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <COMPONENTS.Text>Task Screen</COMPONENTS.Text>
      <COMPONENTS.Text style={{ marginTop:30 }}>Data Count : {dataCount.increment}</COMPONENTS.Text>
    </View>
  )
}