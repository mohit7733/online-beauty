import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { api } from "../base_url";
import icon1 from "../../assets/images/list_icon3.png";
import gridicon from "../../assets/images/grid.svg";
import Productsvg from "../../assets/images/Product.svg";
import countrysvg from "../../assets/images/country.svg";

import Testmonial from "../middel/testmonial";
import { country } from "../dashboard/country";
// import Loader from "../LoaderPage/Loader";

function Productview() {
	const navigate = useNavigate();
	const [loader, setloader] = useState(false);
	const [grid, setgrid] = useState(false);
	const [pagination, setpagination] = useState(8);
	const [categoryparams, setcategoryparams] = useState("");
	const [subcategoryparama, setsubcategoryparama] = useState("");
	const { categorysearch, categorysearch2, sub_category } = useParams();
	const [madeinparams, setmadeinparams] = useState("");
	const [anyparams, setanyparams] = useState("");
	const [productData, setProductData] = useState([]);
	const [categories, setcategories] = useState([]);
	// console.log(productData,"<<<<<<," , localStorage.getItem("user_id"));
	const [resultshow, setresultshow] = useState(false);
	const [total, settotal] = useState("");
	const [check, setcheck] = useState(true);
	const homeproduc_data = () => {
		setloader(false);
		var myHeaders = new Headers();
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			// redirect: 'follow'
		};
		fetch(
			api +
				`/api/productlist?${
					categoryparams
						? `category=${categoryparams}`
						: categorysearch
						? `category=${categorysearch?.replace(/\-+/g, " ")}`
						: "category="
				}&sub_cat=${subcategoryparama}&made_in=${madeinparams}&any=${anyparams}`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				if (result?.success) {
					setloader(true);
					// setresultshow(true);
				}
				settotal(result?.data?.total_product);
				setProductData(result?.message);
			})
			.catch((error) => {
				if (error) {
					setloader(true);
				}
				console.log("error", error);
			});
	};

	// console.log(productData,);

	const page = productData.length / 8;

	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		autoplay: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const [subcategories, setsubcategories] = useState([]);
	const [acountbenifits, setacountbenifits] = useState([]);
	const getsub_category = () => {
		var myHeaders = new Headers();
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};
		fetch(api + "/api/category", requestOptions)
			.then((response) => response.json())
			.then((result) => setcategories(result?.category))
			.catch((error) => console.log("error", error));

		fetch(api + "/api/account-benifits", requestOptions)
			.then((response) => response.json())
			.then((result) => setacountbenifits(result?.data?.account_benifits))
			.catch((error) => console.log("error", error));
	};

	useEffect(() => {
		if (check) {
			homeproduc_data();
			getsub_category();
			setcheck(false);
		}
	}, [check]);

	const selcetcate = (e) => {
		// console.log(e, "<<<<<");
		setcategoryparams(e);

		categories.filter((itemId) => {
			if (itemId.category_name == e) {
				axios
					.get(`${api}/api/subcategory?category_id=${itemId?.id}`)
					.then((res) => {
						if (res.status == 200) {
							setsubcategories(res?.data?.subcategory);
						}
					})
					.catch((error) => {
						console.log(error.message);
					});
			}
		});
	};

	useEffect(() => {
		if (categorysearch != "") {
			setcategoryparams(categorysearch);

			setTimeout(() => {
				homeproduc_data();
			}, 1000);
		}
		// window.location.reload();
	}, []);

	const resetbtnhandle = () => {
		navigate("/product-view");
		setcategoryparams("");
		setsubcategoryparama("");
		setmadeinparams("");
		setanyparams("");

		homeproduc_data();
		window.location.reload();
		// setTimeout(() => {

		// }, 50);
	};

	return (
		<>
			<div class="product_wrapper">
				<div className="breadcrumbs" data-aos="fade-down">
					<div className="container aos-init aos-animate" data-aos="fade-down">
						<ul>
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="#">
									<span>Products</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="product_section font-lg">
					<div className="serach_sectionset container" data-aos="fade-up">
						<h1 className="">Products</h1>
						<div className="categories row justify-content-around">
							<form
								id="search-form"
								className="category-search"
								action=""
								method="POST"
								enctype="multipart/form-data"
								onSubmit={(e) => e.preventDefault()}
							>
								<div className="column">
									<div className="custom-select">
										<select
											value={
												categoryparams == "" ? "All Categories" : categoryparams
											}
											onClick={() => setresultshow(false)}
											onChange={(e) => selcetcate(e.target.value)}
										>
											<option disabled selected>
												All Categories
											</option>
											{categories?.map((data, index) => {
												return (
													<option
														key={index}
														value={data.category_name}
														onClick={() =>
															setcategoryparams(data.category_name)
														}
													>
														{data.category_name}
													</option>
												);
											})}
										</select>
									</div>
								</div>
								<div className="column">
									<div className="custom-select">
										<select
											value={subcategoryparama}
											onChange={(e) => setsubcategoryparama(e.target.value)}
										>
											<option value="" disabled selected>
												Sub Category
											</option>
											{subcategories?.map((data, index) => {
												return (
													<option key={index} value={data?.subcategory_name}>
														{data?.subcategory_name}
													</option>
												);
											})}
										</select>
									</div>
								</div>
								<div className="column">
									<div className="custom-select">
										<select
											value={madeinparams}
											onChange={(e) => setmadeinparams(e.target.value)}
										>
											<option value="" disabled selected>
												Made In
											</option>
											{country.data.map((data, i) => {
												return (
													<option value={data.country}>{data.country}</option>
												);
											})}
										</select>
									</div>
								</div>
								<div className="column">
									<div className="search">
										<input
											type="text"
											value={anyparams}
											onChange={(e) => setanyparams(e.target.value)}
											onKeyPress={(e) => {
												if (e.key === "Enter") {
													homeproduc_data();
													setresultshow(true);
												}
											}}
											className="form-control"
											placeholder="Type here keywords"
										/>
									</div>
								</div>
								<div className="set_searchHandal column">
									<button
										type="button"
										onClick={() => {
											homeproduc_data();
											setresultshow(true);
										}}
										className="btn btn-block btn-secondary"
									>
										Search
									</button>
								</div>
								<div className="set_searchHandal column">
									<button
										type="reset"
										id="reset"
										onClick={resetbtnhandle}
										className="btn btn-secondary btn-default"
									>
										Clear All
									</button>
								</div>
							</form>
						</div>
						<div className="product_head">
							<div
								className="row justify-content-between align-items-center"
								data-aos="fade-up"
							>
								<div className="left">
									<h2>
										All Products{" "}
										{subcategoryparama == "" ? (
											<>
												{resultshow == true
													? `${categoryparams ? `"${categoryparams}"` : ""}`
													: categorysearch
													? `${
															productData[0]?.category != undefined
																? `"${productData[0]?.category}"`
																: ""
													  }`
													: ""}
											</>
										) : (
											""
										)}
									</h2>
									{resultshow == true || categorysearch ? (
										<p style={{ fontWeight: "600" }}>
											{" "}
											Result : {productData?.length + "/" + total}
										</p>
									) : (
										""
									)}
									{/* { categorysearch ? (
                    <p style={{ fontWeight: "600" }}>
                      {" "}
                      Result : {productData?.length+"/"+total}
                    </p>
                  ) : (
                    ""
                  )} */}
								</div>

								<div className="right d-flex">
									<div className="column">
										<div className="custom-select">
											<p className="sortbyclass">Sorted by</p>
											{/* <select>
                        <option>Sorted by</option>
                      </select> */}
										</div>
									</div>
									<div className="column">
										<div className="icon-wrapper">
											<ul className="row filter-buttons">
												<li
													className="grid-view-button"
													onClick={() => setgrid(false)}
												>
													<span>
														<img src={gridicon} alt="" />
													</span>
												</li>
												<li
													className="list-view-button"
													onClick={() => setgrid(true)}
												>
													<span>
														<img src={icon1} alt="" />
													</span>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* {loader != false ? ( */}
						<ol
							className={
								grid == true
									? "sub_category list list-view-filter"
									: "sub_category list grid-view-filter"
							}
							id="product"
						>
							{productData?.map((data, i) => {
								if (i < pagination) {
									return (
										<li
											className="row align-items-center"
											key={i}
											data-aos="fade-up"
										>
											<div
												className="img-wrapper"
												onClick={() => {
													if (localStorage.getItem("token") !== null) {
														if (
															localStorage
																.getItem("user_type")
																?.toLowerCase() === "supplier" &&
															localStorage.getItem("user_id") === data?.user_id
														) {
															navigate(
																"/product-view/" +
																	data.id +
																	"/" +
																	data?.product_short_name
																		?.replace(/\s+/g, "-")
																		.normalize("NFD")
																		.replace(/[\u0300-\u036f]/g, ""),
																{
																	state: {
																		id: data.id,
																	},
																}
															);
														} else if (
															localStorage
																.getItem("user_type")
																?.toLowerCase() === "supplier"
														) {
															navigate(
																"/product-details/" +
																	data.id +
																	"/" +
																	data?.product_short_name
																		?.replace(/\s+/g, "-")
																		.normalize("NFD")
																		.replace(/[\u0300-\u036f]/g, ""),
																{
																	state: {
																		id: data.id,
																	},
																}
															);
														} else {
															window.location.href =
																"/product-view/" +
																data.id +
																"/" +
																data?.product_short_name
																	?.replace(/\s+/g, "-")
																	.normalize("NFD")
																	.replace(/[\u0300-\u036f]/g, "")
																	.normalize("NFD")
																	.replace(/[\u0300-\u036f]/g, "");
														}
													} else {
														window.location.href =
															"/product-details/" +
															data.id +
															"/" +
															data?.product_short_name
																?.replace(/\s+/g, "-")
																.normalize("NFD")
																.replace(/[\u0300-\u036f]/g, "");
													}
												}}
											>
												<div className="col_img">
													<figure style={{ height: "180px" }}>
														{data.mediaFiles[Number(data?.thumb_index)]
															?.media_type === "image" ? (
															<img
																src={
																	data.mediaFiles[Number(data?.thumb_index)]
																		?.file_path
																}
																alt=""
															/>
														) : data.mediaFiles?.media_type === "video" ? (
															<video src={data.mediaFiles?.file_path} alt="" />
														) : data.mediaFiles?.media_type === "doc" ? (
															<img
																src={
																	data.mediaFiles[Number(data?.thumb_index)]
																		?.file_path
																}
																alt="no image"
															/>
														) : null}
													</figure>
												</div>
												<div className="col_category">
													<h4 className="handle_wrap">
														{data?.product_short_name &&
															data.product_short_name}
													</h4>
													<ul className="d-flex align-items-center">
														<li className="made_inclass">
															<span>
																<img src={Productsvg} alt="" />
															</span>
															{data?.category}
														</li>
														<li className="made_inclass">
															<span>
																<img src={countrysvg} alt="" />
															</span>
															{data?.made_in}
														</li>
													</ul>
												</div>
											</div>
										</li>
									);
								}
							})}
						</ol>
						{/* ) : (
              <Loader />
            )} */}
						<div
							className="no-data-found"
							id="blank-data"
							style={{ display: "none" }}
							//   style={
							//     productData?.length == 0
							//       ? { display: "none" }
							//       : { display: "none" }
							//   }
						>
							<p>
								No Product Found. Please click on 'Clear All' button to see all
								products again.
							</p>
						</div>
						<div className="pagination">
							<ul style={{ marginTop: "1rem" }}>
								{productData.length > 0
									? [
											...Array(
												parseInt(
													JSON.stringify(page)
														.substr(JSON.stringify(page).lastIndexOf("\\") + 1)
														.split(".")[1]
												)
													? parseInt(
															JSON.stringify(page)
																.substr(
																	JSON.stringify(page).lastIndexOf("\\") + 1
																)
																.split(".")[0]
													  ) + 1
													: parseInt(
															JSON.stringify(page)
																.substr(
																	JSON.stringify(page).lastIndexOf("\\") + 1
																)
																.split(".")[0]
													  )
											),
									  ].map((data, i) => {
											i += 1;
											{
												console.log(pagination);
											}
											if (i - 3 < pagination / 8 && i + 3 > pagination / 8) {
												return (
													<>
														{i == 1 ? (
															<li
																className={
																	pagination == i * 8
																		? "remove_ho active"
																		: productData?.length <= 8
																		? "remove_ho "
																		: ""
																}
																onClick={(e) => setpagination(i * 8)}
															>
																<a>{i}</a>
															</li>
														) : (
															<li
																className={
																	pagination == i * 8 ? " active" : " "
																}
																onClick={(e) => setpagination(i * 8)}
															>
																<a>{i}</a>
															</li>
														)}
													</>
												);
											}
									  })
									: ""}
								{productData?.length > 8 ? (
									<li
										className="hover_remove2 selected"
										onClick={(e) => setpagination(pagination + 8)}
									>
										<a>
											Next <img src="images/arrow-right.png" title="" alt="" />
										</a>
									</li>
								) : (
									""
								)}
							</ul>
						</div>
					</div>
				</div>

				<Testmonial />
				<div className="benefit-section">
					<div className="container">
						<div
							className="howwork_section_padding  wrap row justify-content-between"
							style={
								localStorage.getItem("token") != null
									? { display: "block" }
									: {}
							}
						>
							<div
								className="col_left"
								style={
									localStorage.getItem("token") != null
										? { display: "contents" }
										: {}
								}
							>
								<h2>
									{/* Create your account and get the following benefits */}
									{acountbenifits?.title}
								</h2>

								<div
									dangerouslySetInnerHTML={{
										__html: acountbenifits?.description,
									}}
								/>

								{/* <ul>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </li>
                </ul> */}
								<div className="row align-items-center">
									<a href="/how-does-it-work">
										Discover How It Works
										<i
											className="fa fa-arrow-right right"
											aria-hidden="true"
										></i>
									</a>
								</div>
							</div>
							{localStorage.getItem("token") != null ? (
								""
							) : (
								<div className="col_right">
									<div className="button-wrapper">
										<a href="#">
											<h2>No account yet?</h2>
										</a>
										<div className="input-group">
											<input
												id="email"
												name="email"
												placeholder="Enter your email here"
												className="form-control"
												type="email"
											/>
										</div>
										<a href="/login" className="btn btn-secondary">
											Sign In
										</a>
										<p>Or</p>
										<a href="/login" className="btn btn-secondary btn-default">
											Create a new account
										</a>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Productview;
