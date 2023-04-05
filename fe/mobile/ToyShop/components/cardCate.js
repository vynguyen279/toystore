import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Color from '../res/color';

function CardCate({ props, navigation, index }) {
    return (
        <TouchableOpacity>
            <View style={[style.card]}>
                <Image
                    style={style.img}
                    source={{
                        uri: props.url,
                    }}
                />
                <Text style={style.txt}>{props.text}</Text>
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
