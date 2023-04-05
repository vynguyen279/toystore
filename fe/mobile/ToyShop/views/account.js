import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { BtnBack, Account, Frame, FiFoot } from '../components';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Color from '../res/color';

function AccountUser({ navigation }) {
    return (
        <View
            style={{
                backgroundColor: 'white',
                flex: 1,
            }}
        >
            <StatusBar />

            {/* <BtnBack navigate={navigation} nameNavi='Home'/> */}
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

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Welcome')}>
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
