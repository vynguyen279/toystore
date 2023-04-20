const DB = require("../components/SqlDb");

class TaiKhoan {
  constructor(TAIKHOAN, MATKHAU, CHUCVU) {
    this.TAIKHOAN = TAIKHOAN;
    this.MATKHAU = MATKHAU;
    this.CHUCVU = CHUCVU;
  }

  static select(TAIKHOAN) {
    return DB.query(`SELECT * FROM DSTAIKHOAN WHERE TAIKHOAN = '${TAIKHOAN}'`);
  }
  static selectAll() {
    return DB.query(`SELECT * FROM DSTAIKHOAN`);
  }
  static insert(taiKhoan) {
    return DB.query(
      `insert into DSTAIKHOAN(TAIKHOAN,MATKHAU,CHUCVU) values ('${taiKhoan.TAIKHOAN}','${taiKhoan.MATKHAU}', '${taiKhoan.CHUCVU}')`
    );
  }
  static update(TAIKHOAN, MATKHAU) {
    console.log("update");
    if (MATKHAU.length > 0) {
      return DB.query(
        `UPDATE DSTAIKHOAN SET MATKHAU = '${MATKHAU}' WHERE TAIKHOAN ='${TAIKHOAN}'`
      );
    }
    // else {
    //   return DB.query(`UPDATE TAIKHOAN SET KHOA ='${KHOA}' WHERE TENDANGNHAP ='${TENDANGNHAP}'`)
    // }
  }
}

module.exports = TaiKhoan;
