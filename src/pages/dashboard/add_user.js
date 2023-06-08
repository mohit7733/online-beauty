import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../base_url";
import axios from "axios";
import eyeicon1 from "../../assets/images/eyeoffline.png";
import eyeicon2 from "../../assets/images/eyeline.png";
const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

export default function Add_user(props) {
  const [message, setmessage] = useState("");
  const [password3, setpassword3] = useState(true);
  const [disableinputs, setdisable] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user_type = localStorage.getItem("user_type");
  const [cInfo, setCInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    roles: "",
    contact_no: "",
    user_type: user_type,
    profile_img: "",
  });
  const [errorfield, seterrorfield] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    roles: "",
    contact_no: "",
    profile_img: "",
  });

  const logins_field2 = (e) => {
    switch (e.target.name) {
      case "fname":
        errorfield.fname = e.target.value == "" ? "required" : "";
        break;
      case "lname":
        errorfield.lname = e.target.value == "" ? "required" : "";
        break;
      case "email":
        errorfield.email = emailRegex.test(e.target.value)
          ? ""
          : "Email not valid.";
        break;
      case "password":
        errorfield.password = e.target.value == "" ? "required" : "";
        break;
      case "roles":
        errorfield.roles = e.target.value == "" ? "required" : "";
        break;
      case "contact_no":
        errorfield.contact_no = e.target.value == "" ? "required" : "";
        break;

      default:
        break;
    }
    seterrorfield({ ...errorfield });
    if (e.target.files) {
      setCInfo({ ...cInfo, [e.target.name]: e.target.files[0] });
    } else {
      setCInfo({ ...cInfo, [e.target.name]: e.target.value });
    }
  };

  const logins_field = (e) => {
    switch (e) {
      case "fname":
        errorfield.fname = cInfo?.fname == "" ? "required" : "";
        break;
      case "lname":
        errorfield.lname = cInfo?.lname == "" ? "required" : "";
        break;
      case "email":
        errorfield.email = cInfo?.email == "" ? "required" : "";
        break;
      case "password":
        errorfield.password = cInfo?.password == "" ? "required" : "";
        break;
      case "roles":
        errorfield.roles = cInfo?.roles == "" ? "required" : "";
        break;
      case "contact_no":
        errorfield.contact_no = cInfo?.contact_no == "" ? "required" : "";
        break;

      default:
        break;
    }
    seterrorfield({ ...errorfield });
  };
  const { id } = useParams();
  const getUserDetails = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: api + "/api/shared-user-list?id=" + id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await axios
      .request(config)
      .then((response) => {
        if (response.data?.success == true) {
          // setusers(response.data?.data);
          if (pathname != "/add-new-user") {
            setdisable(true);
          }
          // console.log(response.data.data?.user, "<<<<<<<dee");
          setTimeout(() => {
            cInfo.fname = response.data.data?.user?.fname;
            cInfo.lname = response.data.data?.user?.lname;
            cInfo.email = response.data.data?.user?.email;
            cInfo.contact_no = response.data.data?.user?.contact_no;
            cInfo.roles = response.data.data?.user?.manage_type;
            cInfo.profile_img = response.data.data?.user?.image_name;
          }, 50);

          setTimeout(() => {
            setCInfo({ ...cInfo });
          }, 100);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const add_a_user = async () => {
    var formvalues = new FormData();
    //formvalues = {...formvalues , ...cInfo};
    for (let key in cInfo) {
      formvalues.append(key, cInfo[key]);
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: api + "/api/create-shared-users",
      headers: {
        //   "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formvalues,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        if (response.data?.success == true) {
          // setmessage(response.data?.message)
          // window.location.reload()
          toast.success(response.data?.message);

          setCInfo({
            fname: "",
            lname: "",
            email: "",
            password: "",
            contact_no: "",
            roles: "",
            profile_img: "",
            user_type: user_type,
          });

          setTimeout(() => {
            navigate("/dashboard/user-manegment/buyer");
          }, 2500);
        }
      })
      .catch((error) => {
        toast.error("Email already exist !");
        console.log(error);
      });
  };
  const edit_a_user = async () => {
    var formvalues = new FormData();
    //formvalues = {...formvalues , ...cInfo};
    for (let key in cInfo) {
      formvalues.append(key, cInfo[key]);
    }
    formvalues.append("id", id);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: api + "/api/edit-shared-user",
      headers: {
        //   "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formvalues,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        if (response.data?.success == true) {
          // setmessage(response.data?.message)
          // window.location.reload()
          toast.success(response.data?.message);
          localStorage.removeItem("profile_pic");
          setCInfo({
            fname: "",
            lname: "",
            email: "",
            password: "",
            contact_no: "",
            roles: "",
            profile_img: "",
            user_type: user_type,
          });

          let config2 = {
            method: "get",
            maxBodyLength: Infinity,
            url: api + "/api/shared-user-list?id=" + id,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          };
          axios
            .request(config2)
            .then((response) => {
              if (response.data?.success == true) {
                console.log(response.data?.data, "<<<<<");
                localStorage.setItem(
                  "profile_pic",
                  response.data?.data?.user?.file_path
                );
                setTimeout(() => {
                  navigate("/dashboard/user-manegment/buyer");
                }, 2500);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        toast.error("Email already exist !");
        console.log(error);
      });
  };

  const check_data = [
    { name: "fname" },
    { name: "lname" },
    { name: "email" },
    { name: "password" },
    { name: "profile_img" },
    { name: "roles" },
    { name: "contact_no" },
  ];
  // console.log(cInfo, "<<<<<<<<", cInfo?.profile_img?.name);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    if (pathname != "/add-new-user") {
      getUserDetails();
    }
  }, []);

  return (
    <div className={(props.sidebar ? "active " : " ") + "router-body"}>
      <div className="breadcrumbs" data-aos="fade-down">
        <ul>
          <li>
            <a href="/dashboard">Dashboard </a>
          </li>
          {/* <li>
            <a href="/dashboard">
              {localStorage.getItem("user_type") == "Both"
                ? props.supplier
                : localStorage.getItem("user_type")}
            </a>
          </li> */}
          <li>
            <a href="/dashboard/user-manegment/buyer">
              <span> User Management </span>
            </a>
          </li>
          <li>
            <a href="#">
              {disableinputs == true ? (
                <span>Edit New User </span>
              ) : (
                <span>Add New User </span>
              )}
            </a>
          </li>
        </ul>
      </div>
      <div className="product_prfile">
        {disableinputs == true ? <h1>Edit New User</h1> : <h1>Add New User</h1>}
        <div className="row">
          <div className="col_left">
            <div className="panel">
              <div className="form-group full">
                <input
                  type="text"
                  placeholder="First Name *"
                  name="fname"
                  value={cInfo?.fname}
                  onChange={(e) => logins_field2(e)}
                  className="form-control"
                  style={
                    errorfield?.fname == ""
                      ? {}
                      : { borderBottom: "1px solid red" }
                  }
                />
              </div>
              <div className="form-group full">
                <input
                  type="text"
                  placeholder="Last Name *"
                  name="lname"
                  value={cInfo?.lname}
                  onChange={(e) => logins_field2(e)}
                  className="form-control"
                  style={
                    errorfield?.lname == ""
                      ? {}
                      : { borderBottom: "1px solid red" }
                  }
                />
              </div>
              <div className="form-group input-group">
                <input
                  id="email"
                  name="email"
                  disabled={disableinputs}
                  value={cInfo?.email}
                  placeholder="Email Address *"
                  onChange={(e) => logins_field2(e)}
                  className="form-control"
                  type="email"
                  style={
                    errorfield?.email == ""
                      ? {}
                      : { borderBottom: "1px solid red" }
                  }
                />
              </div>

              {disableinputs == true ? (
                ""
              ) : (
                <div className="form-group input-group  input-box" style={{position: "relative"}}>
                  <input
                    id="password"
                    name="password"
                    // disabled={disableinputs}
                    placeholder="Password *"
                    value={cInfo?.password}
                    onChange={(e) => logins_field2(e)}
                    className="form-control"
                    type={password3 ? "password" : "text" }
                    style={
                      errorfield?.password == ""
                        ? {}
                        : { borderBottom: "1px solid red" }
                    }
                  />

                  {password3 == true ? (
                    <span
                      toggle="#password-field"
                      className="eys_icon_addUser"
                      onClick={(e) => setpassword3(!password3)}
                    >
                      <img src={eyeicon1} />
                    </span>
                  ) : (
                    <span
                      toggle="#password-field"
                      className="eys_icon_addUser"
                      onClick={(e) => setpassword3(!password3)}
                    >
                      <img src={eyeicon2} />
                    </span>
                  )}
                </div>
              )}

              <div className="form-group">
                <div
                  className="upload-files"
                  // style={
                  //   cInfo?.contact1_image?.name != ""
                  //     ? {}
                  //     : { borderBottom: "1px solid red" }
                  // }
                >
                  <div className="button">Choose File *</div>
                  <div className="files">
                    {" "}
                    {cInfo?.profile_img?.name == undefined
                      ? cInfo?.profile_img
                      : cInfo?.profile_img?.name}{" "}
                  </div>
                  <div className="delete">{/* <img src={closeicon} /> */}</div>

                  <input
                    type="file"
                    //   name="contact1_image"
                    name="profile_img"
                    onChange={(e) => logins_field2(e)}
                    //   onChange={onChangeValues}
                    className="form-control"
                    placeholder="Beauty Meetings *"
                  />
                </div>
              </div>

              <div className="form_wrap row">
                <div className="hide_numbersign form-group full Company_sector">
                  <input
                    placeholder="Contact Number"
                    name="contact_no"
                    onChange={(e) => logins_field2(e)}
                    className="form-control"
                    value={cInfo.contact_no}
                    type="number"
                    maxLength={15}
                    style={
                      errorfield?.contact_no == ""
                        ? {}
                        : { borderBottom: "1px solid red" }
                    }
                  />
                </div>
                <div className="form-group-shareduser form-group">
                  <div
                    className="custom-select"
                    style={
                      errorfield?.roles == ""
                        ? {}
                        : { borderBottom: "1px solid red" }
                    }
                  >
                    <select
                      name="roles"
                      value={cInfo?.roles}
                      onChange={(e) => logins_field2(e)}
                      disabled={disableinputs}
                    >
                      <option>
                        {disableinputs == true ? (
                          <>
                            {cInfo?.roles?.toLowerCase() == "superadmin"
                              ? "Super Admin"
                              : "Shared User"}
                          </>
                        ) : (
                          "Roles *"
                        )}
                      </option>

                      <option value="Shareduser">Shared User</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="button_wrap row">
              {disableinputs == true ? (
                <button
                  href="#"
                  className="btn btn-secondary"
                  onClick={() => {
                    if (
                      cInfo?.fname != "" &&
                      cInfo?.lname != "" &&
                      // cInfo?.email != "" &&
                      // cInfo?.password != "" &&
                      cInfo?.contact_no != "" &&
                      // cInfo?.roles != "" &&
                      errorfield.contact_no == "" &&
                      cInfo?.city != ""
                    ) {
                      edit_a_user();
                    } else {
                      window.scrollTo(0, 0);
                      check_data?.map((data) => {
                        logins_field(data.name);
                      });
                      toast.error("Please Fill All required Fields !");
                    }
                  }}
                >
                  Update User
                </button>
              ) : (
                <button
                  href=""
                  className="btn btn-secondary"
                  onClick={() => {
                    if (
                      cInfo?.fname != "" &&
                      cInfo?.lname != "" &&
                      cInfo?.email != "" &&
                      cInfo?.password != "" &&
                      cInfo?.contact_no != "" &&
                      cInfo?.roles != "" &&
                      // errorfield.contact_no == "" &&
                      cInfo?.city != ""
                    ) {
                      console.log(cInfo, "<<<<<<,");
                      add_a_user();
                    } else {
                      window.scrollTo(0, 0);
                      check_data?.map((data) => {
                        logins_field(data.name);
                      });
                      toast.error("Please Fill All required Fields !");
                    }
                  }}
                >
                  Add User
                </button>
              )}
              <a
                href="/dashboard/user-manegment/buyer"
                className="btn btn-primary"
              >
                Cancel
              </a>
            </div>

            <p className="login_success" style={{ color: "green" }}>
              {message}
            </p>

            <div className="error-button row justify-content-center">
              <a
                href={"/dashboard/user-manegment/buyer"}
                className="error_icon"
                style={{ cursor: "pointer" }}
              >
                <i className="fa fa-arrow-left left" aria-hidden="true"></i>Back
                to User Management
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
