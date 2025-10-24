import { View, Text } from 'react-native'
import React from 'react'

function Title ({text, color , fontFamily='LeckerliOne'}){
  return (
    <Text style={{ fontSize: 42, color: color, fontFamily: fontFamily , alignItems:'center', justifyContent:'center', textAlign:'center' }}>
        {text}
      </Text>
  )
}

export default Title