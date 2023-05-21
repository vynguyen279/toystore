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
    return DB.query(
      `SELECT MSDDH, MAKH, TRANGTHAI, CONVERT(VARCHAR(10), NGAYDAT , 103) NGAYDAT FROM DONDATHANG WHERE MAKH = '${MAKH}' ORDER BY MSDDH DESC`
    );
  }
  // static insert(params) {
  //     return DB.excute('SP_THEM_DDH', params)
  // }
  static update(MSDDH, TRANGTHAI) {
    return DB.query(
      `UPDATE DONDATHANG SET TRANGTHAI = N'${TRANGTHAI}'  WHERE MSDDH = '${MSDDH}'`
    );
  }

  static cancel(MSDDH) {
    return DB.query(
      `UPDATE DONDATHANG SET TRANGTHAI = N'Đã hủy'  WHERE MSDDH = '${MSDDH}'
      UPDATE SANPHAM  SET SOLUONGTON = SOLUONGTON + CTDDH.SL FROM SANPHAM INNER JOIN CTDDH ON SANPHAM.MASP = CTDDH.MASP AND CTDDH.MSDDH = '${MSDDH}'`
    );
  }
  // static search(params) {
  //     return DB.excute('SP_TIM_KIEM_DDH', params)
  // }
}

module.exports = DonHang;
