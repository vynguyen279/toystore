import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import DatePicker from 'react-native-neat-date-picker';

import isFormValid from '../res/geners';
import styles from '../res/styles';
import { register } from '../services/untils';
import { BtnBack, Inf, BtnConfirm, Footer, Phone } from '../components';
import { InformationSchema } from '../constans/validation';
import Color from '../res/color';

function Information({ navigation, route }) {
    const email = route.params?.email;
    const pass = route.params?.pass;
    const [showDate, setShowDate] = useState(false);
    const [sex, setSex] = useState(true);
    const [date, setDate] = useState(new Date());
    const openDatePicker = () => {
        setShowDate(true);
    };

    const onCancel = () => {
        // You should close the modal in here
        setShowDate(false);
    };

    const onConfirm = (date1) => {
        // You should close the modal in here
        setShowDate(false);
        setDate(date1.date);
    };
    const registerAcc = (name, phone, address) => {
        const data = {
            EMAIL: email,
            MATKHAU: pass,
            HOTEN: name,
            SDT: phone,
            DIACHI: address,
            NGAYSINH: date,
            GIOITINH: sex,
        };

        register(data)
            .then(function (response) {
                if (response.data.status) {
                    Alert.alert('Thông báo', response.data.data, [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                    navigation.navigate('Login');
                } else {
                    Alert.alert('Thông báo', response.data.data, [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
                style={{
                    backgroundColor: Color.BG,
                    flex: 1,
                }}
            >
                <StatusBar />
                <BtnBack navigate={navigation} nameNavi="Register" />
                <DatePicker isVisible={showDate} mode={'single'} onCancel={onCancel} onConfirm={onConfirm} />
                <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                    <Text style={style.title}>Thông tin cá nhân</Text>
                    <Formik
                        initialValues={{ fullName: '', phone: '', address: '' }}
                        validationSchema={InformationSchema}
                        onSubmit={(values) => {
                            // same shape as initial values
                            console.log(values);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                            <>
                                <Inf
                                    title="Họ tên"
                                    field="fullName"
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    values={values}
                                    touched={touched}
                                ></Inf>

                                <Phone
                                    title="Số điện thoại"
                                    field="phone"
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    values={values}
                                    touched={touched}
                                ></Phone>

                                <Inf
                                    title="Địa chỉ"
                                    field="address"
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    values={values}
                                    touched={touched}
                                ></Inf>
                                <View style={{ width: 309, marginLeft: 42, marginTop: 20 }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Giới tính</Text>
                                    <RadioButton.Group onValueChange={(value) => setSex(value)} value={sex}>
                                        <View style={{ flexDirection: 'row', marginLeft: 65 }}>
                                            <RadioButton.Item label="Nam" value={true} />
                                            <RadioButton.Item label="Nữ" value={false} />
                                        </View>
                                    </RadioButton.Group>
                                </View>
                                <View style={{ marginLeft: 42 }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Ngày sinh</Text>
                                    <TouchableOpacity onPress={openDatePicker}>
                                        <View style={styles.dayBirth}>
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontSize: 15,
                                                }}
                                            >
                                                {moment(date).format('yyyy-MM-DD')}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={style.gener}>
                                    <TouchableOpacity
                                        style={[styles.btnLogin, { backgroundColor: Color.primary, marginTop: 50 }]}
                                        onPress={() => {
                                            handleSubmit;
                                            registerAcc(values.fullName, values.phone, values.address);
                                        }}
                                        disabled={!isFormValid(isValid, touched)}
                                    >
                                        <View
                                            style={{
                                                opacity: isFormValid(isValid, touched) ? 1 : 0.5,
                                            }}
                                        ></View>
                                        <Text
                                            style={{
                                                color: 'white',
                                                fontSize: 18,
                                            }}
                                        >
                                            Tạo tài khoản
                                        </Text>
                                    </TouchableOpacity>
                                    <Footer navigate={navigation} />
                                </View>
                            </>
                        )}
                    </Formik>
                </KeyboardAwareScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}
export default Information;

const style = StyleSheet.create({
    title: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 50,
        marginLeft: 70,
    },

    gener: {
        fontSize: 16,
        marginLeft: 42,
        marginTop: 60,
        marginBottom: 25,
    },
});
