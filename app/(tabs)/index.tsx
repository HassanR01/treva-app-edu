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


    const randomSentence = [
        'شدي حيلك، الدنيا مافيش زيها 🏆',
        'النجاح مش وصول للغاية، ده رحلة 🚀',
        'خطوة خطوة، وكل حاجة هتبقى تمام! 👍',
        'التعليم مفتاح النجاح 🎓',
        'التعليم هو السلاح الأقوى 💪',
        'التعليم هو الطريق للتغيير 🛤️',
        'مش مهم تعثر، المهم تقوم تاني! 💪',
        'المذاكرة مش سهلة، لكن إنت أكيد قدها! 🌟',
        'عارف إنك شاطر، خلي المذاكرة تثبت ده! 🌟',
        'لو حسيت بالملل، خد بريك بسيط وارجع تاني! ⛅',
        'كل ما تذاكر أكتر، هتفتح قدامك فرص أكتر! 🔓',
        'مش مهم متى تبدأ، المهم تبدأ! 🔄',
        'علشان تبقى أحسن، خلي المذاكرة هويتك! 🦸‍♂️',
        'ركز شوية وهتشوف السحر بيحصل! ✨📖',
        'يا واد ذاكر بدل ما النتيجة تفاجئك! 😅📄',
        'لو المذاكرة أكلة، كنت بقيت شيف عالمي دلوقتي! 🍳📘',
        'كل ما تذاكر، بتقرب خطوة من أحلامك! 🚀📘',
        'الدنيا لعبة، بس الامتحان مش بيهزر! 🎮📄',
        "النجاح مش حظ، النجاح تعب واجتهاد! 💯📚",
        "كل صفحة بتفتحها، بتفتح لك باب جديد! 🚪📘",
        'العقل جواهر، والمذاكرة مفتاح الخزنة! 💎📖',
        "ذاكر شوية وزود جرعة الكوفي! ☕📚",
        "النجاح بيحب الناس اللي بتسعى ليه! 💪🌟",
        "لما تخلص كتاب، افتكر إنك كسبت معركة! ⚔️📖",
        "كل ما تذاكر، بتكتب قصة نجاحك! 📝📖",
        "ابدأ بصفحة واحدة، والباقي هييجي لوحده! 📖🚀",
        "ركز، دماغك أقوى من أي آلة حاسبة! 🧠📐",
        "بلاش كسوف، اسأل لو مش فاهم! 🤔✍️",
        "امتحاناتك مش نهاية العالم، بس البداية! 🚀📄",
        "النجاح بيحب اللي بيعافر عشانه! 🏋️‍♂️📖",
        "تعب دلوقتي، وراحة بعدين! 🛌📚",
        "ذاكر، ولو غلط، مش مشكلة، اتعلم! 🔄📘",
    ]

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

        const filteredLessons = lessons?.filter(lesson => lesson.grade === user?.grade).reverse()
        filteredLessons?.reverse()

        return (
            <>
                <View style={[styles.header, ConstantStyles.shadowContainer]}>
                    <Link href={'/Profile'}>
                        <Image style={{ backgroundColor: Colors.calmWhite }} className='border border-black rounded-full overflow-hidden' source={{ uri: user?.image || 'https://res.cloudinary.com/db152mwtg/image/upload/v1734695620/Treva%20Edu%20App/users/tx4dze4uiwb1in8hkz0z.png' }} width={50} height={50} />
                    </Link>
                    <View>
                        <Text style={[ConstantStyles.Title1, { color: Colors.calmWhite, fontSize: 28 }]}>{name}, اهلاً بك في عالم تريڤا</Text>
                        <Text style={[ConstantStyles.normalText, { color: Colors.calmWhite, fontSize: 20 }]}>{randomSentence[Math.floor(Math.random() * randomSentence.length)]}</Text>
                    </View>
                </View>
                <StatusBar barStyle={'light-content'} />
                <LinearGradient
                    colors={[Colors.bgColor, Colors.itemBgColor, Colors.bgColor]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        marginBottom: 80,
                    }}
                >
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
                                {/* Search input */}
                                <TouchableOpacity onPress={() => router.push('/(subPages)/search')} style={[ConstantStyles.shadowContainer, { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10, direction: 'rtl', backgroundColor: Colors.calmWhite, borderRadius: 50, padding: 10 }]}>
                                    <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/(subPages)/search')}>
                                        <FontAwesome name="search" size={20} color={'gray'} />
                                    </TouchableOpacity>
                                    <View>
                                        <TextInput
                                            style={[styles.inputText]}
                                            placeholder="معــاك تريـڤـا .. اقــدر  اسـاعـدك ازاي ؟"
                                            placeholderTextColor={'gray'}
                                            onFocus={() => router.push('/(subPages)/search')}
                                            value={search}
                                            onChangeText={(e => router.push('/(subPages)/search'))}
                                        />
                                    </View>
                                </TouchableOpacity>
                                {/* Scoure */}
                                <TouchableOpacity style={[styles.ScoureContainer, ConstantStyles.shadowContainer]} onPress={() => router.push('/(subPages)/Leaderboard')}>
                                    <Image source={require('@/assets/images/win.png')} style={{
                                        width: 220,
                                        height: 220,
                                        zIndex: 10,
                                        position: 'absolute',
                                        bottom: -5,
                                        left: -40,

                                    }} />
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '50%',
                                            height: '100%',
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            borderRadius: 10,
                                        }}
                                    >
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', direction: 'rtl', marginBottom: 20 }}>
                                            <Text style={[ConstantStyles.Title1, { fontSize: 30, color: Colors.textColor }]}>النقاط</Text>
                                            <Text style={[ConstantStyles.Title1, { fontSize: 50, marginLeft: -5 }]}>{score}</Text>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', direction: 'rtl', marginBottom: 10 }}>
                                            <Text style={[ConstantStyles.Title1, { fontSize: 26, color: Colors.textColor }]}>الترتيب</Text>
                                            <Text style={[ConstantStyles.Title1, { fontSize: 26 }]}>{rank === 1 ? `${rank}st` : rank === 2 ? `${rank}nd` : rank === 3 ? `${rank}rd` : `${rank}th`}</Text>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', direction: 'rtl' }}>
                                            <Text style={[ConstantStyles.Title1, { fontSize: 18, color: Colors.textColor }]}>المحاضرات</Text>
                                            <Text style={[ConstantStyles.Title1, { fontSize: 18 }]}>{user.videos.length}</Text>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', direction: 'rtl' }}>
                                            <Text style={[ConstantStyles.Title1, { fontSize: 18, color: Colors.textColor }]}>الامتحانات</Text>
                                            <Text style={[ConstantStyles.Title1, { fontSize: 18 }]}>{user.exams.length}</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        height: '100%',
                                        width: '50%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        borderRadius: 10,
                                    }}>
                                        <View style={{
                                            position: 'absolute',
                                            top: -50,
                                            left: -155,
                                            width: 300,
                                            height: 300,
                                            borderRadius: 300,
                                            backgroundColor: Colors.mainColor,
                                            zIndex: 0,
                                        }}>

                                        </View>
                                    </View>
                                </TouchableOpacity>

                                {/* Subjects */}
                                <View style={styles.Subjects}>
                                    <Text style={[ConstantStyles.Title1, { fontSize: 30, color: Colors.textColor }]}>آخر الاحداث</Text>
                                    <ScrollView
                                        style={{ direction: 'rtl', width: "100%" }}
                                        showsHorizontalScrollIndicator={false}
                                        pagingEnabled={true}
                                        horizontal
                                    >
                                        {filteredLessons?.map((lesson, index) => (
                                            <TouchableOpacity
                                                key={index} style={[styles.cardsubject]}
                                                onPress={() => router.push({
                                                    pathname: '/(course)/[id]',
                                                    params: {
                                                        id: lesson._id,
                                                        lesson: JSON.stringify(lesson),
                                                        user: JSON.stringify(user)
                                                    }
                                                })}>
                                                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 20 }}>
                                                    <Image source={subjects.find(subject => subject.name === lesson.subject)?.image} style={{ width: 20, height: 20 }} />
                                                    <Text style={[ConstantStyles.Title2, { fontSize: 20, fontFamily: Fonts.boldText, textAlign: 'center', color: Colors.calmWhite }]}>{lesson.title}</Text>
                                                    <Text style= {[ConstantStyles.Title2, { fontSize: 20, fontFamily: Fonts.blackText, marginBottom: 0, color: Colors.calmWhite }]}>مادة {lesson.subject}</Text>
                                                    <Text style={[ConstantStyles.normalText, { fontSize: 16, fontFamily: Fonts.mediumText, textAlign: 'center', color: Colors.calmWhite }]}>م/ {lesson.teacher}</Text>
                                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', width: '100%', marginBottom: 30 }}>
                                                    </View>
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '85%', marginTop: 10, backgroundColor: Colors.calmWhite, padding: 5, borderRadius: 5, position: 'absolute', bottom: 0, overflowX: 'hidden' }}>
                                                    <Text style={[ConstantStyles.Title2, { fontSize: 20, color: Colors.mainColor, marginLeft: 20, fontFamily: Fonts.boldText }]}>شاهد الان</Text>
                                                    <Image source={require('../../assets/images/explore.png')} style={{
                                                        width: 70,
                                                        height: 70,
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        right: -10,
                                                    }} />

                                                </View>
                                            </TouchableOpacity>
                                        )).slice(0, 5)}
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
                                    <Text style={[ConstantStyles.Title1, { fontSize: 30, color: Colors.textColor, marginTop: 20 }]}>المحاضرات السابقة</Text>
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
                </LinearGradient>
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
        backgroundColor: Colors.mainColor,
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
        backgroundColor: Colors.mainColor,
        margin: 5,
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 180,
        height: 180,
        shadowColor: Colors.textColor,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 20,
    },
    iconContainer: {
        padding: 5,
        borderRadius: 5,
    },
    inputText: {
        fontSize: 20,
        fontFamily: Fonts.boldText,
        width: Dimensions.get('screen').width - 100,
        textAlign: 'center',
        borderRadius: 5,
        color: 'gray',
    },
    ScoureContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimensions.get('screen').width - 40,
        height: 200,
        margin: 10,
        direction: 'rtl',
        borderRadius: 10,
        backgroundColor: Colors.calmWhite,

    }
})