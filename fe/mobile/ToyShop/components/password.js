import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../res/color';

function Password({ title, field, handleBlur, handleChange, values, errors, touched }) {
    const [eye, setEye] = useState('eye-slash');

    function change() {
        if (eye === 'eye') {
            setEye('eye-slash');
        }
        if (eye === 'eye-slash') {
            setEye('eye');
        }
    }

    return (
        <View style={style.gener}>
            <Text style={style.text}>{title}</Text>
            <View style={[style.fill, { flexDirection: 'row' }]}>
                <TextInput
                    secureTextEntry={eye === 'eye-slash' ? true : false}
                    style={{
                        marginHorizontal: 10,
                        flex: 9,
                    }}
                    onChangeText={handleChange(field)}
                    onBlur={handleBlur(field)}
                    value={values[field]}
                />
                <Icon
                    size={18}
                    name={eye}
                    onPress={() => change()}
                    style={{
                        color: Color.btn,
                        marginTop: 10,
                        flex: 1,
                    }}
                />
                {errors[field] && touched[field] ? <Text style={style.error}>{errors[field]}</Text> : null}
            </View>
        </View>
    );
}
export default Password;

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
        color: Color.error,
        position: 'absolute',
        top: 40,
    },
});
