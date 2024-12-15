import { SplashScreen, Stack } from "expo-router";
import '../global.css'
import { useFonts } from 'expo-font'
import { useEffect } from "react";
import { Colors } from "@/Constants/Colors";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { I18nManager } from "react-native";
import DataProvider from "@/components/context/DataContext";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const insets = useSafeAreaInsets()

  const [loaded] = useFonts({
    'Beiruti-Black': require('../assets/fonts/Beiruti-Black.ttf'),
    'Beiruti-Bold': require('../assets/fonts/Beiruti-Bold.ttf'),
    'Beiruti-Medium': require('../assets/fonts/Beiruti-Medium.ttf'),
    'Beiruti-Regular': require('../assets/fonts/Beiruti-Regular.ttf'),
    'Beiruti-Light': require('../assets/fonts/Beiruti-Light.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }

  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <>
      <SafeAreaProvider>
        <DataProvider>

          <Stack screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="index" />

            <Stack.Screen name="(SignIn)" options={{
              title: 'Registration',
            }} />

            <Stack.Screen name="(tabs)" options={{
              title: 'Home',
            }} />

            <Stack.Screen name="(subPages)" options={{
              title: 'Home',
            }} />
          </Stack>
        </DataProvider>
      </SafeAreaProvider>
    </>
  )
}
