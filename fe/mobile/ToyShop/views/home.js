import React,{ useState } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Line,Card,Cart } from '../components';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Color from '../res/color';
//import { connect,useSelector,useDispatch } from 'react-redux'
//import { addToCart } from '../store/CartReducer';

function Home({ navigation }) {
    // const cart=useSelector((state) => state.cart.cart);
    // console.log(cart);
    // const dispatch=useDispatch();
    // const addItemToCart=(item) => {
    //     dispatch(addToCart(item));
    // }

    const DATA=[
        {
            id: '1',
            name: '280pcs',
            price: Number(250000),
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2021/07/Voi-3-510x510.jpg'
        },
        {
            id: '2',
            name: 'Ngôi làng tuyết',
            price: Number(240000),
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2021/10/9701048963_2103832436-510x510.jpg'
        },
        {
            id: '3',
            name: 'Bàn bán bánh',
            price: Number(230000),
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2022/07/O1CN01DGgHuD241eHc0KfVp_2210042677331-0-cib-510x510.jpg'
        },
        {
            id: '4',
            name: 'Gato thỏ gấu',
            price: Number(390000),
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2022/08/Thiet-ke-chua-co-ten-15-510x510.png'
        },
        {
            id: '5',
            name: 'Biệt thự cao cấp',
            price: Number(1290000),
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2021/10/a.png'
        },
        {
            id: '6',
            name: 'Villa 3 tầng',
            price: Number(950000),
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2021/09/Untitled-e1661010449524.png'
        },
        {
            id: '7',
            name: 'Đầu khủng long',
            price: Number(475000),
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2022/02/3-1536x1365.png'
        },
        {
            id: '8',
            name: 'Xe bồn',
            price: Number(59000),
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2021/07/DSCF0345-e1667291836835-1536x1058.png'
        },
        {
            id: '9',
            name: 'Xe cứu hỏa',
            price: Number(59000),
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2021/07/DSCF0344-e1667292236848-1536x929.png'
        },
        {
            id: '10',
            name: 'Bể cá cho bé',
            price: Number(290000),
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2022/07/O1CN01IDHKA61ENJ0luyGv1_2449590339-0-cib-510x510.jpg'
        },

    ];

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
                style={{
                    backgroundColor: 'white',
                    flex: 1,
                }}
            >
                <View
                    style={{
                        backgroundColor: Color.primary,
                        height: 100,
                    }}
                >
                    <StatusBar />
                    <View style={style.header}>
                        <View style={style.inHeader}>
                            <View style={style.search}>
                                <Icon
                                    size={20}
                                    name={'search'}
                                    fontWeight={100}
                                    style={{
                                        color: Color.btn,
                                        marginLeft: 5,
                                    }}
                                />
                                <TextInput
                                    style={{
                                        width: 262,
                                        height: 40,
                                    }}
                                    placeholder={'Tìm kiếm'}
                                />
                            </View>
                            <Cart navigation={navigation} />
                        </View>
                    </View>
                </View>
                <Image
                    source={require('../assets/anhNen.png')}
                    style={{
                        width: 373,
                        height: 144,
                    }}
                />
                <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                    <Line title="Sản phẩm bán chạy" navigate={navigation} nameNavi="AllProduct" />
                    <FlatList
                        horizontal
                        style={{}}
                        data={DATA}
                        renderItem={({ item }) => <Card items={item} navigation={navigation} />}
                        keyExtractor={(item) => item.id}
                    // // onMomentumScrollEnd={loadMore1}
                    // onEndReached={loadMore1}
                    // onEndReachedThreshold={0.1}
                    // ListFooterComponent={renderFooter}
                    />
                    {/* <Line title="Giảm giá sốc" navigate={navigation} nameNavi="AllProduct"  />
                    <FlatList
                        horizontal
                        style={{}}
                        data={DATA}
                        keyExtractor={(item) => item.id}
                    // // onMomentumScrollEnd={loadMore1}
                    // onEndReached={loadMore1}
                    // onEndReachedThreshold={0.1}
                    // ListFooterComponent={renderFooter}
                    />
                    <Line title="Sản phẩm mới" navigate={navigation} nameNavi="AllProduct" />
                    <FlatList
                        horizontal
                        style={{}}
                        data={DATA}
                        renderItem={({ item }) => <Card title={item.title} navigation={navigation} />}
                        keyExtractor={(item) => item.id}
                    // // onMomentumScrollEnd={loadMore1}
                    // onEndReached={loadMore1}
                    // onEndReachedThreshold={0.1}
                    // ListFooterComponent={renderFooter}
                    /> */}
                </KeyboardAwareScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}

// const mapDispatchToProps=(dispatch) => {
//     return {
//         addItemToCart: (product) => dispatch({
//             type: 'ADD_TO_CARD',
//             payload: product
//         })
//     }
// }
//export default connect(null,mapDispatchToProps)(Home);
export default Home;
const style=StyleSheet.create({
    header: {
        height: 70,
        marginTop: 30,
        justifyContent: 'center',
    },

    inHeader: {
        justifyContent: 'space-between',
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },

    search: {
        backgroundColor: Color.BG,
        flexDirection: 'row',
        width: 302,
        borderRadius: 10,
        marginLeft: 10,
        height: 30,
        alignItems: 'center',
    },
});
