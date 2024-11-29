import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
      <Stack>
          <Stack.Screen name='index' />
          <Stack.Screen name='Contact' />
          <Stack.Screen name='Payment' />
          <Stack.Screen name='Results' />
      </Stack>
  )
}