const json = require('../components/json');
const NhanVien = require("../modules/NhanVien");
const KhachHang = require("../modules/KhachHang");

class NhanVienControllers {
  index(req, res) {
    res.send("SanPham");
  }
  getList = async (req, res) => {
    const { KEY } = req.body;
    let params = [{ name: "KEY", type: "Nvarchar(50)", value: KEY }];
    if (!KEY) {
      let rs = await NhanVien.getList();
      res.send(json(true, rs));
      return;
    }
    let rs = await NhanVien.search(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không có kết quả phù hợp"));
      return;
    }
    res.send(json(true, rs.recordset));
  };

  themNv = async (req, res) => {
    const { HOTEN, SDT, NGAYVAOLAM, HINHANH, EMAIL, DIACHI, NGAYSINH, TRANGTHAI, GIOITINH, CHUCVU} = req.body;
    let params = [
      { name: "HOTEN", type: "Nvarchar(50)", value: HOTEN },
      { name: "SDT", type: "Nchar(10)", value: SDT },
      { name: "NGAYVAOLAM", type: "Date", value: NGAYVAOLAM },
      { name: "HINHANH", type: "Nchar(100)", value: HINHANH },
      { name: "EMAIL", type: "Nchar(200)", value: EMAIL },
      { name: "DIACHI", type: "Nvarchar(100)", value: DIACHI },
      { name: "NGAYSINH", type: "Date", value: NGAYSINH },
      { name: "TRANGTHAI", type: "Bit", value: TRANGTHAI },
      { name: "GIOITINH", type: "Bit", value: GIOITINH },
      { name: "CHUCVU", type: "varchar(10)", value: CHUCVU },
    ];
    // let rs1 = await KhachHang.select(EMAIL)
    // if (rs1.length > 0) {
    //   res.send(
    //     json(false, "Email này đã được đăng ký. Vui lòng chọn email khác!")
    //   );
    //   return;
    // }
    let rs2 = await NhanVien.select(EMAIL)
    if (rs2.length > 0) {
      res.send(
        json(false, "Email này đã được đăng ký. Vui lòng chọn email khác!")
      );
      return;
    }
    let rs = await NhanVien.insert(params);
    if (rs.rowsAffected > 0) {
      res.send(json(true, rs));
    } else {
      res.send(json(false, rs));
    }
  };

  capNhatNv = async (req, res) => {
    const { MANV, HOTEN, SDT, NGAYVAOLAM, EMAIL, DIACHI, NGAYSINH, TRANGTHAI, GIOITINH, CHUCVU } = req.body;
    let params = [
      { name: "MANV", type: "Nchar(10)", value: MANV },
      { name: "HOTEN", type: "Nvarchar(50)", value: HOTEN },
      { name: "SDT", type: "Nchar(10)", value: SDT },
      { name: "NGAYVAOLAM", type: "Date", value: NGAYVAOLAM },
      { name: "EMAIL", type: "Nchar(200)", value: EMAIL },
      { name: "DIACHI", type: "Nvarchar(100)", value: DIACHI },
      { name: "NGAYSINH", type: "Date", value: NGAYSINH },
      { name: "TRANGTHAI", type: "Bit", value: TRANGTHAI },
      { name: "GIOITINH", type: "Bit", value: GIOITINH },
      { name: "CHUCVU", type: "varchar(10)", value: CHUCVU },
    ];

    let rs = await NhanVien.update(params);
    if (rs.returnValue == 1) {
      res.send(json(true, rs));
    } else {
      res.send(json(false, rs));
    }
  };

  xoaNv = async (req, res) => {
    const { MANV } = req.body;
    let params = [{ name: "MANV", type: "Nchar(10)", value: MANV }];
    let rs = await NhanVien.delete(params);
    if (rs.returnValue == 1) {
      res.send(json(true, rs));
    } else {
      res.send(
        json(false, "Nhân viên đang làm việc không thể xóa!")
      );
    }
  };

  timKiemNv = async (req, res) => {
    const {KEY} = req.body;
    let params = [{ name: "KEY", type: "nvarchar(50)", value: KEY }];
    let rs = await NhanVien.search(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không có kết quả phù hợp"));
    } else
    res.send(json(true, rs));
  };

}

module.exports = new NhanVienControllers();
