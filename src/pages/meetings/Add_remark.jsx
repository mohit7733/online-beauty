import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../base_url";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Add_remark(props) {
	const { id, usertype } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		id,
		title: "",
		description: "",
	});
	useEffect(() => {
		// const path = window.location.pathname;
		// const id = path.substring(path.lastIndexOf("/") + 1);
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
			(usertype == "buyer" ? "buyer-add-remark" : "supplier-add-remark");

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
					navigate("/passed-meeting/" + usertype);
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
							<a href="/dashboard">Dashboard</a>
						</li>
						<li>
							<a
								href={`/passed-meeting/${usertype}`}
								style={{ textTransform: "capitalize" }}
							>
								{usertype}
							</a>
						</li>
						<li>
							<a href={`/passed-meeting/${usertype}`}>
								<span>My Meetings</span>
							</a>
						</li>
						<li>
							<a href={`/passed-meeting/${usertype}`}>
								<span>Passed Meetings</span>
							</a>
						</li>
						<li>
							<span style={{ cursor: "pointer", paddingLeft: "5px" }}>
								Add Remark
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
							className="form-control"
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
							className="btn btn-primary"
							onClick={() => {
								navigate(`/passed-meeting/${usertype}`);
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