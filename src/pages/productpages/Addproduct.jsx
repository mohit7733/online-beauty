import React from 'react'
import { useNavigate } from 'react-router-dom'
import contactimag  from "../../assets/images/CONTACT.png"
import Left_menu from './left_menu'

function Addproduct() {
    const navigate = useNavigate()
  return (
    <>
    <div class="product_research_wrap add_new_product Meeting_wrap profile_popup">

<div class="main">
            <div class="left_wrapper left_desktop active" id="left_wrapper">
                <div class="left_sidebar">
                    <div class="box">
                        <div class="sidebar_toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                            <i class="fa fa-angle-left" aria-hidden="true"></i>
                        </div>
                        <h4>{localStorage.getItem("user_type")} </h4>
                        <ul>
                            <li>
                                <a href="/dashboard/4"><img src="images/bell.svg" alt="" />Alert Notification</a>
                            </li>
                            <li><a href="/dashboard"><img src="images/edit.svg" alt="" />Products Showcase</a></li>
                            <li>
                                <a class="menu_submenu supplier">
                                    <img class="bgdrop-icon-hide" src="images/Meeting Schedule.svg" alt="" />
                                    <img class="bgdrop-icon" src="images/calender_blue.png" alt="" 
                                        // style="display:none;"
                                        />My Meetings
                                    <i class="fa fa-angle-down drop" aria-hidden="true"></i></a>
                                <ul class="sub__menu supplier-meetings">
                                    <li><a href="#">Pending Meetings</a></li>
                                    <li><a href="#">Confirmed Meetings</a></li>
                                    <li class="active"><a href="#">Passed Meetings</a></li>
                                </ul>

                                {/* <!-- <span class="icon-drop"></span> --> */}
                            </li>
                           
                                 <li class="border"><a href="/contact-us"><img
                                 src={contactimag} alt="" />Contact Us</a>
                     </li>
                            
                        </ul>
                        {/* <h4>BUYER</h4>
                        <ul>
                            <li><a href="#"><img src="images/bell.svg" alt="" />Alert Notification</a></li>
                            <li><a href="#"><img src="images/edit.svg" alt="" />Products Research Profile</a></li>
                            <li>
                                <a class="menu_submenu buyer">
                                    <img class="bgdrop-icon-hide" src="images/Meeting Schedule.svg" alt="" />
                                    <img class="bgdrop-icon" src="images/calender_blue.png" alt="" 
                                        // style="display:none;"
                                        />My Meetings
                                    <i class="fa fa-angle-down drop" aria-hidden="true"></i></a>
                                <ul class="sub__menu buyer-meeting">
                                    <li><a href="https://onlinebeautymeeting.sdsstaging.co.uk/product_view.html">View
                                            All Products</a></li>
                                    <li><a href="#">Favourite List</a></li>
                                    <li><a href="#">Confirmed Meetings</a></li>
                                    <li class="active"><a href="#">Passed Meetings</a></li>
                                </ul>
                            </li>
                            <li class="border"><a href="https://onlinebeautymeeting.sdsstaging.co.uk/contact.html"><img
                                        src="images/CONTACT.png" alt="" />Contact Us</a>
                            </li>
                        </ul> */}
                    </div>
                </div>

            </div>
            <div class="bg-light supplier-meetings dropdown-container" tabindex="-1">
                <h4>My Meetings
                    {/* <!-- <i class="fa fa-angle-up" aria-hidden="true"></i> --> */}
                </h4>
                <div class="dropdown-item-div">
                    <a class="dropdown-item" href="#">
                        Pending Meetings
                    </a>
                    <a class="dropdown-item" href="#">
                        Confirmed Meetings
                    </a>
                    <a class="dropdown-item" href="#">
                        Passed Meetings
                    </a>
                </div>
            </div>
            <div class="bg-light buyer-meetings dropdown-container" tabindex="-1">
                <h4>My Meetings
                    {/* <!-- <i class="fa fa-angle-up" aria-hidden="true"></i> --> */}
                </h4>
                <div class="dropdown-item-div">
                    <a class="dropdown-item" href="https://onlinebeautymeeting.sdsstaging.co.uk/product_view.html">
                        View All Products
                    </a>
                    <a class="dropdown-item" href="#">
                        Favourite List
                    </a>
                    <a class="dropdown-item" href="#">
                        Confirmed Meetings
                    </a>
                    <a class="dropdown-item" href="#">
                        Passed Meetings
                    </a>
                </div>
            </div>
            <div class="router-body active">
                <div class="breadcrumbs" data-aos="fade-down">
                    <ul>
                        <li><a href="/dashboard">Dashboard </a></li>
                        <li><a href="/dashboard">  {localStorage.getItem("user_type")}</a></li>
                        <li><a href="#"><span>Product Showcase</span></a></li>
                        <li><a href="#"><span>Add New Product</span></a></li>
                    </ul>
                </div>
                <div class="product_prfile">
                    <h1>Add New Product</h1>
                    <div class="row">
                        <div class="col_left">
                            <div class="panel">
                                <div class="form-group full">
                                    <input type="text" placeholder="Product Full Name" class="form-control"/>
                                </div>
                                <div class="form-group full">
                                    <input type="text" placeholder="Product Short Name" class="form-control"/>
                                </div>
                                <div class="form_wrap row">
                                    <div class="column">
                                        <div class="custom-select">
                                            <select>
                                                <option>Category</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="custom-select">
                                            <select>
                                                <option>Sub-Category</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="custom-select">
                                            <select>
                                                <option>Country</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group full">
                                    <input type="text" placeholder="Company Name" class="form-control"/>
                                </div>
                                <textarea maxlength="50" class="form-control"
                                    placeholder="Company Profile Description"></textarea>
                                    <p class="limit">0/50</p>
                            </div>
                            <div class="button_wrap row">
                                <a href="" class="btn btn-secondary">Submit</a>
                                <a href="" class="btn btn-primary">Cancel</a>
                            </div>
                            <div class="error-button row justify-content-center">
                                <a class="error_icon" onClick={()=>navigate(-1)}><i class="fa fa-arrow-left left" aria-hidden="true"></i>Back to Product Showcase</a>
                            </div>

                        </div>
                        <div class="col_right">
                            <h6>Product Images</h6>
                            <div class="data_upload">
                                <img src="images/profile_upload.svg" alt="" />
                                <h4>Upload Image, Video or <br/>
                                    Document</h4>
                            </div>
                            <div class="thumbnail_section">
                                <h6>Set Thumbnail Image</h6>
                                <div class="thumb_inner row align-items-center">
                                    <input type="radio" id="profile" name="thumb" value=""/>
                                    <figure class="center"><img src="images/thumbnail_1.svg" alt="" /></figure>
                                    <p>product1.jpg</p>
                                    <figure><img src="images/trash-2.svg" alt="" /></figure>
                                </div>
                                <div class="thumb_inner row align-items-center">
                                    <input type="radio" id="profile" name="thumb" value=""/>
                                    <figure class="center"><img src="images/thumbnail_1.svg" alt="" /></figure>
                                    <p>product1.jpg</p>
                                    <figure><img src="images/trash-2.svg" alt="" /></figure>
                                </div>
                                <div class="thumb_inner row align-items-center">
                                    <input type="radio" id="profile" name="thumb" value=""/>
                                    <figure class="center"><img src="images/thumbnail_2.svg" alt="" /></figure>
                                    <p>product1.jpg</p>
                                    <figure><img src="images/trash-2.svg" alt="" /></figure>
                                </div>
                            </div>
                            <div class="doc_upload">
                                <h6>Uploaded Documents</h6>
                                <div class="inner_doc row align-items-center">
                                    <figure>
                                        <img src="images/pdf_icon.png" alt="" />
                                    </figure>
                                    <p>product-doc.pdf</p>
                                    <figure>
                                        <img src="images/trash-2.svg" alt="" />
                                    </figure>
                                </div>
                                <div class="inner_doc row align-items-center">
                                    <figure>
                                        <img src="images/pdf_icon.png" alt="" />
                                    </figure>
                                    <p>product-doc.pdf</p>
                                    <figure>
                                        <img src="images/trash-2.svg" alt="" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

    </>
  )
}

export default Addproduct