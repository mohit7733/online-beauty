import React, { useEffect, useState } from 'react'
import { api } from '../base_url';
function Contract() {
    const [theytrusted, settheytrusted] = useState()
    const [check, setcheck] = useState(true)
    const theytrusted_data = () => {
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer " + localStorage.getItem("token")
        );
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(api + "/api/v1/contracts", requestOptions)
            .then(response => response.json())
            .then(result => settheytrusted(result.data))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        if (check) {
            theytrusted_data()
            setcheck(false)
        }
    }, [check])
    return (
        <>
            <div className='container'>
                <div class="contract_wrapper Meeting_wrap profile_popup">

                    <div class="main">
                        <div class="left_wrapper left_desktop" id="left_wrapper" style={{ display: 'none' }}>
                            <div class="left_sidebar">
                                <div class="box">
                                    <div class="sidebar_toggle">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <i class="fa fa-angle-left" aria-hidden="true"></i>
                                    </div>
                                    <h4>SUPPLIER</h4>
                                    <ul>
                                        <li>
                                            <a href="#"><img src="images/bell.svg" alt="" />Alert Notification</a>
                                        </li>
                                        <li><a href="#"><img src="images/edit.svg" alt="" />Products Showcase</a></li>
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
                                    </ul>
                                    <h4>BUYER</h4>
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
                        <div class="">
                            <div class="breadcrumbs" data-aos="fade-down">
                                <ul>
                                    <li><a href="/dashboard">Dashboard </a></li>
                                    <li><a href="#">My Profile</a></li>
                                    <li><a href="#">Administrative Informations</a></li>
                                    <li><a href="#"><span>Contract Info</span></a></li>
                                </ul>
                            </div>
                            <div class="product_prfile">
                                <h1>{theytrusted?.contactus?.title}</h1>
                                <div class="Contract_section" dangerouslySetInnerHTML={{ __html: theytrusted?.contactus?.discription }}>
                                </div>
                                <div class="button">
                                    <a href="/company-Information-fill" class="btn btn-secondary">I Agree</a>
                                </div>
                            </div>
                        </div>
                    </div>

                 
                    <span class="scroll-up"><i class="fa fa-chevron-up" aria-hidden="true"></i></span>
                </div>
            </div>

        </>
    )
}

export default Contract