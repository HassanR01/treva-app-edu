import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { Fonts } from '@/Constants/Fonts'
import { Colors } from '@/Constants/Colors'
import { ConstantStyles } from '@/Constants/constantStyles'
import { useDataContext, user } from '@/components/context/DataContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home() {
    const [user, setUser] = useState<user>()
    const name = user ? user.name : 'مجهول'

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

    const { users } = useDataContext()


    return (
        <>
            <View style={styles.header}>
                <Link href={'/Profile'}>
                    <Image className='border border-black rounded-full overflow-hidden' source={{ uri: 'https://res.cloudinary.com/db152mwtg/image/upload/v1732834946/Treva%20Edu%20App/users/majicowky6me6stkjpuf.jpg' }} width={50} height={50} />
                </Link>
                <View>
                    <Text style={ConstantStyles.Title1}>مرحباً, {name}</Text>
                    <Text style={ConstantStyles.normalText}>الساعة بتقبل القسمة علي 60 ؟ 👀</Text>
                </View>
            </View>
            <ScrollView style={ConstantStyles.page}>
                <View>
                    {users && users.map((user, index) => (
                        <View key={index}>
                            <Text>{user.name}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    linkbtn: {
        fontFamily: Fonts.blackText,
        color: Colors.mainColor,
        fontSize: 30,
    },
    header: {
        backgroundColor: Colors.bgColor,
        padding: 10,
        width: '100%',
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'row',   
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    }
})