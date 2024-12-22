import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { lesson, user } from '../context/DataContext'
import { router } from 'expo-router';
import { Fonts } from '@/Constants/Fonts';
import { Colors } from '@/Constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface LessonComponentProps {
    lesson: lesson;
    user: user;
}

const subjects = [
    { image: require('../../assets/images/subjects/arabic.png'), name: 'اللغة العربية' },
    { image: require('../../assets/images/subjects/english.png'), name: 'اللغة الانجليزية' },
    { image: require('../../assets/images/subjects/french.png'), name: 'اللغة الفرنسية' },
    { image: require('../../assets/images/subjects/german.png'), name: 'اللغة الالمانية' },
    { image: require('../../assets/images/subjects/italy.png'), name: 'اللغة الايطالية' },
    { image: require('../../assets/images/subjects/spanish.png'), name: 'اللغة الاسبانية' },
    { image: require('../../assets/images/subjects/chinese.png'), name: 'اللغة الصينية' },
    { image: require('../../assets/images/subjects/calculating.png'), name: 'الرياضيات' },
    { image: require('../../assets/images/subjects/physics.png'), name: 'الفيزياء' },
    { image: require('../../assets/images/subjects/chemistry.png'), name: 'الكيمياء' },
    { image: require('../../assets/images/subjects/biology.png'), name: 'الاحياء' },
    { image: require('../../assets/images/subjects/geology.png'), name: 'الجيولوجيا' },
    { image: require('../../assets/images/subjects/history.png'), name: 'التاريخ' },
    { image: require('../../assets/images/subjects/geography.png'), name: 'الجغرافيا' },
    { image: require('../../assets/images/subjects/psychology.png'), name: 'الفلسفة' },
    { image: require('../../assets/images/subjects/philosophy.png'), name: 'علم النفس' },
]

export default function LessonComponent({ lesson, user }: LessonComponentProps) {
    const [lessonsInStorage, setLessonsInStorage] = useState<lesson[]>([])
    let points = 0
    user.videos.forEach(video => {
        video.title === lesson.explainVideo.title && (points += 30)
        video.title === lesson.homeWorkVideo.title && (points += 30)
        video.title === lesson.examVideo.title && (points += 30)
    })

    user.exams.forEach(exam => {
        exam.title === lesson.exam.title && (points += 30)
    })

    useEffect(() => {
        const fetchLastLessons = async () => {
            const lastLessons = await AsyncStorage.getItem('lastLessons');
            if (lastLessons) {
                setLessonsInStorage(JSON.parse(lastLessons));
            }
        };
        fetchLastLessons();
    }, [])

    const addlessonVideoToUser = async () => {

        // I want to add the lessons to the local storage to know the last videos that the user watched and I want it as a array of lessons
        if (lessonsInStorage.some(lessonInStorage => lessonInStorage._id === lesson._id)) {
            // let this lesson be the first in the array and update it from database
            
            const updatedLessons = lessonsInStorage.filter(lessonInStorage => lessonInStorage._id !== lesson._id)
            updatedLessons.unshift(lesson)
            await AsyncStorage.setItem('lastLessons', JSON.stringify(updatedLessons))
            router.push({
                pathname: '/(course)/[id]',
                params: {
                    id: lesson._id,
                    lesson: JSON.stringify(lesson),
                    user: JSON.stringify(user)
                }
            })
        } else {
            const updatedLessons = [...lessonsInStorage, lesson]
            await AsyncStorage.setItem('lastLessons', JSON.stringify(updatedLessons))
            router.push({
                pathname: '/(course)/[id]',
                params: {
                    id: lesson._id,
                    lesson: JSON.stringify(lesson),
                    user: JSON.stringify(user)
                }
            })
        }

        // To Use it in the future
        // if (user.videos.some(video => video.title === lesson.explainVideo.title) && user.videos.some(video => video.title === lesson.homeWorkVideo.title) && user.videos.some(video => video.title === lesson.examVideo.title)) {
        //     router.push({
        //         pathname: '/(course)/[id]',
        //         params: {
        //             id: lesson._id,
        //             lesson: JSON.stringify(lesson),
        //             user: JSON.stringify(user)
        //         }
        //     })
        //     return
        // } else {
        //     const updatedUser = {
        //         ...user,
        //         videos: [...user.videos, lesson.explainVideo, lesson.homeWorkVideo, lesson.examVideo],
        //         exams: [...user.exams, lesson.exam]
        //     }
        //     await AsyncStorage.setItem('user', JSON.stringify(updatedUser))
        //     await axios.post('http://172.20.10.2:5000/api/v1/users/updateUser', updatedUser).then(res => {
        //         console.log(res.data);

        //         router.push({
        //             pathname: '/(course)/[id]',
        //             params: {
        //                 id: lesson._id,
        //                 lesson: JSON.stringify(lesson),
        //                 user: JSON.stringify(updatedUser)
        //             }
        //         })
        //     })
        // }

    }


    return (
        <TouchableOpacity style={styles.lessonContainer} onPress={() => addlessonVideoToUser()}>
            <View style={[styles.backComplete, { width: `${points}%` }]} />
            {/* Image matched subject */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: 10
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 10
                }}>
                    <Image source={subjects.find(subject => subject.name === lesson.subject)?.image} style={styles.lessonImage} />
                    <Text style={styles.lessonText}>{lesson.title}</Text>
                </View>
                <Text style={styles.lessonText}>{(points / 120) * 100}%</Text>
            </View>

            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: 10
                }}>
                    <Text style={styles.lessonText2}>{lesson.subject}</Text>
                    <Text style={styles.lessonText2}>{lesson.grade}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: 10
                }}>
                    <Text style={styles.lessonText2}>م/ {lesson.teacher}</Text>
                    <Text style={styles.lessonText2}>{new Date(lesson.createdAt).toLocaleDateString()}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    lessonContainer: {
        width: '100%',
        minWidth: Dimensions.get('window').width - 60,
        height: 150,
        backgroundColor: Colors.calmWhite,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        overflow: 'hidden',
        elevation: 3,
    },
    backComplete: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.itemBgColor,
        position: 'absolute',
        borderRadius: 10,
        zIndex: -1,
        top: 0,
        left: 0,
    },
    lessonImage: {
        width: 20,
        height: 20,
        marginLeft: 10
    },
    lessonText: {
        fontSize: 24,
        fontFamily: Fonts.boldText,
    },
    lessonText2: {
        fontSize: 18,
        fontFamily: Fonts.regularText,
    },
})