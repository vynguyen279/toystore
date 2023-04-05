import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { BtnBack, Inf, BtnConfirm, Footer } from '../components';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { GetPassSchema } from '../constans/validation';

import Color from '../res/color';

function GetPass({ navigation }) {
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
                                    <BtnConfirm
                                        title="Gửi"
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
