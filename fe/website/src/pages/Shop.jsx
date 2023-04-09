import React from "react";
import {getListProduct, getListType, filterProduct} from '../server/callAPI'
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import '../styles/shop.css'
import ProductList from "../components/UI/ProductList";
import '../App.css';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [type, setType] = useState([])
    const [loai, setLoai] = useState('Tất cả')
    const [gia, setGia] = useState(0)
    const [query, setQuery] = useState('')

    useEffect(()=>{
        getProducts()
    }, [loai])
    useEffect(()=>{
        getProducts()
    }, [gia])
    useEffect(()=>{
        getProducts()
    }, [query])

    // useEffect(()=>{
    //     getProducts()
    // }, [])

    const getProducts = () => {
        let data = {

            LOAISP: loai,
            GIA: gia,
            KEY: query
        }
    
        filterProduct(data)
        .then(function (response) {
          if(response.data.status)
          setProducts(response.data.data);
          else
          setProducts([])
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    useEffect(()=>{
        getListType()
        .then(function (response) {
          // console.log(response.data.data)
          setType(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [])

    const handleFilter = (e)=>{
        const filterValue = e.target.value
        setLoai(filterValue)
    }

    const handleFilter2 = (e)=>{
        const filterValue = e.target.value
        setGia(parseInt(filterValue))
    }

    const handleSearch = (e)=>{
        const searchItem = e.target.value
        setQuery(searchItem)
    }

    return (
    <Helmet title='Shop'>
      <CommonSection title='Products' />

      <section mb='0'>
        <Container>
            <Row>
                <Col lg='2' md='3'>
                    <div className="filter__widget">
                        <select onChange={handleFilter}>
                            <option value='Tất cả'>Danh mục</option>
                            <option value='Tất cả'>Tất cả</option>
                            {type.map((item, index) =>
                                <option 
                                key={index}
                                value= {item.LOAISP}
                                > {item.LOAISP} </option>
                              )}
                        </select>
                    </div>
                </Col>
                <Col lg='2' md='3'>
                <div className="filter__widget">
                        <select onChange={handleFilter2}>
                            <option value="0">Lọc theo giá</option>
                            <option value="0">Từ thấp đến cao</option>
                            <option value="1">Từ cao đến thấp</option>
                        </select>
                    </div>
                </Col>
                {/* <Col lg='2' md='3'>
                <div className="filter__widget">
                        <select>
                            <option value="all" defaultChecked>Tất cả</option>
                            <option value="best">Bán chạy</option>
                            <option value="sale">Khuyến mãi</option>
                            <option value="new">Mới nhất</option>
                        </select>
                    </div>
                </Col> */}
                <Col lg='5' md='6'>
                    <div className="search__box">
                        <input type="input" placeholder="Tìm kiếm" onChange={handleSearch}/>
                        <span><i class="fa-solid fa-magnifying-glass"></i></span>
                    </div>
                </Col>
            </Row>
        </Container>
      </section>
      <section>
        <Container>
            <Row>
                {
                    products.length === 0? <h1>Không tìm thấy sản phẩm nào!</h1> : <ProductList data={products} />
                }
            </Row>
        </Container>
      </section>
    </Helmet>
    );
}

export default Shop;