import axios from 'axios';

const request = axios.create({
    baseURL: 'http://192.168.2.12:8080',
    responseType: 'json',
    withCredentials: true,
});

export async function login(data) {
    return await request.post('TaiKhoan/DangNhap', data);
}

export async function getInf(data) {
    return await request.post('KhachHang/GetInf', data);
}
export async function getListBest(data) {
    return await request.post(`SanPham/Best`, data);
}

export async function getListSale(data) {
    return await request.post(`/SanPham/Sale`, data);
}

export async function getListNew(data) {
    return await request.post(`/SanPham/New`, data);
}

export async function getListCate(data) {
    return await request.post(`/SanPham/Cate`, data);
}

export async function filterProduct(data) {
    return await request.post(`/SanPham/Filter`, data);
}

export async function filterBSN(data) {
    return await request.post(`/SanPham/FilterBSN`, data);
}

export async function addCart(data) {
    return await request.post(`/GioHang/AddCart`, data);
}

export async function deleteCart(data) {
    return await request.post(`/GioHang/DeleteCart`, data);
}

export async function deleteAllCart(data) {
    return await request.post(`/GioHang/DeleteAllCart`, data);
}

export async function listCart(data) {
    return await request.post(`/GioHang/ListCart`, data);
}

export default request;
