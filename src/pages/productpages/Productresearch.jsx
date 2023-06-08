import React from 'react'

function Productresearch() {
  return (
    <>
    
    <div class="main">
            <div class="left_wrapper left_desktop" id="left_wrapper">
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
                <i class="fa fa-angle-up" aria-hidden="true"></i> 
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
                     <i class="fa fa-angle-up" aria-hidden="true"></i> 
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
            <div class="router-body">
                <div class="breadcrumbs" data-aos="fade-down">
                    <ul>
                        <li><a href="#">Dashboard </a></li>
                        <li><a href="#">Buyer</a></li>
                        <li><a href="#"><span>Product Research Profile</span></a></li>
                    </ul>
                </div>
                <div class="product_prfile">
                    <h1>Product Research Profile</h1>
                    <div class="row">
                        <div class="col_left">
                            <div class="panel">
                                <div class="form-group full">
                                    <input type="text" placeholder="Company Full Name" class="form-control" />
                                </div>
                                <div class="form-group full">
                                    <input type="text" placeholder="Company Short Name" class="form-control"/>
                                </div>
                                <div class="form_wrap row">
                                    <div class="form-group">
                                        <div class="custom-select">
                                            <select>
                                                <option>Country</option>
                                                <option>india</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group Company_sector">
                                        <input type="text" placeholder="Company Sector" class="form-control"/>
                                    </div>
                                </div>
                                <textarea name="" class="form-control" placeholder="Company Profile Description"></textarea>
                            </div>
                            <div class="radio_section">
                                <p>Q 1. Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry?</p>
                                <div class="radio_btn">
                                    <div class="align-items-center">
                                        <input type="radio" id="Lorem Ipsum A" name="fav_language" value="Lorem Ipsum A"/>
                                        <label for="Lorem Ipsum A">Lorem Ipsum A</label>
                                    </div>
                                    <div class="align-items-center">
                                        <input type="radio" id="Lorem Ipsum B" name="fav_language" value="Lorem Ipsum B"/>
                                        <label for="Lorem Ipsum B">Lorem Ipsum B</label>
                                    </div>
                                    <div class="align-items-center">
                                        <input type="radio" id="Lorem Ipsum C" name="fav_language" value="Lorem Ipsum C"/>
                                        <label for="Lorem Ipsum C">Lorem Ipsum C</label>
                                    </div>
                                </div>
                            </div>
                            <div class="radio_section">
                                <p>Q 2. Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry?</p>
                                <div class="radio_btn">
                                    <div class="align-items-center">
                                        <input type="radio" id="Lorem Ipsum A" name="fav_language" value="Lorem Ipsum A"/>
                                        <label for="Lorem Ipsum A">Lorem Ipsum A</label>
                                    </div>
                                    <div class="align-items-center">
                                        <input type="radio" id="Lorem Ipsum B" name="fav_language" value="Lorem Ipsum B"/>
                                        <label for="Lorem Ipsum B">Lorem Ipsum B</label>
                                    </div>
                                    <div class="align-items-center">
                                        <input type="radio" id="Lorem Ipsum C" name="fav_language" value="Lorem Ipsum C"/>
                                        <label for="Lorem Ipsum C">Lorem Ipsum C</label>
                                    </div>
                                </div>
                            </div>
                            <div class="radio_section">
                                <p>Q 3. Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry?</p>
                                <div class="radio_btn">
                                    <div class="align-items-center">
                                        <input type="radio" id="profile" name="fav_language" value="Lorem Ipsum A"/>
                                        <label for="profile">Lorem Ipsum A</label>
                                    </div>
                                    <div class="align-items-center">
                                        <input type="radio" id="supplier" name="fav_language" value="Lorem Ipsum B" />
                                        <label for="A supplier">Lorem Ipsum B</label>
                                    </div>
                                    <div class="align-items-center">
                                        <input type="radio" id="supplier" name="fav_language" value="Lorem Ipsum C" />
                                        <label for="A supplier">Lorem Ipsum C</label>
                                    </div>
                                </div>
                            </div>
                            <div class="radio_section">
                                <p>Q 4. Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry?</p>
                                <div class="radio_btn">
                                    <div class="align-items-center">
                                        <input type="radio" id="profile" name="fav_language" value="Lorem Ipsum A" />
                                        <label for="profile">Lorem Ipsum A</label>
                                    </div>
                                    <div class="align-items-center">
                                        <input type="radio" id="supplier" name="fav_language" value="Lorem Ipsum B" />
                                        <label for="A supplier">Lorem Ipsum B</label>
                                    </div>
                                    <div class="align-items-center">
                                        <input type="radio" id="supplier" name="fav_language" value="Lorem Ipsum C" />
                                        <label for="A supplier">Lorem Ipsum C</label>
                                    </div>
                                </div>
                            </div>
                            <div class="radio_section">
                                <p>Q 5. Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry?</p>
                                <div class="radio_btn">
                                    <div class="align-items-center">
                                        <input type="radio" id="profile" name="fav_language" value="Lorem Ipsum A" />
                                        <label for="profile">Lorem Ipsum A</label>
                                    </div>
                                    <div class="align-items-center">
                                        <input type="radio" id="supplier" name="fav_language" value="Lorem Ipsum B" />
                                        <label for="A supplier">Lorem Ipsum B</label>
                                    </div>
                                    <div class="align-items-center">
                                        <input type="radio" id="supplier" name="fav_language" value="Lorem Ipsum C" />
                                        <label for="A supplier">Lorem Ipsum C</label>
                                    </div>
                                </div>
                            </div>
                       </div>
                       <div class="col_right">
                        <h6>Company Images</h6>
                        <div class="data_upload">
                            <img src="images/profile_upload.svg" alt="" />
                            <h4>Upload Image, Video or <br/>
                                Document</h4>
                        </div>
                        <div class="thumbnail_section">
                            <h6>Set Thumbnail Image</h6>
                            <div class="thumb_inner row align-items-center">
                                <input type="radio" id="profile" name="thumb" value="" />
                                <figure class="center"><img src="images/thumbnail_1.svg" alt="" /></figure>
                                <figure><img src="images/trash-2.svg" alt="" /></figure>
                            </div>
                            <div class="thumb_inner row align-items-center">
                                <input type="radio" id="profile" name="thumb" value=""/>
                                <figure class="center"><img src="images/thumbnail_2.svg" alt="" /></figure>
                                <figure><img src="images/trash-2.svg" alt="" /></figure>
                            </div>
                        </div>
                        <div class="doc_upload">
                            <h6>Uploaded Documents</h6>
                            <div class="inner_doc row align-items-center">
                                <figure>
                                    <img src="images/pdf_icon.png" alt="" />
                                </figure>
                                <figure>
                                    <img src="images/trash-2.svg" alt="" />
                                </figure>
                            </div>
                
                        </div>
                    </div>        
                    
                    </div>
                    <div class="button">
                        <a href="" class="btn btn-secondary">Submit</a>
                    </div> 
                </div>
            </div>
        </div>

    
    
    
    </>
  )
}

export default Productresearch