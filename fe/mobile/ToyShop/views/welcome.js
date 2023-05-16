import React, { useState, useContext, useEffect } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';

import { listCart } from '../services/untils';
import { addToCart, incrementQuantity } from '../store/CartReducer';
import Color from '../res/color';
import { AppContext } from './';

function Welcome({ navigation }) {
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
    const handleGetToken = async () => {
        const token = await AsyncStorage.getItem('user');
        if (!token) {
            navigation.navigate('Login');
        } else {
            setUser(JSON.parse(token));
            getListCart(user.MAKH);
            navigation.replace('MyTabs');
        }
    };
    useEffect(() => {
        setTimeout(() => {
            handleGetToken();
        }, 2000);
    });
    return (
        <View
            style={{
                backgroundColor: Color.primary,
                flex: 1,
            }}
        >
            <StatusBar />
            <Image source={require('../assets/icons/wc.png')} style={styles.img} />
            <View
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: 'auto',
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 45,
                        fontWeight: 'bold',
                    }}
                >
                    Let's Enjoy!
                </Text>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 21,
                        fontWeight: '300',
                    }}
                >
                    Welcome to ToddleFun
                </Text>
            </View>
            <View
                style={{
                    alignItems: 'center',
                    marginTop: 80,
                }}
            >
                {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                >
                    <Text style={styles.text}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Register');
                    }}
                >
                    <Text style={styles.txtReg}>Đăng ký</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('GetPass');
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 16,
                        }}
                    >
                        Quên mật khẩu?
                    </Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}
export default Welcome;

const styles = StyleSheet.create({
    img: {
        height: 300,
        width: 313,
        marginTop: 150,
        marginLeft: 38,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        width: 273,
        borderRadius: 40,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },

    txtReg: {
        color: 'white',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
    },
});
