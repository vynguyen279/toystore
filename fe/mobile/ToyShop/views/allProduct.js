import React,{ useState } from 'react';
import { Text,TextInput,View,StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card,BtnBackTab,Cart } from '../components';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectDropdown from 'react-native-select-dropdown';

import Color from '../res/color';

function AllProduct({ navigation }) {
    const cost=['Tất cả','100.000 - 300.000','300.000 - 700.000','700.000 - 1.000.000','>1.000.000'];
    const DATA=[
        {
            id: '1',
            name: '280pcs',
            price: '250.000',
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2021/07/Voi-3-510x510.jpg'
        },
        {
            id: '2',
            name: 'Ngôi làng tuyết',
            price: '240.000',
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2021/10/9701048963_2103832436-510x510.jpg'
        },
        {
            id: '3',
            name: 'Bàn bán bánh',
            price: '230.000',
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2022/07/O1CN01DGgHuD241eHc0KfVp_2210042677331-0-cib-510x510.jpg'
        },
        {
            id: '4',
            name: 'Gato thỏ gấu',
            price: '390.000',
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2022/08/Thiet-ke-chua-co-ten-15-510x510.png'
        },
        {
            id: '5',
            name: 'Biệt thự cao cấp',
            price: '1.290.000',
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2021/10/a.png'
        },
        {
            id: '6',
            name: 'Villa 3 tầng',
            price: '950.000',
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2021/09/Untitled-e1661010449524.png'
        },
        {
            id: '7',
            name: 'Đầu khủng long',
            price: '475.000',
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2022/02/3-1536x1365.png'
        },
        {
            id: '8',
            name: 'Xe bồn',
            price: '59.000',
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2021/07/DSCF0345-e1667291836835-1536x1058.png'
        },
        {
            id: '9',
            name: 'Xe cứu hỏa',
            price: '59.000',
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2021/07/DSCF0344-e1667292236848-1536x929.png'
        },
        {
            id: '10',
            name: 'Bể cá cho bé',
            price: '290.000',
            madeIn: 'USA',
            img: 'https://toystorevn.com/wp-content/uploads/2022/07/O1CN01IDHKA61ENJ0luyGv1_2449590339-0-cib-510x510.jpg'
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
                <Text style={styles.txt}>Sản phẩm</Text>
                <View style={{ marginLeft: 90 }}><Cart navigation={navigation} /></View>
            </View>
            <View style={{ marginLeft: 25,marginTop: 10,marginBottom: 20 }}>
                <View style={styles.search}>
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
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.filter}>
                        <Text style={styles.text}>Lọc theo giá</Text>
                    </View>
                    <View>
                        <SelectDropdown
                            defaultButtonText={'Tất cả'}
                            data={cost}
                            onSelect={(selectedItem,index) => {
                                console.log(selectedItem,index);
                            }}
                            buttonTextAfterSelection={(selectedItem,index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item,index) => {
                                return item;
                            }}
                            dropdownStyle={{ borderBottomRightRadius: 10,borderTopRightRadius: 10,marginBottom: 100 }}
                            buttonStyle={styles.btnDrop}
                            renderDropdownIcon={(isOpened) => {
                                return (
                                    <Icon name={isOpened? 'chevron-up':'chevron-down'} color={Color.btn} size={14} />
                                );
                            }}
                            rowTextStyle={styles.text}
                            buttonTextStyle={styles.text}
                            rowStyle={{ height: 40 }}
                            selectedRowStyle={{ backgroundColor: Color.selec }}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10,flexDirection: 'row',width: 340 }}>
                    <TouchableOpacity>
                        <View style={styles.btn}>
                            <Text style={styles.text}>Bán chạy</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.btn}>
                            <Text style={styles.text}>Giảm sốc</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.btn}>
                            <Text style={styles.text}>Mới nhất</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.btn}>
                            <Text style={styles.text}>Tất cả</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                <FlatList
                    numColumns={2}
                    style={{ marginHorizontal: 10 }}
                    data={DATA}
                    renderItem={({ item,index }) => <Card items={item} navigation={navigation} />}
                    keyExtractor={(item) => item.id}
                // // onMomentumScrollEnd={loadMore1}
                // onEndReached={loadMore1}
                // onEndReachedThreshold={0.1}
                // ListFooterComponent={renderFooter}
                />
            </KeyboardAwareScrollView>
        </View>
    );
}
export default AllProduct;

const styles=StyleSheet.create({
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
    search: {
        backgroundColor: Color.fill,
        flexDirection: 'row',
        width: 340,
        borderRadius: 10,
        height: 30,
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
    },
    btn: {
        backgroundColor: Color.unSelec,
        width: 73,
        height: 30,
        borderColor: Color.btn,
        borderWidth: 0.5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },

    filter: {
        height: 30,
        width: 130,
        backgroundColor: Color.selec,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: Color.btn,
        borderWidth: 1,
    },
    btnDrop: {
        height: 30,
        width: 210,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: Color.BG,
        borderColor: Color.btn,
        borderWidth: 1,
    },
});
