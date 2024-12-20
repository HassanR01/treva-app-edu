import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ConstantStyles } from '@/Constants/constantStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDataContext } from '@/components/context/DataContext'
import { router } from 'expo-router'
import Loading from '@/components/Loading'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '@/Constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function EditUser() {
    const [user, setUser] = useState<any>()
    const { users } = useDataContext()

    const _id = user?._id

    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            const userExist = await AsyncStorage.getItem('user')
            if (userExist) {
                setUser(JSON.parse(userExist))
                const user = users?.find(user => user._id === JSON.parse(userExist)._id)
                if (user) {
                    await AsyncStorage.setItem('user', JSON.stringify(user))
                    setUser(user)
                    setImage(user.image)
                    setName(user.name)
                    setEmail(user.email)
                    setMobile(user.mobile)
                    setPassword(user.password)
                }
            } else {
                router.push('/(SignIn)')
            }

        }
        fetchUser()
    }, [])

    const SelectPhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
            console.log(result.assets[0].uri)
        }
    }

    const handleUpdateUserData = async () => {
        if (name || email || mobile || password || image) {
            await axios.post('http://172.20.10.2:5000/api/v1/users/updateUser', { _id, image, name, email, mobile, password }).then(res => {
                console.log(res.data)
                alert('تم تحديث البيانات بنجاح')
                const updateUser = { ...user, image, name, email, mobile, password }
                AsyncStorage.setItem('user', JSON.stringify(updateUser))
                
                router.push('/(tabs)/Profile')
            }).catch(err => {
                console.log(err)
                alert('حدث خطأ ما')
            })
        } else {
            alert('يجب اكمال البيانات')
        }
    }

    if (!user) {
        return <Loading />
    }
    return (
        <KeyboardAwareScrollView style={[ConstantStyles.page, { padding: 0 }]} >

            <ScrollView style={ConstantStyles.page}>
                {/* User Photo */}
                <View style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={ConstantStyles.Title2}>صورة المستخدم</Text>
                    <TouchableOpacity onPress={() => SelectPhoto()} style={styles.imageContainer}>
                        <Image source={{ uri: image || 'https://res.cloudinary.com/db152mwtg/image/upload/v1734695620/Treva%20Edu%20App/users/tx4dze4uiwb1in8hkz0z.png' }} style={styles.image} />
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            backgroundColor: 'white',
                            borderRadius: 50,
                            padding: 5
                        }}>
                            <MaterialCommunityIcons name="image-edit" size={24} color={Colors.mainColor} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* User Info */}
                <View style={ConstantStyles.section}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        marginVertical: 20
                    }}>
                        <Text style={[ConstantStyles.lableText, { color: Colors.mainColor }]}>الاسم</Text>
                        <TextInput
                            placeholder={user.name}
                            placeholderTextColor={"#ccc"}
                            style={[ConstantStyles.inputText, { width: '70%', fontSize: 20 }]}
                            value={name}
                            onChangeText={(e) => setName(e)}
                        />
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        marginVertical: 20
                    }}>
                        <Text style={[ConstantStyles.lableText, { color: Colors.mainColor }]}>البريد الالكتروني</Text>
                        <TextInput
                            placeholder={user.email}
                            placeholderTextColor={"#ccc"}
                            style={[ConstantStyles.inputText, { width: '70%', fontSize: 20 }]}
                            value={email}
                            onChangeText={(e) => setEmail(e)}
                        />
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        marginVertical: 20
                    }}>
                        <Text style={[ConstantStyles.lableText, { color: Colors.mainColor }]}>رقم الجوال</Text>
                        <TextInput
                            placeholder={user.mobile}
                            placeholderTextColor={"#ccc"}
                            style={[ConstantStyles.inputText, { width: '70%', fontSize: 20 }]}
                            value={mobile}
                            onChangeText={(e) => setMobile(e)}
                        />
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        marginVertical: 20
                    }}>
                        <Text style={[ConstantStyles.lableText, { color: Colors.mainColor }]}>كلمة المرور</Text>
                        <TextInput
                            placeholder="******"
                            placeholderTextColor={"#ccc"}
                            style={[ConstantStyles.inputText, { width: '70%', fontSize: 20 }]}
                            secureTextEntry
                            value={password}
                            onChangeText={(e) => setPassword(e)}
                        />
                    </View>
                    <TouchableOpacity onPress={() => {
                        handleUpdateUserData()
                    }}>
                        <Text style={ConstantStyles.btn}>حفظ</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}


const styles = StyleSheet.create({
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 10
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    }
})
