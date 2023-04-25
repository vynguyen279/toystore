const DB = require("../components/SqlDb");

class DonHang {
  constructor(MSDDH, HOTENKH, DIACHI, SDT, TRANGTHAI, EMAIL) {
    this.MSDDH = MSDDH;
    this.HOTENKH = HOTENKH;
    this.DIACHI = DIACHI;
    this.SDT = SDT;
    this.TRANGTHAI = TRANGTHAI;
    this.EMAIL = EMAIL;
  }

  static insert(params) {
    return DB.excute("SP_DON_DAT_HANG", params);
  }
  static getList(params) {
    return DB.excute("SP_LOC_DDH", params);
  }
  static getListKH(MAKH) {
    return DB.query(`SELECT * FROM DONDATHANG WHERE MAKH = '${MAKH}'`);
  }
  // static insert(params) {
  //     return DB.excute('SP_THEM_DDH', params)
  // }
  static update(MSDDH, TRANGTHAI) {
    return DB.query(
      `UPDATE DONDATHANG SET TRANGTHAI = '${TRANGTHAI}'  WHERE MSDDH = '${MSDDH}'`
    );
  }
  // static search(params) {
  //     return DB.excute('SP_TIM_KIEM_DDH', params)
  // }
}

module.exports = DonHang;
