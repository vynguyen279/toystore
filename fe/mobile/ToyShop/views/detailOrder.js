import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

import { AppContext } from './';
import { BtnBackTab, CardDetail } from '../components';
import Color from '../res/color';
import styles from '../res/styles';

function DetailOrder({ navigation, route }) {
    const date = route.params?.date;
    const code = route.params?.code;
    const listDetail = route.params?.list;
    return (
        <View
            style={{
                backgroundColor: Color.BG,
                flex: 1,
            }}
        >
            <StatusBar />

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 42,
                }}
            >
                <BtnBackTab navigate={navigation} />
                <Text style={style.title}>Chi tiết đơn hàng</Text>
            </View>
            <Text style={[styles.txtName, { marginLeft: 20, marginTop: 20 }]}>
                Ngày đặt:{' '}
                {moment(
                    new Date(
                        Number(date[6] + date[7] + date[8] + date[9]),
                        Number(date[3] + date[4]) - 1,
                        Number(date[0] + date[1]),
                    ),
                ).format('DD-MM-yyyy')}
            </Text>
            <Text style={[styles.txtName, { marginLeft: 20 }]}>Mã đơn hàng: {code}</Text>
            <View style={{ marginTop: 15, alignItems: 'center' }}>
                <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                    {listDetail.map((item, index) => (
                        <CardDetail item={item} navigation={navigation} />
                    ))}
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
}
export default DetailOrder;

const style = StyleSheet.create({
    gener: {
        fontSize: 16,
        marginLeft: 42,
        marginTop: 15,
        marginBottom: 25,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 55,
        color: 'black',
    },
});
