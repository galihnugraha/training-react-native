import { View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

import Text from '../Text'

export default function InputText({ 
  title = '', 
  rightIcon = <View></View>, 
  additionalLink = '',
  navigationParams = null,
  additionalLinkNavigation = '',
  error = '',
  ...props }) {
  return (
    <View>
      <Text color='#fff'>{title}</Text>
      <View style={{ 
          borderWidth:1,
          borderRadius:8,
          backgroundColor:'#273C75',
          borderColor:error ? '#EA8685' : '#273C75',
          padding:12,
          marginTop:8,
          flexDirection:'row',
          justifyContent:'space-between'
       }}>
        <TextInput
        style={{ 
          color:'#fff',
          fontSize:16,
        }}
        placeholderTextColor={'#fff'}
        {...props} 
        />
        {rightIcon && <View>{rightIcon}</View>}
      </View>
      <View style={{
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginTop:10,
      }}>
        <TouchableOpacity onPress={navigationParams != null ? () => navigationParams.navigate(additionalLinkNavigation) : null} >
          <Text fontSize={10} color={'#F6E58D'}>{additionalLink}</Text>
        </TouchableOpacity>
        <Text fontSize={10} color={'#EA8685'}>{error}</Text>
      </View>
    </View>
  )
}