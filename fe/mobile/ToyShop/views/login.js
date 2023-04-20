import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BtnBack, Password, Inf, BtnConfirm } from '../components';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { addToCart, incrementQuantity } from '../store/CartReducer';
import { LoginSchema } from '../constans/validation';
import { login, getInf, listCart } from '../services/untils';
import { AppContext } from './';
import styles from '../res/styles';
import isFormValid from '../res/geners';
import Color from '../res/color';

function Login({ navigation }) {
    const { user, setUser } = useContext(AppContext);
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const addItemToCart = (items) => {
        dispatch(addToCart(items));
    };
    const incrementCart = (items) => {
        dispatch(incrementQuantity(items));
    };

    const addAll = (items, count) => {
        if (cart.some((value) => value.MASP == items.MASP)) {
            for (var i = 1; i <= count; i++) {
                incrementCart(items);
            }
        } else {
            addItemToCart(items);
            for (var i = 1; i < count; i++) {
                incrementCart(items);
            }
        }
    };
    const getListCart = (maKH) => {
        const data = {
            MAKH: maKH,
        };
        listCart(data)
            .then(function (response) {
                if (response.data.status) {
                    for (var i = 0; i < response.data.data.length; i++) {
                        const count = response.data.data[i].SOLUONG;
                        const items = {
                            MASP: response.data.data[i].MASP,
                            TENSP: response.data.data[i].TENSP,
                            LOAISP: response.data.data[i].LOAISP,
                            NUOCSX: response.data.data[i].NUOCSX,
                            NGAYTHEM: response.data.data[i].NGAYTHEM,
                            DONGIA: response.data.data[i].DONGIA,
                            MOTA: response.data.data[i].MOTA,
                            SOLUONGTON: response.data.data[i].SOLUONGTON,
                            HINHANH: response.data.data[i].HINHANH,
                            SALE: response.data.data[i].SALE,
                            TRANGTHAIXOA: response.data.data[i].TRANGTHAIXOA,
                        };
                        addAll(items, count);
                    }
                } else {
                    console.log(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const inf = (username, pass) => {
        const data = {
            EMAIL: username,
        };

        getInf(data)
            .then(function (response) {
                if (response.data.status) {
                    getListCart(response.data.data[0].MAKH);
                    const user = {
                        MATKHAU: pass,
                        MAKH: response.data.data[0].MAKH,
                        HOTEN: response.data.data[0].HOTEN,
                        DIACHI: response.data.data[0].DIACHI,
                        SDT: response.data.data[0].SDT,
                        EMAIL: response.data.data[0].EMAIL,
                        NGAYSINH: response.data.data[0].NGAYSINH,
                        GIOITINH: response.data.data[0].GIOITINH,
                        // accessToken: response.headers.authorization,
                        // refreshToken: response.data.data[0].refreshToken,
                    };
                    setUser(user);
                    AsyncStorage.setItem('user', JSON.stringify(user))
                        .then(() => console.log('Object stored successfully'))
                        .catch((error) => console.log('Error storing object: ', error));
                    navigation.navigate('MyTabs');
                } else {
                    Alert.alert('Thông báo!', response.data.data, [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const getLogin = (username, pass) => {
        const data = {
            TAIKHOAN: username,
            MATKHAU: pass,
        };

        login(data)
            .then(function (response) {
                if (response.data.status) {
                    Alert.alert('Thông báo!', 'Đăng nhập thành công!', [
                        {
                            text: 'OK',
                            onPress: () => {
                                inf(username, pass);
                            },
                        },
                    ]);
                } else {
                    Alert.alert('Thông báo!', response.data.data, [
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
                                <View style={styles.gener}>
                                    {/* <BtnConfirm
                                        title="Đăng nhập"
                                        handleSubmit={handleSubmit}
                                        isValid={isValid}
                                        touched={touched}
                                        color={Color.primary}
                                        // navigate={navigation}
                                        // nameNavi="MyTabs"
                                    ></BtnConfirm> */}
                                    <TouchableOpacity
                                        style={[styles.btnLogin, { backgroundColor: Color.primary, marginTop: 50 }]}
                                        onPress={() => {
                                            handleSubmit;
                                            getLogin(values.email, values.pass);
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
                                            Đăng nhập
                                        </Text>
                                    </TouchableOpacity>

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

    text: {
        color: 'black',
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 105,
    },
});
