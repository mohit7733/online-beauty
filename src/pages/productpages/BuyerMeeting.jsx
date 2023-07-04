import React, { useState } from "react";
import Slider from "react-slick";

function BuyerMeeting() {
	const [meetingdone, setmeetingdone] = useState(1);
	const [desktop, setdesktop] = useState(false);

	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		autoplay: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	return (
		<>
			{/* <div class="product_buyer_wrap profile_popup">
        <div class="main">
         
        */}

			<div class="router-body">
				<div class="breadcrumbs" data-aos="fade-down">
					<ul>
						<li>
							<a href="#">Dashboard </a>
						</li>
						<li>
							<a href="#">Buyer </a>
						</li>
						<li>
							<a href="#">My Meetings</a>
						</li>
						<li>
							<a href="#">View all products</a>
						</li>
						<li>
							<a href="#">
								<span>Supplier A</span>
							</a>
						</li>
					</ul>
				</div>
				<div class="product_detail product_supplier">
					<div class="row">
						<div class="col_img" data-aos="fade-right">
							<div class="slider-for">
								<Slider {...settings}>
									<div>
										<figure>
											<img
												class="mainimg-display"
												src="images/banner_supplier.jpg"
												alt=""
											/>
										</figure>
									</div>
									<div>
										<figure>
											<img
												class="mainimg-display"
												src="images/images-slider/A2.png"
												alt=""
											/>
										</figure>
									</div>
									<div>
										<figure>
											<img
												class="mainimg-display"
												src="images/images-slider/A3.png"
												alt=""
											/>
										</figure>
									</div>
									<div>
										<figure>
											<img
												class="mainimg-display"
												src="images/images-slider/A4.png"
												alt=""
											/>
										</figure>
									</div>
								</Slider>

								<div class="product-img">
									<div>
										<figure>
											<img
												class="thumbnail"
												src="images/images-slider/A4.png"
												alt=""
											/>
										</figure>
									</div>
									<div class="video-cercile">
										<figure>
											<img src="images/video-icon.svg" alt="" />
										</figure>
									</div>
								</div>
								<div>
									<figure>
										<img
											class="thumbnail"
											src="images/images-slider/image_slider_1.png"
											alt=""
										/>
									</figure>
								</div>
							</div>
						</div>
						<div class="col_text" data-aos="fade-left">
							<div class="button">
								<button class="btn btn-secondary">Category 1</button>
								<button class="btn btn-secondary btn-default">
									Sub Category 1
								</button>
							</div>
							<h2>Product Name (Full)</h2>
							<ul>
								<li>
									<h5>Made In:</h5>
								</li>
								<li>
									<h5>
										Price Range: : € 10.000{" "}
										<span>&nbsp;(See Price Policy)</span>
									</h5>
								</li>
								<li>
									<h5>Minimum Quantity:</h5>
								</li>
								<li>
									<h5>Guarantee:</h5>
								</li>
								<li>
									<h5>Date Of Creation:</h5>
								</li>
								<li>
									<h5>Training:</h5>
								</li>
							</ul>
							<div class="button-wrapper">
								<a href="#" class="btn btn-secondary">
									<span style={{ alignItems: "center", display: "flex" }}>
										<img src="images/favourite.svg" alt="" />
									</span>
									Add your favourites
								</a>

								{meetingdone == 2 ? (
									<a class="btn btn-secondary">
										<span>
											<img src="images/check (1).svg" alt="" />
										</span>
										Meeting Done
									</a>
								) : (
									<a
										onClick={() => setmeetingdone(2)}
										onclick="Calendly.initPopupWidget({url: 'https://calendly.com/nitintom11/30min'});return false;"
										class="btn btn-primary"
									>
										<span>
											<img src="images/meeting.svg" alt="" />
										</span>
										Request a meeting?
									</a>
								)}

								<link
									href="https://assets.calendly.com/assets/external/widget.css"
									rel="stylesheet"
								/>
								<script
									src="https://assets.calendly.com/assets/external/widget.js"
									type="text/javascript"
									async
								></script>
							</div>
						</div>
					</div>
				</div>
				<div class="product_supplier_inner">
					<h2>Product Details</h2>
					<p class="justify-para">
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum.
					</p>
				</div>
				<div class="product_supplir_profile">
					<div class="d-flex">
						<div class="profile-list profile-brand">
							<h2>Profile</h2>
							<div class="row justify-content-between">
								<div class="col_left">
									<ul>
										<li>
											<h6>
												Your Brand Belongs To One Of The Following Category?
											</h6>
										</li>
										<li>
											<p>Machines & Equipments</p>
										</li>
									</ul>
									<ul>
										<li>
											<h6>
												If You Are An Equipment Brand, Please Describe Your
												Technology
											</h6>
										</li>
										<li>
											<p>Laser, Hair Removal</p>
										</li>
									</ul>
									<ul>
										<li>
											<h6>
												Describe Your Brand Concept, Philosophy And Identity
											</h6>
										</li>
										<li>
											<p>
												Aerolase Corporation (NY USA) Manufacturers Completely
												Uniqe And Portable Laser Technology For The Treatment Of
												All Skin Types.
											</p>
										</li>
									</ul>
									<ul>
										<li>
											<h6>Specify Your Current Sales Channels</h6>
										</li>
										<li>
											<p>
												Dermatologists, plastic surgeons, aesthetic centers and
												clinics, medical spa, Laser therapists
											</p>
										</li>
									</ul>
									<ul>
										<li>
											<h6>
												What are the countries of interest for distribution?
											</h6>
										</li>
										<li>
											<p>
												France, Belgium, Netherlands, Switzerland, Scandinavia,
												Czechia.
											</p>
										</li>
									</ul>
									<ul>
										<li>
											<h6>
												What are the differentiation points of your brand?
											</h6>
										</li>
										<li>
											<p>
												Unique Microsecond-pulsed laser treats all skin types.
												Painless treatment. Over 30 FDA approved indications.
												manufactured in New York State.
											</p>
										</li>
									</ul>
									<ul>
										<li>
											<h6>Why should the distributor carry your products?</h6>
										</li>
										<li>
											<p>
												Unique technology - no other laser company has this.
												Treats a very wide range of skin conditions, both
												cosmetic and medical.
											</p>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* </div>

     
      </div> */}
		</>
	);
}

export default BuyerMeeting;
