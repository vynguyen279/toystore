const DB = require("../components/SqlDb");

class SanPham {
  constructor(
    MASP,
    TENSP,
    LOAISP,
    NUOCSX,
    DONGIA,
    MOTA,
    SOLUONGTON,
    HINHANH,
    SALE,
    TRANGTHAIXOA
  ) {
    this.MASP = MASP;
    this.TENSP = TENSP;
    this.LOAISP = LOAISP;
    this.NUOCSX = NUOCSX;
    this.DONGIA = DONGIA;
    this.MOTA = MOTA;
    this.SOLUONGTON = SOLUONGTON;
    this.HINHANH = HINHANH;
    this.SALE = SALE;
    this.TRANGTHAIXOA = TRANGTHAIXOA;
  }

  static selectAll() {
    return DB.query(`SELECT * FROM V_GETLIST_SP`);
  }

  static selectNewSP(params) {
    return DB.excute(`SP_SAN_PHAM_NEW`, params);
  }

  static selectSaleSP(params) {
    return DB.excute(`SP_SAN_PHAM_SALE`, params);
  }

  static selectBestSP(params) {
    return DB.excute(`SP_SAN_PHAM_BAN_CHAY`, params);
  }

  static selectCate(params) {
    return DB.excute(`SP_SAN_PHAM_DANH_MUC`, params);
  }

  static selectType() {
    return DB.query(`SELECT * FROM V_GETLIST_TYPE`);
  }
  static insert(params) {
    return DB.excute("SP_THEM_SAN_PHAM", params);
  }
  static update(params) {
    return DB.excute("SP_CAP_NHAT_SAN_PHAM", params);
  }
  static delete(params) {
    return DB.excute("SP_XOA_SAN_PHAM", params);
  }
  static search(params) {
    return DB.excute("SP_TIM_KIEM_SAN_PHAM", params);
  }
}

module.exports = SanPham;
