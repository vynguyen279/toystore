const json = require("../components/json");
const CTDDH = require("../modules/CTDDH");

class CTDDHControllers {
  index(req, res) {
    res.send("CTDDH");
  }
  getListDetaiil = async (req, res) => {
    const { MSDDH } = req.body;
    let params = [{ name: "MSDDH", type: "Nchar(10)", value: MSDDH }];

    let rs = await CTDDH.getListKH(MSDDH);
    if (rs.length == 0) {
      res.send(json(false, "Đơn hàng trống!"));
      return;
    }
    res.send(json(true, rs));
  };
  themCTDDH = async (req, res) => {
    const { MSDDH, MASP, SL } = req.body;

    let params = [
      { name: "MSDDH", type: "Nchar(10)", value: MSDDH },
      { name: "MASP", type: "Nchar(10)", value: MASP },
      { name: "SL", type: "INT", value: SL },
    ];
    let rs = await CTDDH.insert(params);
    res.send(json(true, "Thêm chi tiết đơn hàng thành công!"));

    // if (rs.rowsAffected > 0) {
    //   res.send(json(true, "Thêm chi tiết đơn hàng thành công!"));
    // } else {
    //   res.send(json(false, "Thêm chi tiết đơn hàng thất bại!"));
    // }
  };
}

module.exports = new CTDDHControllers();
