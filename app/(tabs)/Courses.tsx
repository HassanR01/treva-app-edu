import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ConstantStyles } from '@/Constants/constantStyles'

export default function Courses() {
  return (
    <ScrollView style={ConstantStyles.page}>
      <Text style={ConstantStyles.Title1}>المحاضرات</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})