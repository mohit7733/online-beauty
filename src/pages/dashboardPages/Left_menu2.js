import React, { useState } from "react";
import contactimag from "../../assets/images/CONTACT.png";
import bell from "../../assets/images/bell.svg";
import edit from "../../assets/images/edit.svg";
import Schedule from "../../assets/images/Meeting Schedule.svg";
import calender_blue from "../../assets/images/calender_blue.png";
import contact from "../../assets/images/contact_1.svg";
import contact_2 from "../../assets/images/contact_2.svg";
import company_contact from "../../assets/images/company-contact.png";
import comany_name from "../../assets/images/comany_name.svg";
import office from "../../assets/images/office.svg";
import facebook from "../../assets/images/FB 3.svg";
import twitter from "../../assets/images/TWITTER 3.svg";
import instagram from "../../assets/images/INSTA 3.svg";
import linkedin from "../../assets/images/LINKEDIN 3.svg";
import { useNavigate } from "react-router-dom";

export default function Left_menu2(props) {
  const [submenu, setsubmenu] = useState(false);
  const [submenu2, setsubmenu2] = useState(false);
  const [showcompanydetails, setshowcompanydetails] = useState(false);
  const navigate = useNavigate();
    console.log(props.setsidebar  );

  return (
    <div
      className={"left_wrapper left_desktop" + (props.sidebar ? " active" : "")}
      id="left_wrapper"
    >
      <div className="left_sidebar">
        <div className="box">
          <div
            className="sidebar_toggle"
            onClick={(e) => props.setsidebar(!props.sidebar)}
          >
            <span></span>
            <span></span>
            <span></span>
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </div>
          {localStorage.getItem("user_type") == "Supplier" ||
          localStorage.getItem("user_type") == "Both" ? (
            <>
              <h4
               onClick={() =>
                {
                  navigate("/dashboard")
                }}
                // onClick={() =>
                //   localStorage.getItem("user_type") == "Both"
                //     ? props.setsupplier("Supplier")
                //     : ""
                // }
              >
                {" "}
                SUPPLIER{" "}
              </h4>
              <ul>
                <li>
                  <a
                    // href="/alert-notefication/supplier"
                    style={{ cursor: "pointer" }}
                  >
                    <img src={bell} alt="" />
                    Alert Notification
                    {/* {
                      props.sidebar ?<>
                      ""</>:<>
                      {props?.notefication != [] ?
                    <span className="note_iconset">
  
                      <div>
  
                      {props?.notefication?.length }
                      </div>
                      
                      </span>:""
                      }</>
                    } */}
                  </a>
                </li>
                <li>
                  <a
                    href="/supplier-product-showcase"
                    style={{ cursor: "pointer" }}
                  >
                    <img src={edit} alt="" />
                    Products Showcase
                  </a>
                </li>
                <li className={submenu ? "backdrop" : ""}>
                  <a
                    className="menu_submenu supplier"
                    // onClick={(e) => setsubmenu(!submenu)}
                  >
                    <img className="bgdrop-icon-hide" src={Schedule} alt="" />
                    <img
                      className="bgdrop-icon"
                      src={calender_blue}
                      alt=""
                      style={{ display: "none" }}
                    />
                    My Meetings
                    <i className="fa fa-angle-down drop" aria-hidden="true"></i>
                  </a>
                  <ul
                    className="sub__menu supplier-meetings"
                    style={submenu ? { display: "block" } : { display: "none" }}
                  >
                    <li>
                      <a
                        href="/pending-meeting/supplier"
                        style={{ cursor: "pointer" }}
                      >
                        Pending Meetings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/confirmed-meeting/supplier"
                        style={{ cursor: "pointer" }}
                      >
                        Confirmed Meetings
                      </a>
                    </li>
                    <li className="active">
                      <a
                        href="/passed-meeting/supplier"
                        style={{ cursor: "pointer" }}
                      >
                        Passed Meetings
                      </a>
                    </li>
                  </ul>

                  {/* <!-- <span className="icon-drop"></span> --> */}
                </li>

                {localStorage.getItem("user_type") == "Both" ? (
                  ""
                ) : (
                  <li className="border">
                    <a href="/contact-us">
                      <img src={contactimag} alt="" />
                      Contact Us
                    </a>
                  </li>
                )}
              </ul>
            </>
          ) : (
            ""
          )}
          {localStorage.getItem("user_type") == "Buyer" ||
          localStorage.getItem("user_type") == "Both" ? (
            <>
              <h4
                onClick={
                  () => {
                    // navigate("/dashboard/user-manegment/buyer");
                  }

                  // localStorage.getItem("user_type") == "Both"
                  //   ? props.setsupplier("Buyer")
                  //   : ""
                }
                style={{ cursor: "pointer" }}
              >
                BUYER
              </h4>
              <ul>
                <li>
                  <a
                    // href="/alert-notefication/buyer"
                    style={{ cursor: "pointer" }}
                  >
                    <img src={bell} alt="" />
                    Alert Notification
                  </a>
                </li>
                <li>
                  <a 
                  // href="/buyer-company-profile"
                   style={{ cursor: "pointer" }}>
                    <img src={edit} alt="" />
                    My Company Profile
                                      </a>
                </li>
                <li className={submenu2 ? "backdrop" : ""}>
                  <a
                    className="menu_submenu buyer"
                    // onClick={(e) => setsubmenu2(!submenu2)}
                  >
                    <img className="bgdrop-icon-hide" src={Schedule} alt="" />
                    <img
                      class="bgdrop-icon"
                      src={calender_blue}
                      alt=""
                      style={{ display: "none" }}
                    />
                    My Meetings
                    <i class="fa fa-angle-down drop" aria-hidden="true"></i>
                  </a>
                  <ul
                    class="sub__menu buyer-meeting"
                    style={
                      submenu2 ? { display: "block" } : { display: "none" }
                    }
                  >
                    <li>
                      <a href="/product-view">View All Products</a>
                    </li>
                    <li>
                      <a href="/buyer-favourite-product">Favourite List</a>
                    </li>
                    <li>
                      <a
                        href="/confirmed-meeting/buyer"
                        style={{ cursor: "pointer" }}
                      >
                        Confirmed Meetings
                      </a>
                    </li>
                    <li class="active" style={{ cursor: "pointer" }}>
                      <a href="/passed-meeting/buyer">Passed Meetings</a>
                    </li>
                  </ul>
                </li>
                <li class="border">
                  <a href="/contact-us">
                    <img src={contactimag} alt="" />
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

      {props.pathname == "/meeting-done" ||
      props.pathname == "/product-after-meeting" ? (
        <div className="product_supplier_inner product_card">
          <div
            className="sidebar_toggle"
            onClick={(e) => props.setsidebar(!props.sidebar)}
          >
            <div className="icon-companycontact">
              <img src={company_contact} />
              <h4>Company Contact</h4>
            </div>
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </div>

          <div className="contact_comapny">
            <h4>Company Contact</h4>
            <ul>
              <li>
                <img src={comany_name} alt="" />
                <h5>Company Name </h5>
              </li>
              <li>
                <h6>Company Website </h6>
              </li>
              <li>
                <h6>Company Country</h6>
              </li>
            </ul>
            <ul>
              <li>
                <img src={office} alt="" />
                <h5>Main Office</h5>
              </li>
              <li>
                <h6>Jl. Tanjung Barat</h6>
              </li>
              <li>
                <h6>Selatan, Gang 100 no.</h6>
              </li>
              <li>
                <h6>26 Jakarta Selatan</h6>
              </li>
            </ul>
            <ul>
              <li>
                <img src={contact} alt="" />
                <h5>Contact 1</h5>
              </li>
              <li>
                <label for="Tel">Job Title: </label>
              </li>
              <li>
                <label for="Tel">Tel fix: </label>
              </li>
              <li>
                <label for="phone">Mobile: </label>
              </li>
              <li>
                <label for="email">Email: </label>
              </li>
            </ul>
            <ul className="border-bottom">
              <li>
                <img src={contact_2} alt="" />
                <h5>Contact 2</h5>
              </li>
              <li>
                <label for="Tel">Job Title: </label>
              </li>
              <li>
                <label for="Tel">Tel fix: </label>
              </li>
              <li>
                <label for="phone">Mobile: </label>
              </li>
              <li>
                <label for="email">Email: </label>
              </li>
            </ul>
            <div className="icon-bottom">
              <ul>
                <li>
                  <a href="#">
                    <img src={facebook} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={twitter} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={instagram} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={linkedin} alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
