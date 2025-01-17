import { Alert, Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { lesson, user } from '@/components/context/DataContext'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Colors } from '@/Constants/Colors'
import { Feather, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { ConstantStyles } from '@/Constants/constantStyles'
import { useVideoPlayer, VideoView } from 'expo-video'
import YoutubeIframe, { YoutubeIframeRef } from 'react-native-youtube-iframe'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'


interface props {
  lesson: lesson
  user: user
}

export default function explainVideo() {
  const { lesson, user } = useLocalSearchParams();
  const player = useRef<YoutubeIframeRef>(null)
  const [playing, setPlaying] = useState(false)
  const [openFullScreen, setOpenFullScreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [showcontrolers, setShowControlers] = useState(true)
  const [hasLesson, setHasLesson] = useState(false)
  const [openBuyLesson, setOpenBuyLesson] = useState(false)
  const userData = Array.isArray(user) ? JSON.parse(user[0]) : JSON.parse(user)

  const lessonData = Array.isArray(lesson) ? JSON.parse(lesson[0]) : JSON.parse(lesson)
  const ExplainVideo = Array.isArray(lesson) ? JSON.parse(lesson[0]).explainVideo : JSON.parse(lesson).explainVideo

  const onshowControlers = () => {
    if (!showcontrolers) {
      setShowControlers(true)
    } else {
      setShowControlers(false)
    }
    setTimeout(() => {
      setShowControlers(false)
    }, 5000);
  }

  useEffect(() => {
    // check if user has this lesson and if the available time for this lesson is not expired
    if (userData.lessons.find((les: any) => les._id === lessonData?._id) || userData.type === 'TrevaIn') {
      const lessonwithDate = userData.lessons.find((les: any) => les._id === lessonData?._id)
      if (lessonwithDate.date + +lessonData?.availableFor * 24 * 60 * 60 * 1000 < Date.now()) {
        Alert.alert('انتهت صلاحية المحاضرة', 'لقد انتهت صلاحية المحاضرة يرجى شراء المحاضرة للوصول اليها')
        setHasLesson(false)
        setOpenBuyLesson(false)
      } else {
        setHasLesson(true)
      }
    } else {
      setHasLesson(false)
    }
  }, [])


  const BuyLesson = async () => {
    const lesson = {
      _id: lessonData?._id,
      date: Date.now()
    }
    if (lessonData?.price !== undefined) {
      if (+userData.points < +lessonData.price) {
        alert('لا يوجد لديك رصيد كافي لشراء المحاضرة')
        router.push('/(tabs)/Wallet')
      } else {
        if (userData.lessons.find((les: any) => les._id === lessonData?._id)) {
          const updatedLesson = {
            ...lesson,
            date: Date.now()
          };
          const updatedUser = {
            ...userData,
            points: +userData.points - +lessonData.price,
            lessons: userData.lessons.map((les: any) =>
              les._id === lessonData?._id ? updatedLesson : les
            )
          };
          await axios.post(`${process.env.API_URL}/users/updateUser`, updatedUser).then(res => {
            AsyncStorage.setItem('user', JSON.stringify(updatedUser));
            alert('تم شراء المحاضرة بنجاح');
            setHasLesson(true);
            router.push({
              pathname: '/(tabs)/Wallet'
            });
          }).catch(err => {
            console.log(err);
          });

        } else {

          const updatedUser = { ...userData, points: +userData.points - +lessonData.price, lessons: [...userData.lessons, lesson] }
          await axios.post(`${process.env.API_URL}/users/updateUser`, updatedUser).then(res => {
            AsyncStorage.setItem('user', JSON.stringify(updatedUser))
            alert('تم شراء المحاضرة بنجاح')
            setHasLesson(true)
            router.push({
              pathname: '/(tabs)/Wallet'
            })
          }).catch(err => {
            console.log(err)
          })
        }
      }
    }
  }


  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'فيديو الشرح',
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
          <YoutubeIframe
            videoId={ExplainVideo.link}
            height={240}
            play={playing}
            width={Dimensions.get('window').width + 40}
            initialPlayerParams={{
              controls: false,
              showClosedCaptions: false,
              modestbranding: false,
              rel: false,
            }}
            webViewProps={{
              allowsFullscreenVideo: true,
            }}
            contentScale={0.000000000001}
            ref={player}
          />

          <View
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              padding: 5,
              zIndex: 1,
              backgroundColor: Colors.mainColor,
              width: '100%',
              height: 40,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              direction: 'rtl',
            }}
          >

            {/* FullScreen */}
            <TouchableOpacity
              onPress={async () => {
                setOpenFullScreen(!openFullScreen)
                const time = await player.current?.getCurrentTime() || 0;
                setCurrentTime(time);
                setPlaying(false)
              }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.mainColor,
                borderRadius: 5,
                padding: 5,
              }}
            >
              <MaterialIcons name="fullscreen" size={20} color={Colors.calmWhite} />
            </TouchableOpacity>


            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', direction: 'ltr' }}>
              {/* before 10 sec */}
              <TouchableOpacity
                onPress={async () => player.current?.seekTo(await player.current?.getCurrentTime() - 10, true)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.mainColor,
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                <MaterialIcons name="replay-10" size={20} color={Colors.bgColor} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setPlaying(!playing)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.mainColor,
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                {playing ? (
                  <MaterialIcons name="pause" size={20} color={Colors.calmWhite} />
                ) : (
                  <Feather name="play" size={20} color={Colors.calmWhite} />
                )}
              </TouchableOpacity>

              {/* after 10 sec */}
              <TouchableOpacity
                onPress={async () => player.current?.seekTo(await player.current?.getCurrentTime() + 10, true)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.mainColor,
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                <MaterialIcons name="forward-10" size={20} color={Colors.bgColor} />
              </TouchableOpacity>

            </View>

            <TouchableOpacity
              onPress={() => player.current?.seekTo(0, true)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.mainColor,
                borderRadius: 5,
                padding: 5,
              }}
            >
              <MaterialIcons name="replay" size={20} color={Colors.calmWhite} />
            </TouchableOpacity>


          </View>
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              padding: 5,
              zIndex: 1,
              backgroundColor: Colors.mainColor,
              width: '100%',
              height: 20,
            }}
          />

          {!hasLesson && (
            <TouchableOpacity
              onPress={() => setOpenBuyLesson(false)}
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                zIndex: 1,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(30,5,80,0.5)',
                borderRadius: 5,
                padding: 5,
              }}
            >
              <MaterialIcons name='lock-outline' size={50} color={Colors.calmWhite} />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10, direction: 'rtl' }}>
          <Text style={[ConstantStyles.Title1, { fontSize: 26 }]}>{ExplainVideo.title}</Text>
          <Text style={[ConstantStyles.Title2, { fontSize: 22, marginBottom: 0 }]}>{new Date(lessonData.updatedAt).toLocaleDateString()}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10, direction: 'rtl' }}>
          <Text style={[ConstantStyles.Title2, { fontSize: 18 }]}>المادة: {lessonData.subject}</Text>
          <Text style={[ConstantStyles.Title2, { fontSize: 18 }]}>الصف: {lessonData.grade}</Text>
        </View>

        {/* Description */}
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', direction: 'rtl', marginVertical: 10 }}>
          <Text style={[ConstantStyles.Title1, { fontSize: 24 }]}>الوصف</Text>
          <Text style={[ConstantStyles.normalText, { fontSize: 20, color: Colors.textColor, textAlign: 'left' }]}>{ExplainVideo?.description}</Text>
        </View>

        {/* attaches */}
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', direction: 'rtl', marginVertical: 10 }}>
          <Text style={[ConstantStyles.Title1, { fontSize: 24 }]}>المرفقات</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', direction: 'rtl' }}>
            {ExplainVideo.attaches ? (
              <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10, padding: 10, borderWidth: 1, borderColor: Colors.mainColor, borderRadius: 5, width: '100%' }}>
                <FontAwesome5 name="file-pdf" size={30} color={Colors.mainColor} />
                <Text style={[ConstantStyles.Title2, { fontSize: 18, marginRight: 10 }]}>{ExplainVideo.attaches.slice(0, 50)}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={[ConstantStyles.normalText, { fontSize: 20, color: Colors.textColor, textAlign: 'left' }]}>لا يوجد مرفقات</Text>
            )}
          </View>
        </View>
      </ScrollView>


      {/* Full Screen Modal horizontally */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={openFullScreen}
        onRequestClose={() => setOpenFullScreen(!openFullScreen)}
      >
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <TouchableOpacity
            onPress={() => setOpenFullScreen(!openFullScreen)}
            style={{ position: 'absolute', bottom: 50, right: 20, zIndex: 1 }}
          >
            <FontAwesome name="close" size={50} color="white" />
          </TouchableOpacity>
          <View style={{ transform: [{ rotate: '90deg' }] }}>

            <YoutubeIframe
              videoId={ExplainVideo.link}
              height={Dimensions.get('window').width + 40}
              play={playing}
              width={Dimensions.get('window').height}
              initialPlayerParams={{
                controls: false,
                showClosedCaptions: false,
                modestbranding: false,
                rel: false,
              }}
              webViewProps={{
                allowsFullscreenVideo: true,
              }}
              contentScale={0.000000000001}
              ref={player}
            />
          </View>


          <TouchableOpacity
            onPress={() => onshowControlers()}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              padding: 5,
              zIndex: 1,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              direction: 'rtl',
              transform: [{ rotate: '90deg' }],
            }}
          >
            {showcontrolers && (

              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', direction: 'ltr' }}>
                {/* before 10 sec */}
                <TouchableOpacity
                  onPress={async () => player.current?.seekTo(await player.current?.getCurrentTime() - 10, true)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.mainColor,
                    borderRadius: 5,
                    padding: 5,
                    margin: 10,
                  }}
                >
                  <MaterialIcons name="replay-10" size={50} color={Colors.bgColor} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setPlaying(!playing)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.mainColor,
                    borderRadius: 5,
                    padding: 5,
                    margin: 10,
                  }}
                >
                  {playing ? (
                    <MaterialIcons name="pause" size={50} color={Colors.calmWhite} />
                  ) : (
                    <Feather name="play" size={50} color={Colors.calmWhite} />
                  )}
                </TouchableOpacity>

                {/* after 10 sec */}
                <TouchableOpacity
                  onPress={async () => player.current?.seekTo(await player.current?.getCurrentTime() + 10, true)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.mainColor,
                    borderRadius: 5,
                    padding: 5,
                    margin: 10,
                  }}
                >
                  <MaterialIcons name="forward-10" size={50} color={Colors.bgColor} />
                </TouchableOpacity>

              </View>
            )}
          </TouchableOpacity>

        </View>
      </Modal>


      {!hasLesson && (

        <Modal
          animationType="slide"
          transparent={true}
          visible={!openBuyLesson}
          onRequestClose={() => {
            setOpenBuyLesson(true);
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', pointerEvents: hasLesson ? 'none' : 'auto' }}>
            <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => {
              setOpenBuyLesson(true)
            }} />
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: 270, backgroundColor: Colors.calmWhite, borderRadius: 10, padding: 20 }}>
              <Text style={[ConstantStyles.Title1, { fontSize: 26 }]}>يجب شراء المحاضرة اولاً</Text>
              <Text style={[ConstantStyles.normalText, { fontSize: 22, color: Colors.textColor, textAlign: 'center' }]}>قم بشراء المحاضرة لتتمكن من مشاهدة الفيديوهات والامتحان</Text>
              <Text style={[ConstantStyles.Title1, { fontSize: 24, marginTop: 10 }]}>السعر: {lessonData?.price} جنية مصري</Text>
              <TouchableOpacity style={{ backgroundColor: Colors.mainColor, padding: 10, borderRadius: 5, marginTop: 10, width: '100%' }} onPress={() => {
                console.log(lessonData?.price)
                BuyLesson()
              }}>
                <Text style={[ConstantStyles.Title1, { fontSize: 20, color: Colors.bgColor, textAlign: 'center' }]}>شراء المحاضرة</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}


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