import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usericon from "../../assets/images/icons8.png";
import { api } from "../base_url";
function Header() {
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [showtoggle, setshowtoggle] = useState(false);
  const [showmenu, setshowmenu] = useState(false);
  const [showsub, setshowsub] = useState(false);
  const [showmenu2, setshowmenu2] = useState(false);

  const outsideClick = () => {
    setshow(false);
    setshowtoggle(false);
  };
  const profile_img = localStorage.getItem("profile_pic") == "null" || localStorage.getItem("profile_pic") == "assets/images/users/default.png" ? usericon : localStorage.getItem("profile_pic");
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(profile_img, usericon);
    setshow(false);
    if (window.location.pathname == "/product-details" || window.location.pathname == "/product-details/") {
      navigate("/product-view")
    }

  }, [pathname]);

  return (
    <>
      <div className="header">
        <div className="container">
          <div
            className="outsideClick"
            onClick={() => outsideClick()}
            style={
              show == false && showtoggle == false ? { display: "none" } : {}
            }
          ></div>
          <div className="row justify-content-between align-items-center">
            <div className="left d-flex align-items-center">
              <div className="logo">
                <Link to="/">
                  <img
                    src={window.location.origin + "/images/logo.svg"}
                    title="Beauty Meetings"
                    alt=""
                  />
                </Link>
              </div>
              <div
                className="nav"
                style={showtoggle == true ? { display: "block" } : {}}
              >
                <ul>
                  <li>
                    <Link to="/how-does-it-work">How it works</Link>
                  </li>
                  <li>
                    <Link to="/buyers-at-a-glance">Buyers at a glance</Link>
                  </li>
                  <li> 
                    <Link to="/product-view">Showcased Products</Link>
                  </li>
                  <li
                    className="
                  dropdown2 
                  dropdown"
                  >
                    <Link to="#">
                      Content Library{" "}
                      <span>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </Link>
                    <ul
                      className="dropdown-menu"
                      style={showsub == true ? { display: "block" } : {}}
                    >
                      {/* <li>
                        <Link to="/blogs">Blogs</Link>
                      </li> */}
                      <li>
                        <Link to="/our-videos">Videos</Link>
                      </li>
                    </ul>
                    <span
                      className={
                        showsub == true
                          ? "drop-button  active  "
                          : "drop-button"
                      }
                      onClick={() => setshowsub(!showsub)}
                    ></span>
                  </li>
                  {/* <li>
                    <Link to="#">Events</Link>
                  </li> */}
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            {localStorage.getItem("username") != "" &&
              localStorage.getItem("username") != null &&
              localStorage.getItem("token") != "" ? (
              <>
                <div className="right d-flex product_buyer_wrap ">
                  <a
                    className="btn btn-primary row"
                    onClick={() => setshow(!show)}
                  >
                    {" "}
                    <figure style={{ lineHeight: 0 }}>
                      <img className="user_oc" src={profile_img} alt="sdfsa" />
                    </figure>
                    {localStorage.getItem("username")}
                  </a>
                  <div
                    id="toggle"
                    className={showtoggle == true ? "on" : ""}
                    onClick={() => setshowtoggle(!showtoggle)}
                  >
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                  </div>
                </div>
              </>
            ) : (
              <div className="right d-flex">
                <Link to="/login" className="btn btn-primary">
                  Sign in
                </Link>
                <div
                  id="toggle"
                  className={showtoggle == true ? "on" : ""}
                  onClick={() => setshowtoggle(!showtoggle)}
                >
                  <div className="one"></div>
                  <div className="two"></div>
                  <div className="three"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="popup_box"
        style={show == true ? { display: "block", top: "68px" } : {}}
      >
        <div className="img-content-box row">
          <div className="img-box">
            <img
              style={{ height: "45px", width: "45px" }}
              className="user_oc"
              src={
                profile_img
              }
              alt="logo"
            />
          </div>
          <div className="content-box">
            <h6> {localStorage.getItem("username")}</h6>
            <span>{localStorage.getItem("user_type")}</span>
          </div>
        </div>
        <div className="nav">
          <li className="profile" style={{ padding: "12px 20px" }}>
            <a onClick={() => setshowmenu2(!showmenu2)}>
              My Profile
              <i
                style={
                  showmenu2 == false ? { transform: "rotate(180deg)" } : {}
                }
                className="fa fa-angle-up"
                aria-hidden="true"
              ></i>
            </a>
          </li>
          <ul
            className="sub__menu profile_sub"
            style={showmenu2 == false ? { display: "none" } : {}}
          >
            {localStorage.getItem("user_type") &&
              (localStorage.getItem("user_type").toLowerCase() === "supplier" ||
                localStorage.getItem("user_type").toLowerCase() === "both") ? (
              <li>
                <a href="/dashboard/user-manegment">My Dashboard</a>
              </li>
            ) : (
              <li>
                <a href="/buyer-company-profile">My Dashboard</a>
              </li>
            )}

            <li>
              <a href="/company-Information">Company Information</a>
            </li>
            <li>
              <a
                style={{ color: "#999999" }}
                href={
                  localStorage.getItem("user_type") != null
                    ? `/dashboard/user-manegment/${localStorage.getItem(
                      "user_type"
                    )}`
                    : ""
                }
              >
                User Management{" "}
              </a>
            </li>
            <li className="information">
              <a onClick={() => setshowmenu(!showmenu)}>
                <span>Administrative Informations</span>

                <i
                  style={
                    showmenu == false ? { transform: "rotate(180deg)" } : {}
                  }
                  className="fa fa-angle-up"
                  aria-hidden="true"
                ></i>
              </a>
            </li>
            <ul
              className="sub__menu information_sub"
              style={showmenu == false ? { display: "none" } : {}}
            >
              <li>
                <a href="/contract">Contract Info </a>
              </li>
              {
                localStorage.getItem("user_type")?.toLowerCase() == "buyer" ?
                  "" :
                  <>
                    <li>
                      <a href="/billing">Billing</a>
                    </li>
                    <li>
                      <a href="#">Credit Card Info</a>
                    </li>
                  </>
              }
            </ul>
          </ul>
          <li
            className="logout"
            onClick={() => {
              setshow(false);
              navigate("/login");
              localStorage.clear();
            }}
            style={{ padding: "12px 20px" }}
          >
            <a>
              Logout<i className="fa fa-sign-out" aria-hidden="true"></i>
            </a>
          </li>
          <ul className="sub__menu term">
            <li>
              <a href="/privacy-terms"> Privacy and Terms</a>
            </li>
            <li>
              <a href="/cookies-policy">Cookies Preferences</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
