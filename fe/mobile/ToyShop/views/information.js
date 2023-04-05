import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { BtnBack, Inf, BtnConfirm, Footer, Phone } from '../components';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { InformationSchema } from '../constans/validation';

import Color from '../res/color';

function Information({ navigation }) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
                style={{
                    backgroundColor: Color.BG,
                    flex: 1,
                }}
            >
                <StatusBar />
                <BtnBack navigate={navigation} nameNavi="Register" />
                <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                    <Text style={style.title}>Thông tin cá nhân</Text>
                    <Formik
                        initialValues={{ fullName: '', phone: '', address: '' }}
                        validationSchema={InformationSchema}
                        onSubmit={(values) => {
                            // same shape as initial values
                            console.log(values);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                            <>
                                <Inf
                                    title="Họ tên"
                                    field="fullName"
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    values={values}
                                    touched={touched}
                                ></Inf>

                                <Phone
                                    title="Số điện thoại"
                                    field="phone"
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    values={values}
                                    touched={touched}
                                ></Phone>

                                {/* <Inf title="Email"
                                field="email"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                values={values}
                                touched={touched}
                            ></Inf> */}

                                <Inf
                                    title="Địa chỉ"
                                    field="address"
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    values={values}
                                    touched={touched}
                                ></Inf>

                                <View style={style.gener}>
                                    <BtnConfirm
                                        title="Tạo tài khoản"
                                        handleSubmit={handleSubmit}
                                        isValid={isValid}
                                        touched={touched}
                                        color={Color.primary}
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
export default Information;

const style = StyleSheet.create({
    title: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 50,
        marginLeft: 70,
    },

    gener: {
        fontSize: 16,
        marginLeft: 42,
        marginTop: 60,
        marginBottom: 25,
    },
});
