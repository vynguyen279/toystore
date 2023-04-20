const json = require("../components/json");
const bcrypt = require("bcrypt");
const TaiKhoan = require("../modules/TaiKhoan");
const KhachHang = require("../modules/KhachHang");

class TaiKhoanControllers {
  index(req, res) {
    res.send("TaiKhoan");
  }
  checkEmail = async (req, res) => {
    const { EMAIL } = req.body;
    let params = [{ name: "EMAIL", type: "Nchar(200)", value: EMAIL }];
    let rs = await TaiKhoan.select(EMAIL);
    if (rs.length > 0) {
      res.send(
        json(false, "Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác!")
      );
    } else {
      res.send(json(true, "Email chưa tồn tại!"));
    }
  };

  capTaiKhoan = async (req, res) => {
    const { HOTEN, DIACHI, SDT, EMAIL, NGAYSINH, GIOITINH, MATKHAU } = req.body;

    let rs = await TaiKhoan.select(EMAIL);
    if (rs.length > 0) {
      //random và mã hóa mật khẩu
      // let MATKHAU = Date.now().toString(36);
      // let salt = await bcrypt.genSalt(10);
      // let encryptedMATKHAU = await bcrypt.hash(MATKHAU, salt);
      // rs = await TaiKhoan.updateTaiKhoan(TENDANGNHAP, encryptedMATKHAU);
      // console.log("Cấp lại mật khẩu thành công, mật khẩu mới: " + MATKHAU);
      res.send(
        json(false, "Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác!")
      );
      return;
    }

    let params = [
      { name: "HOTEN", type: "Nvarchar(50)", value: HOTEN },
      { name: "DIACHI", type: "Nvarchar(100)", value: DIACHI },
      { name: "SDT", type: "Nchar(10)", value: SDT },
      { name: "EMAIL", type: "Nchar(200)", value: EMAIL },
      { name: "NGAYSINH", type: "Date", value: NGAYSINH },
      { name: "GIOITINH", type: "Bit", value: GIOITINH },
    ];

    let encryptedMATKHAU = await bcrypt.hash(MATKHAU, 10);
    rs = await TaiKhoan.insert(
      new TaiKhoan(EMAIL, encryptedMATKHAU, "khachhang")
    );
    let rs3 = await TaiKhoan.select(EMAIL);
    if (rs3.length > 0) {
      let rs1 = await KhachHang.insert(params);
      if (rs1.rowsAffected > 0) {
        res.send(json(true, "Đăng ký thành công!"));
      } else {
        res.send(json(false, "Đăng ký thất bại!"));
      }
    } else {
      res.send(json(false, "Cấp tài khoản thất bại!"));
    }
  };

  resetMatKhau = async (req, res) => {
    const { EMAIL } = req.body;

    let rs = await TaiKhoan.select(EMAIL);

    if (rs.length == 0) {
      res.send(json(false, "Email này chưa đăng ký tài khoản!"));
      return;
    }

    //random và mã hóa mật khẩu
    let MATKHAU = Date.now().toString(36);
    let salt = await bcrypt.genSalt(10);
    let encryptedMATKHAU = await bcrypt.hash(MATKHAU, salt);
    let rs2 = await TaiKhoan.update(EMAIL, encryptedMATKHAU, "khachhang");
    console.log(
      "Cấp lại mật khẩu thành công, mật khẩu mới: " +
        encryptedMATKHAU +
        "  " +
        MATKHAU
    );
    res.send(json(true, MATKHAU));
  };

  doiMatKhau = async (req, res) => {
    let salt = await bcrypt.genSalt(10);
    let TAIKHOAN = req.body.EMAIL;
    let MATKHAU = await bcrypt.hash(req.body.MATKHAUMOI, salt);
    let rs = await TaiKhoan.update(TAIKHOAN, MATKHAU);
    console.log("Đổi mật khẩu tài khoản:" + TAIKHOAN);
    res.send(json(true, "Đổi mật khẩu thành công!"));
  };
  //   khoaOrMoKhoaTaiKhoan = async (req, res) => {
  //     let { TENDANGNHAP } = req.body;
  //     let rs = await TaiKhoan.select(TENDANGNHAP);
  //     if (rs.length == 0) {
  //       console.log(json(false, "Nhân viên không có tài khoản"));
  //       res.send(json(false, "Nhân viên không có tài khoản"));
  //       return;
  //     }
  //     //mở khóa
  //     if (rs[0].KHOA) {
  //       rs = await TaiKhoan.updateTaiKhoan(TENDANGNHAP, "", false);
  //       console.log("Mở Khóa tài khoản:" + TENDANGNHAP);
  //       res.send(json(true, "Đã mở khóa tài khoản: " + TENDANGNHAP));
  //       return;
  //     }
  //     //khóa
  //     rs = await TaiKhoan.updateTaiKhoan(TENDANGNHAP, "", true);
  //     console.log("Khóa tài khoản:" + TENDANGNHAP);
  //     res.send(json(true, "Đã khóa tài khoản: " + TENDANGNHAP));
  //   };
  dangNhap = async (req, res) => {
    let rs = await TaiKhoan.select(req.body.TAIKHOAN);
    if (rs.length == 0) {
      res.send(json(false, "Tài khoản không tồn tại"));
      return json(false, "Tài khoản không tồn tại");
    }

    rs = await bcrypt.compare(req.body.MATKHAU.trim(), rs[0].MATKHAU.trim());
    if (rs == true) res.send(json(rs));
    else res.send(json(rs, "Sai mật khẩu"));
  };

  getList = async (req, res) => {
    const { KEY } = req.body;
    let params = [{ name: "KEY", type: "Nvarchar(50)", value: KEY }];
    if (!KEY) {
      let rs = await TaiKhoan.selectAll();
      res.send(json(true, rs));
      return;
    }
    res.send(json(true, rs.recordset));
  };
  // let rs = await NhanVien.searchNhanVien(params)
  // if(rs.recordset.length == 0){
  //     res.send(json(false, []))
  //     return
  // }
}

module.exports = new TaiKhoanControllers();
