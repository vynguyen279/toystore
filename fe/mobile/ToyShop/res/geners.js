import { addCart, deleteCart } from '../services/untils';
import { Alert } from 'react-native';

const addProCart = (MASP, maKH, sl) => {
    let data = {
        MASP: MASP,
        MAKH: maKH,
        SOLUONG: sl,
    };

    addCart(data)
        .then((response) => {
            if (response.data.status) {
                console.log(response.data.data);
                Alert.alert('Thông báo!', 'Thêm thành công!', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            } else {
                console.log(response.data.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};
const delProCart = (MASP, maKH, sl) => {
    let data = {
        MASP: MASP,
        MAKH: maKH,
        SOLUONG: sl,
    };

    deleteCart(data)
        .then((response) => {
            if (response.data.status) {
                console.log(response.data.data);
                Alert.alert('Thông báo!', 'Xóa thành công!', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            } else {
                console.log(response.data.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};
export { addProCart, delProCart };
export default function isFormValid(isValid, touched) {
    return isValid && Object.keys(touched).length !== 0;
}
