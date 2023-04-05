const DB = require('../components/SqlDb')

class KhachHang {
    constructor(MAKH, HOTEN, DIACHI, SDT, EMAIL, NGAYSINH, GIOITINH){
        this.MAKH = MAKH
        this.HOTEN = HOTEN
        this.SDT = SDT
        this.NGAYSINH = NGAYSINH
        this.EMAIL = EMAIL
        this.DIACHI = DIACHI
        this.GIOITINH = GIOITINH
    }

    static getList() {
        return DB.query(`SELECT * FROM V_GETLIST_KH`)
      }
    static insert(params) {
        return DB.excute('SP_THEM_KHACH_HANG', params)
    }
    static update(params) {
        return DB.excute('SP_CAP_NHAT_KHACH_HANG', params)
    }
    static delete(params) {
        return DB.excute('SP_XOA_KHACH_HANG', params)
    }
    static search(params) {
        return DB.excute('SP_TIM_KIEM_KHACH_HANG', params)
    }
}

module.exports = KhachHang