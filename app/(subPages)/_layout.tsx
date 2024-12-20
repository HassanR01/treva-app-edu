import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

export default function Layout() {
  return (
    <Stack screenOptions={{
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      )
    }}>
      <Stack.Screen name='index' 
        options={{
          title: "الرئيسية"
        }}
      />
      <Stack.Screen name='Contact' 
        options={{
          title: "التواصل"
        }}
      />
      <Stack.Screen name='Payment' 
        options={{
          title: "الدفع"
        }}
      />
      <Stack.Screen name='Results' 
        options={{
          title: "نتائج"
        }}
      />
      <Stack.Screen name='EditUser' 
        options={{
          title: "تعديل المستخدم"
        }}
      />
    </Stack>
  )
}