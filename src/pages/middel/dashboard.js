import React, { useState } from "react";

function Dashboard() {
  const [sidebar, setsidebar] = useState(true);
  const [submenu, setsubmenu] = useState(false);

  const [requestMeeting, setrequestMeeting] = useState(1);

  return (
    <>
      <div class="main">
        <div
          class={"left_wrapper left_desktop" + (sidebar ? " active" : "")}
          id="left_wrapper"
        >
          <div class="left_sidebar">
            <div class="box">
              <div class="sidebar_toggle" onClick={(e) => setsidebar(!sidebar)}>
                <span></span>
                <span></span>
                <span></span>
                <i class="fa fa-angle-left" aria-hidden="true"></i>
              </div>
              {localStorage.getItem("user_type") == "Supplier" ? (
                <>
                  <h4>SUPPLIER</h4>
                  <ul>
                    <li>
                      <a href="#">
                        <img src="images/bell.svg" alt="" />
                        Alert Notification
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/edit.svg" alt="" />
                        Products Showcase
                      </a>
                    </li>
                    <li class={submenu ? "backdrop" : ""}>
                      <a
                        class="menu_submenu supplier"
                        onClick={(e) => setsubmenu(!submenu)}
                      >
                        <img
                          class="bgdrop-icon-hide"
                          src="images/Meeting Schedule.svg"
                          alt=""
                        />
                        <img
                          class="bgdrop-icon"
                          src="images/calender_blue.png"
                          alt=""
                          style={{ display: "none" }}
                        />
                        My Meetings
                        <i class="fa fa-angle-down drop" aria-hidden="true"></i>
                      </a>
                      <ul
                        class="sub__menu supplier-meetings"
                        style={
                          submenu ? { display: "block" } : { display: "none" }
                        }
                      >
                        <li>
                          <a href="#">Pending Meetings</a>
                        </li>
                        <li>
                          <a href="#">Confirmed Meetings</a>
                        </li>
                        <li class="active">
                          <a href="#">Passed Meetings</a>
                        </li>
                      </ul>

                      {/* <!-- <span class="icon-drop"></span> --> */}
                    </li>
                  </ul>
                </>
              ) : (
                ""
              )}
              {localStorage.getItem("user_type") == "Buyer" ? (
                <>
                  <h4>BUYER</h4>
                  <ul>
                    <li>
                      <a href="#">
                        <img src="images/bell.svg" alt="" />
                        Alert Notification
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="images/edit.svg" alt="" />
                        Products Research Profile
                      </a>
                    </li>
                    <li class={submenu ? "backdrop" : ""}>
                      <a
                        class="menu_submenu buyer"
                        onClick={(e) => setsubmenu(!submenu)}
                      >
                        <img
                          class="bgdrop-icon-hide"
                          src="images/Meeting Schedule.svg"
                          alt=""
                        />
                        <img
                          class="bgdrop-icon"
                          src="images/calender_blue.png"
                          alt=""
                          style={{ display: "none" }}
                        />
                        My Meetings
                        <i class="fa fa-angle-down drop" aria-hidden="true"></i>
                      </a>
                      <ul
                        class="sub__menu buyer-meeting"
                        style={
                          submenu ? { display: "block" } : { display: "none" }
                        }
                      >
                        <li>
                          <a href="https://onlinebeautymeeting.sdsstaging.co.uk/product_view.html">
                            View All Products
                          </a>
                        </li>
                        <li>
                          <a href="#">Favourite List</a>
                        </li>
                        <li>
                          <a href="#">Confirmed Meetings</a>
                        </li>
                        <li class="active">
                          <a href="#">Passed Meetings</a>
                        </li>
                      </ul>
                    </li>
                    <li class="border">
                      <a href="https://onlinebeautymeeting.sdsstaging.co.uk/contact.html">
                        <img src="images/CONTACT.png" alt="" />
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      

        <div className={"router-body" + (sidebar ? " active" : "")}>
          <div class="breadcrumbs" data-aos="fade-down">
            <ul>
              <li>
                <a href="#">Dashboard </a>
              </li>
              <li>
                <a href="#">Buyer </a>
              </li>
              <li>
                <a href="#">My Meetings</a>
              </li>
              <li>
                <a href="#">View all products</a>
              </li>
              <li>
                <a href="#">
                  <span>Supplier A</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="product_detail product_supplier">
            <div class="row">
              <div class="col_img">
                <div class="slider-for">
                  <div>
                    <figure>
                      <img
                        class="mainimg-display"
                        src="images/banner_supplier.jpg"
                        alt=""
                      />
                    </figure>
                  </div>
                </div>
              </div>
              <div class="col_text">
                <div class="button">
                  <button class="btn btn-secondary">Category 1</button>
                  <button class="btn btn-secondary btn-default">
                    Sub Category 1
                  </button>
                </div>
                <h2>Product Name (Full)</h2>
                <ul>
                  <li>
                    <h5>Made In:</h5>
                  </li>
                  <li>
                    <h5>Guarantee:</h5>
                  </li>
                  <li>
                    <h5>Date Of Creation:</h5>
                  </li>
                  <li>
                    <h5>Training:</h5>
                  </li>
                </ul>
                <div class="button-wrapper">
                  <a href="#" class="btn btn-secondary">
                    <span>
                      <img src="images/favourite.svg" alt="" />
                    </span>
                    Add your favourites
                  </a>

                  {requestMeeting == 2 ? (
                    <a
                      onClick={() => setrequestMeeting(3)}
                      class="btn btn-primary"
                    >
                      <span>
                        {/* <img src="images/Meeting Schedule.svg"
    alt="" /> */}
                      </span>
                      Pending Approval
                    </a>
                  ) : (
                    <a
                      onClick={() => setrequestMeeting(2)}
                      class="btn btn-primary"
                    >
                      <span>
                        <img src="images/Meeting Schedule.svg" alt="" />
                      </span>
                      Request a meeting
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div class="product_supplier_inner">
            <h2>Product Details</h2>
            <p class="justify-para">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div class="product_supplir_profile">
            <div class="profile-list">
              <h2>Profile</h2>
              <div class="row justify-content-between">
                <div class="col_left">
                  <ul>
                    <li>
                      <h6>
                        Your Brand Belongs To One Of The Following Category?
                      </h6>
                    </li>
                    <li>
                      <p>Machines & Equipments</p>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <h6>
                        If You Are An Equipment Brand, Please Describe Your
                        Technology
                      </h6>
                    </li>
                    <li>
                      <p>Laser, Hair Removal</p>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <h6>
                        Describe Your Brand Concept, Philosophy And Identity
                      </h6>
                    </li>
                    <li>
                      <p>
                        Aerolase Corporation (NY USA) Manufacturers Completely
                        Uniqe And <br />
                        Portable Laser Technology For The Treatment Of All Skin
                        Types.
                      </p>
                    </li>
                  </ul>
                </div>
                <div class="col_right">
                  <div class="information">
                    <a href="#">
                      <h3>Do you want more information?</h3>
                    </a>
                    <a
                      href="/product-buyer3"
                      class="btn btn-secondary"
                      style={{ marginRight: "0" }}
                    >
                      Request to Admin
                    </a>
                  </div>
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
          <li class="profile">
            <a>
              My Profile <i class="fa fa-angle-up" aria-hidden="true"></i>
            </a>
          </li>
          <ul class="sub__menu profile_sub">
            <li>
              <a href="#">Company Information</a>
            </li>
            <li>
              <a href="#">User Management </a>
            </li>
            <li class="information">
              <a>
                <span>Administrative Informations</span>
                <i class="fa fa-angle-up" aria-hidden="true"></i>
              </a>
            </li>
            <ul class="sub__menu information_sub">
              <li>
                <a href="#">Contract Info </a>
              </li>
              <li>
                <a href="#">Billing</a>
              </li>
              <li>
                <a href="#">Credit Card Info</a>
              </li>
            </ul>
          </ul>
          <li class="logout">
            <a>
              Logout<i class="fa fa-sign-out" aria-hidden="true"></i>
            </a>
          </li>
          <ul class="sub__menu term">
            <li>
              <a href="#"> Privacy and Terms</a>
            </li>
            <li>
              <a href="#">Cookies Preferences</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
