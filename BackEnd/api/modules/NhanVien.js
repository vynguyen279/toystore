const DB = require('../components/SqlDb')

class NhanVien {
    constructor(MANV, HOTEN, SDT, NGAYVAOLAM, TRANGTHAI, HINHANH, EMAIL, DIACHI, GIOITINH){
        this.MANV = MANV
        this.HOTEN = HOTEN
        this.SDT = SDT
        this.NGAYVAOLAM = NGAYVAOLAM
        this.TRANGTHAI = TRANGTHAI
        this.EMAIL = EMAIL
        this.DIACHI = DIACHI
        this.HINHANH = HINHANH
        this.GIOITINH = GIOITINH
    }

    static getList() {
        return DB.query(`SELECT * FROM V_GETLIST_NV `)
      }
    static insert(params) {
        return DB.excute('SP_THEM_NHAN_VIEN', params)
    }
    static update(params) {
        return DB.excute('SP_CAP_NHAT_NHAN_VIEN', params)
    }
    static delete(params) {
        return DB.excute('SP_XOA_NHAN_VIEN', params)
    }
    static search(params) {
        return DB.excute('SP_TIM_KIEM_NHAN_VIEN', params)
    }
}

module.exports = NhanVien