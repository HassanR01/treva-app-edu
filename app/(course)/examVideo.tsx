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

export default function ExamVideo() {
  const { lesson, user } = useLocalSearchParams();

  const lessonData = Array.isArray(lesson) ? JSON.parse(lesson[0]) : JSON.parse(lesson)
  const ExamVideo = Array.isArray(lesson) ? JSON.parse(lesson[0]).examVideo : JSON.parse(lesson).examVideo


  const player = useVideoPlayer(ExamVideo.link, (player) => {
    player.staysActiveInBackground = true
    player.play()
  })


  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'فيديو الامتحان',
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

      <ScrollView style={ConstantStyles.page}
        showsVerticalScrollIndicator={false}
      >
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
          <Text style={[ConstantStyles.Title1, { fontSize: 26 }]}>{ExamVideo.title}</Text>
          <Text style={[ConstantStyles.Title2, { fontSize: 22, marginBottom: 0 }]}>{new Date(lessonData.updatedAt).toLocaleDateString()}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10, direction: 'rtl' }}>
          <Text style={[ConstantStyles.Title2, { fontSize: 18 }]}>المادة: {lessonData.subject}</Text>
          <Text style={[ConstantStyles.Title2, { fontSize: 18 }]}>الصف: {lessonData.grade}</Text>
        </View>

        {/* Description */}
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', direction: 'rtl', marginVertical: 10 }}>
          <Text style={[ConstantStyles.Title1, { fontSize: 24 }]}>الوصف</Text>
          <Text style={[ConstantStyles.normalText, { fontSize: 20, color: Colors.textColor, textAlign: 'left' }]}>{ExamVideo?.description}</Text>
        </View>

        {/* attaches */}
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', direction: 'rtl', marginVertical: 10 }}>
          <Text style={[ConstantStyles.Title1, { fontSize: 24 }]}>المرفقات</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', direction: 'rtl' }}>
            {ExamVideo.attaches ? (
              <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10, padding: 10, borderWidth: 1, borderColor: Colors.mainColor, borderRadius: 5, width: '100%' }}>
                <FontAwesome5 name="file-pdf" size={30} color={Colors.mainColor} />
                <Text style={[ConstantStyles.Title2, { fontSize: 18, marginRight: 10 }]}>{ExamVideo.attaches.slice(0, 50)}</Text>
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