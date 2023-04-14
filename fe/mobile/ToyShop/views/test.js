import React, { useState, useContext, useEffect, StrictMode } from 'react';
import { SafeAreaView, Text, View, Alert, TouchableOpacity, Modal } from 'react-native';
export default function Test() {
    return (
        <Modal animationType="none" transparent={true} visible={true} onRequestClose={() => {}}>
            <View
                style={{
                    marginTop: 250,
                    marginLeft: 46,
                    height: 150,
                    width: 300,
                    backgroundColor: 'white',
                    elevation: 10,
                    borderColor: '#D0CFCF',
                    borderWidth: 1,
                    borderRadius: 20,
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{ fontSize: 16, fontWeight: 'bold', color: '#021A5A', marginTop: 10, fontFamily: 'Ubuntu' }}
                >
                    Thông báo
                </Text>
                <View style={{ height: 1, width: 150, backgroundColor: 'black', marginTop: 5 }} />
                <Text style={{ fontSize: 14, fontFamily: 'Ubuntu', marginTop: 20, fontWeight: '600' }}>
                    Cập nhật thành công
                </Text>
                <TouchableOpacity>
                    <View
                        style={{
                            height: 30,
                            width: 70,
                            backgroundColor: '#021A5A',
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 15,
                        }}
                    >
                        <Text style={{ fontSize: 14, color: 'white', fontFamily: 'Ubuntu', fontWeight: '600' }}>
                            Đồng ý
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
