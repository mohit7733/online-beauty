import React from "react";
import { useNavigate } from "react-router-dom";

function AddnewUser() {

const navigate = useNavigate()


  return (
    <div className="product_research_wrap add_new_product Meeting_wrap profile_popup">
      <div className="main">
        <div className="left_wrapper left_desktop" id="left_wrapper">
          <div className="left_sidebar">
            <div className="box">
              <div className="sidebar_toggle">
                <span></span>
                <span></span>
                <span></span>
                <i className="fa fa-angle-left" aria-hidden="true"></i>
              </div>
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
                <li>
                  <a className="menu_submenu supplier">
                    <img
                      className="bgdrop-icon-hide"
                      src="images/Meeting Schedule.svg"
                      alt=""
                    />
                    <img
                      className="bgdrop-icon"
                      src="images/calender_blue.png"
                      alt=""
                      style={{ display: "none" }}
                    />
                    My Meetings
                    <i className="fa fa-angle-down drop" aria-hidden="true"></i>
                  </a>
                  <ul className="sub__menu supplier-meetings">
                    <li>
                      <a href="#">Pending Meetings</a>
                    </li>
                    <li>
                      <a href="#">Confirmed Meetings</a>
                    </li>
                    <li className="active">
                      <a href="#">Passed Meetings</a>
                    </li>
                  </ul>

                  {/* <!-- <span className="icon-drop"></span> --> */}
                </li>
              </ul>
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
                <li>
                  <a className="menu_submenu buyer">
                    <img
                      className="bgdrop-icon-hide"
                      src="images/Meeting Schedule.svg"
                      alt=""
                    />
                    <img
                      className="bgdrop-icon"
                      src="images/calender_blue.png"
                      alt=""
                      style={{ display: "none" }}
                    />
                    My Meetings
                    <i className="fa fa-angle-down drop" aria-hidden="true"></i>
                  </a>
                  <ul className="sub__menu buyer-meeting">
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
                    <li className="active">
                      <a href="#">Passed Meetings</a>
                    </li>
                  </ul>
                </li>
                <li className="border">
                  <a href="https://onlinebeautymeeting.sdsstaging.co.uk/contact.html">
                    <img src="images/CONTACT.png" alt="" />
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="bg-light supplier-meetings dropdown-container"
          tabindex="-1"
        >
          <h4>
            My Meetings
            {/* <!-- <i className="fa fa-angle-up" aria-hidden="true"></i> --> */}
          </h4>
          <div className="dropdown-item-div">
            <a className="dropdown-item" href="#">
              Pending Meetings
            </a>
            <a className="dropdown-item" href="#">
              Confirmed Meetings
            </a>
            <a className="dropdown-item" href="#">
              Passed Meetings
            </a>
          </div>
        </div>
        <div
          className="bg-light buyer-meetings dropdown-container"
          tabindex="-1"
        >
          <h4>
            My Meetings
            {/* <!-- <i className="fa fa-angle-up" aria-hidden="true"></i> --> */}
          </h4>
          <div className="dropdown-item-div">
            <a
              className="dropdown-item"
              href="https://onlinebeautymeeting.sdsstaging.co.uk/product_view.html"
            >
              View All Products
            </a>
            <a className="dropdown-item" href="#">
              Favourite List
            </a>
            <a className="dropdown-item" href="#">
              Confirmed Meetings
            </a>
            <a className="dropdown-item" href="#">
              Passed Meetings
            </a>
          </div>
        </div>
        <div className="router-body">
          <div className="breadcrumbs" data-aos="fade-down">
            <ul>
              <li>
                <a href="#">Dashboard </a>
              </li>
              <li>
                <a href="#">Buyer </a>
              </li>
              <li>
                <a href="#">
                  <span> User Management </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Add New User </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="product_prfile">
            <h1>Add New User</h1>
            <div className="row">
              <div className="col_left">
                <div className="panel">
                  <div className="form-group full">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group full">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group input-group">
                    <input
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      className="form-control"
                      type="email"
                    />
                  </div>

                  <div className="form_wrap row">
                    <div className="form-group full Company_sector">
                      <input
                        type="text"
                        placeholder="Contact Number"
                        className="form-control"
                        type="tel"
                      />
                    </div>
                    <div className="form-group">
                      <div className="custom-select">
                        <select>
                          <option>Roles</option>
                          <option>ui</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button_wrap row">
                  <a href="" className="btn btn-secondary">
                    Add User
                  </a>
                  <a href="" className="btn btn-primary">
                    Cancel
                  </a>
                </div>
                <div className="error-button row justify-content-center">
                  <a className="error_icon" onClick={() => navigate(-1)}>
                    <i className="fa fa-arrow-left left" aria-hidden="true"></i>
                    Back to User Management
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddnewUser;
