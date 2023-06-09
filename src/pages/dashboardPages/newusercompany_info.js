import React, { useEffect, useState } from "react";
import Left_menu from "../productpages/left_menu";
import { api } from "../base_url";
// import Left_menu2 from "./Left_menu2";
import { country } from "../dashboard/country";
import {timeZoneCity} from '../dashboard/timezone'
import InputUpload from "../../components/input-with-button/input-with-button";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import  closeicon from "../../assets/images/close.svg"
function Company_informationNew(props) {
  const [editcompany, seteditcompany] = useState(true);
  const [counrtcode, setcounrtcode] = useState("");
  const [counrtcode1, setcounrtcode1] = useState("");
  const [contact_code1, setcontact_code1] = useState("");
  const [counrtcode2, setcounrtcode2] = useState("");
  const [SaveAdd, setSaveAdd] = useState(0);
  const [contact_code2, setcontact_code2] = useState("");
  const [countrycodeshow, setcountrycodeshow] = useState(false);
  const [countrycodeshow2, setcountrycodeshow2] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchcode, setsearchcode] = useState("");
  const [searchcode2, setsearchcode2] = useState("");
  const [timeZone , setTimeZone] = useState([])
  const [selectedTimeZone , setSeclectedTimeZone] = useState()

  
  // console.log(state, "<<<<<< state");
  const [cInfo, setCInfo] = useState({
    country_code: "",
    company_name: "",
    brand_name: "",
    contact1_email: "",
    contact1_name: "",
    contact1_phone: "",
    contact1_image: "",

    // contact1_code: ,
    // contact2_code: "",
    contact1_job: "",
    address1: "",
    address2: "",
    address3: "",
    city: "",
    state: "",
    post_code: "",
    country: "",
    website: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [sidebar, setsidebar] = useState(false);
  const [styleapply, setstyle] = useState(false);
  const check_data = [
    { name: "company_name" },
    { name: "brand_name" },
    { name: "contact1_code" },
    { name: "contact1_email" },
    { name: "contact1_name" },
    { name: "contact1_phone" },
    { name: "contact1_job" },
    { name: "post_code" },
    { name: "address1" },
    { name: "country" },
    { name: "brand_logo" },
    { name: "city" },
    { name: "state" },
    // { name: "Policy" },
    { name: "website" },
    // { name: "Guarantee" },
    // { name: "Creation" },
  ];

  const [errorfield, seterrorfield] = useState({
    company_name: "",
    contact1_code: "",
    brand_name: "",
    contact1_email: "",
    contact1_name: "",
    contact1_phone: "",
    contact1_job: "",
    address1: "",
    city: "",
    state: "",
    post_code: "",
    country: "",
    timeZone : "" , 
    website: "",
    contact1_image: "",
    brand_logo: "",
  });


  useEffect(() => {
    const utcDetails = timeZoneCity.map((city) => city.utc).flat();
    setTimeZone(utcDetails);
  }, []);

    console.log(timeZone , "timeZone")

  function onChangeValues(e) {
    const selectedValue = e.target.value;
    setSeclectedTimeZone(selectedValue);
    if (e.target.files) {
      setCInfo({ ...cInfo, [e.target.name]: e.target.files[0] });
    } else {
      setCInfo({ ...cInfo, [e.target.name]: e.target.value });
    }
  }

  // useEffect(()=>{
  //   console.log(SaveAdd ,contact_code2);
  // },[SaveAdd])

  const filtercode = country?.data?.filter((item) => {
    return item.country == cInfo.country;
  });

  useEffect(() => {
    setcounrtcode(filtercode[0]?.code);
  }, [cInfo.country]);

  function addCompanyInfo(event) {
    var formvalues = new FormData();
    //formvalues = {...formvalues , ...cInfo};
    for (let key in cInfo) {
      formvalues.append(key, cInfo[key]);
    }

    if (cInfo?.website == "") {
      setErrorMessage("Please Fill All Mandatory Field !");
    }

    formvalues.append("copy_billing_address", SaveAdd);
    formvalues.append("country_code", counrtcode);
    formvalues.append("contact1_code", contact_code1);
    formvalues.append("contact2_code", contact_code2);
    formvalues.append('timezone' , selectedTimeZone)
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: formvalues,
    };

    fetch(api + "/api/company-information", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result?.success == false) {
          toast.error("Please Select Profile and Brand Image !");
        }

        if (result?.status == "true") {
          toast.success(result?.message);
          setTimeout(() => {
            // props.setsection(3)

            if (state?.fill_now == "details") {
              navigate("/company-Information");
            } else {
              if (localStorage.getItem("user_type")?.toLowerCase() == "buyer") {
                navigate("/buyer-company-profile");
              } else if (
                localStorage.getItem("user_type")?.toLowerCase() == "both"
              ) {
                navigate("/dashboard/user-manegment");
              } else {
                navigate("/dashboard/user-manegment");
              }
            }

            // window.location.reload()
          }, 2000);
        } else {
          toast.error(result?.message);
        }

        if (result.success) {
          setCInfo(result.data);
        } else {
          const errArr = Object.values(result.message);
          // setErrMsg(errArr);
        }
      })
      .catch((error) => {
        setErrMsg("Server error with status 500 !");
        if (error) {
          toast.error("Server error with status 500 !");
        }
        console.log("error", error);
      });
  }

  useEffect(() => {
    if (props.pageType !== "new") {
      //   getCompanyInfo();
    } else {
      seteditcompany(true);
    }
    if (props.pageType === "edit") {
      seteditcompany(false);
    }
  }, []);

  const logins_field2 = (e) => {
    switch (e.target.name) {
      case "company_name":
        errorfield.company_name = e.target.value == "" ? "required" : "";
        break;
      case "brand_logo":
        errorfield.brand_logo = e.target.files[0].name == "" ? "required" : "";
        break;
      case "brand_name":
        errorfield.brand_name = e.target.value == "" ? "required" : "";
        break;
      case "city":
        errorfield.city = e.target.value == "" ? "required" : "";
        break;
      case "state":
        errorfield.state = e.target.value == "" ? "required" : "";
        break;
      case "post_code":
        errorfield.post_code = e.target.value == "" ? "required" : "";
        break;
      case "address1":
        errorfield.address1 = e.target.value == "" ? "required" : "";
        break;
      case "website":
        errorfield.website = e.target.value == "" ? "required" : "";
        break;
      case "country":
        errorfield.country = e.target.value == "" ? "required" : "";
        break;
      case "contact1_name":
        errorfield.contact1_name = e.target.value == "" ? "required" : "";
        break;
      case "contact1_job":
        errorfield.contact1_job = e.target.value == "" ? "required" : "";
        break;
      case "contact1_email":
        errorfield.contact1_email = e.target.value == "" ? "required" : "";
        break;
      case "contact1_phone":
        errorfield.contact1_phone = e.target.value == "" ? "required" : "";
        break;

      default:
        break;
    }
    seterrorfield({ ...errorfield });
    // setcontact({ ...contact, [e.target.name]: e.target.value });
  };

  const logins_field = (e) => {
    switch (e) {
      case "company_name":
        errorfield.company_name = cInfo?.company_name == "" ? "required" : "";
        break;
      case "brand_name":
        errorfield.brand_name = cInfo?.brand_name == "" ? "required" : "";
        break;
      case "brand_logo":
        errorfield.brand_logo = cInfo?.brand_logo == "" ? "required" : "";
        // console.log(cInfo?.brand_logo);
        break;
      case "state":
        errorfield.state = cInfo?.state == "" ? "required" : "";
        break;
      case "city":
        errorfield.city = cInfo?.city == "" ? "required" : "";
        break;
      case "post_code":
        errorfield.post_code = cInfo?.post_code == "" ? "required" : "";
        break;
      case "country":
        errorfield.country = cInfo?.country == "" ? "required" : "";
        break;
      case "address1":
        errorfield.address1 = cInfo?.address1 == "" ? "required" : "";
        break;
      case "contact1_phone":
        errorfield.contact1_phone =
          cInfo?.contact1_phone == "" ? "required" : "";
        break;
      case "contact1_name":
        errorfield.contact1_name = cInfo?.contact1_name == "" ? "required" : "";
        break;
      case "contact1_email":
        errorfield.contact1_email =
          cInfo?.contact1_email == "" ? "required" : "";
        break;
      case "contact1_job":
        errorfield.contact1_job = cInfo?.contact1_job == "" ? "required" : "";
        break;
      case "website":
        errorfield.website = cInfo?.website == "" ? "required" : "";
        break;

      default:
        break;
    }
    seterrorfield({ ...errorfield });
  };

  return (
    <>
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

      <div className="company_wrapper product_section Meeting_wrap profile_popup">
        <div
          className="main"
          onClick={() => {
            if (countrycodeshow == true) {
              setcountrycodeshow(false);
            }

            if (countrycodeshow2 == true) {
              setcountrycodeshow2(false);
            }
          }}
        >
          {/* <Left_menu2 sidebar={sidebar} setsidebar={setsidebar} /> */}

          <div className={(sidebar ? "active " : " ") + "active router-body"}>
            <div className="breadcrumbs" data-aos="fade-down">
              <ul>
                <li>
                  <a href="/dashboard">Dashboard </a>
                </li>
                <li>
                  <a href="#">My Profile</a>
                </li>
                <li>
                  <a
                    onClick={() => seteditcompany(false)}
                    style={{ cursor: "pointer" }}
                  >
                    <span> Company Information </span>
                  </a>
                </li>
                {/* <li><a href="#"><span> Edit Company Information </span></a></li> */}
              </ul>
            </div>
            <div className="remark_wrap company_wrap row justify-content-between">
              <div className="column">
                <h2>Company Information</h2>
                <p className="error" style={{ cursor: "unset" }}>
                  Please Fill All Mandatory Field*
                </p>
              </div>
              {/* {
                        editcompany ?
                            null :
                            <div className="column">
                                <p><a onClick={() => seteditcompany(true)} >Edit Company Information<img src="images/edit (1).svg" alt="" /></a></p>
                            </div>
                    } */}
            </div>
            <div className="form-section">
              <form
                onSubmit={(e) => {
                  // e.preventDefault();
                  addCompanyInfo(e);
                }}
              >
                <div className="form-row align-items-center">
                  <div className="left">
                    <label>
                      Company Name <span style={{ color: "red" }}>*</span>{" "}
                    </label>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      <input
                        type="text"
                        name="company_name"
                        value={cInfo?.company_name}
                        onChange={(e) => {
                          onChangeValues(e);
                          logins_field2(e);
                        }}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="Beauty Meetings  *"
                        disabled={!editcompany}
                        required={true}
                        style={
                          errorfield.company_name == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                      {/* <span>
                      *
                      </span> */}
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-center">
                  <div className="left">
                    <label>
                      Brand Name <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      <input
                        type="text"
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        name="brand_name"
                        onChange={(e) => {
                          onChangeValues(e);
                          logins_field2(e);
                        }}
                        value={cInfo?.brand_name}
                        placeholder="Beauty Meetings  *"
                        disabled={!editcompany}
                        style={
                          errorfield.brand_name == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-center">
                  <div className="left">
                    <label>
                      Brand Logo <span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <span className="sub-label">
                      File Type: JPEG, PNG <br />
                      <span>Size: Max 800kb</span>
                    </span>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      {cInfo?.brand_logo && !editcompany ? (
                        cInfo?.brand_logo
                      ) : (
                        // <InputUpload onChange={onChangeValues} placeholder={"Brand Logo"} btnTxt={"Choose File"}  file={cInfo?.brand_logo} name="brand_logo" />
                        <>
                          <div
                            className="upload-files"
                            // style={
                            //   errorfield.brand_logo == ""
                            //     ? {}
                            //     : { borderBottom: "1px solid red" }
                            // }
                          >
                            <div className="button">Choose File *</div>
                            <div className="files">
                              {" "}
                              {cInfo?.brand_logo?.name}{" "}
                            </div>
                            <div className="delete"></div>
                            {/* <input
                              type="file"
                              name="brand_logo"
                              className="form-control"
                              /> */}
                            <input
                              type="file"
                              name="brand_logo"
                              onChange={(e) => {
                                logins_field2(e);
                                onChangeValues(e);
                              }}
                              className="form-control"
                              placeholder="Beauty Meetings *"
                              style={
                                errorfield.brand_logo == ""
                                  ? {}
                                  : { borderBottom: "1px solid red" }
                              }
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-start">
                  <div className="left">
                    <label>
                      Head Office Address{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="right pd-bt">
                    <div className="form-group">
                      <input
                        type="text"
                        name="address1"
                        onChange={(e) => {
                          onChangeValues(e);
                          logins_field2(e);
                        }}
                        value={cInfo?.address1}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="Address line 1 *"
                        disabled={!editcompany}
                        style={
                          errorfield.address1 == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="address2"
                        onChange={onChangeValues}
                        value={cInfo?.address2}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="Address line 2 "
                        disabled={!editcompany}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="address3"
                        onChange={onChangeValues}
                        value={cInfo?.address3}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="Address line 3 "
                        disabled={!editcompany}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="post_code"
                        onChange={(e) => {
                          onChangeValues(e);
                          logins_field2(e);
                        }}
                        value={cInfo?.post_code}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="Postal Code *"
                        disabled={!editcompany}
                        style={
                          errorfield.post_code == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="city"
                        onChange={(e) => {
                          onChangeValues(e);
                          logins_field2(e);
                        }}
                        value={cInfo?.city}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="City *"
                        disabled={!editcompany}
                        style={
                          errorfield.city == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="state"
                        onChange={(e) => {
                          onChangeValues(e);
                          logins_field2(e);
                        }}
                        value={cInfo?.state}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="State *"
                        disabled={!editcompany}
                        style={
                          errorfield.state == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    <div className="form-group">
                      <select
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        name="country"
                        value={cInfo?.country}
                        disabled={!editcompany}
                        onChange={(e) => {
                          onChangeValues(e);
                          logins_field2(e);
                        }}
                        style={
                          errorfield.country == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      >
                        <option value="" disabled selected>
                          Select Country *
                        </option>
                        {country.data.map((data, i) => {
                          // console.log(data);
                          return (
                            <option value={data.country}>{data.country}</option>
                          );
                        })}
                      </select>
                    </div>









                    <div
  className="form-group"
  style={cInfo?.timezone !== "" ? {} : { borderBottom: "1px solid red" }}
>
  <select
    className={editcompany ? "form-control" : "form-control disabled"}
    name="country"
    value={cInfo?.timezone}
    disabled={!editcompany}
    onChange={onChangeValues}
  >
    <option value="" disabled selected>
      Select timezone
    </option>
    {timeZone.map((zone, index) => (
      <option key={index} value={zone}>
        {zone}
      </option>
    ))}
  </select>
</div>








                    <div className="form-group">
                      <input
                        type="text"
                        name="country_code"
                        onChange={(e) => {
                          onChangeValues(e);
                        }}
                        // defaultValue={counrtcode}
                        value={counrtcode}
                        className={
                          editcompany
                            ? "form-control disabled"
                            : "form-control disabled"
                        }
                        placeholder="Country Code"
                        disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          // console.log(e.target.checked);
                          if (e.target.checked) {
                            setSaveAdd(1);
                          }else{
                            setSaveAdd(0);

                          }
                        }}
                      />
                      <label>Copy the address to Billing Information</label>
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-start">
                  <div className="left">
                    <label>
                      Contact 1 <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="right pd-bt">
                    <div className="form-group">
                      <input
                        type="text"
                        name="contact1_name"
                        onChange={(e) => {
                          onChangeValues(e);
                          logins_field2(e);
                        }}
                        value={cInfo?.contact1_name}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="Full Name *"
                        disabled={!editcompany}
                        style={
                          errorfield.contact1_name == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    <div className=" form-group">
                      <input
                        type="text"
                        name="contact1_job"
                        onChange={(e) => {
                          onChangeValues(e);
                          logins_field2(e);
                        }}
                        value={cInfo?.contact1_job}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="Job Title *"
                        disabled={!editcompany}
                        style={
                          errorfield.contact1_job == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    <div className="column">
                      <div className="form-group">
                        <input
                          className={
                            editcompany ? "countrycodeadd" : "countrycodeadd"
                          }
                          name="contact1_code"
                          value={searchcode == "" ? counrtcode1 : searchcode}
                          disabled={!editcompany}
                          // onClick={() => setcountrycodeshow(!countrycodeshow)}
                          onClick={() => {
                            setcountrycodeshow(!countrycodeshow);
                            setcounrtcode1("");
                            setsearchcode("");
                          }}
                          onChange={(e) => {
                            setsearchcode(e.target.value);
                          }}
                          placeholder="Country Code *"
                          style={
                            errorfield.contact1_code == ""
                              ? {}
                              : { borderBottom: "1px solid red" }
                          }
                        />

                        <input
                          type="text"
                          name="contact1_phone"
                          onChange={(e) => {
                            onChangeValues(e);
                            logins_field2(e);
                          }}
                          value={cInfo?.contact1_phone}
                          className={
                            editcompany
                              ? "countrycodeadd2 form-control"
                              : "form-control disabled"
                          }
                          placeholder="Phone Number *"
                          disabled={!editcompany}
                          style={
                            errorfield.contact1_phone == ""
                              ? {}
                              : { borderBottom: "1px solid red" }
                          }
                        />

                        <ul
                          style={
                            countrycodeshow == true
                              ? { display: "block" }
                              : { display: "none" }
                          }
                          className="country_codeflag"
                        >
                          {country.data
                            ?.filter((value) => {
                              if (searchcode === "") {
                                return value;
                              } else if (
                                value?.country
                                  .toLowerCase()
                                  .includes(searchcode.toLowerCase())
                              ) {
                                return value;
                              }
                            })
                            .map((data, i) => {
                              // console.log(data);
                              return (
                                <li
                                  name="contact1_code"
                                  value={data.dial_code}
                                  onClick={(e) => {
                                    setcounrtcode1(
                                      data.country + " " + data.dial_code
                                    );
                                    setcontact_code1(data.dial_code);
                                    setsearchcode("");
                                  }}
                                >
                                  <span>
                                    <img
                                      style={{ height: "12px" }}
                                      src={
                                        window.location.origin + "/" + data.flag
                                      }
                                      alt="logo"
                                    />
                                  </span>
                                  {data.country + " "}
                                  {data.dial_code}
                                </li>
                              );
                            })}{" "}
                        </ul>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="contact1_email"
                          onChange={(e) => {
                            onChangeValues(e);
                            logins_field2(e);
                          }}
                          value={cInfo?.contact1_email}
                          className={
                            editcompany
                              ? "form-control"
                              : "form-control disabled"
                          }
                          placeholder="Email Address *"
                          disabled={!editcompany}
                          style={
                            errorfield.contact1_email == ""
                              ? {}
                              : { borderBottom: "1px solid red" }
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-center">
                  <div className="left">
                    <label>
                      Upload Profile Photo{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <span className="sub-label">
                      File Type: JPEG, PNG <br />
                      <span>Size: Max 800kb</span>{" "}
                    </span>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      {cInfo?.contact1_image && !editcompany ? (
                        cInfo?.contact1_image
                      ) : (
                        <>
                          <div
                            className="upload-files"
                            style={
                              cInfo?.contact1_image?.name != ""
                                ? {}
                                : { borderBottom: "1px solid red" }
                            }
                          >
                            <div className="button">Choose File *</div>
                            <div className="files">
                              {" "}
                              {cInfo?.contact1_image?.name}{" "}
                            </div>
                            <div className="delete">
                              {/* <img src={closeicon} /> */}
                            </div>

                            <input
                              type="file"
                              name="contact1_image"
                              onChange={onChangeValues}
                              className="form-control"
                              placeholder="Beauty Meetings *"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-start">
                  <div className="left">
                    <label>Contact 2</label>
                  </div>
                  <div className="right pd-bt">
                    <div className="form-group">
                      <input
                        type="text"
                        name="contact2_name"
                        onChange={onChangeValues}
                        value={cInfo?.contact2_name}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="Full Name"
                        disabled={!editcompany}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="contact2_job"
                        onChange={onChangeValues}
                        value={cInfo?.contact2_job}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="Job Title"
                        disabled={!editcompany}
                      />
                    </div>
                    <div className="column">
                      <div className="form-group">
                        <input
                          className={
                            editcompany ? "countrycodeadd" : "countrycodeadd"
                          }
                          name="contact2_code"
                          value={searchcode2 == "" ? counrtcode2 : searchcode2}
                          disabled={!editcompany}
                          onClick={() => {
                            setcountrycodeshow2(!countrycodeshow2);
                            setcounrtcode2("");
                            setsearchcode2("");
                          }}
                          onChange={(e) => {
                            setsearchcode2(e.target.value);
                          }}
                          placeholder="Country Code "
                          style={
                            errorfield.contact1_code == ""
                              ? {}
                              : { borderBottom: "1px solid red" }
                          }
                          autoComplete="off"
                        />

                        <input
                          type="text"
                          name="contact2_phone"
                          onChange={onChangeValues}
                          value={cInfo?.contact2_phone}
                          className={
                            editcompany
                              ? "countrycodeadd2 form-control"
                              : "form-control disabled"
                          }
                          placeholder="Phone Number"
                          disabled={!editcompany}
                        />

                        <ul
                          style={
                            countrycodeshow2 == true
                              ? { display: "block" }
                              : { display: "none" }
                          }
                          className="country_codeflag"
                        >
                          {country.data
                            ?.filter((value) => {
                              if (searchcode2 === "") {
                                return value;
                              } else if (
                                value?.country
                                  .toLowerCase()
                                  .includes(searchcode2.toLowerCase())
                              ) {
                                return value;
                              }
                            })
                            .map((data, i) => {
                              // console.log(data);
                              return (
                                <li
                                  name="contact2_code"
                                  value={data.dial_code}
                                  onClick={(e) => {
                                    setcounrtcode2(
                                      data.country + " " + data.dial_code
                                    );
                                    setcontact_code2(data.dial_code);
                                    setsearchcode2("");
                                  }}
                                >
                                  <span>
                                    <img
                                      style={{ height: "12px" }}
                                      src={
                                        window.location.origin + "/" + data.flag
                                      }
                                      alt="logo"
                                    />
                                  </span>
                                  {data.country + " "}
                                  {data.dial_code}
                                </li>
                              );
                            })}{" "}
                        </ul>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="contact2_email"
                          onChange={onChangeValues}
                          value={cInfo?.contact2_email}
                          className={
                            editcompany
                              ? "form-control"
                              : "form-control disabled"
                          }
                          placeholder="Email Address"
                          disabled={!editcompany}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-center">
                  <div className="left">
                    <label>Upload Profile Photo</label>
                    <br />
                    <span className="sub-label">
                      File Type: JPEG, PNG <br />
                      <span>Size: Max 800kb</span>
                    </span>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      {cInfo?.contact2_image && !editcompany ? (
                        cInfo?.contact2_image
                      ) : (
                        <>
                          <div className="upload-files">
                            <div className="button">Choose File</div>
                            <div className="files">
                              {" "}
                              {cInfo?.contact2_image?.name}{" "}
                            </div>
                            <div className="delete">
                              {/* <img src={closeicon} /> */}
                            </div>
                            {/* <input
                            type="file"
                            name="brand_logo"
                            className="form-control"
                            /> */}
                            <input
                              type="file"
                              name="contact2_image"
                              onChange={onChangeValues}
                              className="form-control"
                              placeholder="Beauty Meetings *"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-center">
                  <div className="left">
                    <label>
                      Company Website <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      <input
                        type="text"
                        name="website"
                        onChange={(e) => {
                          onChangeValues(e);
                          logins_field2(e);
                        }}
                        value={cInfo?.website}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="www.beautymeetings.co.uk *"
                        disabled={!editcompany}
                        style={
                          errorfield.website == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-center">
                  <div className="left">
                    <label>Facebook</label>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      <input
                        type="text"
                        name="facebook"
                        onChange={onChangeValues}
                        value={cInfo?.facebook}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="link here"
                        disabled={!editcompany}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-center">
                  <div className="left">
                    <label>Instagram</label>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      <input
                        type="text"
                        name="instagram"
                        onChange={onChangeValues}
                        value={cInfo?.instagram}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="link here"
                        disabled={!editcompany}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-center">
                  <div className="left">
                    <label>Linkedin</label>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      <input
                        type="text"
                        name="linkedin"
                        onChange={onChangeValues}
                        value={cInfo?.linkedin}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="link here"
                        disabled={!editcompany}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-center">
                  <div className="left">
                    <label>Youtube</label>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      <input
                        type="text"
                        name="youtube"
                        onChange={onChangeValues}
                        value={cInfo?.youtube}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="link here"
                        disabled={!editcompany}
                      />
                    </div>
                  </div>
                </div>

                {editcompany ? (
                  <div className="btn_wrapper row">
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        if (
                          cInfo?.company_name != "" &&
                          cInfo?.brand_name != "" &&
                          cInfo?.contact1_name != "" &&
                          cInfo?.contact1_job != "" &&
                          cInfo?.contact1_email != "" &&
                          cInfo?.contact1_phone != "" &&
                          cInfo?.city != "" &&
                          cInfo?.post_code != "" &&
                          cInfo?.address1 != "" &&
                          cInfo?.country != "" &&
                          cInfo?.state != "" &&
                          cInfo?.website != "" &&
                          cInfo?.contact1_image?.name != ""
                        ) {
                          addCompanyInfo();
                        } else {
                          window.scrollTo(0, 0);
                          check_data?.map((data) => {
                            logins_field(data.name);
                          });
                          setstyle(true);
                          toast.error("Please Fill All required Fields !");
                        }
                      }}
                      type="button"
                    >
                      Submit
                    </button>
                    <button className="btn btn-primary">Cancel</button>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Company_informationNew;
