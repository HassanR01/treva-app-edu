import { Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ConstantStyles } from '@/Constants/constantStyles'
import Animated, { ZoomInEasyUp, ZoomOutEasyDown } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/Constants/Colors'
import { Fonts } from '@/Constants/Fonts'

export default function Profile() {
    const [user, setUser] = useState<any>()
    const name = user ? user.name : 'مجهول'
    const grade = user ? user.grade : 'غير محدد'
    const major = user ? user.major : 'غير محدد'

    const fetchUser = async () => {
        const userExist = await AsyncStorage.getItem('user')
        if (userExist) {
            setUser(JSON.parse(userExist))
        } else {
            router.push('/(SignIn)')
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    // Logout
    const Logout = async () => {
        await AsyncStorage.removeItem('user')
        router.replace('/(SignIn)/Welcome')
    }



    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    colors={[Colors.mainColor]}
                    progressBackgroundColor={Colors.bgColor}
                    refreshing={false}
                    onRefresh={() => fetchUser()}
                />
            }
            style={ConstantStyles.page}
            showsVerticalScrollIndicator={false}
        >
            <TouchableOpacity onPress={() => router.navigate('/(subPages)/EditUser')} style={styles.editIcon}>
                <FontAwesome5 name="user-edit" size={24} color={Colors.mainColor} />
            </TouchableOpacity>
            <View className='flex items-center justify-center w-full border-b-2 mb-5 border-gray-200 py-5'>
                <Animated.View
                    entering={ZoomInEasyUp.duration(500).delay(100).springify()}
                >
                    <Image className='border-2 border-black rounded-full overflow-hidden mb-4' source={{ uri: user?.image || 'https://res.cloudinary.com/db152mwtg/image/upload/v1734695620/Treva%20Edu%20App/users/tx4dze4uiwb1in8hkz0z.png' }} width={100} height={100} />
                </Animated.View>
                <View className='flex flex-row items-center w-full justify-between'>
                    <Text style={ConstantStyles.Title3}>{grade}</Text>
                    <Text style={ConstantStyles.Title3}>الطالب/ {name}</Text>
                </View>
                <View className='flex flex-row items-center w-full justify-end'>
                    <Text style={ConstantStyles.normalText}>الشعبة/ {major}</Text>
                </View>
            </View>
            {/* More */}

            <TouchableOpacity style={styles.buttonProfile} onPress={() => router.navigate('/(subPages)/EditUser')}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="edit" size={20} color={Colors.bgColor} />
                    <Text style={styles.textBtnProfile}>تعديل البيانات</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.bgColor} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonProfile} onPress={() => router.navigate('/(tabs)/Courses')}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="book" size={20} color={Colors.bgColor} />
                    <Text style={styles.textBtnProfile}>دوراتي</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.bgColor} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonProfile} onPress={() => router.navigate('/(course)/StudentReview')}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="filetext1" size={20} color={Colors.bgColor} />
                    <Text style={styles.textBtnProfile}>الامتحانات</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.bgColor} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonProfile} onPress={() => router.navigate('/(tabs)/Wallet')}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="creditcard" size={20} color={Colors.bgColor} />
                    <Text style={styles.textBtnProfile}>المدفوعات</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.bgColor} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonProfile} onPress={() => router.navigate('/(subPages)/About')}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="questioncircle" size={20} color={Colors.bgColor} />
                    <Text style={styles.textBtnProfile}>عن تريڤا</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.bgColor} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonProfile} onPress={() => router.navigate('/(subPages)/Contact')}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="contacts" size={20} color={Colors.bgColor} />
                    <Text style={styles.textBtnProfile}>تواصل معنا</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.bgColor} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonProfile} onPress={() => Logout()}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="logout" size={20} color={Colors.bgColor} />
                    <Text style={styles.textBtnProfile}>تسجيل خروج</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.bgColor} />
            </TouchableOpacity>
            {/* Version and Copyrights */}
            <Text style={[ConstantStyles.normalText, { textAlign: 'center', marginTop: 20, color: 'gray' }]}>الاصدار 1.0.0</Text>
            <Text style={[ConstantStyles.normalText, { textAlign: 'center', marginBottom: 20, color: 'gray' }]}>جميع الحقوق محفوظة لتريڤا</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    editIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 100
    },
    buttonProfile: {
        backgroundColor: Colors.mainColor,
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        direction: 'rtl'
    },
    textBtnProfile: {
        color: Colors.bgColor,
        fontFamily: Fonts.boldText,
        fontSize: 20,
        marginRight: 10,
    }
})