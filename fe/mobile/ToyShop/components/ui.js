import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../res/color';

function BtnBack({ navigate, nameNavi }) {
    return (
        <TouchableOpacity
            style={style.back}
            onPress={() => {
                navigate.navigate(nameNavi);
            }}
        >
            <Icon
                size={15}
                name={'chevron-left'}
                style={{
                    color: Color.btn,
                }}
            />
        </TouchableOpacity>
    );
}

function BtnBackTab({ navigate }) {
    return (
        <TouchableOpacity
            style={style.backTab}
            onPress={() => {
                navigate.goBack();
            }}
        >
            <Icon
                size={15}
                name={'chevron-left'}
                style={{
                    color: Color.btn,
                }}
            />
        </TouchableOpacity>
    );
}

function Inf({ title, field, handleBlur, handleChange, errors, touched, values, pH }) {
    return (
        <View style={style.gener}>
            <Text style={style.text}>{title}</Text>
            <View style={style.fill}>
                <TextInput
                    style={{
                        marginLeft: 10,
                    }}
                    placeholder={pH}
                    onChangeText={handleChange(field)}
                    onBlur={handleBlur(field)}
                    value={values[field]}
                />
                {errors[field] && touched[field] ? <Text style={style.error}>{errors[field]}</Text> : null}
            </View>
        </View>
    );
}

function Phone({ title, field, handleBlur, handleChange, errors, touched, values, pH }) {
    return (
        <View style={style.gener}>
            <Text style={style.text}>{title}</Text>
            <View style={style.fill}>
                <TextInput
                    style={{
                        marginLeft: 10,
                    }}
                    placeholder={pH}
                    keyboardType="numeric"
                    onChangeText={handleChange(field)}
                    onBlur={handleBlur(field)}
                    value={values[field]}
                />
                {errors[field] && touched[field] ? <Text style={style.error}>{errors[field]}</Text> : null}
            </View>
        </View>
    );
}

function BtnConfirm({ title, handleSubmit, isValid, touched, color, navigate, nameNavi }) {
    function isFormValid(isValid, touched) {
        return isValid && Object.keys(touched).length !== 0;
    }

    return (
        <TouchableOpacity
            style={[style.btnLogin, { backgroundColor: color }]}
            onPress={() => {
                handleSubmit;
                navigate.navigate(nameNavi);
            }}
            disabled={!isFormValid(isValid, touched)}
        >
            <View
                style={{
                    opacity: isFormValid(isValid, touched) ? 1 : 0.5,
                }}
            ></View>
            <Text
                style={{
                    color: 'white',
                    fontSize: 18,
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

function Footer({ navigate }) {
    return (
        <View style={style.final}>
            <Text style={style.text}>Tôi đã có tài khoản </Text>
            <TouchableOpacity
                onPress={() => {
                    navigate.navigate('Login');
                }}
            >
                <Text style={style.txtLogin}>đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
}

function Account({ title }) {
    return (
        <View
            style={{
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Icon
                size={110}
                name={'user-circle'}
                style={{
                    color: Color.primary,
                }}
            />
            <Text
                style={{
                    marginTop: 5,
                    fontSize: 22,
                    color: 'black',
                    fontWeight: '500',
                }}
            >
                {title}
            </Text>
        </View>
    );
}

function Frame({ title, icon, navigate, nameNavi }) {
    return (
        <TouchableOpacity
            style={acc.frame}
            onPress={() => {
                navigate.navigate(nameNavi);
            }}
        >
            <Icon
                size={22}
                name={icon}
                style={{
                    color: Color.btn,
                    marginTop: 9,
                    marginLeft: 20,
                }}
            />
            <Text
                style={{
                    position: 'absolute',
                    fontSize: 16,
                    marginTop: 9,
                    marginLeft: 60,
                    color: 'black',
                    fontWeight: '500',
                }}
            >
                {title}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    navigate.navigate(nameNavi);
                }}
            >
                <Icon
                    size={18}
                    name="pen"
                    style={{
                        position: 'absolute',
                        color: Color.btn,
                        marginTop: 9,
                        marginLeft: 300,
                    }}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const acc = StyleSheet.create({
    frame: {
        width: 373,
        height: 42,
        backgroundColor: Color.fill,
        borderRadius: 8,
        marginTop: 10,
        flexDirection: 'row',
    },
});

export { BtnBack, BtnBackTab, Inf, BtnConfirm, Footer, Phone, Account, Frame };

const style = StyleSheet.create({
    gener: {
        fontSize: 16,
        marginLeft: 42,
        marginTop: 20,
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
    },

    fill: {
        width: 309,
        height: 42,
        backgroundColor: Color.fill,
        borderRadius: 8,
        marginTop: 5,
    },

    error: {
        color: 'red',
    },

    back: {
        backgroundColor: Color.fill,
        height: 41,
        width: 43,
        borderRadius: 10,
        marginTop: 42,
        marginLeft: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },

    backTab: {
        backgroundColor: Color.fill,
        height: 41,
        width: 43,
        borderRadius: 10,
        marginLeft: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnLogin: {
        width: 309,
        height: 42,
        borderRadius: 8,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    label: {
        color: 'white',
        fontSize: 18,
    },

    final: {
        marginTop: 20,
        marginLeft: 65,
        flexDirection: 'row',
    },

    txtLogin: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: Color.primary,
    },
});
