import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ConstantStyles } from '@/Constants/constantStyles'
import { useDataContext, user } from '@/components/context/DataContext'
import { Image } from 'react-native'
import { router } from 'expo-router'
import { Fonts } from '@/Constants/Fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LessonComponent from '@/components/elements/LessonComponent'
import Loading from '@/components/Loading'
import ExamComponent from '@/components/elements/ExamComponent'

const subjects = [
  { image: require('../../assets/images/subjects/arabic.png'), name: 'اللغة العربية' },
  { image: require('../../assets/images/subjects/english.png'), name: 'اللغة الانجليزية' },
  { image: require('../../assets/images/subjects/french.png'), name: 'اللغة الفرنسية' },
  { image: require('../../assets/images/subjects/german.png'), name: 'اللغة الالمانية' },
  { image: require('../../assets/images/subjects/italy.png'), name: 'اللغة الايطالية' },
  { image: require('../../assets/images/subjects/spanish.png'), name: 'اللغة الاسبانية' },
  { image: require('../../assets/images/subjects/chinese.png'), name: 'اللغة الصينية' },
  { image: require('../../assets/images/subjects/calculating.png'), name: 'الرياضيات' },
  { image: require('../../assets/images/subjects/physics.png'), name: 'الفيزياء' },
  { image: require('../../assets/images/subjects/chemistry.png'), name: 'الكيمياء' },
  { image: require('../../assets/images/subjects/biology.png'), name: 'الاحياء' },
  { image: require('../../assets/images/subjects/geology.png'), name: 'الجيولوجيا' },
  { image: require('../../assets/images/subjects/history.png'), name: 'التاريخ' },
  { image: require('../../assets/images/subjects/geography.png'), name: 'الجغرافيا' },
  { image: require('../../assets/images/subjects/psychology.png'), name: 'الفلسفة' },
  { image: require('../../assets/images/subjects/philosophy.png'), name: 'علم النفس' },
]

export default function Courses() {
  const [user, setUser] = useState<user>()
  const { users, lessons } = useDataContext()

  useEffect(() => {
    const fetchUser = async () => {
      const userExist = await AsyncStorage.getItem('user')
      if (userExist) {
        setUser(JSON.parse(userExist))
      } else {
        router.push('/(SignIn)')
      }
    }
    fetchUser()
  }, [])

  const filteredLessons = lessons?.filter(lesson => lesson.grade === user?.grade).reverse()

  const Exams = filteredLessons?.map(lesson => lesson.exam)

  if (!users || !lessons || !user) {
    return <Loading />

  } else {

    return (
      <ScrollView style={ConstantStyles.page}>
        <Text style={ConstantStyles.Title1}>المحاضرات</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20, direction: 'rtl' }}>
          {subjects.map((subject, index) => {
            return (
              <TouchableOpacity key={index} style={styles.subject} onPress={() => {
                router.push({
                  pathname: '/(subPages)/Results',
                  params: {
                    data: subject.name
                  }
                })
              }}>
                <Image source={subject.image} style={styles.subjectImage} />
                <Text style={styles.subjectText}>{subject.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
        {/* last Lessons */}
        <Text style={[ConstantStyles.Title2, { marginTop: 20 }]}>اخر المحاضرات</Text>
        <View style={{display: 'flex', flexDirection: 'column', direction: 'rtl', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          {filteredLessons?.map((lesson, index) => {
            return (
              <LessonComponent key={index} lesson={lesson} user={user} />
            )
          }).slice(0, 9)}
        </View>

        {/* last Exams */}
        <Text style={[ConstantStyles.Title2, { marginTop: 20 }]}>اخر الامتحانات</Text>
        <View style={{display: 'flex', flexDirection: 'column', direction: 'rtl', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          {filteredLessons?.map((lesson, index) => (
            <View key={index} style={{display: 'flex', flexDirection: 'column', direction: 'rtl', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              {lesson.exam && <ExamComponent key={index} lesson={lesson} user={user} />}
            </View>
          )) }
        </View>
        
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  subject: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subjectImage: {
    width: 50,
    height: 50
  },
  subjectText: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: Fonts.mediumText
  }
})