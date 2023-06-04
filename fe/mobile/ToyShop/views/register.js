import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';

import isFormValid from '../res/geners';
import styles from '../res/styles';
import { checkEmail } from '../services/untils';
import { SignupSchema } from '../constans/validation';
import { BtnBack, Password, Inf, BtnConfirm, Footer } from '../components';
import Color from '../res/color';

function Register({ navigation }) {
    const checkPass = (email, pass, rePass) => {
        if (pass !== rePass) {
            Alert.alert('Thông báo', 'Nhập lại mật khẩu không chính xác!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        } else {
            navigation.navigate('Information', { email: email, pass: pass });
        }
    };
    const checkEmailExist = (email, pass, rePass) => {
        const data = {
            EMAIL: email,
        };

        checkEmail(data)
            .then(function (response) {
                if (!response.data.status) {
                    checkPass(email, pass, rePass);
                } else {
                    Alert.alert('Thông báo', 'Email đã tồn tại!', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
                style={{
                    backgroundColor: Color.BG,
                    flex: 1,
                }}
            >
                <StatusBar />

                {/* <BtnBack navigate={navigation} nameNavi="Login" /> */}
                <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                    <Text style={style.title}>Đăng ký</Text>
                    <Formik
                        initialValues={{ email: '', pass: '', rePass: '' }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                            // same shape as initial values
                            console.log(values);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                            <>
                                <Inf
                                    title="Email"
                                    field="email"
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    values={values}
                                    touched={touched}
                                ></Inf>

                                <Password
                                    title="Mật khẩu"
                                    field="pass"
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    values={values}
                                    touched={touched}
                                ></Password>
                                <Password
                                    title="Nhập lại mật khẩu"
                                    field="rePass"
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    values={values}
                                    touched={touched}
                                ></Password>

                                <View style={style.gener}>
                                    <TouchableOpacity
                                        style={[styles.btnLogin, { backgroundColor: Color.primary, marginTop: 50 }]}
                                        onPress={() => {
                                            handleSubmit;
                                            checkEmailExist(values.email, values.pass, values.rePass);
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
                                            Tiếp tục
                                        </Text>
                                    </TouchableOpacity>
                                    <Footer navigate={navigation} />
                                </View>
                            </>
                        )}
                    </Formik>
                </KeyboardAwareScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}
export default Register;

const style = StyleSheet.create({
    title: {
        color: '#000',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 120,
        marginLeft: 120,
        marginBottom: 50,
    },

    gener: {
        fontSize: 16,
        marginLeft: 42,
        marginTop: 60,
        marginBottom: 25,
    },
});
