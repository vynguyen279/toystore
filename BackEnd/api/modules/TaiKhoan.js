const DB = require("../components/SqlDb");

class TaiKhoan {
  constructor(TAIKHOAN, MATKHAU, CHUCVU, TRANGTHAI) {
    this.TAIKHOAN = TAIKHOAN;
    this.MATKHAU = MATKHAU;
    this.CHUCVU = CHUCVU;
    this.TRANGTHAI = TRANGTHAI;
  }

  static select(TAIKHOAN) {
    return DB.query(`SELECT * FROM DSTAIKHOAN WHERE TAIKHOAN = '${TAIKHOAN}'`);
  }
  static selectAll() {
    return DB.query(`SELECT * FROM DSTAIKHOAN`);
  }
  static insert(taiKhoan, trangthai) {
    return DB.query(
      `insert into DSTAIKHOAN(TAIKHOAN,MATKHAU,CHUCVU, TRANGTHAI) values ('${taiKhoan.TAIKHOAN}','${taiKhoan.MATKHAU}', '${taiKhoan.CHUCVU}', '${taiKhoan.TRANGTHAI}')`
    );
  }
  static update(TAIKHOAN, MATKHAU) {
    if (MATKHAU.length > 0) {
      return DB.query(
        `UPDATE DSTAIKHOAN SET MATKHAU = '${MATKHAU}' WHERE TAIKHOAN ='${TAIKHOAN}'`
      );
    }
    // else {
    //   return DB.query(`UPDATE TAIKHOAN SET KHOA ='${KHOA}' WHERE TENDANGNHAP ='${TENDANGNHAP}'`)
    // }
  }
  static updateTitle(TAIKHOAN, TRANGTHAI) {
    return DB.query(`UPDATE DSTAIKHOAN SET TRANGTHAI = '${TRANGTHAI}' WHERE TAIKHOAN = '${TAIKHOAN}'`);
  }
}

module.exports = TaiKhoan;
