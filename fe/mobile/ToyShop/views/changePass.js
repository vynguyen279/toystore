import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { BtnBack, Account, FiFoot, BtnConfirm, Password } from '../components';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { ChangePassSchema } from '../constans/validation';
import Color from '../res/color';

function ChangePass({ navigation }) {
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
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <BtnBack navigate={navigation} nameNavi="AccountUser" />
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        marginTop: 42,
                        marginLeft: 40,
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
        </View>
    );
}
export default ChangePass;

const styles = StyleSheet.create({
    // button: {
    //     marginTop: 10,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width: 373,
    //     height: 42,
    //     borderRadius: 40,
    //     backgroundColor: Color.btn,
    // },
    // text: {
    //     fontSize: 20,
    //     lineHeight: 21,
    //     fontWeight: 'bold',
    //     letterSpacing: 0.25,
    //     color: 'white',
    // },
    gener: {
        fontSize: 16,
        marginLeft: 42,
        marginTop: 60,
        marginBottom: 25,
    },
});
