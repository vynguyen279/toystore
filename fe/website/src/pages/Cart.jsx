import React from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import checkRole from "../components/checkRole";
import "../App.css";
const Cart = () => {
  checkRole()
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Giỏ hàng">
      <CommonSection title="Giỏ hàng" />
      <section>
        <Container>
          {cartItems.length === 0 ? (
            <h1 className="fs-4 text-center">
              Không có sản phẩm trong giỏ hàng!
            </h1>
          ) : (
            <Row>
              <Col lg="9">
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Xuất xứ</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
                </Col>
                <Col lg="3">
                  <div className="checkout-info">
                    <h4 className="d-flex align-items-center justify-content-between">
                      Tổng tiền:{" "}
                      <span>
                        {parseFloat(
                          totalAmount
                        ).toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </h4>
                  </div>
                  <p className="mt-1">
                    Kiểm tra đầy đủ giỏ hàng trước khi đặt đơn
                  </p>
                  <div>
                    <button className="btn-continue">
                      <Link to="/shop">Tiếp tục mua hàng</Link>
                    </button>
                    <button className="btn-checkout">
                      <Link to="/checkout">Thanh toán</Link>
                    </button>
                  </div>
                </Col>
            </Row>
          )}
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteItems = () => {
    dispatch(cartActions.deleteItem(item.MASP));
  };

  return (
    <tr>
      <td>
        <img src={item.HINHANH} />
      </td>
      <td>{item.TENSP}</td>
      <td>{item.NUOCSX}</td>
      <td>{parseFloat((item.DONGIA)).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })}</td>
      <td>{item.quantity}</td>
      <td>
        <i onClick={deleteItems} className="ri-delete-bin-line"></i>
      </td>
    </tr>
  );
};
export default Cart;
