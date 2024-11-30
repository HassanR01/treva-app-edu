import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Colors } from '@/Constants/Colors';
import { Fonts } from '@/Constants/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={{
            flex: 1,
            backgroundColor: Colors.bgColor,
        }}>
            <Tabs screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    paddingBottom: 0,
                    marginVertical: 0,
                    gap: 10,
                    direction: 'rtl'
                },
                tabBarLabelStyle: {
                    marginTop: 5,
                    fontFamily: Fonts.boldText,
                    fontSize: 14,
                    textAlign: 'center'
                }
            }}>
                <Tabs.Screen name='index' options={{
                    title: 'الرئيسية',
                    tabBarActiveTintColor: Colors.mainColor,
                    tabBarInactiveBackgroundColor: Colors.bgColor,
                    tabBarActiveBackgroundColor: Colors.bgColor,
                    tabBarInactiveTintColor: Colors.textColor,
                    tabBarHideOnKeyboard: true,
                    tabBarAllowFontScaling: true,
                    tabBarIcon: ({ color }) => <AntDesign name="home" size={30} color={color} />
                }} />
                <Tabs.Screen name='Courses' options={{
                    title: 'المحاضرات',
                    tabBarActiveTintColor: Colors.mainColor,
                    tabBarInactiveBackgroundColor: Colors.bgColor,
                    tabBarActiveBackgroundColor: Colors.bgColor,
                    tabBarInactiveTintColor: Colors.textColor,
                    tabBarHideOnKeyboard: true,
                    tabBarAllowFontScaling: true,
                    tabBarIcon: ({ color }) => <Ionicons name="logo-electron" size={30} color={color} />
                }} />
                <Tabs.Screen name='Wallet' options={{
                    title: 'المحفظة',
                    tabBarActiveTintColor: Colors.mainColor,
                    tabBarInactiveBackgroundColor: Colors.bgColor,
                    tabBarActiveBackgroundColor: Colors.bgColor,
                    tabBarInactiveTintColor: Colors.textColor,
                    tabBarHideOnKeyboard: true,
                    tabBarAllowFontScaling: true,
                    tabBarIcon: ({ color }) => <Ionicons name="wallet-outline" size={30} color={color} />
                }} />
                <Tabs.Screen name='Profile' options={{
                    title: 'بياناتـــك',
                    tabBarActiveTintColor: Colors.mainColor,
                    tabBarInactiveBackgroundColor: Colors.bgColor,
                    tabBarActiveBackgroundColor: Colors.bgColor,
                    tabBarInactiveTintColor: Colors.textColor,
                    tabBarHideOnKeyboard: true,
                    tabBarAllowFontScaling: true,
                    tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={30} color={color} />
                }} />
            </Tabs>
        </SafeAreaView>
    )
}