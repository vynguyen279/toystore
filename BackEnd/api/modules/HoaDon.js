const DB = require('../components/SqlDb')

class HoaDon {
    constructor(SOHD, NGAYLAPHD, MANV, TONGGIA, MSDDH){
        this.SOHD = SOHD
        this.NGAYLAPHD = NGAYLAPHD
        this.MANV = MANV
        this.TONGGIA = TONGGIA
        this.MSDDH = MSDDH
    }

    static insert(params) {
        return DB.excute('SP_THEM_HOA_DON', params)
    }
    static getList() {
        return DB.query(`SELECT * FROM HOADON`)
      }
}

module.exports = HoaDon