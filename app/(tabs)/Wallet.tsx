import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ConstantStyles } from '@/Constants/constantStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { user } from '@/components/context/DataContext'
import Loading from '@/components/Loading'
import { Colors } from '@/Constants/Colors'

export default function Wallet() {
  const [user, setUser] = useState<user>()


  const fetchUser = async () => {
    const userExist = await AsyncStorage.getItem('user')
    if (userExist) {
      setUser(JSON.parse(userExist))
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if (!user) {
    return <Loading />
  } else {

    const TotalBillsCost = user.bills.reduce((acc, bill) => acc + +bill.cost, 0)

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
        style={[ConstantStyles.page, { padding: 20 }]}
      >
        <Text style={ConstantStyles.Title1}>المحفظة</Text>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          direction: 'rtl',
        }}>
          <Text style={[ConstantStyles.Title3, { fontSize: 20 }]}>الرصيد الحالي</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[ConstantStyles.Title1, { fontSize: 50 }]}>{user.points}.00</Text>
            <Text style={[ConstantStyles.Title1, { fontSize: 20, marginTop: 5, marginRight: 5 }]}>ج.م</Text>
          </View>
        </View>
        {/* StudentType */}
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          direction: 'rtl',
          marginTop: 20,
        }}>
          <Text style={[ConstantStyles.Title3, { fontSize: 20 }]}>نوع الطالب</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[ConstantStyles.Title1, { fontSize: 30, marginLeft: 10 }]}>{user.type}</Text>
            {user.type === 'TrevaGo' ? (
              <Image source={require('../../assets/images/trevaGo.png')} style={{ width: 50, height: 50 }} />
            ) : (
              <Image source={require('../../assets/images/trevaIn.png')} style={{ width: 50, height: 50 }} />
            )}
          </View>
        </View>

        {/* Bills */}
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          direction: 'rtl',
          marginTop: 20,
        }}>
          <Text style={[ConstantStyles.Title3, { fontSize: 20 }]}>المدفوعات</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[ConstantStyles.Title1, { fontSize: 50 }]}>{TotalBillsCost}</Text>
            <Text style={[ConstantStyles.Title1, { fontSize: 20, marginTop: 5, marginRight: 5 }]}>ج.م</Text>
          </View>
        </View>

        {/* Lessons Had Pay */}
        <View style={{ display: 'flex', flexDirection: 'column', direction: 'rtl', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          {user.bills.map((bill, index) => {
            return (
              <View key={index} style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: 10,
                marginVertical: 10,
                borderWidth: 1,
                borderColor: Colors.mainColor,
                borderRadius: 10,
              }}>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={[ConstantStyles.Title2, { fontSize: 20 }]}>{bill.method}</Text>
                    <Text style={[ConstantStyles.Title3, { fontSize: 20 }]}>{bill.cost}.00 ج.م</Text>
                  </View>
                  <Text style={[ConstantStyles.normalText, { fontSize: 16, color: Colors.mainColor, textAlign: 'left' }]}>{bill.date}</Text>
                </View>
              </View>
            )
          })}
        </View>

        {/* Lessons */}
        <Text style={[ConstantStyles.Title2, { marginTop: 20 }]}>المحاضرات</Text>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({})