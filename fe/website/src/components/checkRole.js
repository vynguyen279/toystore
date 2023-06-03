const customerPath = [
  "/login",
  "/home",
  "/history",
  "/",
  "/shop",
  "/cart",
  "/checkout",
  "/signup",
];
const normalPath = [
  "/login",
  "/home",
  "/history",
  "/",
  "/shop",
  "/cart",
  "/checkout",
  "/signup",
];
const staffPath = [
  "/admin/product",
  "/admin/bill",
  "/admin/customer",
  "/admin/purchase",
];
const adminPath = [
  "/admin/product",
  "/admin/bill",
  "/admin/customer",
  "/admin/purchase",
  "/admin/officer",
];

function checkRole(e) {
  
  if (typeof(localStorage.role)=='undefined') {
    if(!normalPath.includes(window.location.pathname)){
       localStorage.clear();
       window.location.href = "/login";
    //    alert("Bạn không có quyền truy cập! Vui lòng đăng nhập bằng tài khoản nhân viên")
    } else{
        return;
    }
  }
  if (localStorage.role.includes("khachhang")) {
    if (!customerPath.includes(window.location.pathname)) {
       localStorage.clear();
       window.location.href = "/login";
    //    alert("Bạn không có quyền truy cập! Vui lòng đăng nhập bằng tài khoản admin")
    }
    // console.log(customerPath.includes(window.location.pathname))
  }
  if (localStorage.role.includes("admin")) {
    if (!adminPath.includes(window.location.pathname)) {
        localStorage.clear();
        window.location.href = "/login";
        // alert("Vui lòng đăng nhập bằng tài khoản khách hàng!")
    }
  }
  if (localStorage.role.includes("nhanvien")) {
    if (!staffPath.includes(window.location.pathname)) {
        localStorage.clear();
        window.location.href = "/login";
        // alert("Bạn không có quyền truy cập! Vui lòng đăng nhập bằng tài khoản admin")
    }
  }
}

export default checkRole;
