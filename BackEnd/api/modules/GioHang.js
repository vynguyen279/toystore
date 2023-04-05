const DB = require('../components/SqlDb')

class GioHang {
    constructor(MSDDH, MASP, SL, ID){
        this.MSDDH = MSDDH
        this.MASP = MASP
        this.SL = SL
        this.ID = ID
    }

    static insert(params) {
        return DB.excute('SP_THEM_HANG_VAO_GIO', params)
    }
    static update(params) {
        return DB.excute('SP_CAP_NHAT_GIO_HANG', params)
    }
    static search(params) {
        return DB.excute('SP_TIM_KIEM_GIO_HANG', params)
    }
}

module.exports = GioHang