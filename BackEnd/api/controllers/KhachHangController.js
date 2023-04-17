const json = require("../components/json");
const KhachHang = require("../modules/KhachHang");

class KhachHangControllers {
  index(req, res) {
    res.send("SanPham");
  }
  getKH = async (req, res) => {
    const { EMAIL } = req.body;
    let params = [{ name: "EMAIL", type: "Nchar(200)", value: EMAIL }];

    let rs = await KhachHang.select(EMAIL);
    if (rs.length == 0) {
      res.send(json(false, "Tài khoản không tồn tại!"));
      return;
    }
    res.send(json(true, rs));
  };
  getList = async (req, res) => {
    const { KEY } = req.body;
    let params = [{ name: "KEY", type: "Nvarchar(50)", value: KEY }];
    if (!KEY) {
      let rs = await KhachHang.getList();
      res.send(json(true, rs));
      return;
    }
    let rs = await KhachHang.search(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không có kết quả phù hợp"));
      return;
    }
    res.send(json(true, rs.recordset));
  };

  themKh = async (req, res) => {
    const { HOTEN, DIACHI, SDT, EMAIL, NGAYSINH, GIOITINH } = req.body;
    let params = [
      { name: "HOTEN", type: "Nvarchar(50)", value: HOTEN },
      { name: "DIACHI", type: "Nvarchar(100)", value: DIACHI },
      { name: "SDT", type: "Nchar(10)", value: SDT },
      { name: "EMAIL", type: "Nchar(200)", value: EMAIL },
      { name: "NGAYSINH", type: "Date", value: NGAYSINH },
      { name: "GIOITINH", type: "Bit", value: GIOITINH },
    ];
    let rs = await KhachHang.insert(params);
    if (rs.rowsAffected > 0) {
      res.send(json(true, rs));
    } else {
      res.send(json(false, rs));
    }
  };

  capNhatKh = async (req, res) => {
    const { MAKH, HOTEN, DIACHI, SDT, EMAIL, NGAYSINH, GIOITINH } = req.body;
    let params = [
      { name: "MAKH", type: "Nchar(10)", value: MAKH },
      { name: "HOTEN", type: "Nvarchar(50)", value: HOTEN },
      { name: "DIACHI", type: "Nvarchar(100)", value: DIACHI },
      { name: "SDT", type: "Nchar(10)", value: SDT },
      { name: "EMAIL", type: "Nchar(200)", value: EMAIL },
      { name: "NGAYSINH", type: "Date", value: NGAYSINH },
      { name: "GIOITINH", type: "Bit", value: GIOITINH },
    ];

    let rs = await KhachHang.update(params);
    if (rs.returnValue == 1) {
      res.send(json(true, rs));
    } else {
      res.send(json(false, rs));
    }
  };

  xoaKh = async (req, res) => {
    const { MAKH } = req.body;
    let params = [{ name: "MAKH", type: "Nchar(10)", value: MAKH }];
    let rs = await KhachHang.delete(params);
    if (rs.returnValue == 1) {
      res.send(json(true, rs));
    } else {
      res.send(json(false, "Khách hàng đang có đơn không thể xóa!"));
    }
  };

  timKiemKh = async (req, res) => {
    const { KEY } = req.body;
    let params = [{ name: "KEY", type: "Int", value: KEY }];
    let rs = await KhachHang.search(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không có kết quả phù hợp"));
      return;
    }
    res.send(json(true, rs.recordset));
  };
}

module.exports = new KhachHangControllers();
