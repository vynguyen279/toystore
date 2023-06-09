import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../res/styles';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../store/CartReducer';
import { addProCart, delProCart } from '../res/geners';
import Color from '../res/color';

function CardCart({ item, maKH }) {
    const { MASP, TENSP, NUOCSX, DONGIA, HINHANH, SALE, SOLUONGTON } = item;
    const sale = SALE * 100;
    const cost = String(((100 - sale) * DONGIA) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const dispatch = useDispatch();

    const incrementCart = (items) => {
        dispatch(incrementQuantity(items));
    };

    const removeItemFromCart = (items) => {
        dispatch(removeFromCart(items));
    };

    const decrementCart = (items) => {
        if (item.quantity == 1) {
            dispatch(removeFromCart(items));
        } else {
            dispatch(decrementQuantity(items));
        }
    };

    const checkCount = (count_1) => {
        if (count_1 > item.SOLUONGTON) {
            Alert.alert('Thông báo!', 'Vượt qua số lượng tồn!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        } else {
            incrementCart(item);
            addProCart(MASP, maKH, 1);
        }
    };
    return (
        <View style={styles.card}>
            <Image source={{ uri: HINHANH }} style={styles.img} />
            <View style={styles.txt}>
                <Text style={styles.txtName}>{TENSP}</Text>
                <Text style={styles.txtMI}>{NUOCSX}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.txtPrice}>{cost}</Text>
                    <Text style={{ color: Color.btn }}> đ</Text>
                </View>
            </View>
            <View style={{ height: 100, width: 70 }}>
                <View style={{ marginLeft: 30, marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            removeItemFromCart(item);
                            delProCart(MASP, maKH, item.quantity);
                        }}
                    >
                        <FontAwesome name="times" size={30} color={Color.btn} />
                    </TouchableOpacity>
                </View>

                <View style={style.detail}>
                    <TouchableOpacity
                        onPress={() => {
                            decrementCart(item);
                            delProCart(MASP, maKH, 1);
                        }}
                    >
                        <View style={style.btn}>
                            <FontAwesome name="minus" size={15} color="#FFFF" />
                        </View>
                    </TouchableOpacity>
                    <Text style={style.txtNum}>{item.quantity}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            checkCount(item.quantity + 1);
                        }}
                    >
                        <View style={style.btn}>
                            <FontAwesome name="plus" size={15} color="#FFFF" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
export default CardCart;

const style = StyleSheet.create({
    card: {
        height: 100,
        width: 350,
        backgroundColor: Color.fill,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 5,
    },
    img: {
        height: 90,
        width: 90,
        borderRadius: 10,
        marginLeft: 5,
    },
    txt: {
        marginLeft: 10,
        height: 100,
        justifyContent: 'center',
        width: 140,
    },
    txtName: {
        fontSize: 16,
        fontWeight: '700',
        color: Color.btn,
    },
    txtMI: {
        fontSize: 14,
        fontWeight: '500',
        color: Color.btn,
        marginBottom: 10,
    },
    txtPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: Color.btn,
    },
    detail: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 40,
        marginTop: 15,
    },
    btn: {
        backgroundColor: Color.btn,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        marginHorizontal: 5,
    },
    txtNum: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
