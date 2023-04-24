const json = require("../components/json");
const DonHang = require("../modules/DonHang");

class DonHangControllers {
  index(req, res) {
    res.send("DonHang");
  }
  getListOrder = async (req, res) => {
    const { MAKH } = req.body;
    let params = [{ name: "MAKH", type: "Nchar(10)", value: MAKH }];

    let rs = await DonHang.getListKH(MAKH);
    if (rs.length == 0) {
      res.send(json(false, "Đơn hàng trống!"));
      return;
    }
    res.send(json(true, rs));
  };
  updateOrder = async (req, res) => {
    const { MSDDH, TRANGTHAI } = req.body;
    let params = [
      { name: "MSDDH", type: "Nchar(10)", value: MSDDH },
      { name: "TRANGTHAI", type: "Nchar(10)", value: TRANGTHAI },
    ];

    let rs = await DonHang.update(MSDDH, TRANGTHAI);
    res.send(json(true, "Hủy thành công!"));
  };
  themDH = async (req, res) => {
    const { MAKH, SDT, EMAIL, DIACHI, TRANGTHAI } = req.body;

    let params = [
      { name: "MAKH", type: "Nchar(10)", value: MAKH },
      { name: "TRANGTHAI", type: "Nchar(15)", value: TRANGTHAI },
    ];
    let rs = await DonHang.insert(params);
    if (rs.rowsAffected > 0) {
      res.send(json(true, rs.recordset));
    } else {
      res.send(json(false, "Thêm đơn hàng thất bại!"));
    }
  };
}

module.exports = new DonHangControllers();
