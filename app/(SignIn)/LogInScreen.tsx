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
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDataContext } from '@/components/context/DataContext'
import Loading from '@/components/Loading'
import axios from 'axios'


const webClientId = '101717640430-vlbljmo054o43njior3meibpt5fac2gs.apps.googleusercontent.com'
const iosClientId = '101717640430-3bdf6frlflglrk9jml2af556hg0pf6u5.apps.googleusercontent.com'
const androidClientId = '101717640430-k4g793bmhnna6k0ipfjjkfr0e7f7sctj.apps.googleusercontent.com'

const validationSchema = yup.object().shape({
  mobile: yup.string().required("mobile Is Required").label('mobile'),
  password: yup.string().required("Password Is Required").min(4).label('Password')
})

export default function LogInScreen() {
  const config = {
    iosClientId,
    androidClientId,
    webClientId
  }
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(config)
  const handelToken = async () => {
    if (response?.type === 'success') {
      const { authentication } = response
      const token = authentication?.accessToken
      console.log(token)
    }
  }
  useEffect(() => {
    handelToken()
  }, [response])

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
      await AsyncStorage.setItem('user', JSON.stringify(user))
      router.replace('/(tabs)')
    } else {
      alert('User Not Found')
    }

    // try {
    //   const res = await axios.post('http://10.0.0.7:5000/api/v1/users/login', { mobile, password })
    //   if (res.data.status == 'ok') {
    //     alert('User Logged In Successfully')
    //     AsyncStorage.setItem('token', res.data.data)
    //     router.push('/(tabs)')
    //   } else {
    //     alert('User Not Found')
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
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
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: Fonts.lightText,
    textAlign: 'center',
    width: '100%'
  }
})