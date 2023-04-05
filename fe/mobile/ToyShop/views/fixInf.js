import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { BtnBack, Account, FiFoot, Inf, BtnConfirm, Footer, Phone, BtnBackTab } from '../components';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { InformationSchema } from '../constans/validation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../res/color';

function FixInf({ navigation }) {
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
                }}
            >
                <BtnBackTab navigate={navigation} />
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        marginTop: 42,
                        marginLeft: 40,
                        color: 'black',
                    }}
                >
                    Sửa thông tin cá nhân
                </Text>
            </View>

            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                <Account title="Thùy Trang"></Account>
                <Formik
                    initialValues={{ fullName: '', phone: '', email: '', address: '' }}
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

                            <Inf
                                title="Email"
                                field="email"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                values={values}
                                touched={touched}
                            ></Inf>

                            <Inf
                                title="Địa chỉ"
                                field="address"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                values={values}
                                touched={touched}
                            ></Inf>

                            <View style={styles.gener}>
                                <BtnConfirm
                                    title="Cập nhật"
                                    handleSubmit={handleSubmit}
                                    isValid={isValid}
                                    touched={touched}
                                    color={Color.btn}
                                ></BtnConfirm>
                            </View>
                        </>
                    )}
                </Formik>
            </KeyboardAwareScrollView>

            {/* <FiFoot></FiFoot> */}
        </View>
    );
}
export default FixInf;

const styles = StyleSheet.create({
    back: {
        backgroundColor: Color.fill,
        height: 41,
        width: 43,
        borderRadius: 10,
        marginTop: 42,
        marginLeft: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gener: {
        fontSize: 16,
        marginLeft: 42,
        marginTop: 60,
        marginBottom: 25,
    },
});
