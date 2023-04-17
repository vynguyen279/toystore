const json = require("../components/json");
const GioHang = require("../modules/GioHang");

class GioHangControllers {
  index(req, res) {
    res.send("GioHang");
  }
  getListCart = async (req, res) => {
    const { MAKH } = req.body;
    let params = [{ name: "MAKH", type: "Nchar(10)", value: MAKH }];

    let rs = await GioHang.select(MAKH);
    if (rs.length == 0) {
      res.send(json(false, "Giỏ hàng trống"));
      return;
    }
    res.send(json(true, rs));
  };

  themSP = async (req, res) => {
    const { MASP, MAKH, SOLUONG } = req.body;
    let params = [
      { name: "MASP", type: "Nchar(10)", value: MASP },
      { name: "MAKH", type: "Nchar(10)", value: MAKH },
      { name: "SOLUONG", type: "INT", value: SOLUONG },
    ];
    let rs = await GioHang.insert(params);
    if (rs.rowsAffected > 0) {
      res.send(json(true, rs));
    } else {
      res.send(json(false, "Thêm thất bại!"));
    }
  };

  xoaSP = async (req, res) => {
    const { MASP, MAKH, SOLUONG } = req.body;
    let params = [
      { name: "MASP", type: "Nchar(10)", value: MASP },
      { name: "MAKH", type: "Nchar(10)", value: MAKH },
      { name: "SOLUONG", type: "INT", value: SOLUONG },
    ];
    let rs = await GioHang.delete(params);
    if (rs.rowsAffected > 0) {
      res.send(json(true, rs));
    } else {
      res.send(json(false, "Xóa thất bại!"));
    }
  };
  xoaAll = async (req, res) => {
    const { MAKH } = req.body;
    let params = [{ name: "MAKH", type: "Nchar(10)", value: MAKH }];
    let rs = await GioHang.deleteAll(MAKH);
    res.send(json(true, "Xóa hết thành công!"));
  };
}

module.exports = new GioHangControllers();
