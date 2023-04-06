const json = require("../components/json");
const SanPham = require("../modules/SanPham");

class SanPhamControllers {
  index(req, res) {
    res.send("SanPham");
  }
  getList = async (req, res) => {
    const { KEY } = req.body;
    let params = [{ name: "KEY", type: "Nvarchar(20)", value: KEY }];
    if (!KEY) {
      let rs = await SanPham.selectAll();
      res.send(json(true, rs));
      return;
    }
    let rs = await SanPham.search(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không có kết quả phù hợp"));
      return;
    }
    res.send(json(true, rs.recordset));
  };
  
  getListType = async (req, res) => {
    // const { KEY } = req.body;
    // if (KEY) {
    //   let rs = await SanPham.selectAll();
    //   res.send(json(true, rs));
    //   return;
    // }
    let rs = await SanPham.selectType();
    if (rs.length == 0) {
      res.send(json(false, "Không có kết quả phù hợp"));
      return;
    }
    res.send(json(true, rs));
  };

  getListSale = async (req, res) => {
    const { KEY } = req.body;
    let params = [{ name: "KEY", type: "Int", value: KEY }];
    let rs = await SanPham.selectSaleSP(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không có kết quả phù hợp"));
      return;
    }
    res.send(json(true, rs.recordset));
  };

  getListNew = async (req, res) => {
    const { KEY } = req.body;
    let params = [{ name: "KEY", type: "Int", value: KEY }];
    let rs = await SanPham.selectNewSP(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không có kết quả phù hợp"));
      return;
    }
    res.send(json(true, rs.recordset));
  };

  getListBest = async (req, res) => {
    const { KEY } = req.body;
    let params = [{ name: "KEY", type: "Int", value: KEY }];
    let rs = await SanPham.selectBestSP(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không có kết quả phù hợp"));
      return;
    }
    res.send(json(true, rs.recordset));
  };

  themSp = async (req, res) => {
    const {
      TENSP,
      LOAISP,
      NUOCSX,
      DONGIA,
      MOTA,
      SOLUONGTON,
      HINHANH,
      SALE,
      TRANGTHAIXOA,
    } = req.body;
    let params = [
      { name: "TENSP", type: "Nvarchar(50)", value: TENSP },
      { name: "LOAISP", type: "Nvarchar(50)", value: LOAISP },
      { name: "NUOCSX", type: "Nvarchar(50)", value: NUOCSX },
      { name: "DONGIA", type: "Money", value: DONGIA },
      { name: "MOTA", type: "Ntext", value: MOTA },
      { name: "SOLUONGTON", type: "Int", value: SOLUONGTON },
      { name: "HINHANH", type: "Nchar(100)", value: HINHANH },
      { name: "SALE", type: "Float", value: SALE },
      { name: "TRANGTHAIXOA", type: "Bit", value: TRANGTHAIXOA },
    ];
    let rs = await SanPham.insert(params);
    if (rs.rowsAffected > 0) {
      res.send(json(true, rs));
    } else {
      res.send(json(false, rs));
    }
  };

  capNhatSp = async (req, res) => {
    const {
      MASP,
      TENSP,
      LOAISP,
      NUOCSX,
      DONGIA,
      MOTA,
      SOLUONGTON,
      HINHANH,
      SALE,
      TRANGTHAIXOA,
    } = req.body;
    let params = [
      { name: "MASP", type: "Nchar(10)", value: MASP },
      { name: "TENSP", type: "Nvarchar(50)", value: TENSP },
      { name: "LOAISP", type: "Nvarchar(50)", value: LOAISP },
      { name: "NUOCSX", type: "Nvarchar(50)", value: NUOCSX },
      { name: "DONGIA", type: "Money", value: DONGIA },
      { name: "MOTA", type: "Ntext", value: MOTA },
      { name: "SOLUONGTON", type: "Int", value: SOLUONGTON },
      { name: "HINHANH", type: "Nchar(100)", value: HINHANH },
      { name: "SALE", type: "Float", value: SALE },
      { name: "TRANGTHAIXOA", type: "Bit", value: TRANGTHAIXOA },
    ];

    let rs = await SanPham.update(params);
    if (rs.returnValue == 1) {
      res.send(json(true, rs));
    } else {
      res.send(json(false, rs));
    }
  };

  xoaSp = async (req, res) => {
    const { MASP } = req.body;
    let params = [{ name: "MASP", type: "Nchar(10)", value: MASP }];
    let rs = await SanPham.delete(params);
    if (rs.returnValue == 1) {
      res.send(json(true, rs));
    } else {
      res.send(json(false, "Sản phẩm đang được sử dụng không thể xóa!"));
    }
  };

  timKiemSp = async (req, res) => {
    const { KEY } = req.body;
    let params = [{ name: "KEY", type: "Int", value: KEY }];
    let rs = await SanPham.search(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không có kết quả phù hợp"));
      return;
    }
    res.send(json(true, rs.recordset));
  };

  locSp = async (req, res) => {
    const { LOAISP, GIA, KEY } = req.body;
    let params = [
      { name: "LOAISP", type: "Nvarchar(50)", value: LOAISP }, 
      { name: "GIA", type: "Int", value: GIA }, 
      { name: "KEY", type: "Nvarchar(50)", value: KEY }];
    let rs = await SanPham.filter(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không có kết quả phù hợp"));
      return;
    }
    res.send(json(true, rs.recordset));
  };
}

module.exports = new SanPhamControllers();
