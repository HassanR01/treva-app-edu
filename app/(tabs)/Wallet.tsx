import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ConstantStyles } from '@/Constants/constantStyles'

export default function Wallet() {
  return (
    <ScrollView style={ConstantStyles.page}>
      <Text style={ConstantStyles.Title1}>المحفظة</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})