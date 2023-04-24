import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';

import { CardCart, BtnBackTab } from '../components';
import { AppContext } from './';
import { removeFromCart } from '../store/CartReducer';
import { addOrder, addDetail, deleteAllCart } from '../services/untils';
import Color from '../res/color';

function ShopCart({ navigation }) {
    const { user, listOrder } = useContext(AppContext);
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const removeItemFromCart = (items) => {
        dispatch(removeFromCart(items));
    };
    const [total, setTotal] = useState(Number(0));

    const totalMoney = () => {
        cart.map((item) => [
            setTotal((preState) => preState + (((100 - 100 * item.SALE) * item.DONGIA) / 100) * item.quantity),
        ]);
    };

    const cost = String(total).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const deleteCart = () => {
        let data = {
            MAKH: user.MAKH,
        };
        deleteAllCart(data)
            .then(function (res) {
                if (res.data.status) {
                    cart.map((item, index) => removeItemFromCart(item));
                    console.log(res.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const addDetailOrder = (MSDDH) => {
        cart.map((item) => {
            let dataDetail = {
                MSDDH: MSDDH,
                MASP: item.MASP,
                SL: item.quantity,
            };
            addDetail(dataDetail)
                .then(function (res) {
                    if (res.data.status) {
                        console.log(res.data.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
        deleteCart();
    };
    const addOrderKH = () => {
        let data = {
            MAKH: user.MAKH,
            TRANGTHAI: 'Chờ xác nhận',
        };
        addOrder(data)
            .then(function (response) {
                if (response.data.status) {
                    addDetailOrder(response.data.data[0].MSDDH);
                    ///listOrder.push(response.data.data[0]);
                    Alert.alert('Thông báo!', 'Đặt hàng thành công!', [
                        { text: 'OK', onPress: () => navigation.replace('MyTabs') },
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
    useEffect(() => {
        setTotal(0);
        totalMoney();
    }, [cart]);

    return (
        <View
            style={{
                backgroundColor: Color.BG,
                flex: 1,
            }}
        >
            <StatusBar />

            <View style={style.header}>
                <BtnBackTab navigate={navigation} />
                <Text style={style.txt}>Giỏ hàng</Text>
            </View>
            {cart.length == 0 ? (
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../assets/no-data.png')}
                        style={{ height: 300, width: 200, marginTop: 100 }}
                    />
                    <Text style={{ textAlign: 'center', fontSize: 20, color: Color.btn, fontWeight: '500' }}>
                        Chưa có sản phẩm
                    </Text>
                </View>
            ) : (
                <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                    <View style={{ alignItems: 'center' }}>
                        {cart.map((item, index) => (
                            <CardCart key={index} item={item} maKH={user.MAKH} />
                        ))}
                    </View>
                </KeyboardAwareScrollView>
            )}
            {cart.length == 0 ? (
                ''
            ) : (
                <View style={{ marginTop: 30, marginBottom: 50 }}>
                    <View style={{ flexDirection: 'row', height: 60, marginLeft: 30 }}>
                        <Text style={style.total}>Thành tiền:</Text>
                        <Text style={[style.total, { marginLeft: 20 }]}>{cost}</Text>
                        <Text style={style.total}>đ</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => addOrderKH()}>
                            <View style={style.btnConfirm}>
                                <Text style={style.txtConfirm}>Đặt hàng</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

export default ShopCart;

const style = StyleSheet.create({
    header: {
        marginTop: 40,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },

    txt: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 90,
        color: 'black',
    },
    total: {
        fontSize: 25,
        color: Color.btn,
        fontWeight: 'bold',
    },
    txtConfirm: {
        fontSize: 20,
        fontWeight: '500',
        color: Color.BG,
    },
    btnConfirm: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 250,
        backgroundColor: Color.btn,
        borderRadius: 10,
    },
});
