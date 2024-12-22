import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { lesson, user } from '@/components/context/DataContext'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Colors } from '@/Constants/Colors'
import { Feather, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { ConstantStyles } from '@/Constants/constantStyles'
import { useVideoPlayer, VideoView } from 'expo-video'

interface props {
  lesson: lesson
  user: user
}

export default function HWReview() {
  const { lesson, user } = useLocalSearchParams();

  const lessonData = Array.isArray(lesson) ? JSON.parse(lesson[0]) : JSON.parse(lesson)
  const HomeWrokVideo = Array.isArray(lesson) ? JSON.parse(lesson[0]).homeWorkVideo : JSON.parse(lesson).homeWorkVideo




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


  const player = useVideoPlayer(HomeWrokVideo.link, (player) => {
    player.staysActiveInBackground = true
    player.play()
  })


  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'فيديو الواجب',
          headerStyle: {
            backgroundColor: Colors.mainColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginRight: 20 }}
            >
              <FontAwesome name="chevron-left" size={24} color="white" />
            </TouchableOpacity>
          )
        }}

      />

      <ScrollView style={ConstantStyles.page}>
        <View style={styles.videoContainer}>
          <VideoView player={player} style={{
            width: '100%',
            height: '100%',
          }}
            allowsFullscreen
            allowsPictureInPicture
            startsPictureInPictureAutomatically
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10, direction: 'rtl' }}>
          <Text style={[ConstantStyles.Title1, { fontSize: 26 }]}>{HomeWrokVideo.title}</Text>
          <Text style={[ConstantStyles.Title2, { fontSize: 22, marginBottom: 0 }]}>{new Date(lessonData.updatedAt).toLocaleDateString()}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10, direction: 'rtl' }}>
          <Text style={[ConstantStyles.Title2, { fontSize: 18 }]}>المادة: {lessonData.subject}</Text>
          <Text style={[ConstantStyles.Title2, { fontSize: 18 }]}>الصف: {lessonData.grade}</Text>
        </View>

        {/* Description */}
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', direction: 'rtl', marginVertical: 10 }}>
          <Text style={[ConstantStyles.Title1, { fontSize: 24 }]}>الوصف</Text>
          <Text style={[ConstantStyles.normalText, { fontSize: 20, color: Colors.textColor, textAlign: 'left' }]}>{HomeWrokVideo?.description}</Text>
        </View>

        {/* attaches */}
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', direction: 'rtl', marginVertical: 10 }}>
          <Text style={[ConstantStyles.Title1, { fontSize: 24 }]}>المرفقات</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', direction: 'rtl' }}>
            {HomeWrokVideo.attaches ? (
              <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10, padding: 10, borderWidth: 1, borderColor: Colors.mainColor, borderRadius: 5, width: '100%' }}>
                <FontAwesome5 name="file-pdf" size={30} color={Colors.mainColor} />
                <Text style={[ConstantStyles.Title2, { fontSize: 18, marginRight: 10 }]}>{HomeWrokVideo.attaches.slice(0, 50)}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={[ConstantStyles.normalText, { fontSize: 20, color: Colors.textColor, textAlign: 'left' }]}>لا يوجد مرفقات</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: 210,
    backgroundColor: Colors.calmWhite,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.mainColor,
  },
})