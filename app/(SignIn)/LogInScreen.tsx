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
import { Formik } from 'formik'
import * as yup from 'yup'
import { Fonts } from '@/Constants/Fonts'

const validationSchema = yup.object().shape({
  emailOrUsername: yup.string().required("Username Is Required").label('username'),
  password: yup.string().required("Password Is Required").min(4).label('Password')
})

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
          <Formik
            initialValues={{ emailOrUsername: '', password: '' }}
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <View style={[styles.centerObjects, { width: '100%', paddingHorizontal: 20, alignItems: 'flex-start', direction: 'rtl' }]}>
                  <View style={ConstantStyles.inputContainer}>
                    <MaterialIcons name="alternate-email" size={24} color="black" />
                    <TextInput
                      style={ConstantStyles.inputText}
                      keyboardType="email-address"
                      placeholder='اسم المستخدم بالانجليزية'
                      placeholderTextColor={"#ccc"}
                      value={values.emailOrUsername}
                      onBlur={handleBlur('emailOrUsername')}
                      onChangeText={handleChange('emailOrUsername')}
                    />
                  </View>
                </View>
                {errors.emailOrUsername && touched.emailOrUsername ? <Text style={styles.errorText}>{errors.emailOrUsername}</Text> : null}
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
                      onBlur={handleBlur('password')}
                      value={values.password}
                      onChangeText={handleChange('password')}
                    />
                  </View>
                </View>
                {errors.password && touched.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                <View style={[styles.centerObjects, { flexDirection: 'row', justifyContent: 'flex-start', direction: 'rtl', paddingHorizontal: 20 }]}>
                  <Text style={[ConstantStyles.Title1, { fontSize: 28 }]}>تسجيــل بإستخدام جوجل: </Text>
                  <TouchableOpacity>
                    <Image style={{ width: 50, height: 50 }} source={require('../../assets/images/Google.gif')} width={50} height={50} />
                  </TouchableOpacity>
                </View>
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