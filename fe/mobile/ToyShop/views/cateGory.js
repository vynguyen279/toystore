import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { BtnBackTab } from '../components';
import { StatusBar } from 'expo-status-bar';
import Color from '../res/color';
import { CardCate } from '../components';

function CateGory({ navigation }) {
    const DATA = [
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

            <View style={styles.header}>
                <BtnBackTab navigate={navigation} />
                <Text style={styles.txt}>Danh mục</Text>
            </View>

            <FlatList
                key={'#'}
                numColumns={2}
                style={{ marginTop: 50, marginHorizontal: 20 }}
                data={DATA}
                renderItem={({ item, index }) => <CardCate item={item} navigation={navigation} />}
                keyExtractor={(item) => '#' + item.id}
                // // onMomentumScrollEnd={loadMore1}
                // onEndReached={loadMore1}
                // onEndReachedThreshold={0.1}
                // ListFooterComponent={renderFooter}
            />
        </View>
    );
}
export default CateGory;

const styles = StyleSheet.create({
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
    gener: {
        fontSize: 16,
        marginLeft: 42,
        marginTop: 60,
        marginBottom: 25,
    },
});
