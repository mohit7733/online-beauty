import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../base_url";
import { useLocation } from "react-router-dom";

function Footer() {
  const [check2, setcheck2] = useState(useLocation());
  const [activeadd, setactive] = useState(false);
  const [how_work, sethow_work] = useState();
  const [check, setcheck] = useState(true);
  const how_work_data = () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(api + "/api/footer", requestOptions)
      .then((response) => response.json())
      .then((result) => sethow_work(result.data))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    if (check) {
      how_work_data();
      setcheck(false);
    }
  }, [check]);

  window.addEventListener("scroll", () => {
    const scolled = window.scrollY;
    if (scolled > 200) {
      setactive(true);
    } else {
      setactive(false);
    }
  });

  return (
    <>
      <footer>
        <div className="container">
          <div className="inner-footer row justify-content-between">
            <div className="column">
              <div className="nav-logo">
                <Link to="#">
                  <img
                    src={window.location.origin + "/images/Group.svg"}
                    alt=""
                  />
                </Link>
                <div
                  className="inner-text"
                  dangerouslySetInnerHTML={{
                    __html: how_work?.footer[0]?.description,
                  }}
                />
              </div>
              <div className="nav-icon">
                <ul>
                  {/* <li><Link to="#"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li> */}
                  {/* <li><Link to="#"><i className="fa fa-twitter" aria-hidden="true"></i></Link></li> */}
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UCuyOz-rngJLZexMzoutHSbw?app=desktop"
                      target="_blank"
                    >
                      <i class="fa-brands fa-square-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/showcase/beautymeetings"
                      target="_blank"
                    >
                      <i
                        className="fa fa-linkedin-square"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="column d-flex justify-content-arround">
              <div className="nav-menu">
                <h6>Our Services</h6>
                <ul>
                  <li>
                    <a href="/how-does-it-work">How it works</a>
                  </li>
                  <li>
                    <a href="product-view">Products</a>
                  </li>
                  <li>
                    <a href="/our-videos">Videos</a>
                  </li>
                  {/* <li><a href="/blogs">Blogs</a></li> */}
                </ul>
              </div>
              <div className="nav-menu">
                <h6>Beauty Meetings</h6>
                <ul>
                  <li>
                    <a href="/they-trusted-us">They trusted us</a>
                  </li>
                  <li>
                    <a href="/about-us">About us</a>
                  </li>
                  <li>
                    <a href="/contact-us">Contact us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="column">
              <h6
                dangerouslySetInnerHTML={{
                  __html: how_work?.footer[0]?.rightcontent,
                }}
              ></h6>

              <div className="f-logos flex">
                <span>
                  <img
                    style={{ width: "150px", height: "40" }}
                    src={how_work?.footer[0]?.logo1?.replace(/ /g, "%20")}
                    alt=""
                  />
                </span>
                <span>
                  <img
                    style={{ width: "150px", height: "40" }}
                    src={how_work?.footer[0]?.logo2?.replace(/ /g, "%20")}
                    alt=""
                  />
                </span>
                {/* <sapn><img src={"https://adminbm.health-and-beauty.fr/assets/cms/2023-03-30%201680189156png"} alt="" /></sapn> */}
              </div>
              <ul className="inline-list">
                <li>
                  <a href="/privacy-terms">Privacy-Terms</a>
                </li>
                <li>
                  <a href="/cookies-policy">Cookies Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright d-flex justify-content-between">
            <p>© 2022-23, Beautymeetings, All Rights Reserved.</p>
            <p>
              Website By:{" "}
              <Link to="https://sdssoftwares.co.uk/" target="_blank">
                sdssoftwares.co.uk
              </Link>
            </p>
          </div>
        </div>
      </footer>
      <span
        className={activeadd ? "scroll-up active" : "scroll-up"}
        onClick={(e) => window.scrollTo(0, 0)}
      >
        <i className="fa fa-chevron-up" aria-hidden="true"></i>
      </span>
      {localStorage.getItem("username") == null ? (
        <div className="fixed-social" data-aos="fade-right">
          {/* <div className="social">
                            <Link to="#">
                                <div className="social-btn hover-color">
                                    <p className="Telegram">Facebook</p>
                                    <div className="social-icon"><img src={window.location.origin + "/images/icon-facebook.svg"} alt="" /></div>
                                </div>
                            </Link>
                        </div>
                        <div className="social">
                            <Link to="#">
                                <div className="social-btn hover-color">
                                    <p className="Telegram">Twitter</p>
                                    <div className="social-icon"><img src={window.location.origin + "/images/icon-twiiter-icon.svg"} alt="" /></div>
                                </div>
                            </Link>
                        </div> */}
          <div className="social">
            <a
              href="https://www.youtube.com/channel/UCuyOz-rngJLZexMzoutHSbw?app=desktop"
              target="_blank"
            >
              <div className="social-btn hover-color">
                <p className="Telegram">Youtube</p>
                <div className="social-icon">
                  <img
                    src={window.location.origin + "/images/youtube.svg"}
                    alt=""
                  />
                </div>
              </div>
            </a>
          </div>
          <div className="social">
            <a
              href="https://www.linkedin.com/showcase/beautymeetings"
              target="_blank"
            >
              <div className="social-btn hover-color">
                <p className="Telegram">Linkedin</p>
                <div className="social-icon">
                  <img
                    src={
                      window.location.origin + "/images/icon-linkedin-icon.svg"
                    }
                    alt=""
                  />
                </div>
              </div>
            </a>
          </div>
          <div className="social">
            <a href="/contact-us" target="_blank">
              <div className="social-btn hover-color">
                <p className="Telegram">Contact Us</p>
                <div className="social-icon">
                  <img
                    src={window.location.origin + "/images/icon-mail.svg"}
                    alt=""
                  />
                </div>
              </div>
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Footer;
