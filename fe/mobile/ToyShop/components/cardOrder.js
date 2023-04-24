import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../res/styles';
import Color from '../res/color';
import { detail, updateOrder } from '../services/untils';

function CardOrder({ item, navigation }) {
    const [check, setCheck] = useState(true);
    const [total, setTotal] = useState(Number(0));
    const [count, setCount] = useState(Number(0));
    const [listDetail, setListDetail] = useState([]);
    const [url, setUrl] = useState('');

    const listDetailOrder = () => {
        let data = {
            MSDDH: item.MSDDH.toString().trim(),
        };
        setListDetail([]);
        detail(data)
            .then(function (res) {
                if (res.data.status) {
                    setUrl(res.data.data[0].HINHANH);
                    setListDetail(res.data.data);
                    AsyncStorage.setItem('listDetail', JSON.stringify(listDetail));
                    res.data.data.map((item) => [
                        setTotal((preState) => preState + (((100 - 100 * item.SALE) * item.DONGIA) / 100) * item.SL),
                        AsyncStorage.setItem('total', JSON.stringify(total)),
                        setCount((preState) => preState + item.SL),
                        AsyncStorage.setItem('count', JSON.stringify(count)),
                    ]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const updateOrderKH = () => {
        let data = {
            MSDDH: item.MSDDH.toString().trim(),
            TRANGTHAI: 'Đã hủy',
        };
        updateOrder(data)
            .then(function (res) {
                if (res.data.status) {
                    Alert.alert('Thông báo!', res.data.data, [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    useEffect(() => {
        listDetailOrder();
    }, [check]);
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                navigation.navigate('DetailOrder', { list: listDetail, date: item.NGAYDAT });
            }}
        >
            <Image source={{ uri: url }} style={styles.img} />
            <View style={style.txtFill}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={style.txtOrder}>Tổng tiền:</Text>
                    <Text style={[style.txtOrder, { marginLeft: 10 }]}>
                        {String(total).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </Text>
                    <Text style={{ color: Color.btn }}> đ</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={style.txtOrder}>Số lượng:</Text>
                    <Text style={[style.txtOrder, { marginLeft: 10 }]}>{count}</Text>
                </View>
                {item.TRANGTHAI.toString().trim() == 'Chờ xác nhận' ? (
                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 20 }}>
                        <TouchableOpacity
                            onPress={() =>
                                Alert.alert('Thông báo!', 'Bạn muốn hủy đơn hàng?', [
                                    { text: 'Không', onPress: () => console.log('Cancel Presses') },
                                    {
                                        text: 'Có',
                                        onPress: () => [updateOrderKH(), setCheck(!check), (item.TRANGTHAI = 'Đã hủy')],
                                    },
                                ])
                            }
                        >
                            <View style={style.btnCancel}>
                                <Text style={{ fontSize: 16, color: Color.BG, fontWeight: 'bold' }}>Hủy</Text>
                            </View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity> */}
                        <View style={style.btnConfirm}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Color.btn }}>Chờ xác nhận</Text>
                        </View>
                        {/* </TouchableOpacity> */}
                    </View>
                ) : item.TRANGTHAI.toString().trim() == 'Hoàn thành' ? (
                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 100 }}>
                        <View style={style.btnComplete}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Color.btn }}>Hoàn thành</Text>
                        </View>
                    </View>
                ) : (
                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 150 }}>
                        {/* <TouchableOpacity> */}
                        <View style={style.btnCanceled}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Color.btn }}>Đã hủy</Text>
                        </View>
                        {/* </TouchableOpacity> */}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}
export default CardOrder;

const style = StyleSheet.create({
    txtFill: {
        marginTop: 10,
        marginLeft: 10,
        height: 100,
    },

    txtOrder: {
        fontSize: 16,
        fontWeight: '500',
        color: Color.btn,
    },
    btnCancel: {
        width: 75,
        height: 30,
        backgroundColor: Color.btn,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnConfirm: {
        width: 130,
        height: 30,
        backgroundColor: '#E5E910',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    btnComplete: {
        width: 130,
        height: 30,
        backgroundColor: '#21CE1D',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnCanceled: {
        width: 75,
        height: 30,
        backgroundColor: '#FF2F2F',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
