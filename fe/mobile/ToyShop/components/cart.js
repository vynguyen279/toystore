import React,{ useState,useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../res/color';
import { useSelector } from 'react-redux'

function Cart({ navigation }) {
    const cart=useSelector((state) => state.cart.cart);
    const [count,setCount]=useState(0);

    const CountPro=() => {
        cart.map((item) =>
            [setCount((preState) => preState+item.quantity)]
        )
    }

    useEffect(() => {
        setCount(0);
        CountPro();
    },[cart]);

    return (
        <View >
            {cart.length!==0?
                (<View
                    style={style.numBer}>
                    <Text style={{ color: Color.btn }}>{count}</Text>
                </View>)
                :("")
            }
            <TouchableOpacity onPress={() => navigation.navigate('ShopCart')}>
                <Icon
                    name={'shopping-cart'}
                    size={25}
                    style={style.icon}
                />
            </TouchableOpacity>
        </View>
    );

}

// const mapStateToProps=(state) => {
//     return {
//         cartItems: state
//     }
// }
//export default connect()(Cart);
export default Cart;
const style=StyleSheet.create({
    numBer: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        backgroundColor: 'yellow',
        width: 25,height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        zIndex: 200
    },

    icon: {
        color: Color.btn,
        marginRight: 30,
    }

})