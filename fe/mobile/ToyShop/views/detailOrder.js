import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { AppContext } from './';
import { BtnBackTab, CardDetail } from '../components';
import Color from '../res/color';

function DetailOrder({ navigation, route }) {
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
            <View style={{ marginTop: 30, alignItems: 'center' }}>
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
