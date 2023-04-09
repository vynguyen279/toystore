import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../res/color';

function Line({ title, navigate, nameNavi, data }) {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 5,
                marginLeft: 20,
            }}
        >
            <Text
                style={{
                    color: Color.btn,
                    fontWeight: '700',
                    fontSize: 14,
                }}
            >
                {title}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    navigate.navigate(nameNavi, { data: data });
                }}
            >
                <Icon
                    size={14}
                    name={'chevron-right'}
                    style={{
                        color: Color.btn,
                        marginRight: 30,
                    }}
                />
            </TouchableOpacity>
        </View>
    );
}
export default Line;
