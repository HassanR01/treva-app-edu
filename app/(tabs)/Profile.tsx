import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ConstantStyles } from '@/Constants/constantStyles'
import Animated, { ZoomInEasyUp, ZoomOutEasyDown } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'
import { Colors } from '@/Constants/Colors'

export default function Profile() {
    const [user, setUser] = useState<any>()

    useEffect(() => {
        const fetchUser = async () => {
            const userExist = await AsyncStorage.getItem('user')
            if (userExist) {
                setUser(JSON.parse(userExist))
            } else {
                router.push('/(SignIn)')
            }
        }
        fetchUser()
    }, [])

    const name = user ? user.name : 'مجهول'
    const grade = user ? user.grade : 'غير محدد'

    return (
        <ScrollView style={ConstantStyles.page}>
            <TouchableOpacity onPress={() => router.navigate('/(subPages)/EditUser')} style={styles.editIcon}>
                <FontAwesome5 name="user-edit" size={24} color={Colors.mainColor} />
            </TouchableOpacity>
            <View className='flex items-center justify-center w-full border-b-2 border-gray-200 py-5'>
                <Animated.View
                    entering={ZoomInEasyUp.duration(500).delay(100).springify()}
                >
                    <Image className='border-2 border-black rounded-full overflow-hidden mb-4' source={{ uri: user?.image || 'https://res.cloudinary.com/db152mwtg/image/upload/v1732834946/Treva%20Edu%20App/users/majicowky6me6stkjpuf.jpg' }} width={100} height={100} />
                </Animated.View>
                <View className='flex flex-row items-center w-full justify-between'>
                    <Text style={ConstantStyles.Title3}>{grade}</Text>
                    <Text style={ConstantStyles.Title3}>الطالب/ {name}</Text>
                </View>
            </View>
            {/* More */}
            <TouchableOpacity onPress={() => {
                AsyncStorage.removeItem('user')
                router.push('/(SignIn)/Welcome')
            }}>
                <Text>تسجيل خروج</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    editIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 100
    }
})