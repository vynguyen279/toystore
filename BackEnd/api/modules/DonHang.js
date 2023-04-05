const DB = require('../components/SqlDb')

class DonHang {
    constructor(MSDDH, HOTENKH, DIACHI, SDT, TRANGTHAI, EMAIL){
        this.MSDDH = MSDDH
        this.HOTENKH = HOTENKH
        this.DIACHI = DIACHI
        this.SDT = SDT
        this.TRANGTHAI = TRANGTHAI
        this.EMAIL = EMAIL
    }

    static getList() {
        return DB.query(`SELECT * FROM DONDATHANG`)
      }
    static insert(params) {
        return DB.excute('SP_THEM_DDH', params)
    }
    static update(params) {
        return DB.excute('SP_CAP_NHAT_DDH', params)
    }
    static search(params) {
        return DB.excute('SP_TIM_KIEM_DDH', params)
    }
}

module.exports = DonHang