import React, { useState, useEffect } from "react";
import EditRemark from "./EditRemark";
import { Navigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../base_url";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// import { useLocation } from "react-router-dom";
// Add remark
function Add_remark(props) {
  const location = useLocation();
	const { id } = useParams();
	const navigate = useNavigate();
	const { state } = useLocation();
	const [formData, setFormData] = useState({
		id,
		title: "",
		description: "",
	});
  console.log(state);
	const type_user = localStorage.getItem("user_type");
	console.log(type_user);
	useEffect(() => {
		const path = window.location.pathname;
		const id = path.substring(path.lastIndexOf("/") + 1);
		setFormData((prevFormData) => ({ ...prevFormData, id }));
	}, []);

	const handleInputChange = (e) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const token = "Bearer " + localStorage.getItem("token");
		const apiUrl =
			api +
			"/api/v1/" +
			(type_user == "Buyer" ? "buyer-add-remark" : "supplier-add-remark");

		const requestData = new FormData();
		requestData.append("id", formData.id);
		requestData.append("title", formData.title);
		requestData.append("description", formData.description);

		axios
			.post(apiUrl, requestData, {
				headers: {
					Authorization: token,
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				toast.success("Remark Added Successfully");
				console.log(response.data);
				setTimeout(() => {
					navigate(
						"/passed-meeting/" + (type_user == "Buyer" ? "buyer" : "supplier")
					);
				}, 3000);
			})
			.catch((error) => {
				toast.error("Something Went Wrong !");
				console.error(error);
			});
	};

  return (
    <>
      <div className={(props.sidebar ? "active " : " ") + "router-body"}>
        <div className="breadcrumbs" data-aos="fade-down">
          <ul>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">My Meetings</a>
            </li>
            <li >
              <span>
                <a className="rd" onClick={() => props.setsection(21)}>Passed Meetings</a>
              </span>
            </li>
            <li>
              <span>
                <a   className="rd" href="#">Add Remark</a>
              </span>
            </li>
          </ul>
        </div>
        <div className="remark_wrap row justify-content-between">
          <div className="column">
            <h2>Add Remark</h2>
          </div>
          <div className="column"></div>
        </div>
        <form action="">
          <div className="form">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              className="form-control"
              placeholder="Title"
              onChange={handleInputChange}
            />
          </div>
          <div className="form">
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="btn_wrapper row">
            <a
              id="resubmit"
              href=""
              className="btn btn-secondary"
              onClick={handleSubmit}
            >
              Submit
            </a>

            <a
              id="cancel"
              href=""
              className="btn btn-primary"
              onClick={() => {
                navigate("/passed-meeting/supplier");
              }}
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default Add_remark;
