import axios from 'axios';

const request = axios.create({
    baseURL: 'http://192.168.1.8:8080',
    responseType: 'json',
    withCredentials: true,
});
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
// export const get = async (path, options = {}) => {
//     console.log('path: ', path);
//     const response = await request.get(path, options);
//     return response.data;
// };

// export const post = async (path, options = {}) => {
//     try {
//         const result = await request(path, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             data: options,
//         });
//         console.log('result: ', result);
//         return result;
//     } catch (error) {
//         console.log(error);
//         return error.reponse.data;
//     }
// };

export default request;
