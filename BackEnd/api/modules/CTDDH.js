const DB = require("../components/SqlDb");

class CTDDH {
  constructor(MSDDH, MASP, SL) {
    this.MSDDH = MSDDH;
    this.MASP = MASP;
    this.SL = SL;
  }

  static insert(params) {
    return DB.excute("SP_THEM_CHI_TIET_DON_HANG", params);
  }
  static getListKH(MSDDH) {
    return DB.query(
      `SELECT * FROM CTDDH INNER JOIN SANPHAM ON MSDDH = '${MSDDH}' AND CTDDH.MASP = SANPHAM.MASP`
    );
  }
  // static insert(params) {
  //     return DB.excute('SP_THEM_DDH', params)
  // }
  // static update(params) {
  //     return DB.excute('SP_CAP_NHAT_DDH', params)
  // }
  // static search(params) {
  //     return DB.excute('SP_TIM_KIEM_DDH', params)
  // }
}

module.exports = CTDDH;
