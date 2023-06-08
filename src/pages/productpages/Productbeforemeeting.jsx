
import React, { useState } from 'react'
import Slider from "react-slick";
import img2  from "../../assets/images/banner_supplier.jpg"
import img3  from "../../assets/images/images-slider/image_slider_1.png"
function Productbeforemeeting() {
    const [showpolicy ,setshowpolicy] = useState(false)
    const [submenu, setsubmenu] = useState(false);

    const [desktopActive, setdesktopActive] = useState(false);
    const [submenu2, setsubmenu2] = useState(false);
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <>
    <div class="product_before_meeting profile_popup">
    <div class="main">
            <div class={desktopActive  == true ? "left_wrapper left_desktop active" : "left_wrapper left_desktop" } id="left_wrapper">
                <div class="left_sidebar">
                    <div class="box">
                        <div class="sidebar_toggle" onClick={()=>setdesktopActive(!desktopActive)}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <i class="fa fa-angle-left" aria-hidden="true"></i>
                        </div>
                        <h4>SUPPLIER</h4>
                        <ul>
                            <li>
                                <a   href="/dashboard"
                onClick={(e) => localStorage.setItem("sect", 4)} ><img src="images/bell.svg" alt="" />Alert Notification</a>
                            </li>
                            <li><a  href="/dashboard"
                onClick={(e) => localStorage.setItem("sect", 3)}><img src="images/edit.svg" alt="" />Products Showcase</a></li>
                            <li class={submenu ? "backdrop" : ""}>
                                <a onClick={(e) => setsubmenu(!submenu)}
 class="menu_submenu supplier">
                                    <img class="bgdrop-icon-hide" src="images/Meeting Schedule.svg" alt="" />
                                    <img class="bgdrop-icon" src="images/calender_blue.png" alt="" 
                                    //  style="display:none;"
                                     />My Meetings
                                    <i class="fa fa-angle-down drop" aria-hidden="true"></i></a>
                                <ul  style={
                                            submenu ? { display: "block" } : { display: "none" }
                                        } class="sub__menu supplier-meetings">
                                    <li><a href="#">Pending Meetings</a></li>
                                    <li><a href="#">Confirmed Meetings</a></li>
                                    <li class="active"><a href="#">Passed Meetings</a></li>
                                </ul>
                                
                                {/* <!-- <span class="icon-drop"></span> --> */}
                            </li>

                        </ul>
                        <h4>BUYER</h4>
                        <ul>
                            <li><a href="#"><img src="images/bell.svg" alt="" />Alert Notification</a></li>
                            <li><a href="#"><img src="images/edit.svg" alt="" />Products Research Profile</a></li>
                            <li>
                                <a class="menu_submenu buyer">
                                    <img class="bgdrop-icon-hide" src="images/Meeting Schedule.svg" alt="" />
                                    <img class="bgdrop-icon" src="images/calender_blue.png" alt="" 
                                    //  style="display:none;"
                                     />My Meetings
                                    <i class="fa fa-angle-down drop" aria-hidden="true"></i></a>
                                <ul class="sub__menu buyer-meeting">
                                    <li><a href="/product-view">View All Products</a></li>
                                    <li><a href="/dashboard">Favourite List</a></li>
                                    <li><a href="#">Confirmed Meetings</a></li>
                                    <li class="active"><a href="#">Passed Meetings</a></li>
                                </ul>
                            </li>
                            <li class="border"><a href="https://onlinebeautymeeting.sdsstaging.co.uk/contact.html"><img src="images/CONTACT.png" alt="" />Contact Us</a>
                            </li>
                        </ul>
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
                    <a class="dropdown-item" href="/product-view"> 
                        View All Products
                    </a>
                    <a class="dropdown-item" href="/favourite"> 
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
            <div class={desktopActive == true ? "router-body active" :"router-body " }>
                <div class="breadcrumbs" data-aos="fade-down">

                    <div class="head">
                        <ul>
                            <li><a href="#">Dashboard </a></li>
                            <li><a href="#">Buyer </a></li>
                            <li><a href="#">My Meetings</a></li>
                            <li><a href="#">View all products</a></li>
                            <li><a href="#"><span>Supplier A</span></a></li>
                        </ul>
                    </div>
                </div>
                <div class="product_detail product_supplier">
                    <div class="row">
                        <div class="col_img" data-aos="fade-right">
                            <div class="slider-for">
                            <Slider {...settings}>

                                <div>
                                    <figure>
                                        <img class="mainimg-display" src={img2} alt="" />
                                    </figure>
                                </div>
                                <div>
                                    <figure>
                                    <img class="mainimg-display" src={img2} alt="" />
                                    </figure>
                                </div>
                                <div>
                                    <figure>
                                    <img class="mainimg-display" src={img3} alt="" />
                                    </figure>
                                </div>
                                <div>
                                    <figure>
                                    <img class="mainimg-display" src={img3} alt="" />
                                    </figure>
                                </div>
                                </Slider>
                            </div>
                            <div class="slider-nav">
                                <div>
                                    <figure><img class="thumbnail" src="images/images-slider/image_slider_1.png" alt="" /></figure>
                                </div>
                                <div>
                                    <figure><img class="thumbnail" src="images/images-slider/A2.png" alt="" /></figure>
                                </div>
                                <div>
                                    <figure><img class="thumbnail" src="images/images-slider/A3.png" alt="" /></figure>
                                </div>
                                {/* <!-- <div>
                                    <figure><img class="thumbnail" src="images/images-slider/A4.png" alt="" /></figure>
                                </div> --> */}
                                <div class="product-img">
                                    <div>
                                        <figure><img class="thumbnail" src="images/images-slider/A4.png" alt="" /></figure>
                                    </div>
                                    <div class="video-cercile">
                                        <figure><img src="images/video-icon.svg" alt="" /></figure>
                                    </div>
                                   
                                </div>
                                <div>
                                    <figure><img class="thumbnail" src="images/images-slider/image_slider_1.png" alt="" /></figure>
                                </div>
                            </div>
                        </div>
                        <div class="col_text" data-aos="fade-left">
                            <div class="button">
                                <button class="btn btn-secondary">Category 1</button>
                                <button class="btn btn-secondary btn-default">Sub Category 1</button>
                            </div>
                            <h2>Product Name (Full)</h2>
                            <ul>
                                <li class="before_meeting_li">
                                    <h5>Made In:</h5>
                                </li>
                                <li class="before_meeting_li">
                                    <h5>Price Range: : € 10.000 <a href="#">
                                        {/* <span>(See Price Policy)</span> */}
                                        </a>
                                    <span className='warniing_icon' onMouseEnter={()=>setshowpolicy(true)}
                                    //  onMouseLeave={()=>setshowpolicy(false)}
                                     >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/></svg>
                                    </span>
                                    <div className='pocilybtn' style={showpolicy == true ?{display:"block"} : {display:"none"}}>
<p>
Lorem Ipsum is simply dummy text of the printing and typesetting  
</p>
                                    </div>
                                    </h5>
                                    
                                    
                                </li>
                                <li class="before_meeting_li">
                                    <h5>Minimum Quantity:</h5>
                                </li>
                                <li class="before_meeting_li">
                                    <h5>Guarantee:</h5>
                                </li>
                                <li class="before_meeting_li">
                                    <h5>Date Of Creation:</h5>
                                </li>
                                <li class="before_meeting_li">
                                    <h5>Training:</h5>
                                </li>
                            </ul>
                            <div class="button-wrapper m-t">
                                <a href="#" class="btn btn-secondary"><span><img src="images/favourite.svg"
                                            alt="" /></span>Add
                                    your favourites</a>
                                <a href='/product-meetings' onClick={(e) => localStorage.setItem("sect", 24)} class="btn btn-primary"><span><img src="images/meeting.svg"
                                            alt="" /></span>Request a meeting?</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product_supplier_inner">

                    <h2>Product Details</h2>
                    <p class="justify-para">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                        type and
                        scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                        leap
                        into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                        with the
                        release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                        publishing
                        software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
                <div class="product_supplir_profile">
                    <div class="profile-list profile-brand">
                        <h2>Profile</h2>
                        <div class="row justify-content-between">
                            <div class="col_left last-contnt">
                                <ul>
                                    <li>
                                        <h6>Your Brand Belongs To One Of The Following Category?</h6>
                                    </li>
                                    <li>
                                        <p>Machines & Equipments</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <h6>If You Are An Equipment Brand, Please Describe Your Technology</h6>
                                    </li>
                                    <li>
                                        <p>Laser, Hair Removal</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <h6>Describe Your Brand Concept, Philosophy And Identity</h6>
                                    </li>
                                    <li>
                                        <p>Aerolase Corporation (NY USA) Manufacturers Completely Uniqe And Portable
                                            Laser
                                            Technology For The Treatment Of All Skin Types.</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <h6>Specify Your Current Sales Channels</h6>
                                    </li>
                                    <li>
                                        <p>Dermatologists, plastic surgeons, aesthetic centers and clinics, medical spa,
                                            Laser
                                            therapists
                                        </p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <h6>What are the countries of interest for distribution?</h6>
                                    </li>
                                    <li>
                                        <p>France, Belgium, Netherlands, Switzerland, Scandinavia, Czechia.</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <h6>What are the differentiation points of your brand?</h6>
                                    </li>
                                    <li>
                                        <p>Unique Microsecond-pulsed laser treats all skin types. Painless treatment.
                                            Over 30
                                            FDA approved indications. manufactured in New York State.</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <h6>Why should the distributor carry your products?</h6>
                                    </li>
                                    <li><p>Unique technology - no other laser company has this. Treats a very wide range of
                                        skin
                                        conditions, both cosmetic and medical.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="popup_box">
            <div class="img-content-box row">
                <div class="img-box">
                    <figure>
                        <img src="images/profile.svg" alt="" />
                    </figure>
                </div>
                <div class="content-box">
                    <h6>Mia Khanh</h6>
                    <span>Super Admin</span>
                </div>
            </div>
            <div class="nav">
                <li class="profile"><a>My Profile <i class="fa fa-angle-up" aria-hidden="true"></i></a></li>
                <ul class="sub__menu profile_sub">
                    <li><a href="#">Company Information</a></li>
                    <li><a href="#">User Management </a></li>
                    <li class="information">
                        <a><span>Administrative Informations</span>
                            <i class="fa fa-angle-up" aria-hidden="true"></i>
                        </a>
                    </li>
                    <ul class="sub__menu information_sub">
                        <li><a href="#">Contract Info </a></li>
                        <li><a href="#">Billing</a></li>
                        <li><a href="#">Credit Card Info</a></li>
                    </ul>
                </ul>
                <li class="logout"><a>Logout<i class="fa fa-sign-out" aria-hidden="true"></i></a></li>
                <ul class="sub__menu term">
                    <li><a href="#"> Privacy and Terms</a></li>
                    <li><a href="#">Cookies Preferences</a></li>
                </ul>
            </div>
        </div>
        <span class="scroll-up"><i class="fa fa-chevron-up" aria-hidden="true"></i></span>
      

</div>


    </>
  )
}

export default Productbeforemeeting