import { Dimensions, Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { Fonts } from '@/Constants/Fonts'
import { Colors } from '@/Constants/Colors'
import { ConstantStyles } from '@/Constants/constantStyles'
import { lesson, useDataContext, user } from '@/components/context/DataContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CompletingDataFrom from '@/components/Forms/CompletingDataFrom'
import Loading from '@/components/Loading'
import { date } from 'yup'
import LessonComponent from '@/components/elements/LessonComponent'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import { LinearGradient } from 'expo-linear-gradient'


export default function Home() {
    const [user, setUser] = useState<user>()
    const [search, setSearch] = useState('')
    const [lessonsInStorage, setLessonsInStorage] = useState<lesson[]>([])
    const name = user ? user.name : 'مجهول'
    const { users, lessons } = useDataContext()

    const fetchUser = async () => {
        const userExist = await AsyncStorage.getItem('user')
        const lastLessons = await AsyncStorage.getItem('lastLessons');
        if (userExist) {
            setUser(JSON.parse(userExist))
            if (user) {
                const userExist = users?.find(userDB => userDB._id === user._id)
                if (userExist && JSON.stringify(userExist) !== JSON.stringify(user)) {
                    setUser(userExist)
                    AsyncStorage.setItem('user', JSON.stringify(userExist))
                }
            }
        } else {
            router.push('/(SignIn)/Welcome')
        }

        if (lastLessons) {
            // find the lessons and update from database
            setLessonsInStorage(JSON.parse(lastLessons));

            const updatedLessons = lessons?.filter(lesson => {
                return JSON.parse(lastLessons).some((lessonInStorage: lesson) => lessonInStorage._id === lesson._id)
            })

            if (updatedLessons) {
                AsyncStorage.setItem('lastLessons', JSON.stringify(updatedLessons))
                setLessonsInStorage(updatedLessons.reverse())
            }
        }

    }

    const updateUserFromDB = () => {

        if (user) {
            const userExist = users?.find(userDB => userDB._id === user._id)
            if (userExist) {
                setUser(userExist)
                AsyncStorage.setItem('user', JSON.stringify(userExist))


            } else {
                router.push('/(SignIn)/Welcome')
            }
        }
    }

    useEffect(() => {
        fetchUser()
    }, [users])

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



    if (!users || !lessons || !user) {
        return <Loading />
    } else {
        const Techers = users?.filter(user => user.role === 'teacher')
        const students = users?.filter(user => user.role === 'student')
        let score = 0;
        user?.videos.forEach(video => {
            score += 25;
        })
        user?.exams.forEach(exam => {
            score += exam.totalPoints ? exam.totalPoints : 0;
        })

        // Sort Students depends on the score and give me the rank of the user
        const sortedStudents = students?.sort((a, b) => {
            let scoreA = 0;
            a.videos.forEach(video => {
                scoreA += 25;
            })

            a.exams.forEach(exam => {
                scoreA += exam.totalPoints ? exam.totalPoints : 0;
            })

            let scoreB = 0;
            b.videos.forEach(video => {
                scoreB += 25;
            })

            b.exams.forEach(exam => {
                scoreB += exam.totalPoints ? exam.totalPoints : 0;
            })

            return scoreB - scoreA;
        })

        const rank = sortedStudents?.findIndex(student => student._id === user._id) + 1;


        return (
            <>
                <View style={styles.header}>
                    <Link href={'/Profile'}>
                        <Image className='border border-black rounded-full overflow-hidden' source={{ uri: user?.image || 'https://res.cloudinary.com/db152mwtg/image/upload/v1734695620/Treva%20Edu%20App/users/tx4dze4uiwb1in8hkz0z.png' }} width={50} height={50} />
                    </Link>
                    <View>
                        <Text style={ConstantStyles.Title1}>مرحباً, {name}</Text>
                        <Text style={ConstantStyles.normalText}>الساعة بتقبل القسمة علي 60 ؟ 👀</Text>
                    </View>
                </View>
                <StatusBar barStyle={'dark-content'} />
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                        <RefreshControl
                            colors={[Colors.mainColor]}
                            progressBackgroundColor={Colors.bgColor}
                            refreshing={false}
                            onRefresh={() => updateUserFromDB()}
                        />
                    }
                    style={ConstantStyles.page}
                    showsVerticalScrollIndicator={false}
                >

                    {user?.grade && user?.major ? (
                        <>
                            <View style={{
                                position: 'absolute',
                                top: 250,
                                left: 0,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 100,
                                height: 100,
                                zIndex: 100,
                            }}>
                                <LottieView
                                    source={require('../../assets/animations/science.json')}
                                    autoPlay
                                    loop
                                    style={{ width: 100, height: 100 }}
                                />
                            </View>
                            {/* Search input */}
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10, direction: 'rtl' }}>
                                <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/(subPages)/search')}>
                                    <FontAwesome name="search" size={24} color={Colors.bgColor} />
                                </TouchableOpacity>
                                <View>
                                    <TextInput
                                        style={[styles.inputText]}
                                        placeholder="ابحث عن محاضرة"
                                        placeholderTextColor={Colors.mainColor}
                                        onFocus={() => router.push('/(subPages)/search')}

                                        value={search}
                                        onChangeText={(e => setSearch(e))}
                                    />
                                </View>
                            </View>
                            {/* Scoure */}
                            <TouchableOpacity style={styles.ScoureContainer} onPress={() => router.push('/(subPages)/Leaderboard')}>
                                <Image source={require('../../assets/images/star.gif')} style={{ width: 40, height: 40, borderRadius: 50, position: 'absolute', top: -5, right: -5, zIndex: 10 }} />
                                <LinearGradient
                                    colors={[Colors.itemBgColor, Colors.bgColor]}
                                    start={{ x: 1, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    locations={[0.15, 1]}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 10,
                                    }}
                                >
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', direction: 'rtl' }}>
                                        <Text style={[ConstantStyles.Title1, { fontSize: 30 }]}>النقاط</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={[ConstantStyles.Title1, { fontSize: 70 }]}>{score}</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', direction: 'rtl', marginBottom: 10 }}>
                                        <Text style={[ConstantStyles.Title1, { fontSize: 26 }]}>الترتيب</Text>
                                        <Text style={[ConstantStyles.Title1, { fontSize: 26 }]}>{rank}st</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', direction: 'rtl' }}>
                                        <Text style={[ConstantStyles.Title1, { fontSize: 20 }]}>المحاضرات المشاهدة</Text>
                                        <Text style={[ConstantStyles.Title1, { fontSize: 20 }]}>{user.videos.length}</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', direction: 'rtl' }}>
                                        <Text style={[ConstantStyles.Title1, { fontSize: 20 }]}>الامتحانات</Text>
                                        <Text style={[ConstantStyles.Title1, { fontSize: 20 }]}>{user.exams.length}</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            {/* Subjects */}
                            <View style={styles.Subjects}>
                                <Text style={[ConstantStyles.Title1, { fontSize: 26 }]}>المواد</Text>
                                <ScrollView
                                    style={{ direction: 'rtl' }}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                >
                                    {subjects.map((subject, index) => (
                                        <TouchableOpacity key={index} style={styles.cardsubject} onPress={() => router.push({
                                            pathname: '/(subPages)/Results',
                                            params: {
                                                data: subject.name,
                                            }
                                        })}>
                                            <Image source={subject.image} width={100} height={100} style={{ width: 50, height: 50 }} />
                                            <Text style={ConstantStyles.Title3}>{subject.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <View style={{
                                    position: 'absolute',
                                    top: 150,
                                    left: 80,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 100,
                                    height: 100,
                                    zIndex: 100,
                                }}>
                                    <LottieView
                                        source={require('../../assets/animations/eduP.json')}
                                        autoPlay
                                        loop
                                        style={{ width: 100, height: 100 }}
                                    />
                                </View>
                                <Text style={[ConstantStyles.Title1, { fontSize: 26, marginTop: 20 }]}>المحاضرات السابقة</Text>
                                {lessonsInStorage.length > 0 ? (
                                    <ScrollView
                                        style={{ direction: 'rtl', width: "100%" }}
                                        showsHorizontalScrollIndicator={false}
                                        pagingEnabled={true}
                                        horizontal
                                    >
                                        {lessonsInStorage.map((lesson, index) => (
                                            <LessonComponent key={index} lesson={lesson} user={user} />
                                        ))}
                                    </ScrollView>
                                ) : (
                                    <Text style={ConstantStyles.Title2}>لم تقم بمشاهدة اي محاضرة بعد</Text>
                                )}
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
    Subjects: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        direction: 'rtl',
        margin: 10,
    },
    cardsubject: {
        backgroundColor: Colors.calmWhite,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 120,
        height: 120,
    },
    iconContainer: {
        backgroundColor: Colors.mainColor,
        padding: 10,
        borderRadius: 5,
    },
    inputText: {
        padding: 6,
        fontSize: 24,
        fontFamily: Fonts.mediumText,
        width: Dimensions.get('screen').width - 90,
        textAlign: 'right',
        marginRight: 10,
        borderWidth: 2,
        borderColor: Colors.mainColor,
        borderRadius: 5,
    },
    ScoureContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: Dimensions.get('screen').width - 40,
        height: 200,
        alignItems: 'center',
        margin: 10,
        direction: 'rtl',
        borderRadius: 10,
    }
})