import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Color from '../res/color';
import { getListCate } from '../services/untils';

function CardCate({ item, navigation, index }) {
    const [cate, setCate] = useState([]);
    const key = String(item.text);
    const getCate = () => {
        let data = {
            KEY: key,
        };

        getListCate(data)
            .then((response) => {
                setCate(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getCate();
        console.log(cate);
    }, []);
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('AllProduct', { data: cate, name: key, type: '' });
            }}
        >
            <View style={[style.card]}>
                <Image
                    style={style.img}
                    source={{
                        uri: item.url,
                    }}
                />
                <Text style={style.txt}>{item.text}</Text>
            </View>
        </TouchableOpacity>
    );
}
const style = StyleSheet.create({
    card: {
        height: 140,
        width: 140,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Color.btn,
        backgroundColor: Color.BG,
        elevation: 5,
        marginLeft: 24,
        marginBottom: 20,
    },

    img: {
        height: 100,
        width: 100,
        resizeMode: 'center',
    },

    txt: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: '500',
        color: Color.btn,
    },
});
export default CardCate;
