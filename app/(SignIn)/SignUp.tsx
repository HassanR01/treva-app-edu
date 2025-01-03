import { Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/Constants/Colors'
import LottieView from 'lottie-react-native'
import Animated, { BounceInUp, FadeInDown, FadeInUp, SlideInUp, ZoomInUp } from 'react-native-reanimated'
import { ConstantStyles } from '@/Constants/constantStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '@/components/Button'
import { Link, router } from 'expo-router'
import { Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Fonts } from '@/Constants/Fonts'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const validationSchema = yup.object().shape({
  name: yup.string().required("Name Is Required").trim().label('name'),
  username: yup.string().required("Username Is Required").trim().label('username'),
  mobile: yup.string().required("Mobile Is Required").trim().label('mobile'),
  password: yup.string().required("Password Is Required").min(4).label('Password'),
  confirmPassword: yup.string().required("Must be similar").min(4).label('Password')
})

export default function SignUp() {
  const animation = useRef<LottieView>(null)
  const role = 'student'
  const SignUpHandling = (values: any) => {
    const { name, username, mobile, password } = values
    if (password !== values.confirmPassword) {
      alert('Password Must Be Similar')
      return
    }
    try {
      axios.post(`http://172.20.10.2:5000/api/v1/users/register`, { name, username, mobile, password, role })
        .then(res => {
          if (res.data.status == 'ok') {
            alert('User Registered Successfully')
            router.push('/LogInScreen')
          } else {
            alert('User Already Exist')
          }
        })
        .catch(err => alert(err))
    } catch (error) {
      console.log(error)
    }
  }

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
              style={{ width: 250, height: 250 }}
            />
          </Animated.View>
          <View style={[styles.centerObjects, { marginVertical: 10 }]}>
            <Text style={ConstantStyles.Title1}>تسجيل دخول لاول مرة</Text>
          </View>
          <Formik
            initialValues={{ name: '', username: '', mobile: '', password: '', confirmPassword: '' }}
            onSubmit={(values) => SignUpHandling(values)}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <View style={[styles.centerObjects, { width: '100%', paddingHorizontal: 20, alignItems: 'flex-start', direction: 'rtl' }]}>
                  <View style={ConstantStyles.inputContainer}>
                    <Ionicons name="person-circle-outline" size={24} color="black" />
                    <TextInput
                      style={ConstantStyles.inputText}
                      keyboardType="default"
                      placeholder='اسمك بالعربي'
                      placeholderTextColor={"#ccc"}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      onChangeText={handleChange('name')}
                    />
                  </View>
                </View>
                {errors.name && touched.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
                <View style={[styles.centerObjects, { width: '100%', paddingHorizontal: 20, alignItems: 'flex-start', direction: 'rtl' }]}>
                  <View style={ConstantStyles.inputContainer}>
                    <MaterialIcons name="alternate-email" size={24} color="black" />
                    <TextInput
                      style={ConstantStyles.inputText}
                      keyboardType="default"
                      placeholder='اسم المستخدم بالانجليزية'
                      placeholderTextColor={"#ccc"}
                      onBlur={handleBlur('username')}
                      value={values.username}
                      onChangeText={handleChange('username')}
                    />
                  </View>
                </View>
                {errors.username && touched.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
                <View style={[styles.centerObjects, { width: '100%', paddingHorizontal: 20, alignItems: 'flex-start', direction: 'rtl' }]}>
                  <View style={ConstantStyles.inputContainer}>
                    <Octicons name="device-mobile" size={24} color="black" />
                    <TextInput
                      style={ConstantStyles.inputText}
                      keyboardType="phone-pad"
                      placeholder='رقم الهاتف'
                      placeholderTextColor={"#ccc"}
                      onBlur={handleBlur('mobile')}
                      value={values.mobile}
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
                      defaultValue=''
                      secureTextEntry={true}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      onChangeText={handleChange('password')}
                    />
                  </View>
                </View>
                {errors.password && touched.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                <View style={[styles.centerObjects, { width: '100%', paddingHorizontal: 20, alignItems: 'flex-start', direction: 'rtl' }]}>
                  <View style={ConstantStyles.inputContainer}>
                    <MaterialIcons name="password" size={24} color="black" />
                    <TextInput
                      style={ConstantStyles.inputText}
                      keyboardType='default'
                      placeholder='تأكيد كلمة المرور'
                      placeholderTextColor={"#ccc"}
                      defaultValue=''
                      secureTextEntry={true}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                    />
                  </View>
                </View>
                {errors.confirmPassword && touched.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
                <View style={styles.centerObjects}>
                  <Button title={'تسجيــل'} action={handleSubmit} />
                  <Text style={ConstantStyles.normalText}>بالفعل لديك حساب ؟ <Link style={{ color: Colors.mainColor, fontFamily: Fonts.boldText }} href={'/LogInScreen'}>تسجيل دخول</Link></Text>
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
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgColor
  },
  CenterScreen: {
    flexGrow: 2,
    position: 'relative',
    width: Dimensions.get('window').width,
    backgroundColor: Colors.bgColor,
    paddingBottom: 50,
  },
  headerSignIn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.mainColor,
    borderBottomStartRadius: 50,
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