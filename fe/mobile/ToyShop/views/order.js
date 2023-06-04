import React, { useContext } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Color from '../res/color';
import { AppContext } from './';
import { CardOrder } from '../components';

function Order({ navigation }) {
    const { listOrder } = useContext(AppContext);
    return (
        <View
            style={{
                backgroundColor: Color.BG,
                flex: 1,
            }}
        >
            <StatusBar />
            <View style={style.header}>
                <Text style={style.txt}>Đơn hàng</Text>
            </View>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: 'center', marginTop: 15 }}>
                    {listOrder.length == 0 ? (
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../assets/no-data.png')}
                                style={{ height: 300, width: 200, marginTop: 100 }}
                            />
                            <Text style={style.noData}>Chưa có đơn hàng</Text>
                        </View>
                    ) : (
                        listOrder.map((item, index) => <CardOrder item={item} navigation={navigation} />)
                    )}
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}
export default Order;

const style = StyleSheet.create({
    header: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    txt: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
    },

    noData: {
        textAlign: 'center',
        fontSize: 20,
        color: Color.btn,
        fontWeight: '500',
    },
});
