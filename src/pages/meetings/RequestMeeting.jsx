import React, { useState } from "react";
import Left_menu2 from "../dashboardPages/Left_menu2";
import a3 from "../../assets/images/images-slider/A3.png"
import a4 from "../../assets/images/images-slider/A4.png"
import videoicon from "../../assets/images/video-icon.svg"
import buyer_thumb from "../../assets/images/buyer_thumb.png"
import thumbsdown from "../../assets/images/thumbs-down.svg"
import thumbsup from "../../assets/images/thumbs-up.svg"
import { useParams } from "react-router-dom";
import favicon from "../../assets/images/favourite.svg";
import favicon2 from "../../assets/images/meeting.svg";
function RequestMeeting() {
  const [sidebar, setsidebar] = useState(false);
  const [loader ,setloader] = useState(false)
  const [procces ,setprocces] = useState(false)
 const [delails, setDetails] = useState();
 const [imageArray, setImage] = useState();
 const {id} =useParams()

  return (
    <>
      <div className="Accept_meeting_wrap Meeting_wrap profile_popup">
        <div class="main">
          <Left_menu2 sidebar={sidebar} setsidebar={setsidebar} />
          <div class={ sidebar ? "router-body active add_hover":"router-body add_hover"}>
            <div class="breadcrumbs" data-aos="fade-down">
              <ul>
                <li>
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li>
                  <a href="#">Supplier  {">"} My Meetings</a>
                </li>
                <li>
                  <a href="#">
                    <span>(PENDING) Meetings Buyer A</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="product_detail product_supplier">
              <div class="row">
                <div class="col_img" data-aos="fade-right">
                  <div class="holder">
                    <div class="slides">
                      <img src={a4} alt="" />
                    </div>
                    <div class="slides">
                      <figure>
                      <img src={a3} alt="" />
                      </figure>
                    </div>
                  </div>
                  <div class="prevContainer">
                    <a class="prev" onclick="plusSlides(-1)">
                      <svg viewBox="0 0 24 24">
                        <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                      </svg>
                    </a>
                  </div>
                  <div class="nextContainer">
                    <a class="next" onclick="plusSlides(1)">
                      <svg viewBox="0 0 24 24">
                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                      </svg>
                    </a>
                  </div>

                  {/* <!-- thumnails in a row --> */}
                  <div class="thumb-slider">
                    <div
                      class="prevContainerx"
                       style={{top: "650px", height: "10%"}}
                    >
                      <a class="prev" onclick="plusSlides(-2)">
                        <svg viewBox="0 0 24 24">
                          <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                        </svg>
                      </a>
                    </div>
                    <div class="product-img active thumbnail">
                      <div class="slide-thumbnail" onclick="currentSlide(1)">
                        <img src={buyer_thumb} alt="Caption one" />
                      </div>
                      <div class="video-cercile">
                        <figure>
                          <img src={videoicon} alt="" />
                        </figure>
                      </div>
                    </div>
                    <div class="column thumbnail">
                      <img
                        class="slide-thumbnail"
                        src={a3}
                        onclick="currentSlide(2)"
                        alt="Caption two"
                      />
                    </div>
                    <div
                      class="nextContainery"
                      style={{top: "650px", height: "10%"}}
                      >
                      <a class="next" onclick="plusSlides(4)">
                        <svg viewBox="0 0 24 24">
                          <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div class="prevContainer">
                    <a class="prev" onclick="plusSlides(2)">
                      <svg viewBox="0 0 24 24">
                        <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                      </svg>
                    </a>
                  </div>
                  <div class="nextContainer">
                    <a class="next" onclick="plusSlides(-2)">
                      <svg viewBox="0 0 24 24">
                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div class="col_text" data-aos="fade-left">
                  <div class="button">
                    <button class="btn btn-secondary">Company sector</button>
                  </div>
                  <h2>Fullname Company</h2>
                  <h5>Company Country: France</h5>
                  <h2>Company Profile</h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. Lorem Ipsum
                  </p>
                  <div class="button-wrapper m-lft">
                    <a href="#" class="btn btn-primary">
                      <span>
                      <img src={favicon} alt="" />
                      </span>
                      Add your favourites
                    </a>
                    <a href={`/panding-accept/${id}`} class="btn btn-secondary">
                      <span>
                        <img src={favicon2} alt="" />
                      </span>
                      Request A Meeting
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="product_supplir_profile">
              <div class="profile-list profile-brand">
                <h2>Company</h2>
                <div class="row justify-content-between">
                  <div class="col_left last-contnt">
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
                          Uniqe And Portable Laser Technology For The Treatment
                          Of All Skin Types.
                        </p>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <h6>Specify Your Current Sales Channels</h6>
                      </li>
                      <li>
                        <p>
                          Dermatologists, plastic surgeons, aesthetic centers
                          and clinics, medical spa, Laser therapists
                        </p>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <h6>
                          What are the countries of interest for distribution?
                        </h6>
                      </li>
                      <li>
                        <p>
                          France, Belgium, Netherlands, Switzerland,
                          Scandinavia, Czechia.
                        </p>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <h6>
                          What are the differentiation points of your brand?
                        </h6>
                      </li>
                      <li>
                        <p>
                          Unique Microsecond-pulsed laser treats all skin types.
                          Painless treatment. Over 30 FDA approved indications.
                          manufactured in New York State.
                        </p>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <h6>Why should the distributor carry your products?</h6>
                      </li>
                      <li>
                        <p>
                          Unique technology - no other laser company has this.
                          Treats a very wide range of skin conditions, both
                          cosmetic and medical.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RequestMeeting;
