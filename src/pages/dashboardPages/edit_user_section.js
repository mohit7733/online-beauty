import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUserSection(props) {
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState();
  const { id } = useParams();
  console.log(id);
  const [contact, setcontact] = useState({
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [errorfield, seterrorfield] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
    fav_language: "",
    phone: "",
  });
  const logins_field2 = (e) => {
    switch (e.target.name) {
      case "phone":
        errorfield.phone = e.target.value.length >= 11 ? "required" : "";
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
      case "role":
        errorfield.role = e.target.value == "" ? "required" : "";
        break;

      default:
        break;
    }
    seterrorfield({ ...errorfield });
    setcontact({ ...contact, [e.target.name]: e.target.value });
  };

  const fatchuserData = async () => {
    var config = {
      method: "get",
      url: "http://localhost:5500/api/admin/get-single-user/" + id,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGMyNzVlNzM4M2NkZGRmNDE3ZWViMSIsImlhdCI6MTY3OTA0MDY4MywiZXhwIjoxNjc5MTI3MDgzfQ.FqHZpkZYBGGW78KkzL0vbOPdjzqf7kOB1qWnmz_bTGo",
      },
    };

    await axios(config)
      .then(function (response) {
          if (response.status == 200) {
            setTimeout(() => {
                
                contact.f_name = response.data?.single_user?.firstName;
                contact.l_name = response.data?.single_user?.lastName;
                contact.email = response.data?.single_user?.email;
                contact.phone = response.data?.single_user?.mobile_number;
                contact.role = response.data?.single_user?.user_type;
            }, 50);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fatchuserData();
  }, []);

  console.log( contact.f_name, "<<<<<<<<,",contact.role,);

  const handleSubmit = async () => {
    var data = new FormData();
    data.append("firstName", contact.f_name);
    data.append("lastName", contact.l_name);
    data.append("email", contact.email);
    data.append("user_type", contact.role);
    data.append("mobile_number", contact.phone);

    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "http://localhost:5500/api/admin/update-user/"+id,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGMyNzVlNzM4M2NkZGRmNDE3ZWViMSIsImlhdCI6MTY3OTA0MDY4MywiZXhwIjoxNjc5MTI3MDgzfQ.FqHZpkZYBGGW78KkzL0vbOPdjzqf7kOB1qWnmz_bTGo",
      },
      data,
    };
    axios(config)
      .then(function (response) {
        if (response.status == 200) {
            console.log(response.data);
          navigate("/dashboard/user-manegment");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={(props.sidebar ? "active " : " ") + "router-body"}>
      <div className="breadcrumbs" data-aos="fade-down">
        <ul>
          <li>
            <a href="/dashboard">Dashboard </a>
          </li>
          <li>
            <a href="/dashboard">Supplier</a>
          </li>
          <li>
            <a href="#">
              <span> User Management </span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>Edit User </span>
            </a>
          </li>
        </ul>
      </div>
      <div className="product_prfile">
        <h1>Edit User</h1>
        <div className="row">
          <div className="col_left">
            <div className="panel">
              <div className="form-group full">
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                  name="f_name"
                  value={contact?.f_name}
                  onChange={(e) => logins_field2(e)}
                  style={
                    errorfield.f_name == ""
                      ? {}
                      : { borderBottom: "1px solid red" }
                  }
                />
              </div>
              <div className="form-group full">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                  name="l_name"
                  value={contact?.l_name}
                  onChange={(e) => logins_field2(e)}
                  style={
                    errorfield.l_name == ""
                      ? {}
                      : { borderBottom: "1px solid red" }
                  }
                />
              </div>
              <div className="form-group input-group">
                <input
                  id="email"
                  name="email"
                  value={contact?.email}
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

              <div className="form_wrap row">
                <div className="form-group full Company_sector">
                  <input
                    placeholder="Contact Number"
                    className="form-control"
                    type="tel"
                    maxLength={11}
                    name="phone"
                    value={contact.phone}
                    onChange={(e) => logins_field2(e)}
                    style={
                      errorfield.phone == ""
                        ? {}
                        : { borderBottom: "1px solid red" }
                    }
                  />
                </div>
                <div className="form-group">
                  <div className="custom-select">
                    <select
                      name="role"
                      onChange={(e) => logins_field2(e)}
                      value={contact.role}
                      style={
                        errorfield.role == ""
                          ? {}
                          : { borderBottom: "1px solid red" }
                      }
                      // value={role}
                    >
                      <option>Roles</option>
                      <option>Buyer</option>
                      <option>Supplier</option>
                      <option>Super Admin</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="button_wrap row">
              <a onClick={handleSubmit} className="btn btn-secondary">
                Update
              </a>
              <a onClick={() => navigate(-1)} className="btn btn-primary">
                Cancel
              </a>
            </div>
            <div className="error-button row justify-content-center">
              <a
                className="error_icon"
                onClick={() => navigate(-1)}
                style={{ cursor: "pointer" }}
              >
                <i className="fa fa-arrow-left left" aria-hidden="true"></i>Back to
                User Management
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
