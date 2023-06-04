const json = require("../components/json");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const mailer = require("nodemailer");
const TaiKhoan = require("../modules/TaiKhoan");
const KhachHang = require("../modules/KhachHang");

class TaiKhoanControllers {
  index(req, res) {
    res.send("TaiKhoan");
  }

  sendEmail = async (req, res) => {
    const { EMAIL, mess } = req.body;

    var transporter = mailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "vy279.thpt@gmail.com",
        pass: "wsszyhsufjuqkcov",
      },
    });

    let info = await transporter.sendMail({
      from: "vy279.thpt@gmail.com",
      to: EMAIL,
      subject: "Thay đổi mật khẩu",
      text: "Mật khẩu mới: " + mess,
    });
    res.status(200).send(json(true, "Đã gửi mail!"));
  };
  checkEmail = async (req, res) => {
    const { EMAIL } = req.body;
    let params = [{ name: "EMAIL", type: "Nchar(200)", value: EMAIL }];
    let rs = await TaiKhoan.select(EMAIL);
    if (rs.length > 0) {
      res.send(json(true, rs));
    } else {
      res.send(json(false, "Email chưa tồn tại!"));
    }
  };

  dangKy = async (req, res) => {
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
      new TaiKhoan(EMAIL, encryptedMATKHAU, "khachhang", "true")
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
    console.log(encryptedMATKHAU.length);
    let rs2 = await TaiKhoan.update(EMAIL, encryptedMATKHAU);
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

  dangNhap = async (req, res) => {
    let rs = await TaiKhoan.select(req.body.TAIKHOAN);
    if (rs.length == 0) {
      res.send(json(false, "Tài khoản không tồn tại"));
      return json(false, "Tài khoản không tồn tại");
    }
    if (!rs[0].TRANGTHAI) {
      res.send(json(false, "Tài khoản này đã bị khóa!"));
      return json(false, "Tài khoản này đã bị khóa!");
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

  capNhatChucVu = async (req, res) => {
    let TAIKHOAN = req.body.TAIKHOAN;
    let TRANGTHAI = req.body.TRANGTHAI;

    let params = [
      { name: "TAIKHOAN", type: "Nvarchar(50)", value: TAIKHOAN },
      { name: "TRANGTHAI", type: "bit", value: TRANGTHAI },
    ];

    let rs = await TaiKhoan.updateTitle(TAIKHOAN, TRANGTHAI);
    // console.log(rs)
    res.send(json(true, "Cập nhật thành công"));
  };
}

module.exports = new TaiKhoanControllers();
