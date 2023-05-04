import {axios} from './AxiosConfig';

// TAI KHOAN
export async function signIn(data) {
    return axios.post('/TaiKhoan/DangNhap', data);
}
export async function resetMK(data) {
    return axios.post('/TaiKhoan/ResetMatKhau', data);
}
export async function sendEmail(data) {
    return axios.post('/TaiKhoan/SendEmail', data);
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
}

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
    return axios.post(`/GioHang/DeleteAllCart`, data);
}

// DON HANG

export async function addOrder(data) {
    return axios.post('/DonHang/AddOrder', data);
}
export async function filterOrder(data) {
    return axios.post('/DonHang/FilterOrder', data);
}
export async function updateOrder(data) {
    return axios.post('/DonHang/UpdateOrder', data);
}
export async function addDetailOrder(data) {
    return axios.post('/CTDDH/AddDetail', data);
}
export async function getInfoPurchase(data) {
    return axios.post('/CTDDH/Detail', data);
}

// HOA DON
export async function getListBill(data) {
    return axios.post('/HoaDon/GetList', data);
}

export async function addBill(data) {
    return axios.post('/HoaDon/Insert', data);
}


