import React from 'react'

function MeetingDone() {
  return (
    <>
    


            
            <div class="router-body">
                <div class="breadcrumbs" data-aos="fade-down">
                    <ul>
                        <li><a href="#">Dashboard </a></li>
                        <li><a href="#">Supplier</a></li>
                        <li><a href="#"><span>My Meetings</span></a></li>
                        <li><a href="#"><span>Passed Meetings</span></a></li>
                        <li><a href="#"><span>Buyer A</span></a></li>
                    </ul>
                </div>
                <div class="product_detail product_supplier">
                    <div class="row">
                        <div class="col_img" data-aos="fade-right">
                            <div class="holder">
                                <div class="slides">
                                    <img src="images/Accept_meeting.jpg" alt="" />
                                </div>
                                <div class="slides">
                                    <figure>
                                        <iframe src="https://docs.google.com/document/d/e/2PACX-1vTvq6YC-ShaRBDmn1cybqcBRGDOrmaFk3VHSqM5vigLqTv5ZK54dgOBypaji6ZMaJawvCMQTeUjHFPq/pub?embedded=true" frameborder="0"></iframe>
                                        <button type="button" class="download_file">
                                            <img src="images/download_icon.png" />
                                        </button>
                                    </figure>
                                </div>
            
                            </div>
                            <div class="prevContainer"><a class="prev" onclick="plusSlides(1)">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                                    </svg></a>
                            </div>
                            <div class="nextContainer"><a class="next" onclick="plusSlides(-1)">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                    </svg></a>
                            </div>
            
            
                            {/* <!-- thumnails in a row --> */}
                            <div class="thumb-slider">
                                <div class="prevContainerx"
                            style={{top: "650px" ,height: "10%"}}
                                 >
                                    <a class="prev" onclick="plusSlides(-2)">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                                        </svg>
                                    </a>
                                </div>

                                <div class="column thumbnail">
                                    <img class="slide-thumbnail"
                                        src="images/buyer_thumb.png" onclick="currentSlide(1)" alt="Caption two"/>
        
                                </div>
                                <div class="column thumbnail active">
                                        <div class="slide-thumbnail pdf-doc-f" onclick="currentSlide(2)">
                                            <img class="pdf_icon" src="images/pdf_icon.png" alt="Caption one"/>
                                        </div>
                                </div>

                                <div class="nextContainery" 
                            style={{top: "650px" ,height: "10%"}}
                            >
                                    <a class="next" onclick="plusSlides(4)">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div class="prevContainer"><a class="prev" onclick="plusSlides(-2)">
                                <svg viewBox="0 0 24 24">
                                    <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                                </svg></a>
                        </div>
                        <div class="nextContainer"><a class="next" onclick="plusSlides(2)">
                                <svg viewBox="0 0 24 24">
                                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                </svg></a>
                        </div>
                        </div>
                        <div class="col_text" data-aos="fade-left">
                            <div class="button">
                                <button class="btn btn-secondary">Company sector</button>
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
                            <div class="button-wrapper remove_hover justify-end">
                                <a href="#" class="btn btn-secondary"><span><img src="images/check (1).svg"
                                            alt="" /></span>Meeting Done</a>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="profile-list profile-brand">
                    <h2>Company</h2>
                    <div class="row justify-content-between">
                        <div class="col_left last-contnt">
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
                                <li><p>France, Belgium, Netherlands, Switzerland, Scandinavia, Czechia.</p></li>
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
                                <li><p>Unique technology - no other laser company has this. Treats a very wide
                                    range of skin
                                    conditions, both cosmetic and medical.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
      

    </>
  )
}

export default MeetingDone