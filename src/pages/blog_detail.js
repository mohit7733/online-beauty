import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from './base_url';
import image2 from "../assets/images/img-feature-4 .jpg"


function Blog_detail() {
    const slugdata = useParams()
    const id = slugdata.id
    const navigate = useNavigate()
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [theytrusted, settheytrusted] = useState([])
    const [check, setcheck] = useState(true)
    const theytrusted_data = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(api + "/api/blogdetails?id=" + id, requestOptions)
            .then(response => response.json())
            .then(result => settheytrusted(result.data.blogs))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        if (check) {
            theytrusted_data()
            setcheck(false)
        }
    }, [check])


    console.log(theytrusted);
    return (
        <>
            <div className="breadcrumbs">
                <div className="container" data-aos="fade-up">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/blogs">Blog</a></li>
                        <li><a onClick={()=>navigate(-1)}>
                            Startup
                            {/* {theytrusted?.category} */}

                            </a></li>
                        <li><a href="#"><span>{theytrusted?.title}</span></a></li>
                    </ul>
                </div>
            </div>
            <div className="blog-tags font-sm">
                <div className="container">
                    <div className="row justify-content-between align-items-center" data-aos="fade-up">
                        <h4><img src={window.location.origin + "/images/icon-blog.svg"} title="" alt="" />
                        Startup
                        {/* {theytrusted?.category} */}
                        </h4>
                        <p>
                            Posted on
                              { " " + month[new Date(theytrusted?.created_at).getMonth()] + " " + new Date(theytrusted?.created_at).getDate()}, {new Date(theytrusted?.created_at).getFullYear()}

                             {/* 27th January 2022 */}
                            
                            </p>
                    </div>
                </div>
            </div>

            <div className="blog-detail font-lg">
                <div className="container">
                    <h2 data-aos="fade-up">John Doe</h2>
                    <h1 data-aos="fade-up" data-aos-delay="200">{theytrusted?.title}</h1>
                    <div className="img" data-aos="fade-up" data-aos-delay="300">
                        <img src={
                            //image2
                            api + "/"+theytrusted?.Image
                            } alt="" />
                    </div>
                    <div className="text__box" data-aos="fade-up" data-aos-delay="100">
                        {/* <h3>{}</h3> */}
                        <div className="inner-text" dangerouslySetInnerHTML={{ __html: theytrusted?.description }}>

                        </div>
                    </div>
                     <div className="text__box" data-aos="fade-up" data-aos-delay="150">
                        <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                            and
                            scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                            leap
                            into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                            the
                            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                            publishing
                            software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                            and
                            scrambled it to make a type specimen book.</p>
                    </div>
                   <div className="text__box" data-aos="fade-up" data-aos-delay="200">
                        <ul>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                        </ul>
                    </div>
                    <div className="text__box" data-aos="fade-up" data-aos-delay="250">
                        <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                            and
                            scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                            leap
                            into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                            the
                            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                            publishing
                            software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div> 
                    <div className="blog-share" data-aos="fade-up">
                        <div className="right">
                            <h5>Share to</h5>
                            <span><a href="#"><img src={window.location.origin + "/images/icon-o-share.svg"} title="" alt="" /></a></span>
                            <span><a href="#"><img src={window.location.origin + "/images/icon-o-facebook.svg"} title="" alt="" /></a></span>
                            <span><a href="#"><img src={window.location.origin + "/images/icon-o-twitter.svg"} title="" alt="" /></a></span>
                            <span><a href="#"><img src={window.location.origin + "/images/icon-o-linkedin.svg"} title="" alt="" /></a></span>
                            <span><a href="#"><img src={window.location.origin + "/images/icon-o-link.svg"} title="" alt="" /></a></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-sm feature-section">
                <div className="container">
                    <h2 data-aos="fade-up">What to read next</h2>
                    <div className="row grid-3">
                        <div className="grid-col" data-aos="fade-up">
                            <div className="column">
                                <figure>
                                    <img src={window.location.origin + "/images/post_1.jpg"} alt="" />
                                    <figcaption>
                                        <div className="top d-flex justify-content-between align-items-center">
                                            <h5>Startup</h5>
                                            <a href="#" className="btn-icon"><img src={window.location.origin + "/images/icon-share.png"} title="" alt="" /></a>
                                        </div>
                                        <div className="bottom">
                                            <ul>
                                                <li>By John Doe</li>
                                                <li>Oct 25, 2022</li>
                                            </ul>
                                            <div className="text">
                                                <a href="#">
                                                    <h3>
                                                        8 Figma design systems that you can download for free today.
                                                        <img src={window.location.origin + "/images/arrow-right.png"} />

                                                    </h3>
                                                </a>
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                        <div className="grid-col" data-aos="fade-up">
                            <div className="column">
                                <figure>
                                    <img src={window.location.origin + "/images/post_1.jpg"} alt="" />
                                    <figcaption>
                                        <div className="top d-flex justify-content-between align-items-center">
                                            <h5>Startup</h5>
                                            <a href="#" className="btn-icon"><img src={window.location.origin + "/images/icon-share.png"} title="" alt="" /></a>
                                        </div>
                                        <div className="bottom">
                                            <ul>
                                                <li>By John Doe</li>
                                                <li>Oct 25, 2022</li>
                                            </ul>
                                            <div className="text">
                                                <a href="#">
                                                    <h3>
                                                        8 Figma design systems that you can download for free today.
                                                        <img src={window.location.origin + "/images/arrow-right.png"} />

                                                    </h3>
                                                </a>
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                        <div className="grid-col" data-aos="fade-up">
                            <div className="column">
                                <figure>
                                    <img src={window.location.origin + "/images/post_1.jpg"} alt="" />
                                    <figcaption>
                                        <div className="top d-flex justify-content-between align-items-center">
                                            <h5>Startup</h5>
                                            <a href="#" className="btn-icon"><img src={window.location.origin + "/images/icon-share.png"} title="" alt="" /></a>
                                        </div>
                                        <div className="bottom">
                                            <ul>
                                                <li>By John Doe</li>
                                                <li>Oct 25, 2022</li>
                                            </ul>
                                            <div className="text">
                                                <a href="#">
                                                    <h3>
                                                        8 Figma design systems that you can download for free today.
                                                        <img src={window.location.origin + "/images/arrow-right.png"} />

                                                    </h3>
                                                </a>
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog_detail
