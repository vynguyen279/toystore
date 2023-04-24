import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';

import isFormValid from '../res/geners';
import { BtnBack, Inf, Footer } from '../components';
import { GetPassSchema } from '../constans/validation';
import { resetPass, sendPass } from '../services/untils';
import { AppContext } from './';
import styles from '../res/styles';
import Color from '../res/color';

function GetPass({ navigation }) {
    const sendEmail = (email, mess) => {
        const data = {
            EMAIL: email,
            mess: mess,
        };

        sendPass(data)
            .then(function (response) {
                if (response.data.status) {
                    Alert.alert('Thông báo', response.data.data, [
                        { text: 'OK', onPress: () => navigation.navigate('Login') },
                    ]);
                    navigation.goBack();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const resetPassKH = (email) => {
        const data = {
            EMAIL: email,
        };

        resetPass(data)
            .then(function (response) {
                if (response.data.status) {
                    sendEmail(email, response.data.data);
                } else {
                    Alert.alert('Thông báo', response.data.data, [
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
                    backgroundColor: 'white',
                    flex: 1,
                }}
            >
                <StatusBar />

                <BtnBack navigate={navigation} nameNavi="Login" />
                <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                    <Text style={style.title}>Quên mật khẩu</Text>
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={GetPassSchema}
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

                                <View style={style.gener}>
                                    <TouchableOpacity
                                        style={[styles.btnLogin, { backgroundColor: Color.primary, marginTop: 30 }]}
                                        onPress={() => {
                                            handleSubmit;
                                            resetPassKH(values.email);
                                        }}
                                        // disabled={!isFormValid(isValid, touched)}
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
                                            Gửi
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
export default GetPass;

const style = StyleSheet.create({
    title: {
        color: '#000',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 50,
        marginLeft: 60,
        marginBottom: 50,
    },

    gener: {
        fontSize: 16,
        marginLeft: 42,
        marginTop: 60,
        marginBottom: 25,
    },
});
