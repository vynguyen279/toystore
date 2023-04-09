import React, { useState, useContext, useEffect } from 'react';
import {
    Alert,
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
import { Line, Card, Cart } from '../components';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppContext } from './';
import { getListSale, getListBest, getListNew } from '../services/untils';
import Color from '../res/color';

function Home({ navigation }) {
    const {
        listBest,
        setListBest,
        listAllBest,
        setListAllBest,
        listSale,
        setListSale,
        listAllSale,
        setListAllSale,
        listNew,
        setListNew,
        listAllNew,
        setListAllNew,
    } = useContext(AppContext);

    const getBestProducts = () => {
        let data = {
            KEY: 5,
        };

        getListBest(data)
            .then((response) => {
                setListBest(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getSaleProducts = () => {
        let data = {
            KEY: 5,
        };

        getListSale(data)
            .then((response) => {
                setListSale(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAllSaleProducts = () => {
        let data = {
            KEY: 0,
        };

        getListSale(data)
            .then((response) => {
                setListAllSale(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getNewProducts = () => {
        let data = {
            KEY: 5,
        };

        getListNew(data)
            .then((response) => {
                setListNew(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAllNewProducts = () => {
        let data = {
            KEY: 0,
        };

        getListNew(data)
            .then((response) => {
                setListAllNew(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getBestProducts();
        getSaleProducts();
        getAllSaleProducts();
        getNewProducts();
        getAllNewProducts();
        console.log(listBest);
    }, []);

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
                        key={'#'}
                        horizontal
                        style={{}}
                        data={listBest}
                        renderItem={({ item, index }) => <Card items={item} navigation={navigation} />}
                        keyExtractor={(item) => '#' + item.MASP}
                        // // onMomentumScrollEnd={loadMore1}
                        // onEndReached={loadMore1}
                        // onEndReachedThreshold={0.1}
                        // ListFooterComponent={renderFooter}
                    />
                    <Line title="Giảm giá sốc" navigate={navigation} nameNavi="AllProduct" data={listAllSale} />
                    <FlatList
                        key={'.'}
                        horizontal
                        style={{}}
                        data={listSale}
                        renderItem={({ item, index }) => <Card items={item} navigation={navigation} />}
                        keyExtractor={(item) => '.' + item.MASP}
                        // // onMomentumScrollEnd={loadMore1}
                        // onEndReached={loadMore1}
                        // onEndReachedThreshold={0.1}
                        // ListFooterComponent={renderFooter}
                    />
                    <Line title="Sản phẩm mới" navigate={navigation} nameNavi="AllProduct" data={listAllNew} />
                    <FlatList
                        key={'!'}
                        horizontal
                        style={{}}
                        data={listNew}
                        renderItem={({ item, index }) => <Card items={item} navigation={navigation} />}
                        keyExtractor={(item) => '!' + item.MASP}
                        // // onMomentumScrollEnd={loadMore1}
                        // onEndReached={loadMore1}
                        // onEndReachedThreshold={0.1}
                        // ListFooterComponent={renderFooter}
                    />
                </KeyboardAwareScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Home;
const style = StyleSheet.create({
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
