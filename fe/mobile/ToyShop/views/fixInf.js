import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-neat-date-picker';

import isFormValid from '../res/geners';
import { updateInf } from '../services/untils';
import { AppContext } from './';
import styles from '../res/styles';
import { Account, Inf, BtnConfirm, Phone, BtnBackTab } from '../components';
import { UpdateInformationSchema } from '../constans/validation';
import Color from '../res/color';

function FixInf({ navigation }) {
    const { user } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
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

    useEffect(() => {
        setEmail(user.EMAIL);
        setName(user.HOTEN);
        setPhone(user.SDT);
        setAddress(user.DIACHI);
        setSex(user.GIOITINH);
        setDate(user.NGAYSINH);
    }, []);
    const update = (Name, Phone, Email, Address) => {
        const data = {
            MAKH: user.MAKH,
            HOTEN: Name,
            SDT: Phone,
            EMAIL: Email,
            DIACHI: Address,
            NGAYSINH: date,
            GIOITINH: sex,
        };

        updateInf(data)
            .then(function (response) {
                if (response.data.status) {
                    user.EMAIL = Email;
                    user.HOTEN = Name;
                    user.SDT = Phone;
                    user.DIACHI = Address;
                    user.NGAYSINH = date;
                    user.GIOITINH = sex;
                    AsyncStorage.setItem('user', JSON.stringify(user));
                    Alert.alert('Thông báo', 'Cập nhật thành công!', [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate('Tài khoản', { name: user.HOTEN });
                            },
                        },
                    ]);
                } else {
                    Alert.alert('Thông báo', 'Email đã tồn tại!', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <View
            style={{
                backgroundColor: Color.BG,
                flex: 1,
            }}
        >
            <StatusBar />

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 42,
                }}
            >
                <BtnBackTab navigate={navigation} />
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        marginLeft: 40,
                        color: 'black',
                    }}
                >
                    Sửa thông tin cá nhân
                </Text>
            </View>
            <DatePicker isVisible={showDate} mode={'single'} onCancel={onCancel} onConfirm={onConfirm} />
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                <Account title={name}></Account>
                <Formik
                    initialValues={{ fullName: '', phone: '', email: '', address: '' }}
                    validationSchema={UpdateInformationSchema}
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
                                pH={name}
                            ></Inf>

                            <Phone
                                title="Số điện thoại"
                                field="phone"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                values={values}
                                touched={touched}
                                pH={phone}
                            ></Phone>

                            <Inf
                                title="Email"
                                field="email"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                values={values}
                                touched={touched}
                                pH={email}
                            ></Inf>

                            <Inf
                                title="Địa chỉ"
                                field="address"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors}
                                values={values}
                                touched={touched}
                                pH={address}
                            ></Inf>
                            <View style={{ width: 309, marginLeft: 42, marginTop: 20, flexDirection: 'row' }}>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>Giới tính</Text>
                                <RadioButton.Group onValueChange={(value) => setSex(value)} value={sex}>
                                    <View style={{ flexDirection: 'row', marginLeft: 0 }}>
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
                                    style={[
                                        styles.btnLogin,
                                        { backgroundColor: Color.btn, marginTop: 30, marginLeft: 42 },
                                    ]}
                                    onPress={() => {
                                        handleSubmit;
                                        update(
                                            values.fullName == '' ? user.HOTEN : values.fullName,
                                            values.phone == '' ? user.SDT : values.phone,
                                            values.email == '' ? user.EMAIL : values.email,
                                            values.address == '' ? user.DIACHI : values.address,
                                        );
                                    }}
                                    // disabled={!isFormValid(isValid, touched)}
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
                                        Cập nhật
                                    </Text>
                                </TouchableOpacity>
                                {/* <BtnConfirm
                                    title="Cập nhật"
                                    handleSubmit={handleSubmit}
                                    isValid={isValid}
                                    touched={touched}
                                    color={Color.btn}
                                ></BtnConfirm> */}
                            </View>
                        </>
                    )}
                </Formik>
            </KeyboardAwareScrollView>

            {/* <FiFoot></FiFoot> */}
        </View>
    );
}
export default FixInf;

const style = StyleSheet.create({
    gener: {
        fontSize: 16,
        marginBottom: 25,
    },
});
