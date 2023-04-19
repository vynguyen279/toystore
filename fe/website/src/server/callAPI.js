import {axios} from './AxiosConfig';

// TAI KHOAN
export async function signIn(data) {
    return axios.post('/TaiKhoan/DangNhap', data);
}
export async function signUp(data) {
    return axios.put('/TaiKhoan/CapTaiKhoanOrResetMatKhau', data);
}
export async function changePassword(data) {
    return axios.put('/TaiKhoan/DoiMatKhau', data);
}
export async function imgUpload(data) {
    var form = new FormData();
  form.append('image', data);
  return fetch(
    'https://api.imgbb.com/1/upload?key=4c4909ed144cd9ff41bd9bb2d2aa7fbb',
    {
      method: 'POST',
      mimeType: 'multipart/form-data',
      contentType: false,
      body: form,
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
    //   console.log(res.data.image.url);
      return res.data.image.url;
    });
    // let body = new FormData()
    // body.set('key', '4c4909ed144cd9ff41bd9bb2d2aa7fbb')
    // body.append('image', data)

    // return axios({
    //   method: 'post',
    //   url: 'https://api.imgbb.com/1/upload',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   data: body
    // })
}
// export async function forgotPassword(data) {
//     return axios.post('/account/forgot-password', data);
// }

// SAN PHAM 
export async function getListProduct(data) {
    return axios.post('/SanPham/GetList', data);
}

export async function getListType() {
    return axios.post('/SanPham/GetListType');
}

export async function addProduct(data) {
    return axios.post('/SanPham/Insert', data);
}

export async function updateProduct(data) {
    return axios.put(`/SanPham/Update`, data);
}

export async function deleteProduct(data) {
    return axios.post('/SanPham/Delete', data);
}

export async function searchProduct(data) {
    return axios.get(`/SanPham/Search`, data);
}

export async function filterProduct(data) {
    return axios.post(`/SanPham/Filter`, data);
}

export async function getListSale(data) {
    return axios.post(`/SanPham/Sale`, data);
}
export async function getListNew(data) {
    return axios.post(`/SanPham/New`, data);
}
export async function getListBest(data) {
    return axios.post(`/SanPham/Best`, data);
}

// KHACH HANG
export async function getListCustomer(data) {
    return axios.post('/KhachHang/GetList', data);
}

export async function addCustomer(data) {
    return axios.post('/KhachHang/Insert', data);
}

export async function updateCustomer(data) {
    return axios.put(`/KhachHang/Update`, data);
}

export async function deleteCustomer(data) {
    return axios.post('/KhachHang/Delete', data);
}

export async function searchCustomer(data) {
    return axios.post(`/KhachHang/Search`, data);
}

export async function getInfo(data) {
    return axios.post(`/KhachHang/GetInf`, data);
}

// NHAN VIEN
export async function getListOfficer(data) {
    return axios.post('/NhanVien/GetList', data);
}

export async function addOfficer(data) {
    return axios.post('/NhanVien/Insert', data);
}

export async function updateOfficer(data) {
    return axios.post(`/NhanVien/Update`, data);
}

export async function deleteOfficer(data) {
    return axios.post('/NhanVien/Delete', data);
}

export async function searchOfficer(data) {
    return axios.get(`/NhanVien/Search`, data);
}
// GIOHANG
export async function addCart(data) {
    return axios.post('/GioHang/AddCart', data);
}

export async function deleteCart(data) {
    return axios.post('/GioHang/DeleteCart', data);
}

export async function listCart(data) {
    return axios.post(`/GioHang/ListCart`, data);
}

export async function deleteAllCart(data) {
    return axios.post('/GioHang/DeleteAllCart', data);
}




// export async function getListTour(searchKey = '', paging = 1) {
//     return axios.get(`/tour/list?${searchKey && 'key=' + searchKey}&paging=${paging}`);
// }
// export async function getListOrderOfTour(idTour) {
//     return axios.get(`/order-tours/list?idTour=${idTour}`);
// }
// export async function getTour(id) {
//     return axios.get(`/tour/${id}/detail`);
// }
// export async function orderTour(data) {
//     return axios.post('/order-tours/order', data);
// }
// export async function getListOrderTour(id = '', status = 'Tất cả') {
//     return axios.get(`/order-tours/list?id=${id}&status=${status}`);
// }
// export async function getOwnInfor() {
//     return axios.get(`site/get-own-infor`);
// }
// export async function changePassword(data) {
//     return axios.patch('/account/change-password', data);
// }
// export async function updateCustomerInfo(data) {
//     return axios.patch('/customer/update', data);
// }
// export async function updateStaffInfo(data, id) {
//     return axios.put(`/staff/${id}/update`, data);
// }

// export async function addStaff(data) {
//     return axios.post('/staff/add', data);
// }

// export async function updateTour(data, idTour) {
//     return axios.put(`/tour/${idTour}/update`, data);
// }
// export async function requestCancelTour(idTourOrder) {
//     return axios.patch(`/order-tours/${idTourOrder}/customer-need-cancel`);
// }
// export async function confirmCancelTour(idTourOrder) {
//     return axios.patch(`/order-tours/${idTourOrder}/cancel`);
// }
// export async function confirmOrderTour(idTourOrder) {
//     return axios.patch(`/order-tours/${idTourOrder}/confirm`);
// }

