import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import { useState } from "react";
import { StatusBar, Text, View } from "react-native";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('user')
      if (token) {
        setIsLoggedIn(true)
      }
    }
    checkLogin()
  }, [])
  return (
    <>
      <StatusBar barStyle={'default'} />
      <Redirect href={isLoggedIn ? '/(tabs)' : '/(SignIn)'} />
    </>
  );
}
