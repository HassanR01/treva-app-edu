import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
import { Formik } from 'formik'
import * as yup from 'yup'
import { Fonts } from '@/Constants/Fonts'
import * as LocalAuthentication from 'expo-local-authentication'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDataContext } from '@/components/context/DataContext'
import Loading from '@/components/Loading'

const validationSchema = yup.object().shape({
  mobile: yup.string().required("mobile Is Required").label('mobile'),
  password: yup.string().required("Password Is Required").min(4).label('Password')
})

export default function LogInScreen() {
  const { users } = useDataContext()

  const animation = useRef<LottieView>(null)
  const [userInfo, setUserInfo] = useState({
    mobile: '',
    password: ''
  })

  const SignInHandling = async (values: any) => {
    const { mobile, password } = values

    const user = users?.find(user => user.mobile === mobile && user.password === password)
    if (user) {

      const result = await LocalAuthentication.authenticateAsync()
      if (result.success) {
        alert('مرحباً بك')
        if (user.role === 'student') {
          await AsyncStorage.setItem('user', JSON.stringify(user))
          router.replace('/(tabs)')
        } else {
          await AsyncStorage.setItem('user', JSON.stringify(user))
          router.replace('/(teacher)')
        }
      } else {
        alert('لا يمكن تسجيل الدخول')
      }
    } else {
      alert('User Not Found')
    }
  }

  if (!users) {
    return <Loading />
  } else {
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
            <Formik
              initialValues={{ mobile: '', password: '' }}
              onSubmit={(values) => SignInHandling(values)}
              validationSchema={validationSchema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <View style={[styles.centerObjects, { width: '100%', paddingHorizontal: 20, alignItems: 'flex-start', direction: 'rtl' }]}>
                    <View style={ConstantStyles.inputContainer}>
                      <MaterialIcons name="alternate-email" size={24} color="black" />
                      <TextInput
                        style={ConstantStyles.inputText}
                        keyboardType='phone-pad'
                        placeholder='رقم الهاتف المُسجل'
                        placeholderTextColor={"#ccc"}
                        value={values.mobile}
                        onBlur={handleBlur('mobile')}
                        onChangeText={handleChange('mobile')}
                      />
                    </View>
                  </View>
                  {errors.mobile && touched.mobile ? <Text style={styles.errorText}>{errors.mobile}</Text> : null}
                  <View style={[styles.centerObjects, { width: '100%', paddingHorizontal: 20, alignItems: 'flex-start', direction: 'rtl' }]}>
                    <View style={ConstantStyles.inputContainer}>
                      <MaterialIcons name="password" size={24} color="black" />
                      <TextInput
                        style={ConstantStyles.inputText}
                        keyboardType='default'
                        placeholder='كلمة المرور'
                        placeholderTextColor={"#ccc"}
                        secureTextEntry={true}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        onChangeText={handleChange('password')}
                      />
                    </View>
                  </View>
                  {errors.password && touched.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                  <View style={styles.centerObjects}>
                    <Button title={'تسجيــل الدخول'} action={handleSubmit} />
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
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
    backgroundColor: Colors.calmWhite
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
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: Fonts.lightText,
    textAlign: 'center',
    width: '100%'
  }
})