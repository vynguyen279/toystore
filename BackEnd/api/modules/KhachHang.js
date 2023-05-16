const DB = require("../components/SqlDb");

class KhachHang {
  constructor(MAKH, HOTEN, DIACHI, SDT, EMAIL, NGAYSINH, GIOITINH) {
    this.MAKH = MAKH;
    this.HOTEN = HOTEN;
    this.SDT = SDT;
    this.NGAYSINH = NGAYSINH;
    this.EMAIL = EMAIL;
    this.DIACHI = DIACHI;
    this.GIOITINH = GIOITINH;
  }
  static selectByEmail(EMAIL) {
    return DB.query(`SELECT MAKH, HOTEN, DIACHI, SDT, EMAIL, CONVERT(VARCHAR(10), NGAYSINH , 103) NGAYSINH, GIOITINH FROM KHACHHANG WHERE EMAIL ='${EMAIL}' OR MAKH = '${EMAIL}'`);
  }
  static getList() {
    return DB.query(`SELECT * FROM V_GETLIST_KH`);
  }
  static insert(params) {
    return DB.excute("SP_THEM_KHACH_HANG", params);
  }
  static update(params) {
    return DB.excute("SP_CAP_NHAT_KHACH_HANG", params);
  }
  static delete(params) {
    return DB.excute("SP_XOA_KHACH_HANG", params);
  }
  static search(params) {
    return DB.excute("SP_TIM_KIEM_KHACH_HANG", params);
  }
  static selectById(id) {
    return DB.query(`SELECT HOTEN, DIACHI, SDT, EMAIL, CONVERT(VARCHAR(10), NGAYSINH , 103) NGAYSINH, GIOITINH FROM KHACHHANG WHERE MAKH = '${id}'`)
}
}

module.exports = KhachHang;
