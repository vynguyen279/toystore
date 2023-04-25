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
    const dateOrder = route.params?.date;
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
                Ngày đặt: {moment(dateOrder).format('DD-MM-yyyy')}
            </Text>
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
