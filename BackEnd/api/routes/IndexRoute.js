const taiKhoanRouter = require("./TaiKhoanRoute");
const nhanVienRouter = require("./NhanVienRoute");
const khachHangRouter = require("./KhachHangRoute");
// const donHangRouter = require('./DonHangRoute')
// const hoaDonRouter = require('./HoaDonRoute')
const sanPhamRouter = require("./SanPhamRoute");
const gioHangRouter = require("./GioHangRoute");

function routes(app) {
  app.use("/TaiKhoan", taiKhoanRouter);
  app.use("/NhanVien", nhanVienRouter);
  app.use("/KhachHang", khachHangRouter);
  //   app.use('/DonHang', donHangRouter)
  //   app.use('/HoaDon', hoaDonRouter)
  app.use("/SanPham", sanPhamRouter);
  app.use("/GioHang", gioHangRouter);
}

module.exports = routes;
