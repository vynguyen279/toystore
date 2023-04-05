import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { BtnBack, Password, Inf, BtnConfirm, Footer } from '../components';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { SignupSchema } from '../constans/validation';

import Color from '../res/color';

function Register({ navigation }) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
                style={{
                    backgroundColor: Color.BG,
                    flex: 1,
                }}
            >
                <StatusBar />

                <BtnBack navigate={navigation} nameNavi="Welcome" />
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
                                {/* <Inf title="Tên đăng nhập"
                                field="user"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                values={values}
                                touched={touched}
                            ></Inf> */}
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
                                    <BtnConfirm
                                        title="Tiếp tục"
                                        handleSubmit={handleSubmit}
                                        isValid={isValid}
                                        touched={touched}
                                        color={Color.primary}
                                        navigate={navigation}
                                        nameNavi="Information"
                                    ></BtnConfirm>
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
        marginTop: 50,
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
