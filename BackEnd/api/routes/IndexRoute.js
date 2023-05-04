const taiKhoanRouter = require("./TaiKhoanRoute");
const nhanVienRouter = require("./NhanVienRoute");
const khachHangRouter = require("./KhachHangRoute");
const hoaDonRouter = require("./HoaDonRoute");
const sanPhamRouter = require("./SanPhamRoute");
const gioHangRouter = require("./GioHangRoute");
const donHangRouter = require("./DonHangRoute");
const CTDDHRouter = require("./CTDDHRoute");

function routes(app) {
  app.use("/TaiKhoan", taiKhoanRouter);
  app.use("/NhanVien", nhanVienRouter);
  app.use("/KhachHang", khachHangRouter);
  app.use("/SanPham", sanPhamRouter);
  app.use("/GioHang", gioHangRouter);
  app.use("/DonHang", donHangRouter);
  app.use("/CTDDH", CTDDHRouter);

  app.use("/HoaDon", hoaDonRouter);
}

module.exports = routes;
