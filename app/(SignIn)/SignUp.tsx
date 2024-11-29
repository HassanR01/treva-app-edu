import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/Constants/Colors'
import LottieView from 'lottie-react-native'
import Animated, { BounceInUp, FadeInDown, FadeInUp, SlideInUp, ZoomInUp } from 'react-native-reanimated'
import { ConstantStyles } from '@/Constants/constantStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '@/components/Button'
import { router } from 'expo-router'

export default function SignUp() {
  const animation = useRef<LottieView>(null)
  const [userInfo, setUserInfo] = useState({
    emailOrUsername: '',
    password: '',
  })

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{
      flex: 1,
      backgroundColor: Colors.itemBgColor,
    }}>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
      >

        <ScrollView style={styles.CenterScreen}>
          <Animated.View style={styles.headerSignIn}
            entering={FadeInUp.duration(1000).delay(100)}>
            <LottieView
              ref={animation}
              source={require('../../assets/animations/SignUp.json')}
              autoPlay
              loop
              style={{ width: 300, height: 300 }}
            />
          </Animated.View>
          <View style={[styles.centerObjects, { marginVertical: 20 }]}>
            <Text style={ConstantStyles.Title1}>تسجيل دخول لاول مرة</Text>
          </View>
          <View style={[styles.centerObjects, { width: '100%', paddingHorizontal: 20 }]}>
            <Text style={ConstantStyles.lableText}>بريدك الالكتروني او اسم الامستخدم</Text>
            <TextInput
              style={ConstantStyles.inputText}
              keyboardType="email-address"
              placeholder='email || username'
              placeholderTextColor={"#ccc"}
              value={userInfo.emailOrUsername}
              onChangeText={(e) => setUserInfo({ ...userInfo, emailOrUsername: e })}
              />
          </View>
          <View style={[styles.centerObjects, { width: '100%', paddingHorizontal: 20 }]}>
            <Text style={ConstantStyles.lableText}>كلمة المرور</Text>
            <TextInput
              style={ConstantStyles.inputText}
              keyboardType='default'
              placeholder='********'              
              placeholderTextColor={"#ccc"}
              defaultValue=''
              secureTextEntry={true}
              value={userInfo.password}
              onChangeText={(e) => setUserInfo({ ...userInfo, password: e })}
            />
          </View>
          <View style={styles.centerObjects}>
            <Button title={'تسجيــل'} action={() => router.replace('/(tabs)')} />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CenterScreen: {
    flexGrow: 1,
    position: 'relative',
    width: Dimensions.get('window').width,
    backgroundColor: Colors.bgColor
  },
  headerSignIn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.itemBgColor,
    borderEndEndRadius: 50,
    
    marginBottom: 10,
  },
  centerObjects: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  }
})