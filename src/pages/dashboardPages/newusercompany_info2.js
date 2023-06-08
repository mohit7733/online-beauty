import React, { useEffect, useState } from "react";
import Left_menu from "../productpages/left_menu";
import { api } from "../base_url";
// import Left_menu2 from "./Left_menu2";
import { country } from "../dashboard/country";
import InputUpload from "../../components/input-with-button/input-with-button";
// import  closeicon from "../../assets/images/close.svg"
function Company_informationNew(props) {
  const [editcompany, seteditcompany] = useState(true);
  const [counrtcode, setcounrtcode] = useState("");
  const [cInfo, setCInfo] = useState({
    country_code: counrtcode,
  });
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [sidebar, setsidebar] = useState(false);
console.log(">>>>>>>>>");
  function onChangeValues(e) {
    console.log(e.target.value);
    if (e.target.files) {
      setCInfo({ ...cInfo, [e.target.name]: e.target.files[0] });
    } else {
      setCInfo({ ...cInfo, [e.target.name]: e.target.value });
    }
  }

  function getCompanyInfo() {
    console.log("getCompanyInfo called");
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
    fetch(api + "/api/company-detail", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCInfo(result.data);
      })
      .catch((error) => console.log("error", error));
  }

  const filtercode = country?.data?.filter((item) => {
    // console.log(item?.country);
    return item.country == cInfo.country;
  });

  useEffect(() => {
    setcounrtcode(filtercode[0]?.dial_code);
    // cInfo?.country_code = counrtcode
  }, [cInfo.country]);

  console.log(cInfo, counrtcode, );

  function editCompanyInfo(event) {
    console.log("asd", event.target["company_name"].value);
    var formvalues = new FormData();
    //formvalues = {...formvalues , ...cInfo};
    for (let key in cInfo) {
      formvalues.append(key, cInfo[key]);
    }
    console.log(formvalues);
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
    fetch(api + "/api/company-information_edit", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setCInfo(result.data);
        } else {
          event.preventDefault();
          setSuccessMsg(result.message);
        }
      })
      .catch((error) => {
        setErrMsg(error);
        console.log("error", error);
      });
  }





  function addCompanyInfo(event) {
    var formvalues = new FormData();
    //formvalues = {...formvalues , ...cInfo};
    for (let key in cInfo) {
        formvalues.append(key, cInfo[key]);
    }
    console.log(formvalues);
    var myHeaders = new Headers();
    myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
    );
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: formvalues
    };
    fetch(
        api + "/api/company-information",
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => {
            if (result.success) {
                setCInfo(result.data)
            } else {
                const errArr = Object.values(result.message);
                setErrMsg(errArr);
            }
        })
        .catch((error) => {
            setErrMsg(JSON.stringify(error.message));
            console.log("error", error)
        });
}













  useEffect(() => {
    console.log("props.pageType", props.pageType);
    if (props.pageType !== "new") {
      //   getCompanyInfo();
    } else {
      seteditcompany(true);
    }
    if (props.pageType === "edit") {
      seteditcompany(false);
    }
  }, []);

  return (
    <>
      <div className="company_wrapper product_section Meeting_wrap profile_popup">
        <div className="main">
          {/* <Left_menu2 sidebar={sidebar} setsidebar={setsidebar} /> */}

          <div className={(sidebar ? "active " : " ") + "active router-body"}>
            <div className="breadcrumbs" data-aos="fade-down">
              <ul>
                <li>
                  <a href="/dashboard">Dashboard </a>
                </li>
                <li>
                  <a href="/">My Profile</a>
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
                  e.preventDefault();
                  addCompanyInfo(e);
                }}
              >
                <div className="form-row align-items-center">
                  <div className="left">
                    <label>Company Name</label>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      <input
                        type="text"
                        name="company_name"
                        value={cInfo?.company_name}
                        onChange={onChangeValues}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="Beauty Meetings"
                        disabled={!editcompany}
                        required={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-center">
                  <div className="left">
                    <label>Brand Name</label>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      <input
                        type="text"
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        name="brand_name"
                        onChange={onChangeValues}
                        value={cInfo?.brand_name}
                        placeholder="Beauty Meetings"
                        disabled={!editcompany}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-center">
                  <div className="left">
                    <label>Brand Logo</label>
                    <br />
                    <span className="sub-label">
                      File Type: JPEG, PNG <br />
                      Size: Max 800kb
                    </span>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      {cInfo?.brand_logo && !editcompany ? (
                        cInfo?.brand_logo
                      ) : (
                        // <InputUpload onChange={onChangeValues} placeholder={"Brand Logo"} btnTxt={"Choose File"}  file={cInfo?.brand_logo} name="brand_logo" />
                        <>
                          <div className="upload-files">
                            <div className="button">Choose File</div>
                            <div className="files"> {cInfo?.brand_logo?.name}  </div>
                            <div className="delete">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z" fill="red"/></svg> */}
                              {/* <img src={closeicon} /> */}
                            </div>
                            {/* <input
                              type="file"
                              name="brand_logo"
                              className="form-control"
                              /> */}
                              <input
                                type="file"
                                name="brand_logo"
                                onChange={onChangeValues}
                                className="form-control"
                                placeholder="Beauty Meetings"
                              />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-start">
                  <div className="left">
                    <label>Head Office Address</label>
                  </div>
                  <div className="right pd-bt">
                    <div className="form-group">
                      <input
                        type="text"
                        name="address1"
                        onChange={onChangeValues}
                        value={cInfo?.address1}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="Address line 1"
                        disabled={!editcompany}
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
                        placeholder="Address line 2"
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
                        placeholder="Address line 3"
                        disabled={!editcompany}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="post_code"
                        onChange={onChangeValues}
                        value={cInfo?.post_code}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="Postal Code"
                        disabled={!editcompany}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="city"
                        onChange={onChangeValues}
                        value={cInfo?.city}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="City"
                        disabled={!editcompany}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="state"
                        onChange={onChangeValues}
                        value={cInfo?.state}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="State"
                        disabled={!editcompany}
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
                        onChange={onChangeValues}
                      >
                        <option value="" disabled selected>
                          Select Country
                        </option>
                        {country.data.map((data, i) => {
                          // console.log(data.dial_code);
                          return (
                            <option value={data.country}>{data.country}</option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="country_code"
                        onChange={onChangeValues}
                        // defaultValue={counrtcode}
                        value={counrtcode}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="Country Code"
                        disabled={!editcompany}
                      />
                    </div>
                    <div className="form-group">
                      <input type="checkbox" />
                      <label>Copy the address to Billing Information</label>
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-start">
                  <div className="left">
                    <label>Contact 1</label>
                  </div>
                  <div className="right pd-bt">
                    <div className="form-group">
                      <input
                        type="text"
                        name="contact1_name"
                        onChange={onChangeValues}
                        value={cInfo?.contact1_name}
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
                        name="contact1_job"
                        onChange={onChangeValues}
                        value={cInfo?.contact1_job}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="Job Title"
                        disabled={!editcompany}
                      />
                    </div>
                    <div className="column">
                      <div className="form-group">
                        {/* <select className={editcompany ? "form-control" : "form-control disabled"} name="county" value={cInfo?.county} disabled={!editcompany} onChange={onChangeValues}>
                                            <option>Select</option>
                                            <option value="+91">+91</option>
                                        </select> */}
                        <input
                          type="text"
                          name="contact1_phone"
                          onChange={onChangeValues}
                          value={cInfo?.contact1_phone}
                          className={
                            editcompany
                              ? "form-control"
                              : "form-control disabled"
                          }
                          placeholder="Phone Number"
                          disabled={!editcompany}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="contact1_email"
                          onChange={onChangeValues}
                          value={cInfo?.contact1_email}
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
                      Size: Max 800kb
                    </span>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      {cInfo?.contact1_image && !editcompany ? (
                        cInfo?.contact1_image
                      ) : (

                        <>
                        <div className="upload-files">
                          <div className="button">Choose File</div>
                          <div className="files"> {cInfo?.contact1_image?.name}  </div>
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
                              name="contact1_image"
                              onChange={onChangeValues}
                              className="form-control"
                              placeholder="Beauty Meetings"
                            />
                        </div>
                      </>

                        // <input
                        //   type="file"
                        //   name="contact1_image"
                        //   onChange={onChangeValues}
                        //   className="form-control"
                        //   placeholder="Choose Profile Photo"
                        // />
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
                          type="text"
                          name="contact2_phone"
                          onChange={onChangeValues}
                          value={cInfo?.contact2_phone}
                          className={
                            editcompany
                              ? "form-control"
                              : "form-control disabled"
                          }
                          placeholder="Phone Number"
                          disabled={!editcompany}
                        />
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
                      Size: Max 800kb
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
                          <div className="files"> {cInfo?.contact2_image?.name}  </div>
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
                              placeholder="Beauty Meetings"
                            />
                        </div>
                      </>

                        // <input
                        //   type="file"
                        //   name="contact2_image"
                        //   className="form-control"
                        //   onChange={onChangeValues}
                        //   placeholder="Choose Profile Photo"
                        //   disabled={!editcompany}
                        //   readOnly={editcompany}
                        // />
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-row align-items-center">
                  <div className="left">
                    <label>Company Website</label>
                  </div>
                  <div className="right">
                    <div className="form-group">
                      <input
                        type="text"
                        name="website"
                        onChange={onChangeValues}
                        value={cInfo?.website}
                        className={
                          editcompany ? "form-control" : "form-control disabled"
                        }
                        placeholder="www.beautymeetings.co.uk"
                        disabled={!editcompany}
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
                {successMsg !== "" ? (
                  <p className="success">{successMsg}</p>
                ) : null}
                {errMsg !== "" ? <p className="error">{errMsg}</p> : null}
                {editcompany ? (
                  <div className="btn_wrapper row">
                    <button className="btn btn-secondary" type="submit">
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
