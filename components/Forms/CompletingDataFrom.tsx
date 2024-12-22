import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ConstantStyles } from '@/Constants/constantStyles'
import { Dropdown } from 'react-native-element-dropdown'
import { Colors } from '@/Constants/Colors'
import { Fonts } from '@/Constants/Fonts'
import axios from 'axios'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function CompletingDataFrom({ user }: any) {
    const [grade, setGrade] = useState('')
    const [major, setMajor] = useState('')
    const _id = user._id
    
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
    
    
    const HandleSubmit = async () => {
        if (grade && major) {
            await axios.post('http://172.20.10.2:5000/api/v1/users/updateUser', { _id, grade, major }).then(res => {
                console.log(res.data)
                const updateUser = { ...user, grade, major }
                AsyncStorage.setItem('user', JSON.stringify(updateUser))
                alert('تم تحديث البيانات بنجاح')
                router.push('/(tabs)/Profile')
                
            }).catch(err => {
                console.log(err)
                alert('حدث خطأ ما')
            })
        } else {
            alert('يجب اكمال البيانات')
        }
    }


    return (
        <>
            <View style={styles.FormContainer}>
                <Text style={ConstantStyles.Title2}>اكمل بياناتك</Text>
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
                <Text style={ConstantStyles.normalText}>ملاحظة: يجب اكمال البيانات للمتابعة</Text>
                <TouchableOpacity onPress={HandleSubmit}>
                    <Text style={ConstantStyles.btn}>حفظ</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    FormContainer: {
        width: '100%',
        display: "flex",
        alignItems: 'center',
        justifyContent: "center",
        marginVertical: 20,
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
        width: 300
    }
})