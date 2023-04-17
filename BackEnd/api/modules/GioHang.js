const DB = require("../components/SqlDb");

class GioHang {
  constructor(ID, MASP, MAKH, SOLUONG) {
    this.ID = ID;
    this.MASP = MASP;
    this.MAKH = MAKH;
    this.SOLUONG = SOLUONG;
  }
  static select(MAKH) {
    return DB.query(
      ` SELECT SOLUONG,GIOHANG.MASP,TENSP,LOAISP,NUOCSX,NGAYTHEM,DONGIA,MOTA,SOLUONGTON,HINHANH,SALE,TRANGTHAIXOA FROM GIOHANG INNER JOIN SANPHAM ON GIOHANG.MASP = SANPHAM.MASP AND GIOHANG.MAKH ='${MAKH}'`
    );
  }
  static insert(params) {
    return DB.excute("SP_THEM_GIO_HANG", params);
  }
  static delete(params) {
    return DB.excute("SP_XOA_GIO_HANG", params);
  }
  static deleteAll(MAKH) {
    return DB.query(`DELETE FROM GIOHANG WHERE MAKH = '${MAKH}' `);
  }
  // static update(params) {
  //   return DB.excute("SP_CAP_NHAT_GIO_HANG", params);
  // }
  // static search(params) {
  //   return DB.excute("SP_TIM_KIEM_GIO_HANG", params);
  // }
}

module.exports = GioHang;
