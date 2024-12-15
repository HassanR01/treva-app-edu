import { View, Text } from 'react-native'
import React, { createContext, Dispatch, SetStateAction, useEffect } from 'react'
import axios from 'axios'

export interface lesson {
    _id: number,
    title: string,
    description: string,
    teacher: string,
    subject: string,
    major: string,
    grade: string,
    type: string,
    comments: {}[],
    level: string,
    price: number,
    HomeWrokAttaches: string,
    explainVideo: {
        link: string,
        title: string,
        description: string,
        attaches: string,
        comments: {}[]
    },
    homeWorkVideo: {
        link: string,
        title: string,
        description: string,
        attaches: string,
        comments: {}[]
    },
    examVideo: {
        link: string,
        title: string,
        description: string,
        attaches: string,
        comments: {}[]
    },
    exam: {
        title: string,
        description: string,
        Date: string,
        time: number,
        questions: {
            title: string,
            image: string,
            description: string,
            answers: {
                answer: string,
                isRight: string,
            }[], // {answer, isRight}
            points: number
        }[], // {question title, image, description } , {3 wrong answers, right answer} , points,
        students: {
            name: string,
            totalPoints: number,
            answers: {
                answer: string,
                points: number
            }[],
            comments: {

            }[]
        }[],
        comments: {

        }[]
    },
}

export interface user {
    _id: number,
    name: string,
    username: string,
    email: string,
    mobile: string,
    password: string,
    image: string,
    grade: string,
    major: string,
    type: string, // TrevaIn , TrevaGo
    role: string,
    points: number,
    StdOfMonth: Boolean,
    videos: {
        title: string,
        description: string,
        link: string,
        attaches: string,
        comments: {}[]
    }[], // title , lessone
    exams: {
        title: string,
        description: string,
        totalPoints: number,
        Date: string,
        answers: {
            answer: string,
            points: number
        }[],
    }[], // title , techer, lessone, answers , finalResult
    bills: {}[],
    logs: {}[],
}

export interface payment {
    _id: number,
    name: string,
    username: string,
    cost: number,
    mobile: string,
    code: string,
    grade: string,
    type: string,
    method: string,
    bill: {}[]
}

export interface DataContextType {
    lessons: lesson[] | null;
    users: user[] | null;
    payments: payment[] | null;
    setLessons: Dispatch<SetStateAction<lesson[] | null>>;
    setUsers: Dispatch<SetStateAction<user[] | null>>;
    setPayments: Dispatch<SetStateAction<payment[] | null>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function useDataContext() {
    const context = React.useContext(DataContext)
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider')
    }
    return context
}

export default function DataProvider({ children }: { children: React.ReactNode }) {
    const [lessons, setLessons] = React.useState<lesson[] | null>(null)
    const [users, setUsers] = React.useState<user[] | null>(null)
    const [payments, setPayments] = React.useState<payment[] | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resLessons, resUsers, resPayments] = await Promise.all([
                    axios.get<lesson[]>('http://172.20.10.2:5000/api/v1/lessons/getLessons'),
                    axios.get<user[]>('http://172.20.10.2:5000/api/v1/users/getUsers'),
                    axios.get<payment[]>('http://172.20.10.2:5000/api/v1/payments/getPayments'),
                ])

                setLessons(resLessons.data)
                setUsers(resUsers.data)
                setPayments(resPayments.data)

            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])    

    return (
        <DataContext.Provider value={{ lessons, users, payments, setLessons, setUsers, setPayments }}>
            {children}
        </DataContext.Provider>
    )

}