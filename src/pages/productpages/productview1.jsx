import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import { api } from '../base_url'
import icon1 from "../../assets/images/list_icon3.png"
import product1 from "../../assets/images/product_2.png"
import product2 from "../../assets/images/product_3.png"
import product3 from "../../assets/images/product_4.png"

import Testmonial from '../middel/testmonial';
import { country } from '../dashboard/country';

function Productview() {
    const navigate = useNavigate()

    const [grid, setgrid] = useState()
    const [pagination, setpagination] = useState(8)

    const [productData, setProductData] = useState([])

    const [category, setcategory] = useState([
        {
            category: "Equipment",
            subcategory: [
                { category: "Anti-ageing" },
                { category: "Slimming" },
                { category: "Hair removal" },
                { category: "Permanent make-up" },
                { category: "Skin Diagnosis" },
            ]
        },
        {
            category: "Medical Devices",
            subcategory: [
                { category: "Fillers" },
                { category: "Injectables" },
                { category: "Microneedling" },
                { category: "Mesotherapy" },
                { category: "PRP" },
            ]
        },
        {
            category: "Toxin",
            subcategory: [
                { category: "Botox" },
            ]
        },
        {
            category: "Plastic surgery",
            subcategory: [
                { category: "Implants" },
                { category: "Threads" },
                { category: "Compression garnements" },
            ]
        },
        {
            category: "Cosmetics",
            subcategory: [
                { category: "Medical - Cosmeceuticals" },
                { category: "Professional" },
            ]
        },
        {
            category: "Chemical peels",
            subcategory: [
                { category: "Light" },
                { category: "Medium" },
                { category: "Deep" },
            ]
        },
        {
            category: "Nutricosmetic",
            subcategory: [
                { category: "Skin" },
                { category: "Hair" },
                { category: "Solar" },
            ]
        },
        {
            category: "Cabin and salon furniture",
            subcategory: [
                { category: "Treatment Table" },
            ]
        },
        {
            category: "coming soon",
            subcategory: [
                { category: "coming soon" },
                { category: "Nails" },
                { category: "Makeup" },
                { category: "Decorative cosmeticss" },
            ]
        }
    ])

    const [subcategory, setsubcategory] = useState([])

    const [check, setcheck] = useState(true)
    const homeproduc_data = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            // redirect: 'follow'
        };
        fetch(api + "/api/productlist", requestOptions)
            .then(response => response.json())
            .then(result => setProductData(result.data))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        if (check) {
            homeproduc_data()
            setcheck(false)
        }
    }, [check, subcategory])


    const page = productData.length / 8

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const selcetcate = (e) => {
        category.filter((data) => {
            if (data.category == e) {
                setsubcategory(data.subcategory)
            }
        })
    }
    return (
        <>

            <div class="product_wrapper">

                <div className="breadcrumbs">
                    <div className="container aos-init aos-animate" data-aos="fade-up">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="#"><span>Products</span></a></li>
                        </ul>
                    </div>
                </div>
                <div className="product_section font-lg">
                    <div className="container">
                        <h1 className="">Products</h1>
                        <div className="categories row justify-content-between">
                            <form id="search-form" className="category-search" action="" method="POST" enctype="multipart/form-data">
                                <div className="column">
                                    <div className="custom-select">
                                        <select onChange={e => selcetcate(e.target.value)}>
                                            <option disabled selected>All Categories</option>
                                            {
                                                category.map((data, index) => {
                                                    return (
                                                        <option key={index} value={data.category} >{data.category}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="custom-select">
                                        <select>
                                            <option value="" disabled selected>Sub Category</option>
                                            {
                                                subcategory?.map((data, index) => {
                                                    return (
                                                        <option value={data.category} >{data.category}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="custom-select">
                                        <select>
                                            <option value="" disabled selected>Made In</option>
                                            {

                                                country.data.map((data, i) => {
                                                    return <option value={data.country}>{data.country}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="search">
                                        <input type="text" className="form-control" placeholder="Type here keywords" />
                                    </div>
                                </div>
                                <div className="column">
                                    <button type="submit" className="btn btn-block btn-secondary">Search</button>
                                </div>
                                <div className="column">
                                    <button type="reset" id="reset" className="btn btn-secondary btn-default">Clear all</button>
                                </div>
                            </form>
                        </div>
                        <div className="product_head">
                            <div className="row justify-content-between align-items-center" data-aos="fade-up">
                                <div className="left">
                                    <h2>All Products</h2>
                                </div>
                                <div className="right d-flex">
                                    <div className="column">
                                        <div className="custom-select">
                                            <select>
                                                <option>Sorted by</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="icon-wrapper">
                                            <ul className="row filter-buttons">
                                                <li className="grid-view-button" onClick={() => setgrid(false)}>
                                                    <span><img src="images/grid.svg" alt="" /></span>
                                                </li>
                                                <li className="list-view-button" onClick={() => setgrid(true)}>
                                                    <span><img src={icon1} alt="" /></span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ol className={grid == true ? "sub_category list list-view-filter" : "sub_category list grid-view-filter"} id="product">
                            {
                                productData.map((data, i) => {
                                    if (i < pagination) {
                                        return (
                                            <li className="row align-items-center">
                                                <div className='img-wrapper' onClick={() => {
                                                    if (localStorage.getItem("token") != null) {

                                                        navigate("/product-view/" + data.id)
                                                    } else {
                                                        navigate("/product-details/" + data.id)
                                                    }
                                                }
                                                }>
                                                    <div className="col_img">
                                                        <figure style={{ height: "180px" }}>
                                                            {
                                                                data.mediaFiles?.media_type == "image" ?
                                                                    <img src={data.mediaFiles?.file_path} alt="" />
                                                                    : data.mediaFiles?.media_type == "video" ? <video src={data.mediaFiles?.file_path} alt="" /> : data.mediaFiles?.media_type == "doc" ? <img src={data.mediaFiles?.file_path} alt="no image" /> : ""
                                                            }
                                                        </figure>
                                                    </div>
                                                    <div className="col_category">
                                                        <h4> {data?.product_name}</h4>
                                                        <ul className="d-flex align-items-center">
                                                            <li><span><img src="images/Product.svg" alt="" /></span>
                                                                {data.sub_cat}
                                                            </li>
                                                            <li><span><img src="images/country.svg" alt="" /></span>{data?.made_in}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ol>
                        <div className="no-data-found" id="blank-data"
                            style={{ display: "none" }}
                        >
                            <p>No Product Found. Please click on 'Clear all' button to see all products again.</p>
                        </div>
                        <div className="pagination">
                            <ul>
                                {
                                    productData.length > 0 ?
                                        [...Array(parseInt(JSON.stringify(page).substr(JSON.stringify(page).lastIndexOf('\\') + 1).split('.')[1]) ? parseInt(JSON.stringify(page).substr(JSON.stringify(page).lastIndexOf('\\') + 1).split('.')[0]) + 1 : parseInt(JSON.stringify(page).substr(JSON.stringify(page).lastIndexOf('\\') + 1).split('.')[0]))].map((data, i) => {
                                            i += 1;
                                            return (
                                                <li className={pagination == (i * 8) ? "active" : ""} onClick={e => setpagination(i * 8)}><a  >{i}</a></li>
                                            )
                                        })
                                        : ""
                                }
                                <li className="selected" onClick={e => setpagination(pagination + 8)}><a >Next <img src="images/arrow-right.png" title="" alt="" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Testmonial />
                <div className="benefit-section">
                    <div className="container">
                        <div className="wrap row justify-content-between">
                            <div className="col_left">
                                <h2>Create your account and get the following benefits</h2>
                                <ul>


                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                                </ul>
                                <div className="row align-items-center">
                                    <a href="/how-it-work">Discover How It Works<i className="fa fa-arrow-right right" aria-hidden="true"></i></a>
                                </div>
                            </div>
                            {
                                localStorage.getItem("token") != null ? "" :
                                    <div className="col_right">
                                        <div className="button-wrapper">
                                            <a href="#"><h2>No account yet?</h2></a>
                                            <div className="input-group">
                                                <input id="email" name="email" placeholder="Enter your email here" className="form-control" type="email" />
                                            </div>
                                            <a href="/login" className="btn btn-secondary">Sign In</a>
                                            <p>Or</p>
                                            <a href="/login" className="btn btn-secondary btn-default">Create a new account</a>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Productview