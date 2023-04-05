import React,{ useState } from 'react';
import { Text,View,StyleSheet,TouchableOpacity,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect,useSelector,useDispatch } from 'react-redux'
import { addToCart,removeFromCart,incrementQuantity } from '../store/CartReducer';
import Color from '../res/color';

function Card({ items,navigation }) {
    const cart=useSelector((state) => state.cart.cart);
    const dispatch=useDispatch();

    const addItemToCart=(items) => {
        dispatch(addToCart(items));
    }
    const incrementCart=(items) => {
        dispatch(incrementQuantity(items));
    }

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('DetailPro',{ item: items });
            }}
        >
            <View style={style.card}>
                <Image source={{ uri: items.img }} style={style.img} />
                <View style={{ flexDirection: 'row',marginTop: 15,justifyContent: 'space-between' }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={style.txtPro}>{items.name}</Text>
                        <Text style={style.txtMI}>{items.madeIn}</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <Text style={style.txtCost}>{items.price}</Text>
                            <Text style={style.txtVND}> VND</Text>
                        </View>
                    </View>
                    <View style={{ width: 40,justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => {
                                cart.some((value) => value.id==items.id)
                                    ? incrementCart(items):addItemToCart(items)
                            }}>
                            <View style={style.btnPlus}>
                                <Icon
                                    size={14}
                                    name={'plus'}
                                    style={{
                                        color: Color.BG,
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default Card;

const style=StyleSheet.create({
    card: {
        marginLeft: 20,
        marginBottom: 10,
        height: 220,
        width: 150,
        backgroundColor: Color.BG,
        borderRadius: 10,
        borderColor: Color.btn,
        borderWidth: 1,
        elevation: 5,
    },

    img: {
        height: 145,
        width: 148,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },

    txtPro: {
        fontSize: 14,
        fontWeight: '700',
        color: Color.btn,
    },

    txtMI: {
        fontSize: 10,
        color: Color.btn,
        fontWeight: '500',
    },

    txtCost: {
        fontSize: 12,
        color: Color.btn,
        fontWeight: '500',
    },

    txtVND: {
        fontSize: 12,
        color: Color.btn,
        fontWeight: '500',
    },

    btnPlus: {
        backgroundColor: Color.btn,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
});

