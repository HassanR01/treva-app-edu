import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/Constants/Colors'
import { ConstantStyles } from '@/Constants/constantStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Animated, { FadeInUp } from 'react-native-reanimated'
import LottieView from 'lottie-react-native'
import { TouchableOpacity } from 'react-native'
import Button from '@/components/Button'
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { TextInput } from 'react-native'

export default function LogInScreen() {
  const animation = useRef<LottieView>(null)

  const [userInfo, setUserInfo] = useState({
    emailOrUsername: '',
    password: ''
  })
  
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{
      flex: 1,
      backgroundColor: Colors.mainColor
    }}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
      >
        <ScrollView style={styles.CenterScreen}>
          <Animated.View style={styles.headerSignIn}
            entering={FadeInUp.duration(1000).delay(100)}>
            <LottieView
              ref={animation}
              source={require('../../assets/animations/LogIn.json')}
              autoPlay
              loop
              style={{ width: 250, height: 250 }}
            />
          </Animated.View>
          <View style={[styles.centerObjects, { marginVertical: 10 }]}>
            <Text style={ConstantStyles.Title1}>حمدلله علي السلامة 😁</Text>
          </View>
          <View style={[styles.centerObjects, { width: '100%', paddingHorizontal: 20, alignItems: 'flex-start', direction: 'rtl' }]}>
            <View style={ConstantStyles.inputContainer}>
              <MaterialIcons name="alternate-email" size={24} color="black" />
              <TextInput
                style={ConstantStyles.inputText}
                keyboardType="email-address"
                placeholder='اسم المستخدم بالانجليزية'
                placeholderTextColor={"#ccc"}
                value={userInfo.emailOrUsername}
                onChangeText={(e) => setUserInfo({ ...userInfo, emailOrUsername: e })}
              />
            </View>
          </View>
          <View style={[styles.centerObjects, { width: '100%', paddingHorizontal: 20, alignItems: 'flex-start', direction: 'rtl' }]}>
            <View style={ConstantStyles.inputContainer}>
              <MaterialIcons name="password" size={24} color="black" />
              <TextInput
                style={ConstantStyles.inputText}
                keyboardType='default'
                placeholder='كلمة المرور'
                placeholderTextColor={"#ccc"}
                defaultValue=''
                secureTextEntry={true}
                value={userInfo.password}
                onChangeText={(e) => setUserInfo({ ...userInfo, password: e })}
              />
            </View>
          </View>
          <View style={[styles.centerObjects, { flexDirection: 'row', justifyContent: 'flex-start', direction: 'rtl', paddingHorizontal: 20 }]}>
            <Text style={[ConstantStyles.Title1, { fontSize: 28 }]}>تسجيــل بإستخدام جوجل: </Text>
            <TouchableOpacity>
              <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/Google.gif')} width={50} height={50} />
            </TouchableOpacity>
          </View>
          <View style={styles.centerObjects}>
            <Button title={'تسجيــل الدخول'} action={() => router.replace('/(tabs)')} />
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
    backgroundColor: Colors.mainColor,
    borderEndEndRadius: 50,
    marginBottom: 10,
  },
  centerObjects: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})