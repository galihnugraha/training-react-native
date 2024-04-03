import { TouchableOpacity } from 'react-native'
import React from 'react'

import Text from '../Text'

export default function Button({
  title = 'Button',
  disabled = false,
  styles, 
  ...props}) {
  return (
    <TouchableOpacity
      disabled={disabled} 
      style={[styles, { 
        backgroundColor:'#18DCFF',
        padding:12,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        opacity: disabled ? 0.5 : 1
      }]}
      {...props}
     >
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}