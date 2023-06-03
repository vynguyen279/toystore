import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom"
const Footer = () => {

  
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4">
            <div className="logo">
              <div>
                <h1 className="text-white">ToyStore</h1>
              </div>
            </div>
            <p className="footer__text mt-4">Cam kết cung cấp sản phẩm chất lượng cao, đa dạng.</p>
          </Col>
          <Col lg="2">
            <div className="footer__quick-link">
                <h4 className="footer__quick-title">Danh mục</h4>
                <ListGroup className="mb-3">
                    <ListGroupItem className="ps-0 border-0"> 
                        <Link to='#'>Xếp hình</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to='#'>Học tập</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to='#'>Lắp ráp</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to='#'>Mô hình</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to='#'>Âm nhạc</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to='#'>Thú bông</Link>
                    </ListGroupItem>
                </ListGroup>
            </div>
          </Col>
          <Col lg="3">
          <div className="footer__quick-link">
                <h4 className="footer__quick-title">Truy cập</h4>
                <ListGroup className="mb-3">
                    <ListGroupItem className="ps-0 border-0"> 
                        <Link to='/shop'>Sản Phẩm</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to='/cart'>Giỏ hàng</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to='/signup'>Tạo tài khoản</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to='/login'>Đăng nhập</Link>
                    </ListGroupItem>
                </ListGroup>
            </div>
          </Col>
          <Col lg="2">
          <div className="footer__quick-link">
                <h4 className="footer__quick-title">Thương hiệu</h4>
                <ListGroup className="mb-3">
                    <ListGroupItem className="ps-0 border-0"> 
                        <Link to='#'>Lego</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to='#'>Fisher-price</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to='#'>Winwintoys</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to='#'>Barbie</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to='#'>Mattel</Link>
                    </ListGroupItem>
                    <ListGroupItem className="ps-0 border-0">
                        <Link to='#'>Hasbro</Link>
                    </ListGroupItem>
                </ListGroup>
            </div>
          </Col>
          <Col lg='12'>
            <p className="footer__copyright">Copyright 2023 developed by T&V. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
