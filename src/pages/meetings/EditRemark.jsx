import React, { useEffect, useState } from "react";import axios from "axios";
import { useParams } from "react-router-dom";
import { api } from "../../pages/base_url";
import { toast } from "react-toastify";

function EditRemark(props) {
	const { id, usertype } = useParams();
	const path = window.location.pathname;
	const remarkid = path.substring(path.lastIndexOf("/") + 1);
	const [formdata, setFormData] = useState({
		title: "",
		description: "",
		id: remarkid,
	});

	useEffect(() => {
		const token = "Bearer " + localStorage.getItem("token");
		const apiUrl =
			`${api}/api/v1/` +
			(usertype == "buyer"
				? `buyer-view-remark?id=${remarkid}`
				: `supplier-view-remark?id=${remarkid}`);

		axios
			.get(apiUrl, {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				const { data } = response?.data;
				const { remark } = data;

				const supplierRemark = JSON.parse(
					usertype != "buyer" ? remark?.supplier_remark : remark?.buyer_remark
				);
				const title = supplierRemark?.title;
				const description = supplierRemark?.description;

				const updatedFormData = {
					title: title || "",
					description: description || "",
					id: remarkid,
				};

				setFormData(updatedFormData);
				console.log(updatedFormData, "this is what we get");
				console.log(remarkid);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const token = "Bearer " + localStorage.getItem("token");
		const apiUrl =
			`${api}/api/v1/` +
			(usertype == "buyer" ? "buyer-add-remark" : "supplier-add-remark");

		const requestData = new FormData();
		requestData.append("id", formdata.id);
		requestData.append("title", formdata.title);
		requestData.append("description", formdata.description);

		axios
			.post(apiUrl, requestData, {
				headers: {
					Authorization: token,
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				toast.success("Remark Edited Successfully");
				console.log(response.data);
				setTimeout(() => {
					naviagate("/passed-meeting/" + usertype);
				}, 3000);
			})
			.catch((error) => {
				toast.error("something went wrong !");
				console.error(error);
			});
	};

	return (
		<>
			<div className={(props.sidebar ? "active " : " ") + "router-body"}>
				<div className="breadcrumbs" data-aos="fade-down">
					<ul>
						<li>
							<a href="/dashboard">Dashboard </a>
						</li>
						<li>
							<a href={`/passed-meeting/${usertype}`}>
								Supplier
								{/* {localStorage.getItem("user_type") == "Both" ? props.supplier : localStorage.getItem("user_type")} */}
							</a>
						</li>
						<li>
							<a href={`/passed-meeting/${usertype}`}>
								<span> My Meetings </span>
							</a>
						</li>
						<li>
							<a href={`/passed-meeting/${usertype}`}>
								<span> Passed Meetings </span>
							</a>
						</li>
						<li>
							<span style={{ cursor: "pointer", paddingLeft: "5px" }}>
								Edit Remark
							</span>
						</li>
					</ul>
				</div>
				<h2>Edit Remark</h2>
				<form onSubmit={handleSubmit}>
					<div className="form">
						<input
							type="text"
							value={formdata.title}
							className="form-control"
							placeholder=""
							onChange={(e) =>
								setFormData({ ...formdata, title: e.target.value })
							}
						/>
					</div>
					<div className="form">
						<textarea
							name=""
							className="form-control"
							value={formdata.description}
							cols="30"
							rows="10"
							onChange={(e) =>
								setFormData({ ...formdata, description: e.target.value })
							}
						></textarea>
					</div>
					<div className="btn_wrapper row">
						<button type="submit" className="btn btn-secondary">
							Resubmit
						</button>
						<a
							href={`/view-remark/${id}/${usertype}`}
							className="btn btn-primary"
						>
							Cancel
						</a>
					</div>
				</form>
			</div>
		</>
	);
}

export default EditRemark;