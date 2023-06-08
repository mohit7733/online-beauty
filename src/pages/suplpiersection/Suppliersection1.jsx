import React, { useState } from "react";

function Suppliersection1(props) {
  console.log(props);
  const [iaccept, setiaccept] = useState(false);
  const [completpayment, setcompletpayment] = useState(false);

  return (
    <>
      <div class="product_detail product_supplier">
        <div class="row">
          <div class="col_img" data-aos="fade-right">
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

            {/* <!-- thumnails in a row --> */}
          </div>
          <div class="col_text" data-aos="fade-left">
            <div class="button">
              <button class="btn btn-secondary"   style={{backgroundColor:"#19a0dd",color:"#fff",cursor:"default !important"}}>Company sector</button>
            </div>
            <h2>Fullname Company</h2>
            <h5>Company Country: France</h5>
            <h2>Company Profile</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. Lorem
              Ipsum
            </p>
            <div class="button-wrapper m-lft">
              {props.completpayment == true ? (
                ""
              ) : (
                <a href="#" class="btn btn-primary">
                  <span>
                    <img src="images/thumbs-down.svg" alt="" />
                  </span>
                  I Refuse A Meeting
                </a>
              )}
              {iaccept == true ? (
                <>
                  {props.completpayment == true ? (
                    <>
                      {props.meetingdone2 == true ? (
                        <a class="btn btn-secondary">
                          <span>
                            <img src="images/Payment.svg" alt="" />
                          </span>
                          Meeting Done
                        </a>
                      ) : props.meetingdone2 == false ? (
                        <a
                          onClick={props.setmeetingdone2(true)}
                          class="btn btn-secondary"
                        >
                          <span>
                            <img src="images/Payment.svg" alt="" />
                          </span>
                          Confirm Meeting
                        </a>
                      ):""}
                    </>
                  ) : (
                    <a
                      onClick={() => props.setcompletpayment(true)}
                      class="btn btn-secondary"
                    >
                      <span>
                        <img src="images/Payment.svg" alt="" />
                      </span>
                      Pending Payment
                    </a>
                  )}
                </>
              ) : (
                <a onClick={() => setiaccept(true)} class="btn btn-secondary">
                  <span>
                    <img src="images/Payment.svg" alt="" />
                  </span>
                  I Accept A Meeting
                </a>
              )}
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
                  <h6>Your Brand Belongs To One Of The Following Category?</h6>
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
                    Unique technology - no other laser company has this. Treats
                    a very wide range of skin conditions, both cosmetic and
                    medical.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Suppliersection1;
