import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ConstantStyles } from '@/Constants/constantStyles'
import Animated, { ZoomInEasyUp, ZoomOutEasyDown } from 'react-native-reanimated'

export default function Profile() {
    const name = 'حسن خالد احمد'
    const grade = 'الصف الثالث الثانوي'
    return (
        <ScrollView style={ConstantStyles.page}>
            <View className='flex items-center justify-center w-full border-b-2 border-gray-200 py-5'>
                <Animated.View
                    entering={ZoomInEasyUp.duration(500).delay(100).springify()}
                >
                    <Image className='border-2 border-black rounded-full overflow-hidden mb-4' source={{ uri: 'https://res.cloudinary.com/db152mwtg/image/upload/v1732834946/Treva%20Edu%20App/users/majicowky6me6stkjpuf.jpg' }} width={100} height={100} />
                </Animated.View>
                <View className='flex flex-row items-center w-full justify-between'>
                    <Text style={ConstantStyles.Title3}>{grade}</Text>
                    <Text style={ConstantStyles.Title3}>الطالب/ {name}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})