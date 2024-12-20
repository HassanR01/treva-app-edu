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
import { Dropdown } from 'react-native-element-dropdown'
import { Fonts } from '@/Constants/Fonts'


export default function EditUser() {
    const [user, setUser] = useState<any>()
    const { users } = useDataContext()
    const role = 'student'

    const _id = user?._id

    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [grade, setGrade] = useState('')
    const [major, setMajor] = useState('')

    const majorArrayFor1 = [
        { label: "عام", value: "عام" }
    ]
    const majorArrayFor2 = [
        { label: "علمي", value: "علمي" },
        { label: "ادبي", value: "ادبي" }
    ]
    const majorArrayFor3 = [
        { label: "علمي علوم", value: "علمي علوم" },
        { label: "علمي رياضة", value: "علمي رياضة" },
        { label: "ادبي", value: "ادبي" }
    ]


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
                    setGrade(user.grade)
                    setMajor(user.major)
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
        if (name || email || mobile || password || image || grade || major) {
            await axios.post('http://172.20.10.2:5000/api/v1/users/updateUser', { _id, image, name, email, mobile, password, grade, major, role }).then(res => {
                console.log(res.data)
                alert('تم تحديث البيانات بنجاح')
                const updateUser = { ...user, image, name, email, mobile, password, grade, major, role }
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
                            padding: 5,
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
                            keyboardType='phone-pad'
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
                    {/* Grade and Major */}
                    <View style={styles.dropdownContainer}>
                        <Dropdown
                            style={styles.dropdown}
                            data={[
                                { label: "الصف الاول الثانوي", value: "الصف الاول الثانوي" },
                                { label: "الصف الثاني الثانوي", value: "الصف الثاني الثانوي" },
                                { label: "الصف الثالث الثانوي", value: "الصف الثالث الثانوي" },
                            ]}
                            containerStyle={{ borderRadius: 10 }}
                            labelField={'label'}
                            valueField={'value'}
                            placeholder={grade || 'اختر الصف الدراسي'}
                            placeholderStyle={{ fontFamily: Fonts.boldText }}
                            onChange={(e) => {
                                setMajor('')
                                setGrade(e.value)
                            }}
                        />
                    </View>
                    <View style={styles.dropdownContainer}>
                        <Dropdown
                            style={styles.dropdown}
                            data={
                                grade === "الصف الاول الثانوي" ? majorArrayFor1 : grade === 'الصف الثاني الثانوي' ? majorArrayFor2 : majorArrayFor3
                            }
                            containerStyle={{ borderRadius: 10 }}
                            labelField={'label'}
                            valueField={'value'}
                            placeholder={major || 'اختر الشعبة'}
                            placeholderStyle={{ fontFamily: Fonts.boldText }}
                            onChange={(e) => setMajor(e.value)}
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
    },
    dropdown: {
        height: 50,
        borderColor: Colors.mainColor,
        borderWidth: 1,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: Colors.bgColor,
        color: Colors.bgColor,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    dropdownContainer: {
        width: '100%',
        direction: 'ltr',
    }
})
