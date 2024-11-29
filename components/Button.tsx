import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Fonts } from '@/Constants/Fonts';
import { ConstantStyles } from '@/Constants/constantStyles';

interface ButtonComp  {
    title: String;
    action: () => void;
}

const Button: React.FC<ButtonComp> = ({title, action}) => {
  return (
    <Pressable onPress={action}>
          <Text style={ConstantStyles.btn}>{title}</Text>
    </Pressable>
  )
}

export default Button