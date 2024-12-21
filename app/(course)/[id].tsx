import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'


export default function Course(){
  const { _id, lesson, user } = useLocalSearchParams()
  
  const lessonData = Array.isArray(lesson) ? JSON.parse(lesson[0]) : JSON.parse(lesson)
  const userData = Array.isArray(user) ? JSON.parse(user[0]) : JSON.parse(user)

  // update user Data with new video in database
  
  
  

  return (
    <View>
      <Text>Course</Text>
    </View>
  )
}

const styles = StyleSheet.create({})