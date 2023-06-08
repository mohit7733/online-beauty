import React from 'react'

function AcceptMeeting() {
  return (
    <>
       
           
            <div className="router-body add_hover">
                <div className="breadcrumbs" data-aos="fade-down">
                    <ul>
                        <li><a href="#">Dashboard</a></li>
                        <li><a href="#">Supplier My Meetings</a></li>
                        <li><a href="#"><span>(PENDING) Meetings Buyer A</span></a></li>
                    </ul>
                </div>
                    <div className="product_detail product_supplier">
                    <div className="row">
                        <div className="col_img" data-aos="fade-right">
                            <div className="holder">
                                <div className="slides">
                                    <img src="images/images-slider/A4.png" alt="" />
                                </div>
                                <div className="slides">
                                    <figure>
                                        <img src="images/images-slider/A3.png" alt="" />
                                    </figure>
                                </div>
                                
            
                            </div>
                            <div className="prevContainer"><a className="prev" onclick="plusSlides(-1)">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                                    </svg></a>
                            </div>
                            <div className="nextContainer"><a className="next" onclick="plusSlides(1)">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                    </svg></a>
                            </div>
            
            
                            {/* <!-- thumnails in a row --> */}
                            <div className="thumb-slider">
                                <div className="prevContainerx"
                                //  style="top: 650px; height: 10%;"
                                 >
                                    <a className="prev" onclick="plusSlides(-2)">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                                        </svg>
                                    </a>
                                </div>
                                <div className="product-img active thumbnail">
                                    <div className="slide-thumbnail" onclick="currentSlide(1)">
                                            <img src="images/buyer_thumb.png" alt="Caption one" />
                                    </div>
                                    <div className="video-cercile">
                                        <figure><img src="images/video-icon.svg" alt="" /></figure>
                                    </div>
                                </div>
                                <div className="column thumbnail">
                                    <img className="slide-thumbnail"
                                        src="images/images-slider/A3.png" onclick="currentSlide(2)" alt="Caption two" />
        
                                </div>
                                <div className="nextContainery"
                                //  style="top: 650px; height: 10%;"
                                 >
                                    <a className="next" onclick="plusSlides(4)">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="prevContainer"><a className="prev" onclick="plusSlides(2)">
                                <svg viewBox="0 0 24 24">
                                    <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                                </svg></a>
                        </div>
                        <div className="nextContainer"><a className="next" onclick="plusSlides(-2)">
                                <svg viewBox="0 0 24 24">
                                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                </svg></a>
                        </div>
                        </div>
                        <div className="col_text" data-aos="fade-left">
                            <div className="button">
                                <button className="btn btn-secondary">Company sector</button>
                            </div>
                            <h2>Fullname Company</h2>
                            <h5>Company Country: France</h5>
                            <h2>Company Profile</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                Ipsum has
                                been the industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a
                                galley of type and scrambled it to make a type specimen book. It has survived not
                                only five
                                centuries, but also the leap into electronic typesetting, remaining essentially
                                unchanged.
                                Lorem Ipsum
                            </p>
                            <div className="button-wrapper m-lft">
                                <a href="#" className="btn btn-secondary"><span><img src="images/thumbs-down.svg"
                                            alt="" /></span>I Accept A Meeting</a>
                                <a href="#" className="btn btn-primary"><span><img src="images/thumbs-up.svg"
                                            alt="" /></span>I Refuse A Meeting</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product_supplir_profile">
                    <div className="profile-list profile-brand">
                        <h2>Company</h2>
                        <div className="row justify-content-between">
                            <div className="col_left last-contnt">
                                <ul>
                                    <li>
                                        <h6>Your Brand Belongs To One Of The Following Category?</h6>
                                    </li>
                                    <li>
                                        <p>Machines & Equipments</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <h6>If You Are An Equipment Brand, Please Describe Your Technology</h6>
                                    </li>
                                    <li>
                                        <p>Laser, Hair Removal</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <h6>Describe Your Brand Concept, Philosophy And Identity</h6>
                                    </li>
                                    <li>
                                        <p>Aerolase Corporation (NY USA) Manufacturers Completely Uniqe And Portable
                                            Laser
                                            Technology For The Treatment Of All Skin Types.</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <h6>Specify Your Current Sales Channels</h6>
                                    </li>
                                    <li>
                                        <p>Dermatologists, plastic surgeons, aesthetic centers and clinics, medical
                                            spa, Laser
                                            therapists
                                        </p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <h6>What are the countries of interest for distribution?</h6>
                                    </li>
                                    <li>
                                        <p>France, Belgium, Netherlands, Switzerland, Scandinavia, Czechia.</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <h6>What are the differentiation points of your brand?</h6>
                                    </li>
                                    <li>
                                        <p>Unique Microsecond-pulsed laser treats all skin types. Painless
                                            treatment. Over 30
                                            FDA approved indications. manufactured in New York State.</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <h6>Why should the distributor carry your products?</h6>
                                    </li>
                                    <li>
                                        <p>Unique technology - no other laser company has this. Treats a very wide
                                            range of skin
                                            conditions, both cosmetic and medical.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
    
    
    </>
  )
}

export default AcceptMeeting