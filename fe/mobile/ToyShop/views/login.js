import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BtnBack, Password, Inf, BtnConfirm } from '../components';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { LoginSchema } from '../constans/validation';

import Color from '../res/color';

function Login({ navigation }) {
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
                    <Text style={style.title}>Đăng nhập</Text>
                    <Formik
                        initialValues={{ email: '', pass: '' }}
                        validationSchema={LoginSchema}
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
                                <View style={style.gener}>
                                    <BtnConfirm
                                        title="Đăng nhập"
                                        handleSubmit={handleSubmit}
                                        isValid={isValid}
                                        touched={touched}
                                        color={Color.primary}
                                        navigate={navigation}
                                        nameNavi="MyTabs"
                                    ></BtnConfirm>

                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('GetPass');
                                        }}
                                    >
                                        <Text style={style.text}>Quên mật khẩu?</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </Formik>
                </KeyboardAwareScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}
export default Login;

const style = StyleSheet.create({
    title: {
        color: '#000',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 50,
        marginLeft: 100,
        marginBottom: 50,
    },

    gener: {
        marginTop: 60,
        marginBottom: 25,
        fontSize: 16,
        marginLeft: 42,
    },

    text: {
        color: 'black',
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 105,
    },
});
