import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect, useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, incrementQuantity } from '../store/CartReducer';
import Color from '../res/color';

function Card({ items, navigation }) {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const addItemToCart = (items) => {
        dispatch(addToCart(items));
    };
    const incrementCart = (items) => {
        dispatch(incrementQuantity(items));
    };

    const { MASP, TENSP, NUOCSX, DONGIA, HINHANH, SALE } = items;
    const sale = SALE * 100;
    const cost = String(((100 - sale) * DONGIA) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('DetailPro', { item: items, sale: sale });
            }}
        >
            <View style={style.card}>
                {sale != 0 ? (
                    <View style={style.sale}>
                        <Icon
                            size={12}
                            name={'minus'}
                            style={{
                                color: Color.BG,
                            }}
                        />
                        <Text style={{ fontSize: 15, color: Color.BG, fontWeight: '500' }}>{sale}</Text>
                        <Icon
                            size={12}
                            name={'percent'}
                            style={{
                                color: Color.BG,
                            }}
                        />
                    </View>
                ) : (
                    ''
                )}
                <Image source={{ uri: HINHANH }} style={style.img} />
                <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={style.txtPro}>{TENSP}</Text>
                        <Text style={style.txtMI}>{NUOCSX}</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            {sale != 0 ? (
                                <Text style={[style.txtCost, { color: Color.error }]}>{cost}</Text>
                            ) : (
                                <Text style={style.txtCost}>{cost}</Text>
                            )}
                            {sale != 0 ? (
                                <Text style={[style.txtVND, { color: Color.error }]}>đ</Text>
                            ) : (
                                <Text style={style.txtVND}>đ</Text>
                            )}
                        </View>
                    </View>
                    <View style={{ width: 40, justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => {
                                cart.some((value) => value.MASP == items.MASP)
                                    ? incrementCart(items)
                                    : addItemToCart(items);
                            }}
                        >
                            <View style={style.btnPlus}>
                                <Icon
                                    size={14}
                                    name={'plus'}
                                    style={{
                                        color: Color.BG,
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default Card;

const style = StyleSheet.create({
    card: {
        marginLeft: 20,
        marginBottom: 10,
        height: 220,
        width: 150,
        backgroundColor: Color.BG,
        borderRadius: 10,
        borderColor: Color.btn,
        borderWidth: 1,
        elevation: 5,
    },

    sale: {
        zIndex: 100,
        position: 'absolute',
        width: 55,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 5,
        marginTop: 5,
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    img: {
        height: 145,
        width: 148,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },

    txtPro: {
        fontSize: 14,
        fontWeight: '700',
        color: Color.btn,
    },

    txtMI: {
        fontSize: 10,
        color: Color.btn,
        fontWeight: '500',
    },

    txtCost: {
        fontSize: 12,
        color: Color.btn,
        fontWeight: '500',
    },

    txtVND: {
        fontSize: 12,
        color: Color.btn,
        fontWeight: '500',
    },

    btnPlus: {
        backgroundColor: Color.btn,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
});
