import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';

import { BtnBackTab, Account, BtnConfirm, Password } from '../components';
import { ChangePassSchema } from '../constans/validation';
import { AppContext } from './';
import isFormValid from '../res/geners';
import { changePass } from '../services/untils';
import styles from '../res/styles';
import Color from '../res/color';

function ChangePass({ navigation }) {
    const { user, setUser } = useContext(AppContext);
    const checkPass = (oldPass, pass, rePass) => {
        if (oldPass !== user.MATKHAU) {
            Alert.alert('Thông báo', 'Mật khẩu cũ không chính xác!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        } else {
            if (pass !== rePass) {
                Alert.alert('Thông báo', 'Nhập lại mật khẩu không chính xác!', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            } else {
                changePassAcc();
            }
        }
    };

    const changePassAcc = () => {
        const data = {
            EMAIL: user.EMAIL,
            MATKHAUMOI: user.MATKHAU,
        };

        changePass(data)
            .then(function (response) {
                if (response.data.status) {
                    Alert.alert('Thông báo', response.data.data, [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                    navigation.goBack();
                } else {
                    Alert.alert('Thông báo', 'Đổi mật khẩu thất bại!', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <View
            style={{
                backgroundColor: 'white',
                flex: 1,
            }}
        >
            <StatusBar />

            <View
                style={{
                    marginTop: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <BtnBackTab navigate={navigation} />
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        marginLeft: 50,
                        color: 'black',
                    }}
                >
                    Thay đổi mật khẩu
                </Text>
            </View>

            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                <Account title="Thùy Trang"></Account>
                <Formik
                    initialValues={{ oldPass: '', newPass: '', rePass: '' }}
                    validationSchema={ChangePassSchema}
                    onSubmit={(values) => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                        <>
                            <Password
                                title="Nhập lại mật khẩu cũ"
                                field="oldPass"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                values={values}
                                touched={touched}
                            ></Password>

                            <Password
                                title="Nhập mật khẩu mới"
                                field="newPass"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                values={values}
                                touched={touched}
                            ></Password>

                            <Password
                                title="Nhập lại mật khẩu mới"
                                field="rePass"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                values={values}
                                touched={touched}
                            ></Password>

                            <TouchableOpacity
                                style={[styles.btnLogin, { backgroundColor: Color.btn, marginTop: 50, marginLeft: 42 }]}
                                onPress={() => {
                                    handleSubmit;
                                    checkPass(values.oldPass, values.newPass, values.rePass);
                                }}
                                disabled={!isFormValid(isValid, touched)}
                            >
                                <View
                                    style={{
                                        opacity: isFormValid(isValid, touched) ? 1 : 0.5,
                                    }}
                                ></View>
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 18,
                                    }}
                                >
                                    Cập nhật
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
            </KeyboardAwareScrollView>
        </View>
    );
}
export default ChangePass;

// const style = StyleSheet.create({
//     // button: {
//     //     marginTop: 10,
//     //     alignItems: 'center',
//     //     justifyContent: 'center',
//     //     width: 373,
//     //     height: 42,
//     //     borderRadius: 40,
//     //     backgroundColor: Color.btn,
//     // },
//     // text: {
//     //     fontSize: 20,
//     //     lineHeight: 21,
//     //     fontWeight: 'bold',
//     //     letterSpacing: 0.25,
//     //     color: 'white',
//     // },
//     gener: {
//         fontSize: 16,
//         marginLeft: 42,
//         marginTop: 60,
//         marginBottom: 25,
//     },
// });
