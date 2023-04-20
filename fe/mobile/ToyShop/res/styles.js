import { StyleSheet } from 'react-native';
import Color from './color';
const styles = StyleSheet.create({
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
        //marginTop: 5,
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

    dayBirth: {
        borderWidth: 1,
        borderColor: Color.selec,
        color: 'black',
        borderRadius: 4,
        width: 120,
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 75,
    },
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
});

export default styles;
