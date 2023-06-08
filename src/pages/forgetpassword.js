import axios from "axios";
import React, { useState } from "react";
import { api } from "./base_url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

function Forgetpassword() {
  const [hide, sethide] = useState(false);
  const [message, setmessage] = useState("");
  const navigate = useNavigate()
  const [contact, setcontact] = useState({
    email: "",
    newpass: "",
    newpassconfirm: "",
    otp: "",
  });
  const [errorfield, seterrorfield] = useState({
    email: "",
    otp: "",
    newpass: "",
    newpassconfirm: "",

  });
  console.log(contact?.email);
  const getOtp = async () => {
    let data = JSON.stringify({
      email: contact?.email,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: api + "/api/forgotpassword",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data?.status == true) {
          sethide(true);
          setmessage(response.data?.message);
        }
       
      })
      .catch((error) => {
        console.log(error);
        toast.error("Your email id not register this email")

      });
  };
  const sendOtp = async () => {
    let data = JSON.stringify({
      otp: contact?.otp,
      email : contact?.email
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: api + "/api/forgotPasswordOtp",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data?.status == true) {
          navigate("/create-password/" + response.data?.verify_token);      
        }

      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message)
      });
  };
 
  const logins_field2 = (e) => {
    switch (e.target.name) {
      case "email":
        errorfield.email = emailRegex.test(e.target.value)
          ? ""
          : "Email not valid.";
        break;
      case "otp":
        errorfield.otp = e.target.value
          ? ""
          : "Email not valid.";
        break;

      default:
        break;
    }
    seterrorfield({ ...errorfield });
    setcontact({ ...contact, [e.target.name]: e.target.value });
  };
  const logins_field = (e) => {
    console.log(e);
    switch (e) {
      case "email":
        errorfield.email = contact.email == "" ? "required" : "";
        break;
      case "otp":
        errorfield.otp = contact.otp == "" ? "required" : "";
        break;
      default:
        break;
    }
    seterrorfield({ ...errorfield });
    // setcontact({ ...contact, [e.target.name]: e.target.value })
  };

  return (
    <>
      <div className="breadcrumbs">
        <div className="container aos-init aos-animate" data-aos="fade-up">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/login"> Sign in</a>
            </li>

            <li>
              <a href="#">
                <span>Forgot Password</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="forget-password font-lg">
        <div className="container">
          <h1 data-aos="fade-up">Forgot Password</h1>
          <br />
          <br />
          <div className="row">
            <div className="col-md-12 col-md-offset-4" data-aos="fade-up">
              <div className="panel panel-default">
                {hide == true ? (
                  <div className="text-center">
                    <h3> Enter OTP </h3>
                    <div className="panel-body">
                      <form className="form" autoComplete="off">
                        <div className="form-group">
                          <div className="input-group">
                            <input
                            id="otp"
                            name="otp"
                            onChange={(e) => logins_field2(e)}
                            placeholder="Enter OTP *"
                            className="form-control"
                            type="text"
                            autoComplete="off"
                                style={
                                  errorfield.otp == ""
                                    ? {}
                                    : { borderBottom: "1px solid red" }
                                }
                            />
                          </div>
                          <p style={{color :"green"}}>{message} </p>
                        </div>
                        <div className="form-group">
                          <a href="#">
                            <button
                              // name="recover-submit"
                              className="btn btn-lg btn-secondary btn-block"
                              value="Forgot Password"
                              type="button"
                              onClick={() => {
                                if (errorfield.otp == "") {
                                  sendOtp();
                                } else {
                                  logins_field("otp");
                                  //   errorfield.email = "required";
                                }
                              }}
                            >
                              Submit
                            </button>
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                ) :  (
                    <div className="text-center">
                      <h3> Forgot Your Password </h3>
                      <div className="panel-body">
                        <div
                          // autocomplete="off"
                          className="form"
                        >
                          <div className="form-group">
                            <div className="input-group">
                              <input
                                // id="email"
                                name="email"
                                onChange={(e) => logins_field2(e)}
                                placeholder="Enter Email Address"
                                className="form-control"
                                type="email"
                                style={
                                  errorfield.email == ""
                                    ? {}
                                    : { borderBottom: "1px solid red" }
                                }
                              />
                            </div>
                          </div>
                          <div className="form-group">
                           
                            <button
                              onClick={() => {
                                if (errorfield.email == "") {
                                  getOtp();
                                  console.log("clicked");
                                } else {
                                  logins_field("email");
                                  console.log("clicked 444");
  
                                  //   errorfield.email = "required";
                                }
                              }}
                              className="btn btn-lg btn-secondary btn-block"
                              type="button"
                            >
                              Forgot Password
                            </button>
                            {/* </a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default Forgetpassword;
