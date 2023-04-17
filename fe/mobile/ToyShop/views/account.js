import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';

import { Account, Frame } from '../components';
import { removeFromCart } from '../store/CartReducer';
import { AppContext } from './';
import Color from '../res/color';

function AccountUser({ navigation }) {
    const { setUser } = useContext(AppContext);
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const removeItemFromCart = (items) => {
        dispatch(removeFromCart(items));
    };
    const reset = () => {
        setUser('');
        cart.map((item, index) => removeItemFromCart(item));
        navigation.navigate('Welcome');
    };

    return (
        <View
            style={{
                backgroundColor: 'white',
                flex: 1,
            }}
        >
            <StatusBar />

            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={{ marginTop: 80 }}>
                <Account title="Thùy Trang" />
                <View
                    style={{
                        marginTop: 20,
                        alignItems: 'center',
                    }}
                >
                    <Frame
                        title={'Chỉnh sửa thông tin'}
                        icon={'address-card'}
                        navigate={navigation}
                        nameNavi="FixInf"
                    />

                    <Frame title={'Thay đổi mật khẩu'} icon={'lock'} navigate={navigation} nameNavi="ChangePass" />

                    <TouchableOpacity style={styles.button} onPress={() => reset()}>
                        <Text style={styles.text}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}
export default AccountUser;

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 373,
        height: 50,
        borderRadius: 40,
        backgroundColor: Color.btn,
    },
    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
