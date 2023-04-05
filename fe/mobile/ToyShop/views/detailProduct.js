import React,{ useState } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { Text,Image,View,StyleSheet,TouchableOpacity } from 'react-native';
import { BtnBackTab } from '../components';
import { StatusBar } from 'expo-status-bar';
import { addToCart,incrementQuantity } from '../store/CartReducer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Color from '../res/color';

function DetailPro({ navigation,route }) {
    const [count,setCount]=useState(1);
    const items=route.params?.item;
    const cart=useSelector((state) => state.cart.cart);
    const dispatch=useDispatch();

    const addItemToCart=(items) => {
        dispatch(addToCart(items));
    }

    const incrementCart=(items) => {
        dispatch(incrementQuantity(items));
    }

    const addAll=(items) => {
        console.log(count);
        if (cart.some((value) => value.id==items.id)) {
            for (var i=1;i<=count;i++) {
                incrementCart(items);
            }
        } else {
            addItemToCart(items);
            for (var i=1;i<count;i++) {
                incrementCart(items);
            }
        }
        navigation.goBack();
    };

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
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                }}
            >
                <Image
                    source={{
                        uri: items.img,
                    }}
                    style={{ height: 360,width: 360 }}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    marginTop: 50,
                    backgroundColor: Color.primary,
                    borderTopLeftRadius: 100,
                }}
            >
                <View style={{ flexDirection: 'row',marginTop: 15 }}>
                    <View style={{ marginLeft: 40,marginTop: 50 }}>
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
                    <View style={style.detail}>
                        <TouchableOpacity
                            disabled={count==1? true:false}
                            onPress={() => setCount(count-1)}
                        >
                            <View style={style.btn}>
                                <FontAwesome name="minus" size={20} color="#FFFF" style={{}} />
                            </View>
                        </TouchableOpacity>
                        <Text style={style.txtNum}>{count}</Text>
                        <TouchableOpacity onPress={() => setCount(count+1)}>
                            <View style={style.btn}>
                                <FontAwesome name="plus" size={20} color="#FFFF" style={{}} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20,alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { addAll(items) }}>
                        <View style={style.btnConfirm}>
                            <Text style={style.txtConfirm}>Thêm vào giỏ hàng</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
export default DetailPro;

const style=StyleSheet.create({
    header: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    txtPro: {
        fontSize: 30,
        fontWeight: '700',
        color: Color.btn,
    },

    txtMI: {
        fontSize: 15,
        color: Color.btn,
        fontWeight: '500',
    },

    txtCost: {
        fontSize: 30,
        color: Color.btn,
        fontWeight: '500',
    },

    txtNum: {
        fontSize: 25,
        color: Color.btn,
        fontWeight: '500',
    },

    txtVND: {
        fontSize: 30,
        color: Color.btn,
        fontWeight: '500',
    },

    txtConfirm: {
        fontSize: 20,
        fontWeight: '500',
        color: Color.BG,
    },

    btn: {
        backgroundColor: Color.btn,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        marginHorizontal: 5,
    },

    btnConfirm: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 250,
        backgroundColor: Color.btn,
        borderRadius: 10,
    },

    detail: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 40,
        marginTop: 90,
        marginLeft: 260,
    },
});
