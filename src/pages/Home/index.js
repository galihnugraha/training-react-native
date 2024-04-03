import { View, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import COMPONENTS from '../../components'
import { resetCount, setCount } from '../../store/actions/actionCount'
import { setLogout } from '../../store/actions/actionLogin'

export default function HomeScreen({ navigation, route}) {
  const dataLogin = useSelector(state => state.dataLogin)
  useEffect(() => {
    // Periksa apakah pengguna belum login
    if (!dataLogin.loginAuth) {
      navigation.navigate('login')
    }
  }, [dataLogin])

  // Pemeriksaan apakah dataLogin tersedia sebelum mengakses properti
  const uuid =  dataLogin.loginAuth?.uuid || ''

  const dataCount = useSelector(state => state.dataCount)
  const dispatch = useDispatch()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <COMPONENTS.Text>Home Screen</COMPONENTS.Text>
      
      <COMPONENTS.Text style={{ marginTop:20, marginBottom:20 }}>Data Login : {uuid}</COMPONENTS.Text>
      <Button title='Logout' onPress={() => {
        navigation.navigate('login')
        dispatch(setLogout())
      }} />
      
      <COMPONENTS.Text style={{ marginTop:30 }}>Data Count : {dataCount.increment}</COMPONENTS.Text>
      <View style={{ flexDirection:'row', justifyContent:'space-between', marginVertical:10 }}>
        <View>
          <Button title='Plus' onPress={() => dispatch(setCount(dataCount.increment + 1))} />
        </View>
        <View style={{ marginStart:10 }}>
          <Button title='Minus' onPress={() => dispatch(setCount(dataCount.increment - 1))} />
        </View>
      </View>
      <Button title='Clear Data Count' onPress={() => dispatch(resetCount())} />

    </View>
  )
}