import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { api } from "../base_url";
import ReactPlayer from "react-player";
import Left_menu from "./left_menu";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../components/modal";
import DatePicker from "../../components/datepicker";
import Timepicker from "../../components/timepicker";
import moment from "moment";
import meetingicon from "../../assets/images/meeting.svg";
import meetingicon2 from "../../assets/images/meeting2.svg";
import favouriteicon from "../../assets/images/favourite.svg";
import favouriteicon2 from "../../assets/images/favourite2.svg";

function ProductDetailView(props) {
  const [showpolicy, setshowpolicy] = useState(false);
  const [sidebar, setsidebar] = useState(true);
  const [iconChange, seticonChange] = useState(false);
  const [iconChange2, seticonChange2] = useState(false);
  const [thumbshow, setthumbshow] = useState(false);
  const [Messagetext, setMessage] = useState("");
  const [Messageshow, setMessageshow] = useState(false);
  const [main, setmain] = useState([]);
  const [link, setlink] = useState("");
  const [select, setselect] = useState();
  const { state } = useLocation();
  const [productData, setProductData] = useState([]);
  const [textChange, settextChange] = useState();
  const [sDate, setSdate] = useState("");
  const [sTime, setSTime] = useState("");
  const [showTP, setShowTP] = useState();
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [thumb, setthumb] = useState();
  const [meetingStatus, setMeetingState] = useState();
  const [apiDateFormat, setApiDateFormat] = useState("");
  const [modalState, setModalState] = useState(false);
  const getProductDetails = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      api + "/api/v1/products_details?product_id=" + state?.id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        settextChange(result.data?.favornot);
        setMeetingState(result?.data?.checkrequest);
        console.log(result?.data?.checkrequest, "this is meeting status");
        // console.log(result.data.media_files ,result.data?.product?.thumb_index , thumb , "<<<<<<<result.data");
        setthumb(
          result.data?.media_files[
            Number(
              result.data?.product?.thumb_index == undefined ||
                result.data?.product?.thumb_index == "null"
                ? "0"
                : result.data?.product?.thumb_index
            )
          ]
        );
        setProductData(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const addtofavvrate = () => {
    var myHeaders = new Headers();
    var formvalues = new FormData();
    console.log("api hit");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    formvalues.append("product_id", state?.id);

    var requestOptions = {
      method: "post",
      headers: myHeaders,
      redirect: "follow",
      body: formvalues,
    };
    fetch(api + "/api/v1/favorites", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.type == "success") {
          // toast.success(result?.message);
          window.scrollTo(0, 0);
          setMessage(result?.message);
          setMessageshow(true);
          getProductDetails();
          setTimeout(() => {
            setMessageshow(false);
          }, 5000);
        }
        console.log(result);
      })
      .catch((error) => {
        console.log("error", error);
        if (error) {
          toast.error(error.message);
        }
      });
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  var settings2 = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  const requestAdmin = (id) => {
    var formdata = new FormData();
    formdata.append("product_id", id);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: formdata,
    };
    fetch(api + "/api/v1/sendrequest_productdetails", requestOptions)
      .then((response) => getProductDetails())
      .catch((error) => console.log("error", error));
  };

  function requestMeeting(pid, sid) {
    var formdata = new FormData();
    formdata.append("product_id", pid);
    formdata.append("supplier_id", sid);
    slots?.map((obj, index) => {
      formdata.append(`meetings[meeting_date][${index}]`, obj.apiDate);
      formdata.append(
        `meetings[meeting_time][${index}]`,
        moment(obj.sTime, ["HH:mm A"]).format("h:mm A ")
      );
    });

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: formdata,
    };
    fetch(api + "/api/v1/sendrequestformeeting", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setModalState(false);
          toast.success("Request Appointment send succesfully");
          window.location.reload();
        } else {
          toast.error(result.message);
          // console.log("Error", result);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("500 Internal Server Error");
      });
  }

  function showTimePicker(value) {
    if (slots.length >= 5) {
      toast.error("You can't select more than 5 availabilities");
    } else {
      const dm = moment(value).format("MMM D");
      setApiDateFormat(moment(value).format("DD-MM-YYYY"));
      setShowTP(true);
      setSdate(dm);
    }
  }
  const confirmSlots = () => {
    if (slots.length >= 5) {
      toast.error("you can't select more than 5 availabilites ");
      setSdate("");
      setSTime("");
    } else {
      const mergedSlots = [
        ...slots,
        { sDate: sDate, sTime: sTime, apiDate: apiDateFormat },
      ];
      console.log(mergedSlots);
      setSlots(mergedSlots);
      setSdate("");
      setSTime("");
      setApiDateFormat("");
      console.log(slots);
    }
  };

  useEffect(() => {
    getProductDetails();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (productData?.media_files) {
      setmain([productData?.media_files[0]]);
    }
  }, [link, productData]);

  let url2 = productData.product?.category?.replace(/\s+/g, "-");

  useEffect(() => {
    console.log(main, select, "ASDF<state<<<<<<<<");
  }, [main, select]);

  if (
    /^[\],:{}\s]*$/.test(
      productData.product?.sub_cat
        .replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    )
  ) {
    var sub_categorries = JSON.parse(productData.product?.sub_cat);
  }

  const removeSlot = (item) => {
    const index = slots.findIndex((slot) => slot.id === item.id);
    if (index !== -1) {
      const newSlots = [...slots];
      newSlots.splice(index, 1);
      setSlots(newSlots);
    }
  };

  if (slots.length > 5) {
    toast.error("you can't select more than 5 ");
  }

  // const {state} = useLocation()

  console.log(state);

  return (
    <>
      <div className="toast_custom">
        <div
          className={
            Messageshow
              ? "toast_custom_div open_div_fav"
              : "toast_custom_div close_div_fav"
          }
        >
          <p>
            <span style={{ paddingRight: "6px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                  fill="rgba(28,211,91,1)"
                ></path>
              </svg>
            </span>
            {Messagetext}
          </p>
          <span className="close_icon" onClick={() => setMessageshow(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
            >
              <path
                d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                fill="rgba(102,102,102,1)"
              ></path>
            </svg>
          </span>
          <a href="/buyer-favourite-product" className="view_list_btn">
            Show Your List
          </a>
        </div>
      </div>
      <div className="reset_resp  product_before_meeting">
        <div className="main">
          <Left_menu
            sidebar={sidebar}
            requeststatus={meetingStatus}
            setsidebar={setsidebar}
          />
          <div
            className={sidebar == true ? "router-body active" : "router-body "}
          >
            <div className="breadcrumbs" data-aos="fade-down">
              <div className="head">
                {state?.buyer_list == true ? (
                  <ul>
                    <li>
                      <a href="/dashboard">Dashboard </a>
                    </li>

                    <li>
                      <a href="#">Buyer</a>
                    </li>
                    <li>
                      <a href="#">My Meetings</a>
                    </li>
                    <li>
                      <a href="/buyer-favourite-product">Favourite List</a>
                    </li>
                    <li>
                      <a href="#">
                        <span>{productData.product?.product_name}</span>
                      </a>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      <a href="/dashboard">Dashboard </a>
                    </li>

                    <li>
                      <a href="/product-view">All products</a>
                    </li>
                    <li>
                      <a href={"/product-view/" + url2}>
                        <span>{productData.product?.category}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>{productData.product?.product_name}</span>
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className=" product_detail product_supplier">
              <div className="row">
                <div className="col_img" data-aos="fade-right">
                  <div className="slider-for">
                    {thumbshow == false ? (
                      <div>
                        <figure>
                          <img
                            className="mainimg-display"
                            src={thumb?.file_path}
                            alt=""
                          />
                        </figure>
                      </div>
                    ) : (
                      <Slider {...settings}>
                        {main?.map((item) => {
                          if (item.media_type === "image") {
                            return (
                              <div>
                                <figure>
                                  <img
                                    className="mainimg-display"
                                    src={item.file_path}
                                    alt=""
                                  />
                                </figure>
                              </div>
                            );
                          } else if (
                            item.media_type === "doc" &&
                            item?.file_path
                              .substr(item?.file_path.lastIndexOf("\\") + 1)
                              .split(".")[3] != "pdf"
                          ) {
                            return (
                              <div>
                                <figure>
                                  <iframe
                                    src={
                                      "https://view.officeapps.live.com/op/embed.aspx?src=" +
                                      item.file_path +
                                      "&embedded=true"
                                    }
                                    style={{ height: "500px" }}
                                  ></iframe>
                                </figure>
                              </div>
                            );
                          } else if (
                            item?.file_path
                              .substr(item?.file_path.lastIndexOf("\\") + 1)
                              .split(".")[3] == "pdf"
                          ) {
                            return (
                              <div>
                                <figure>
                                  <embed
                                    src={
                                      item?.file_path + "#toolbar=1&scrollbar=0"
                                    }
                                    height="500px"
                                    width="100%"
                                    frameborder="0"
                                    scrolling="auto"
                                  />
                                </figure>
                              </div>
                            );
                          }
                        })}
                        {link != "" ? (
                          <div>
                            <figure>
                              <ReactPlayer
                                url={productData?.product.youtube_link}
                                width={"auto"}
                                height={"300"}
                              />
                            </figure>
                          </div>
                        ) : null}
                      </Slider>
                    )}
                  </div>
                  <div className="slider-nav">
                    <Slider {...settings2}>
                      {productData.media_files?.map((item, index) => {
                        if (item.media_type === "image") {
                          return (
                            <div>
                              <figure
                                className={select == index ? "active" : ""}
                              >
                                <img
                                  className="thumbnail"
                                  src={item.file_path}
                                  alt={item.file_path}
                                  onClick={(e) => {
                                    setTimeout(() => {
                                      setmain([item]);
                                      setselect(index);
                                    }, 50);
                                    setlink("");
                                    setthumbshow(true);
                                  }}
                                />
                              </figure>
                            </div>
                          );
                        } else if (item.media_type === "doc") {
                          return (
                            <div>
                              <figure
                                className={select == index ? "active" : ""}
                                onClick={(e) => {
                                  setlink("");
                                  setTimeout(() => {
                                    setlink("");
                                    setmain([item]);
                                    setselect(index);
                                  }, 200);
                                  setselect(index);
                                  setmain([item]);
                                  setthumbshow(true);
                                }}
                              >
                                {/* <iframe src={"https://docs.google.com/gview?url=" + item.file_path + "&embedded=true"} ></iframe> */}
                                <img
                                  className="thumbnail"
                                  src={"/images/pdf_icon.png"}
                                  alt=""
                                />
                              </figure>
                            </div>
                          );
                        }
                      })}

                      {productData.product?.youtube_link == "null" ||
                      productData.product?.youtube_link == "undefined" ? (
                        ""
                      ) : (
                        <div>
                          <figure
                            style={
                              productData.product?.youtube_link === "null"
                                ? { display: "none" }
                                : {}
                            }
                            className={select == 100 ? "active" : ""}
                            onClick={(e) => {
                              setmain([]);
                              setTimeout(() => {
                                setmain([]);
                                setselect(100);
                              }, 200);
                              setselect(100);
                              setlink(productData.product?.youtube_link);
                              setthumbshow(true);
                            }}
                          >
                            {/* <ReactPlayer url={productData?.product.youtube_link} width={"auto"} height={"300"} /> */}
                            {productData.product?.youtube_link == null ? (
                              ""
                            ) : (
                              <i
                                className="fa-brands fa-square-youtube thumbnail"
                                style={{
                                  color: "#E30613",
                                  fontSize: "67px",
                                  textAlign: "center",
                                  cursor: "pointer",
                                }}
                              />
                            )}
                          </figure>
                        </div>
                      )}
                    </Slider>
                  </div>
                </div>
                <div className=" col_text" data-aos="fade-left">
                  <div className="button">
                    <button
                      onClick={() => {
                        navigate("/product-view/" + url2);
                      }}
                      className="btn_margin thiredbtn2 btn btn-secondary"
                    >
                      {productData.product?.category}
                    </button>
                    {sub_categorries?.map((item) => {
                      return (
                        <button className="btn_margin thiredbtn btn btn-secondar btn-defaul">
                          {item}
                        </button>
                      );
                    })}
                  </div>
                  <h2>{productData.product?.product_name}</h2>
                  <ul>
                    {productData.product?.made_in ? (
                      <li className="before_meeting_li">
                        <h5>Made In: {productData.product?.made_in}</h5>
                      </li>
                    ) : null}
                    {productData.product?.price_range ? (
                      <li className="before_meeting_li">
                        <h5>
                          Price Range: : {productData.product?.price_range}
                          {productData.product?.price_policy ? (
                            <>
                              <a href="#">
                                <span>(See Price Policy)</span>
                              </a>
                              <span
                                className="warniing_icon"
                                onMouseEnter={() => setshowpolicy(true)}
                                onMouseLeave={() => setshowpolicy(false)}
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
                                <div
                                  className="pocilybtn"
                                  style={
                                    showpolicy == true
                                      ? { display: "block" }
                                      : { display: "none" }
                                  }
                                >
                                  <p>{productData.product?.price_policy}</p>
                                </div>
                              </span>
                            </>
                          ) : null}
                        </h5>
                      </li>
                    ) : null}

                    {productData.product?.min_quantity ? (
                      <li className="before_meeting_li">
                        <h5>
                          Minimum Quantity: {productData.product?.min_quantity}
                        </h5>
                      </li>
                    ) : null}
                    {productData.product?.guarantee != null ? (
                      <li className="before_meeting_li">
                        <h5>Guarantee: {productData.product?.guarantee}</h5>
                      </li>
                    ) : (
                      ""
                    )}
                    {productData.product?.date_of_creation ? (
                      <li className="before_meeting_li">
                        <h5>
                          Date Of Creation:{" "}
                          {moment(
                            productData.product?.date_of_creation?.replace(
                              /\//g,
                              " "
                            ),
                            "DD MM YYYY"
                          )
                            .format("DD MM YYYY")
                            .toLowerCase() === "invalid date"
                            ? productData.product?.date_of_creation.replace(
                                /\//g,
                                "-"
                              )
                            : moment(
                                productData.product?.date_of_creation?.replace(
                                  /\//g,
                                  " "
                                ),
                                "DD MM YYYY"
                              ).format("DD-MM-YYYY")}
                        </h5>
                      </li>
                    ) : null}
                  </ul>

                  {productData?.product?.supplier_id ==
                  localStorage.getItem("user_id") ? (
                    ""
                  ) : (
                    <div className="button-wrapper m-t">
                      <a
                        // href="#"
                        onClick={() => addtofavvrate()}
                        className="hoverRemovebtn btn btn-secondary"
                        onMouseEnter={() => seticonChange(true)}
                        onMouseLeave={() => seticonChange(false)}
                      >
                        <span>
                          {iconChange == true ? (
                            <img src={favouriteicon2} alt="" />
                          ) : (
                            <img src={favouriteicon} alt="" />
                          )}
                        </span>
                        {/* Add your favourites */}
                        {textChange == true
                          ? "Added to favourites"
                          : "Add your favourites"}
                      </a>
                      {localStorage.getItem("user_type") &&
                      localStorage.getItem("user_type").toLowerCase() ===
                        "supplier" ? null : (
                        <>
                          <button
                            className="hoverRemovebtn-primary btn btn-primary"
                            onClick={() => {
                              if (
                                productData?.meeting_status?.status == undefined
                              ) {
                                setModalState(true);
                              }
                            }}
                            onMouseEnter={() => seticonChange2(true)}
                            onMouseLeave={() => seticonChange2(false)}
                          >
                            <span>
                              {iconChange2 ? (
                                <img src={meetingicon2} alt="" />
                              ) : (
                                <img src={meetingicon} alt="" />
                              )}
                            </span>
                            {console.log(
                              productData?.meeting_status,
                              "<<<,,,,"
                            )}
                            {(() => {
                              switch (productData?.checkrequest) {
                                case null:
                                  return "Request a meeting?";
                                case undefined:
                                  return "Request a meeting?";
                                // case 0:
                                //   return "Request in procces";
                                case 3:
                                  return "Meeting declined !";
                                case 1:
                                  return "Pending Approval";
                                case 2:
                                  return "Meeting Done";
                                default:
                                  return "";
                              }
                            })()}
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="product_supplier_inner">
              <h2>Product Details</h2>
              <p className="justify-para">
                {productData?.product?.product_dec}
              </p>
            </div>
            <div className="product-profile-wrapper">
              {productData.questions?.length > 0 ? (
                <div
                  className="product_supplir_profile"
                  style={
                    productData?.productownerstatus == true
                      ? { display: "contents" }
                      : productData?.requeststatus == 1
                      ? { display: "contents" }
                      : {}
                  }
                >
                  <div className="profile-list profile-brand">
                    <h2>Profile</h2>
                    <div className="row justify-content-between">
                      <div className="col_left last-contnt">
                        {productData.questions?.map((item) => {
                          if (item?.type.toLowerCase() == "checkbox") {
                            try {
                              if (
                                /^[\],:{}\s]*$/.test(
                                  item?.answer
                                    .replace(/\\["\\\/bfnrtu]/g, "@")
                                    .replace(
                                      /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                                      "]"
                                    )
                                    .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
                                )
                              ) {
                                var ans = JSON.parse(item?.answer);
                              }
                            } catch (error) {
                              console.log(error);
                            }
                          }
                          return (
                            <ul>
                              <li>
                                <h6>{item.question}</h6>
                              </li>
                              <li>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item?.type.toLowerCase() == "checkbox"
                                        ? item?.answer.replace(
                                            /[\\\n["{}:\]']+/g,
                                            " "
                                          )
                                        : item?.answer.replace(
                                            /[\\\n[{}:\]]+/g,
                                            "<br>"
                                          ),
                                  }}
                                />
                              </li>
                            </ul>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* {console.log(productData?.requeststatus)} */}
              {productData?.requeststatus === null ||
              (productData?.requeststatus != 1 &&
                productData?.productownerstatus != true) ? (
                <div className="request-box-wrapper">
                  <div className="request-box">
                    <h3>Do you want more information?</h3>
                    {productData?.checkrequest === 0 ? (
                      <button
                        className="btn btn-secondary"
                        onClick={() => requestAdmin(productData?.product.id)}
                      >
                        Request to Admin
                      </button>
                    ) : (
                      <button
                        style={{ cursor: "default ! important" }}
                        className="hoverRemovebtn3 btn "
                        disabled={true}
                      >
                        Request in Process
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <span className="scroll-up">
          <i className="fa fa-chevron-up" aria-hidden="true"></i>
        </span>
      </div>

      <Modal
        title="Request a meeting?"
        modalState={modalState}
        setModalState={setModalState}
      >
        <span className="close_modal" onClick={() => setModalState(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
          </svg>{" "}
        </span>
        <div className="modal-header">
          <h3>Add your Availability</h3>
        </div>
        <div className=" calendar_fix calendar-wrapper">
          <DatePicker setDate={showTimePicker} />
          {showTP ? <Timepicker setTime={setSTime} sTime={sTime} /> : null}
        </div>
        <div className="selected-time">
          {slots.map((item) => {
            return (
              <p>
                {item.sDate + " - " + item.sTime}
                <span
                  style={{ marginLeft: "10px" }}
                  onClick={() => removeSlot(item)}
                >
                  {/* <button className=""> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
                  </svg>{" "}
                  {/* </button> */}
                </span>
              </p>
            );
          })}

          {sDate !== "" ? (
            <>
              {sDate + " - " + sTime}
              {sTime ? (
                <button
                  onClick={confirmSlots}
                  className="btn_confirm btn btn-primary"
                  style={{
                    filter: slots.length >= 5 ? "grayscale(100%)" : "none",
                  }}
                >
                  Confirm ?
                </button>
              ) : null}
            </>
          ) : null}
        </div>
        <button
          className="btn btn-secondary"
          style={{display:"block",margin:"0 auto"}}
          onClick={() =>
            requestMeeting(
              productData.product?.id,
              productData.product?.supplier_id
            )
          }
        >
          Request Appointment
          {/* {sDate !== "" ? "on " + sDate + " at " + sTime : null} */}
        </button>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </>
  );
}

export default ProductDetailView;
