import { Redirect } from "expo-router";
import React from "react";
import { useState } from "react";
import { StatusBar, Text, View } from "react-native";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
      <StatusBar barStyle={'default'} />
      <Redirect href={isLoggedIn ? '/(tabs)' : '/(SignIn)'} />
    </>
  );
}
