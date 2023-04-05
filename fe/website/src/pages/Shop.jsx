import React from "react";
import {getListProduct, getListType} from '../server/callAPI'
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import '../styles/shop.css'
import ProductList from "../components/UI/ProductList";
import '../App.css';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [filterProducts, setFilterProducts] = useState([])
    const [type, setType] = useState([])
    const [query, setQuery] = useState("")
    
    useEffect(()=>{
        getProducts()
    }, [query])

    useEffect(()=>{
        getProducts()
    }, [filterProducts])

    const getProducts = () => {
        let data = {
            KEY: query
        }
    
        getListProduct(data)
        .then(function (response) {
          setProducts(response.data.data);
          setFilterProducts(response.data.data);
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
        // setProducts([])
        // getProducts()
        if(filterValue=== 'Học tập'){
            const filterProducts = products.filter(item=>item.LOAISP==='Học tập')
            setFilterProducts(filterProducts)
        }
        if(filterValue=== 'Ngoài trời'){
            const filterProducts = products.filter(item=>item.LOAISP==='Ngoài trời')
            setFilterProducts(filterProducts)
        }
        if(filterValue=== 'Lắp ráp'){
            const filterProducts = products.filter(item=>item.LOAISP==='Lắp ráp')
            setFilterProducts(filterProducts)
        }
        if(filterValue=== 'Mô hình'){
            const filterProducts = products.filter(item=>item.LOAISP==='Mô hình')
            setFilterProducts(filterProducts)
        }
        if(filterValue=== 'Xếp hình'){
            const filterProducts = products.filter(item=>item.LOAISP==='Xếp hình')
            setFilterProducts(filterProducts)
        }
        if(filterValue === 'Tất cả'){
            getListProduct()
        }
    }

    const handleSearch = (e)=>{
        const searchItem = e.target.value
        // console.log(searchItem)
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
                            <option>Danh mục</option>
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
                        <select>
                            <option>Lọc theo giá</option>
                            <option value="low">Từ thấp đến cao</option>
                            <option value="high">Từ cao đến thấp</option>
                        </select>
                    </div>
                </Col>
                <Col lg='2' md='3'>
                <div className="filter__widget">
                        <select>
                            <option value="all" defaultChecked>Tất cả</option>
                            <option value="best">Bán chạy</option>
                            <option value="sale">Khuyến mãi</option>
                            <option value="new">Mới nhất</option>
                        </select>
                    </div>
                </Col>
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
                    filterProducts.length === 0? <h1>Không tìm thấy sản phẩm nào!</h1> : <ProductList data={filterProducts} />
                }
            </Row>
        </Container>
      </section>
    </Helmet>
    );
}

export default Shop;