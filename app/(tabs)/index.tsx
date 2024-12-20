import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { Fonts } from '@/Constants/Fonts'
import { Colors } from '@/Constants/Colors'
import { ConstantStyles } from '@/Constants/constantStyles'
import { useDataContext, user } from '@/components/context/DataContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CompletingDataFrom from '@/components/Forms/CompletingDataFrom'
import Loading from '@/components/Loading'


export default function Home() {
    const [user, setUser] = useState<user>()
    const name = user ? user.name : 'مجهول'

    const { users, lessons } = useDataContext()
    useEffect(() => {
        const fetchUser = async () => {
            const userExist = await AsyncStorage.getItem('user')
            if (userExist) {
                setUser(JSON.parse(userExist))
                const user = users?.find(user => user._id === JSON.parse(userExist)._id)
                if (user) {
                    await AsyncStorage.setItem('user', JSON.stringify(user))
                    setUser(user)
                }
            } else {
                router.push('/(SignIn)')
            }

        }
        fetchUser()
    }, [])


    const Techers = users?.filter(user => user.role === 'teacher')


    if (!users || !lessons || !user) {
        return <Loading />
    } else {

        return (
            <>
                <View style={styles.header}>
                    <Link href={'/Profile'}>
                        <Image className='border border-black rounded-full overflow-hidden' source={{ uri: user?.image || 'https://res.cloudinary.com/db152mwtg/image/upload/v1732834946/Treva%20Edu%20App/users/majicowky6me6stkjpuf.jpg' }} width={50} height={50} />
                    </Link>
                    <View>
                        <Text style={ConstantStyles.Title1}>مرحباً, {name}</Text>
                        <Text style={ConstantStyles.normalText}>الساعة بتقبل القسمة علي 60 ؟ 👀</Text>
                    </View>
                </View>
                <ScrollView style={ConstantStyles.page}>
                    {user?.grade && user?.major ? (
                        <>
                            {/* Techers */}
                            <View style={ConstantStyles.section}>
                                <Text style={[ConstantStyles.Title2, {textAlign: 'left'}]}>المدرسين</Text>
                                <ScrollView horizontal>
                                    {Techers?.map((teacher, index) => (
                                        <TouchableOpacity key={index} style={styles.teacher}>
                                            <Image className='border border-black rounded-full overflow-hidden' source={{ uri: teacher.image || 'https://res.cloudinary.com/db152mwtg/image/upload/v1732834946/Treva%20Edu%20App/users/majicowky6me6stkjpuf.jpg' }} width={50} height={50} />
                                            <Text style={ConstantStyles.normalText}>م/ {teacher.name.split(' ').slice(0, 2).join(' ')}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

                        </>
                    ) : (
                        <>
                            <CompletingDataFrom user={user} />
                        </>
                    )}
                </ScrollView>
            </>
        )
    }
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
    },
    teacher: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
})