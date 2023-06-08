import React, { useState } from "react";
import { api } from "../base_url";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import eysofficon from "../../assets/images/eyefill.png";
import axios from "axios";

const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
function Login() {
  const navigate = useNavigate();
  const [theytrusted, settheytrusted] = useState("");
  const [addtype, setaddtype] = useState("login");
  const [password, setpassword] = useState(true);
  const [errorhow, seterrorhow] = useState({});
  const [contact, setcontact] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
    fav_language: "",
  });
  const [errorfield, seterrorfield] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
    fav_language: "",
  });
  const logins_field2 = (e) => {
    switch (e.target.name) {
      case "email":
        errorfield.email = emailRegex.test(e.target.value)
          ? ""
          : "Email not valid.";
        break;
      case "password":
        errorfield.password = e.target.value.length <= 7 ? "required" : "";
        break;
      case "f_name":
        errorfield.f_name = e.target.value == "" ? "required" : "";
        break;
      case "l_name":
        errorfield.l_name = e.target.value == "" ? "required" : "";
        break;
      case "fav_language":
        errorfield.fav_language = e.target.value == "" ? "required" : "";
        break;

      default:
        break;
    }
    seterrorfield({ ...errorfield });
    setcontact({ ...contact, [e.target.name]: e.target.value });
  };
  const logins_field = (e) => {
    switch (e) {
      case "f_name":
        errorfield.f_name = contact.f_name == "" ? "required" : "";
        break;
      case "l_name":
        errorfield.l_name = contact.l_name == "" ? "required" : "";
        break;
      case "email":
        errorfield.email = contact.email == "" ? "required" : "";
        break;
      case "password":
        errorfield.password = contact.password == "" ? "required" : "";
        break;
      case "fav_language":
        errorfield.fav_language = contact.fav_language == "" ? "required" : "";
        break;
      default:
        break;
    }
    seterrorfield({ ...errorfield });
    // setcontact({ ...contact, [e.target.name]: e.target.value })
  };

  const theytrusted_data = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      fname: contact.f_name,
      lname: contact.l_name,
      email: contact.email,
      password: contact.password,
      user_type: contact.fav_language,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(api + "/api/register", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setcontact({
          f_name: "",
          l_name: "",
          email: "",
          password: "",
          fav_language: "",
        });
        settheytrusted(result.message);
        // localStorage.setItem("token", result.data.token)
        if (result.success) {
          // toast.success("User created Successfully", {
          //   progress: undefined,

          // });

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw2 = JSON.stringify({
            email: contact.email,
            password: contact.password,
          });

          var requestOptions2 = {
            method: "POST",
            headers: myHeaders,
            body: raw2,
            redirect: "follow",
          };

          fetch(api + "/api/login", requestOptions2)
            .then((response) => response.json())
            .then((result) => {
              localStorage.setItem("token", result.data.token);
              localStorage.setItem("user_type", result.data.user_type);
              localStorage.setItem("username", result.data.username);
              localStorage.setItem("user_id", result.data?.user_id);
              localStorage.setItem("profile_pic", result.data?.profile_img);
              localStorage.setItem("manage_type", result.data?.manage_type);
              navigate("/contract");

              // navigate("/dashboard")
            })
            .catch((error) => console.log("error", error));
        }
        // setaddtype("login")
      })
      .catch((error) => {
        if (error) {
          toast.error(error.message);
        }
      });
  };
  const theytrusted_data2 = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: contact.email,
      password: contact.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(api + "/api/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user_type", result.data.user_type);
        localStorage.setItem("username", result.data.username);
        localStorage.setItem("user_id", result.data?.user_id);
        localStorage.setItem("profile_pic", result.data?.profile_img);
        localStorage.setItem("manage_type", result.data?.manage_type);

        seterrorhow(result);
        settheytrusted(result.message);
        if (result?.success == false) {
          toast.error(
            result.message + " Please Check Your email and password !"
          );
        }
        // console.log(result);
        if (result?.data?.created_by?.toLowerCase() == "admin") {
          var myHeaders2 = new Headers();
          myHeaders2.append("Authorization", "Bearer " + result.data?.token);
          var requestOptions2 = {
            method: "GET",
            headers: myHeaders2,
          };
          fetch(api + "/api/first-time-login", requestOptions2)
            .then((response) => response.json())
            .then((res) => {
              // console.log(res);

              if (res?.status == "success") {
                // console.log("workin fine");
                navigate("/contract");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setTimeout(() => {
            if (result.data?.user_type?.toLowerCase() == "buyer") {
              // navigate("/dashboard/user-manegment/buyer");
              navigate("/buyer-company-profile");
            } else {
              navigate("/dashboard");
            }
          }, 3000);
        }
      })
      .catch((error) => {
        if (error) {
          toast.error("Please Check Your email and password !");
        }
      });
  };
  const check_data = [
    { name: "f_name" },
    { name: "l_name" },
    { name: "email" },
    { name: "password" },
    { name: "fav_language" },
  ];
  useEffect(() => {
    seterrorfield({ ...errorfield });
  }, []);

  const [accounthead, setaccounthead] = useState();
  // console.log(accounthead);
  const acountCms = async () => {
    await axios
      .get(api + "/api/create-account")
      .then((res) => {
        setaccounthead(res?.data?.data?.create_account);
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    acountCms();
  }, []);

  return (
    <>
      <div
        className="breadcrumbs"
        id="signin-breadcrumbs"
        style={addtype == "login" ? { display: "block" } : { display: "none" }}
      >
        <div className="container aos-init aos-animate" data-aos="fade-up">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#">
                <span>Sign In</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="breadcrumbs"
        id="create-breadcrumbs"
        style={addtype == "signup" ? { display: "block" } : { display: "none" }}
      >
        <div className="container aos-init aos-animate" data-aos="fade-up">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#">
                <span>Create a new account</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="create-account sign-account font-lg">
        <div className="container">
          <h1
            className=""
            id="signin-h1"
            style={
              addtype == "login" ? { display: "block" } : { display: "none" }
            }
          >
            Sign In
          </h1>
          <h1
            className=""
            id="create-h1"
            style={
              addtype == "signup" ? { display: "block" } : { display: "none" }
            }
          >
            {accounthead?.title}

            {/* {
              console.log(accounthead?.title)
            } */}
          </h1>

          <div
            style={
              addtype == "login" ? { display: "none" } : { display: "block" }
            }
            dangerouslySetInnerHTML={{ __html: accounthead?.description }}
          />

          {/* <p>{accounthead?.description}</p> */}
          <div className="row justify-content-between">
            <div
              className="col-md-6 col-md-offset-4 wrapper aos-init aos-animate"
              data-aos="fade-right"
              id="login"
              style={
                addtype == "login" ? { display: "block" } : { display: "none" }
              }
            >
              <div className="panel panel-default">
                <div className="text-center">
                  <h3>Do you already have an account?</h3>
                  <div className="panel-body two">
                    <div className="input-group">
                      <input
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control"
                        type="email"
                        onChange={(e) => logins_field2(e)}
                        style={
                          errorfield.email == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    <div className="input-group input-box">
                      <input
                        id="password-field"
                        type={password ? "password" : "text"}
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => logins_field2(e)}
                        style={
                          errorfield.password == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                      <span
                        toggle="#password-field"
                        className={
                          password ? "fa fa-fw field-icon fa-eye" : "fa fa-eye"
                        }
                        onClick={(e) => setpassword(!password)}
                      ></span>
                    </div>
                    <div className="row input-group input-head justify-content-between">
                      <a href="/forgot-password">
                        <h6>Forgot your password?</h6>
                      </a>
                    </div>
                  </div>
                  <div className="form-group">
                    <a>
                      <button
                        name="recover-submit"
                        className="btn btn-lg btn-secondary btn-block"
                        value="Create account"
                        onClick={(e) => {
                          if (contact.email == "" || contact.password == "") {
                            check_data.map((data) => {
                              logins_field(data.name);
                            });
                          } else {
                            theytrusted_data2();
                            window.scrollBy(0, 100);
                          }
                        }}
                      >
                        Sign In
                      </button>
                    </a>
                    <p
                      className="login_success"
                      style={{
                        margin: "10px",
                        fontSize: "15px",
                        fontWeight: "600",
                      }}
                    >
                      {errorhow?.success == true ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path
                              d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                              fill="rgba(28,211,91,1)"
                            ></path>
                          </svg>{" "}
                          {"User logged in successfully."}{" "}
                        </>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 wrapper aos-init aos-animate"
              data-aos="fade-left"
              id="signup"
              style={
                addtype == "login" ? { display: "block" } : { display: "none" }
              }
            >
              <div className="panel">
                <div className="text-center">
                  <h3>No account yet?</h3>
                  <div className="col-img">
                    <figure>
                      <img src="images/create-account 1.jpg" alt="" />
                    </figure>
                    <div className="form-group">
                      <button
                        name="recover-submit"
                        className="btn btn-lg btn-secondary btn-block"
                        type="submit"
                        onClick={(e) => {
                          setcontact({
                            f_name: "",
                            l_name: "",
                            email: "",
                            password: "",
                            fav_language: "",
                          });
                          settheytrusted("");
                          setaddtype("signup");
                        }}
                        id="signUpbtn"
                      >
                        Create a new account{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 wrapper"
              id="login2"
              style={
                addtype == "signup" ? { display: "block" } : { display: "none" }
              }
            >
              <div className="panel">
                <div className="text-center">
                  <h3>Do you already have an account?</h3>
                  <div className="col-img">
                    <figure>
                      <img src="images/login 1.jpg" alt="" />
                    </figure>
                    <div className="form-group">
                      <button
                        name="recover-submit"
                        className="btn btn-lg btn-secondary btn-block"
                        type="submit"
                        id="logInbtn"
                        onClick={(e) => setaddtype("login")}
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-md-offset-4 wrapper"
              id="signup2"
              style={
                addtype == "signup" ? { display: "block" } : { display: "none" }
              }
            >
              <div className="panel panel-default">
                <div className="text-center">
                  <h3>Create a new account</h3>
                  <div className="panel-body two">
                    <div className="radio_btn">
                      <p
                        style={
                          errorfield.fav_language == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      >
                        You are:
                      </p>
                      <div className="row align-items-center">
                        <input
                          type="radio"
                          id="buyer"
                          name="fav_language"
                          value="Buyer"
                          onClick={(e) => logins_field2(e)}
                        />
                        <label for="buyer">A buyer</label>
                      </div>
                      <div className="row align-items-center">
                        <input
                          type="radio"
                          id="supplier"
                          name="fav_language"
                          value="Supplier"
                          onClick={(e) => logins_field2(e)}
                        />
                        <label for="A supplier">A supplier</label>
                      </div>
                      <div className="row align-items-center">
                        <input
                          type="radio"
                          id="Others"
                          name="fav_language"
                          value="Both"
                          onClick={(e) => logins_field2(e)}
                        />
                        <label for="javascript">Both</label>
                      </div>
                    </div>

                    <div className="input-group">
                      <input
                        id="firstname"
                        name="f_name"
                        placeholder="First Name"
                        className="form-control"
                        type="email"
                        onChange={(e) => logins_field2(e)}
                        style={
                          errorfield.f_name == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    <div className="input-group">
                      <input
                        id="lastname"
                        name="l_name"
                        placeholder="Last Name"
                        className="form-control"
                        type="email"
                        onChange={(e) => logins_field2(e)}
                        style={
                          errorfield.l_name == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    <div className="input-group">
                      <input
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control"
                        type="email"
                        onChange={(e) => logins_field2(e)}
                        style={
                          errorfield.email == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    <div className="input-group input-box">
                      <input
                        id="password1"
                        type={password ? "password" : "text"}
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => logins_field2(e)}
                        style={
                          errorfield.password == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                      <span
                        id="togglePassword"
                        toggle="#password-field1"
                        className={
                          password ? "fa fa-fw field-icon fa-eye" : "fa fa-eye"
                        }
                        onClick={(e) => setpassword(!password)}
                      ></span>
                    </div>
                  </div>
                  <div className="form-group">
                    <a>
                      <button
                        name="recover-submit"
                        className="btn btn-lg btn-secondary btn-block"
                        value="Create account"
                        onClick={(e) => {
                          if (
                            contact.f_name == "" ||
                            contact.l_name == "" ||
                            contact.email == "" ||
                            contact.password == "" ||
                            contact.fav_language == ""
                          ) {
                            check_data.map((data) => {
                              logins_field(data.name);
                            });
                          } else {
                            window.scrollBy(0, 100);
                            theytrusted_data();
                          }
                        }}
                      >
                        Submit
                      </button>
                    </a>
                    <p
                      className="login_success"
                      style={{
                        margin: "10px",
                        color: "#66666",
                      }}
                    >
                      {theytrusted}
                    </p>
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

export default Login;
