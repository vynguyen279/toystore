import React,{ useState,useEffect } from 'react';
import { Text,View,StyleSheet,TouchableOpacity,} from 'react-native';
import { CardCart,BtnBackTab,} from '../components';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux'

import Color from '../res/color';

function ShopCart({ navigation }) {
    const cart=useSelector((state) => state.cart.cart);
    const [total,setTotal]=useState(Number(0));

    const totalMoney=() => {
        console.log('Total: '+total)
        cart.map((item) =>
            [setTotal((preState) => preState+(item.price*item.quantity))]
        )
        console.log('Total: '+total)
    }

    useEffect(() => {
        setTotal(0);
        totalMoney();
    },[cart]);

    return (
        <View
            style={{
                backgroundColor: Color.BG,
                flex: 1,
            }}
        >
            <StatusBar />

            <View style={style.header}>
                <BtnBackTab navigate={navigation} />
                <Text style={style.txt}>Giỏ hàng</Text>
            </View>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" >
                <View style={{ alignItems: 'center' }}>
                    {cart.map((item,index) => (<CardCart key={index} item={item} />))}
                </View>
            </KeyboardAwareScrollView>
            <View style={{ marginTop: 30,marginBottom: 50 }}>
                <View style={{ flexDirection: 'row',height: 60,marginLeft: 30 }}>
                    <Text style={style.total}>Thành tiền:</Text>
                    <Text style={[style.total,{ marginLeft: 20 }]}>{total}</Text>
                    <Text style={style.total}>đ</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity>
                        <View style={style.btnConfirm}>
                            <Text style={style.txtConfirm}>Thanh toán</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ShopCart;


const style=StyleSheet.create({
    header: {
        marginTop: 40,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },

    txt: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 90,
        color: 'black',
    },
    total: {
        fontSize: 25,
        color: Color.btn,
        fontWeight: 'bold'
    },
    txtConfirm: {
        fontSize: 20,
        fontWeight: '500',
        color: Color.BG,
    },
    btnConfirm: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 250,
        backgroundColor: Color.btn,
        borderRadius: 10,
    },
})