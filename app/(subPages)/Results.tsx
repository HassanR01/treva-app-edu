import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { ConstantStyles } from '@/Constants/constantStyles';
import { useDataContext, user } from '@/components/context/DataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '@/components/Loading';

export default function Results() {
  const [user, setUser] = useState<user>()
  const { data } = useLocalSearchParams()
  const { lessons, users } = useDataContext()

  useEffect(() => {
    const fetchUser = async () => {
      const userExist = await AsyncStorage.getItem('user')
      if (userExist) {
        setUser(JSON.parse(userExist))
        const user = users?.find(user => user._id === JSON.parse(userExist)._id)
        if (user) {
          await AsyncStorage.setItem('user', JSON.stringify(user))
          setUser(user)
        }
      } else {
        router.push('/(SignIn)')
      }

    }
    fetchUser()
  }, [])






  if (!users || !lessons || !user) {
    return <Loading />
  } else {

    const lessonsMatchedWithUserData = lessons.filter(lessons => {
      const matchedGrade = lessons.grade === user.grade
      const matchedSubject = !data || lessons.subject === data
      const matchedTecher = !data || lessons.teacher === data
      return (matchedTecher || matchedSubject) && matchedGrade
    })

    return (
      <ScrollView style={ConstantStyles.page}>
        <View>
          <Text style={[ConstantStyles.Title1, { fontSize: 26 }]}>محاضرات: {data}</Text>
          {/* length */}
          <Text style={[ConstantStyles.Title2, { fontSize: 22 }]}>عدد المحاضرات: {lessonsMatchedWithUserData.length}</Text>
        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({})