import React, { useState } from "react";
import Slider from "react-slick";
import image1 from "../../assets/images/banner_supplier.jpg"
import image2 from "../../assets/images/banner_supplier.jpg"
import image3 from "../../assets/images/banner_supplier.jpg"
function Productaftermeeting() {
    
    const [showpolicy ,setshowpolicy] = useState(false)

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    // <div class="product_before_meeting product_after_meeting Meeting_wrap profile_popup">
    //    <div class="main">

    <div class="router-body">
      <div class="breadcrumbs" data-aos="fade-down">
        <div class="head">
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
              <a href="#">Passed Meetings</a>
            </li>
            <li>
              <a href="#">
                <span>Supplier A</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="product_detail product_supplier after__meeting">
        <div class="row">
          <div class="col_img">
            <div class="slider-for ">
              <Slider {...settings}>
                <div>
                  <figure>
                    <img
                      class="mainimg-display"
                      src="images/banner_supplier.jpg"
                      alt=""
                    />
                  </figure>
                </div>
                <div>
                  <figure>
                    <img
                      class="mainimg-display"
                      src={image2}
                      alt=""
                    />
                  </figure>
                </div>
                <div>
                  <figure>
                    <img
                      class="mainimg-display"
                      src={image3}
                      alt=""
                    />
                  </figure>
                </div>
                <div>
                  <figure>
                    <img
                      class="mainimg-display"
                      src={image1}
                      alt=""
                    />
                  </figure>
                </div>
              </Slider>
            </div>
            <div class="slider-nav2 slider-nav">
              <div>
                <figure>
                  <img
                    class="thumbnail"
                    src={image1}
                    alt=""
                  />
                </figure>
              </div>
              <div>
                <figure>
                  <img
                    class="thumbnail"
                    src={image2}
                    alt=""
                  />
                </figure>
              </div>
              <div>
                <figure>
                  <img
                    class="thumbnail"
                    src={image3}
                    alt=""
                  />
                </figure>
              </div>

              <div class="product-img">
                <div>
                  <figure>
                    <img
                      class="thumbnail"
                      src="images/images-slider/A4.png"
                      alt=""
                    />
                  </figure>
                </div>
                <div class="video-cercile">
                  <figure>
                    <img src="images/video-icon.svg" alt="" />
                  </figure>
                </div>
              </div>
              <div>
                <figure>
                  <img
                    class="thumbnail"
                    src="images/images-slider/image_slider_1.png"
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
              <li class="after_meeting_li">
                <h5>Made In:</h5>
              </li>
              <li class="after_meeting_li">
                <h5>
                  Price Range: : € 10.000{" "}
                  <a href="">{/* <span>(See Price Policy)</span> */}</a>
                  {/* <span
                    className="warniing_icon"
                    onMouseEnter={() => setshowpolicy(true)}
                    //  onMouseLeave={()=>setshowpolicy(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
                    </svg>
                  </span>
                  <div
                    className="pocilybtn"
                    style={
                      showpolicy == true
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting
                    </p>
                  </div> */}
                </h5>
              </li>
              <li class="after_meeting_li">
                <h5>Minimum Quantity:</h5>
              </li>
              <li class="after_meeting_li">
                <h5>Guarantee:</h5>
              </li>
              <li class="after_meeting_li">
                <h5>Date Of Creation:</h5>
              </li>
              <li class="after_meeting_li">
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
              <a href="#" class="btn btn-primary">
                <span>
                  <img src="images/check.svg" alt="" />
                </span>
                Meeting Done
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-list profile-brand">
        <h2>Product Details</h2>
        <p class="justify-para">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <h2>Company</h2>
        <div class="row justify-content-between">
          <div class="col_left">
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
                <h6>
                  If You Are An Equipment Brand, Please Describe Your Technology
                </h6>
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
                <p>
                  Aerolase Corporation (NY USA) Manufacturers Completely Uniqe
                  And Portable Laser Technology For The Treatment Of All Skin
                  Types.
                </p>
              </li>
            </ul>
            <ul>
              <li>
                <h6>Specify Your Current Sales Channels</h6>
              </li>
              <li>
                <p>
                  Dermatologists, plastic surgeons, aesthetic centers and
                  clinics, medical spa, Laser therapists
                </p>
              </li>
            </ul>
            <ul>
              <li>
                <h6>What are the countries of interest for distribution?</h6>
              </li>
              <li>
                <p>
                  France, Belgium, Netherlands, Switzerland, Scandinavia,
                  Czechia.
                </p>
              </li>
            </ul>
            <ul>
              <li>
                <h6>What are the differentiation points of your brand?</h6>
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
                  Unique technology - no other laser company has this. Treats a
                  very wide range of skin conditions, both cosmetic and medical.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    //     </div>

    // </div>
  );
}

export default Productaftermeeting;
