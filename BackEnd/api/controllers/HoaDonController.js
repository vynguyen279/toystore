const json = require("../components/json");
const HoaDon = require("../modules/HoaDon");

class HoaDonControllers {
  index(req, res) {
    res.send("HoaDon");
  }

  getList = async (req, res) => {
    const { KEY } = req.body;
    let params = [{ name: "KEY", type: "Nvarchar(50)", value: KEY }];
    let rs = await HoaDon.search(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không có kết quả phù hợp"));
      return;
    }
    res.send(json(true, rs.recordset));
  };


//   updateOrder = async (req, res) => {
//     const { MSDDH, TRANGTHAI } = req.body;
//     let params = [
//       { name: "MSDDH", type: "Nchar(10)", value: MSDDH },
//       { name: "TRANGTHAI", type: "Nchar(10)", value: TRANGTHAI },
//     ];

//     let rs = await DonHang.update(MSDDH, TRANGTHAI);
//     res.send(json(true, "Hủy thành công!"));
//   };
  themHD = async (req, res) => {
    const { MANV, TONGGIA, MSDDH } = req.body;

    let params = [
      { name: "MANV", type: "Nchar(10)", value: MANV },
      { name: "TONGGIA", type: "float", value: TONGGIA },
      { name: "MSDDH", type: "Nchar(10)", value: MSDDH },
    ];
    let rs = await HoaDon.insert(params);
    if (rs.rowsAffected > 0) {
      res.send(json(true, rs.recordset));
    } else {
      res.send(json(false, rs));
    }
  };
}

module.exports = new HoaDonControllers();
