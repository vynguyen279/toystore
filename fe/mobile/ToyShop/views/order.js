import React,{ useState } from 'react';
import { Text,View,StyleSheet,FlatList,TouchableOpacity,Image } from 'react-native';
import { BtnBackTab } from '../components';
import { StatusBar } from 'expo-status-bar';
import Color from '../res/color';
import { CardCate } from '../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

function Order({ navigation }) {
    const { cateGory,setCateGory }=useState([]);
    const DATA=[
        {
            id: 1,
            url: 'https://toystorevn.com/wp-content/uploads/2021/10/9701048963_2103832436-768x768.jpg',
            text: 'Ghép tranh',
        },
        {
            id: 2,
            url: 'https://toystorevn.com/wp-content/uploads/2021/10/DSCF0449-247x247.png',
            text: 'Học tập',
        },
        {
            id: 3,
            url: 'https://toystorevn.com/wp-content/uploads/2022/07/O1CN01GHvQkd1keJMvvspoK_2208279744708-0-cib-510x510.jpg',
            text: 'Khủng long',
        },
        {
            id: 4,
            url: 'https://toystorevn.com/wp-content/uploads/2022/06/4-510x510.png',
            text: 'Lắp ráp',
        },
        {
            id: 5,
            url: 'https://toystorevn.com/wp-content/uploads/2022/08/Thiet-ke-chua-co-ten-15-510x510.png',
            text: 'Mô hình',
        },
        {
            id: 6,
            url: 'https://toystorevn.com/wp-content/uploads/2021/10/a-247x247.png',
            text: 'Nhà thỏ',
        },
    ];
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
                <Text style={style.txt}>Đơn hàng</Text>
            </View>

            <View style={{ alignItems: 'center',marginTop: 15 }}>
                <View style={style.card}>
                    <Image
                        source={{ uri: 'https://toystorevn.com/wp-content/uploads/2021/10/a-247x247.png' }}
                        style={style.img}
                    />
                    <View style={style.txtFill}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.txtOrder}>Tổng tiền:</Text>
                            <Text style={[style.txtOrder,{ marginLeft: 10 }]}>2.000.000</Text>
                            <Text style={{ color: Color.btn }}>{' '}đ</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.txtOrder}>Số lượng:</Text>
                            <Text style={[style.txtOrder,{ marginLeft: 10 }]}>11</Text>
                        </View>
                        <View style={{ flexDirection: 'row',marginTop: 10,marginLeft: 20 }}>

                            <TouchableOpacity>
                                <View style={{ width: 75,height: 30,backgroundColor: Color.btn,borderRadius: 20,justifyContent: 'center',alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16,color: Color.BG,fontWeight: 'bold' }}>Hủy</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ width: 130,height: 30,backgroundColor: '#E5E910',borderRadius: 20,justifyContent: 'center',alignItems: 'center',marginLeft: 10 }}>
                                    <Text style={{ fontSize: 16,fontWeight: 'bold',color: Color.btn }}>Chờ xác nhận</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={style.card}>
                    <Image
                        source={{ uri: 'https://toystorevn.com/wp-content/uploads/2021/10/a-247x247.png' }}
                        style={style.img}
                    />
                    <View style={style.txtFill}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.txtOrder}>Tổng tiền:</Text>
                            <Text style={[style.txtOrder,{ marginLeft: 10 }]}>2.000.000</Text>
                            <Text style={{ color: Color.btn }}>{' '}đ</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.txtOrder}>Số lượng:</Text>
                            <Text style={[style.txtOrder,{ marginLeft: 10 }]}>11</Text>
                        </View>
                        <View style={{ flexDirection: 'row',marginTop: 20,marginLeft: 100 }}>
                            <TouchableOpacity>
                                <View style={{ width: 130,height: 30,backgroundColor: '#21CE1D',borderRadius: 20,justifyContent: 'center',alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16,fontWeight: 'bold',color: Color.btn }}>Hoàn thành</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={style.card}>
                    <Image
                        source={{ uri: 'https://toystorevn.com/wp-content/uploads/2021/10/a-247x247.png' }}
                        style={style.img}
                    />
                    <View style={style.txtFill}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.txtOrder}>Tổng tiền:</Text>
                            <Text style={[style.txtOrder,{ marginLeft: 10 }]}>2.000.000</Text>
                            <Text style={{ color: Color.btn }}>{' '}đ</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.txtOrder}>Số lượng:</Text>
                            <Text style={[style.txtOrder,{ marginLeft: 10 }]}>11</Text>
                        </View>
                        <View style={{ flexDirection: 'row',marginTop: 20,marginLeft: 150 }}>
                            <TouchableOpacity>
                                <View style={{ width: 75,height: 30,backgroundColor: '#FF2F2F',borderRadius: 20,justifyContent: 'center',alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16,fontWeight: 'bold',color: Color.btn }}>Đã hủy</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default Order;

const style=StyleSheet.create({
    header: {
        marginTop: 40,
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
    card: {
        height: 100,
        width: 350,
        backgroundColor: Color.fill,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 5
    },
    img: {
        height: 90,
        width: 90,
        borderRadius: 10,
        marginLeft: 5
    },
    txtFill: {
        marginTop: 10,
        marginLeft: 10,
        height: 100,
    },

    txtOrder: {
        fontSize: 16,
        fontWeight: '500',
        color: Color.btn,
    },
    detail: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 40,
        marginTop: 15
    },

});
