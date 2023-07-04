import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../base_url";

import Left_menu from "../productpages/left_menu";
function View_remarkBoth() {
	const { id, usertype } = useParams();
	const [sidebar, setsidebar] = useState(true);
	const [formdata, setFormData] = useState({
		title: "",
		description: "",
	});
	const type_user = localStorage.getItem("user_type");
	const navigate = useNavigate();
	// const {usertype}  = useParams
	const path = window.location.pathname;

	const remarkid = path.substring(path.lastIndexOf("/") + 1);
	const handleSubmit = (e) => {
		// e.preventDefault();
		const token = "Bearer " + localStorage.getItem("token");
		const apiUrl =
			`${api}/api/v1/` +
			(type_user == "Buyer"
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
					type_user != "Buyer" ? remark?.supplier_remark : remark?.buyer_remark
				);
				const title = supplierRemark?.title;
				const description = supplierRemark?.description;

				const updatedFormData = {
					title: title || "",
					description: description || "",
				};

				setFormData(updatedFormData);
				console.log(updatedFormData, "this is we get");
				console.log(remarkid);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		handleSubmit();
	}, []);

	return (
		<>
			<div className="edit_remark Meeting_wrap">
				<div className="main">
					<Left_menu sidebar={sidebar} setsidebar={setsidebar} />
					<div className={sidebar ? "active router-body" : "router-body"}>
						<div className="breadcrumbs" data-aos="fade-down">
							<ul>
								<li>
									<a href="/dashboard/user-manegment">Dashboard </a>
								</li>
								<li>
									<a href={`/passed-meeting/${usertype}`}>
										{usertype == "supplier" ? "Suplier" : "Buyer"}
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
										View Remark
									</span>
								</li>
							</ul>
						</div>
						<div className="remark_wrap row justify-content-between">
							<div className="column">
								<h2>View Remark</h2>
							</div>
							<div className="column">
								<a
									id="edit"
									onClick={() =>
										navigate("/edit-remark/" + id + "/" + usertype)
									}
									style={{ cursor: "pointer" }}
								>
									Edit Remark <img src="images/edit (1).svg" alt="" />
								</a>
							</div>
						</div>
						<form action="">
							<div className="form">
								<input
									type="text"
									id="text"
									value={formdata?.title}
									className="form-control"
									placeholder=""
									disabled
								/>
							</div>
							<div className="form">
								<textarea
									name="description"
									id="textarea"
									value={formdata?.description}
								></textarea>
							</div>
							<div className="btn_wrapper row">
								<a
									id="back"
									className="btn btn-secondary"
									onClick={() => navigate(`/passed-meeting/${usertype}`)}
								>
									Back
								</a>
								<a
									id="resubmit"
									type="submit"
									href=""
									className="btn btn-secondary"
									style={{ display: "none" }}
								>
									Resubmit
								</a>
								<a
									id="cancel"
									href=""
									className="btn btn-primary"
									style={{ display: "none" }}
								>
									Cancel
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default View_remarkBoth;
