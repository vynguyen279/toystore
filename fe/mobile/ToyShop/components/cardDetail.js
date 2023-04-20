import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import styles from '../res/styles';
import Color from '../res/color';

function CardDetail({ item, navigation }) {
    const sale = item.SALE * 100;
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetailPro', { item: item, sale: sale })}
        >
            <Image
                source={{
                    uri: item.HINHANH,
                }}
                style={styles.img}
            />
            <View style={styles.txt}>
                <Text style={styles.txtName}>{item.TENSP}</Text>
                <Text style={styles.txtMI}>{item.NUOCSX}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.txtPrice}>{String(item.DONGIA).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                    <Text style={{ color: Color.btn }}> đ</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 45 }}>
                <Text style={styles.txtName}>Số lượng: </Text>
                <Text style={styles.txtName}>{item.SL}</Text>
            </View>
        </TouchableOpacity>
    );
}
export default CardDetail;
