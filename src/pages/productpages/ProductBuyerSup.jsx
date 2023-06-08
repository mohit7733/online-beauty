import React, { useState } from "react";
import Suppliersection1 from "../suplpiersection/Suppliersection1";
import ProductDescription from "./ProductDescription";

function ProductBuyerSup(props) {
  const [sidebar, setsidebar] = useState(true);
  const [check, setcheck] = useState(true);
  const [showdetails, setshowdetails] = useState(false);
  const [meetingdone, setmeetingdone] = useState(false);
  const [meetingdone2, setmeetingdone2] = useState(false);
  const [completpayment, setcompletpayment] = useState(false);
  const [showpolicy ,setshowpolicy] = useState(false)

  const [section, setsection] = useState(
    localStorage.getItem("sect") != null ? localStorage.getItem("sect") : 1
  );
  const [requestMeeting, setrequestMeeting] = useState(1);

  const [buyer, setbuyer] = useState("");
  const [supplier, setsupplier] = useState("Supplier");

  return (
    <>
      <div className={"router-body" + (props.sidebar ? " active" : "")}>

        
        <div class="breadcrumbs" data-aos="fade-down">
          {localStorage.getItem("user_type") == "Buyer" ? (
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
              {meetingdone == true ? (
                <li>
                  <a href="#">Passed Meetings</a>
                </li>
              ) : (
                <li>
                  <a href="#">View all products</a>
                </li>
              )}

              <li>
                <a href="#">
                  <span>Supplier A</span>
                </a>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <a href="#">Dashboard </a>
              </li>
              <li>
                <a href="#">Supplier </a>
              </li>
              <li>
                <a href="#">My Meetings</a>
              </li>
              {completpayment == true ? (
                <>
                  {meetingdone2 == true ? (
                    <li>
                      <a href="#">Passed Meetings</a>
                    </li>
                  ) : (
                    <li>
                      <a href="#">Confirmed Meetings</a>
                    </li>
                  )}
                </>
              ) : (
                <li>
                  <a href="#">(PENDING) Meetings</a>
                </li>
              )}

              <li>
                <a href="#">
                  <span>Buyer A</span>
                </a>
              </li>
            </ul>
          )}
        </div>
        {localStorage.getItem("user_type") == "Buyer" ? (
          <>
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
                {meetingdone == true ? (
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
                          <a href="">
                           
                            </a>
                          <span
                            className="warniing_icon"
                            onMouseEnter={() => setshowpolicy(true)}
                              onMouseDown={()=>setshowpolicy(false)}
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
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting
                            </p>
                          </div>
                          
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
                ) : (
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
                        <>
                          {meetingdone == true ? (
                            <a href="#" class="btn btn-primary">
                              <span>
                                <img src="images/check.svg" alt="" />
                              </span>
                              Meeting Done
                            </a>
                          ) : (
                            <a
                              onClick={() => setmeetingdone(true)}
                              class="btn btn-primary"
                            >
                              <span>
                                <img src="images/Meeting Schedule.svg" alt="" />
                              </span>
                              Pending Approval
                            </a>
                          )}
                        </>
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
                )}
              </div>
            </div>

            {showdetails == true ? (
              <ProductDescription />
            ) : meetingdone == true ? (
              <ProductDescription />
            ) : (
              <>
                <div class="product_supplier_inner">
                  <h2>Product Details</h2>
                  <p class="justify-para">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
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
                              Your Brand Belongs To One Of The Following
                              Category?
                            </h6>
                          </li>
                          <li>
                            <p>Machines & Equipments</p>
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <h6>
                              If You Are An Equipment Brand, Please Describe
                              Your Technology
                            </h6>
                          </li>
                          <li>
                            <p>Laser, Hair Removal</p>
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <h6>
                              Describe Your Brand Concept, Philosophy And
                              Identity
                            </h6>
                          </li>
                          <li>
                            <p>
                              Aerolase Corporation (NY USA) Manufacturers
                              Completely Uniqe And <br />
                              Portable Laser Technology For The Treatment Of All
                              Skin Types.
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
                            onClick={() => setshowdetails(true)}
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
              </>
            )}
          </>
        ) : (
          <>
            <Suppliersection1
              setcompletpayment={setcompletpayment}
              completpayment={completpayment}
              setmeetingdone2={setmeetingdone2}
              meetingdone2={meetingdone2}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProductBuyerSup;
