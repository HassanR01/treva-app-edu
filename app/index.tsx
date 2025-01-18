import { user } from "@/components/context/DataContext";
import Loading from "@/components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import React, { useEffect } from "react";
import { useState } from "react";
import { StatusBar, Text, View } from "react-native";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<user>()

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('user')
      if (token) {
        setIsLoggedIn(true)
        setUser(JSON.parse(token))
        if (JSON.parse(token).role === 'teacher') {
          router.push('/(teacher)')
        } else if (JSON.parse(token).role === 'student') {
          router.push('/(tabs)')
        } else {
          router.push('/(SignIn)/Welcome')
        }
      } else {
        router.push('/(SignIn)/Welcome')
      }
    }
    checkLogin()
  }, [])

  if (!user) {
    return <Loading />
  } else {
    return (
      <>
        <StatusBar barStyle={'default'} />
        <Redirect href={user.role === 'teacher' ? "/(teacher)" : user.role === 'student' ? "/(tabs)" : '/(SignIn)/Welcome'} />

      </>
    );
  }
}
