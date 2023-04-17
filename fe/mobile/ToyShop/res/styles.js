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
});

export default styles;
