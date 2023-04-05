import React from 'react';
import { Button, Image, Text, View, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Color from '../res/color';

function Welcome({ navigation }) {
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
                <TouchableOpacity
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
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default Welcome;

const styles = StyleSheet.create({
    img: {
        height: 300,
        width: 313,
        marginTop: 43,
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
