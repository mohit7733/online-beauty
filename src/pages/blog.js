import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from './base_url'
import image2 from "../assets/images/img-feature-4 .jpg"

function Blog() {
    const [theytrusted, settheytrusted] = useState([])
    const [featured, setfeatured] = useState([])
    const [check, setcheck] = useState(true)
    const theytrusted_data = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(api + "/api/blogs", requestOptions)
            .then(response => response.json())
            .then(result => settheytrusted(result.data.blogs))
            .catch(error => console.log('error', error));

        fetch(api + "/api/featuredpost", requestOptions)
            .then(response => response.json())
            .then(result => setfeatured(result.data.featuredpost))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        if (check) {
            theytrusted_data()
            setcheck(false)
        }
        console.log(theytrusted);
    }, [check])


    console.log(featured);
    return (
        <>
            <div className="breadcrumbs" data-aos="fade-down">
                <div className="container">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/blogs"><span>Blog</span></Link></li>
                    </ul>
                </div>
            </div>
            <div className="blog-panel font-lg font-sm">
                <div className="container">
                    <h1 data-aos="fade-down">Blogs</h1>
                    {
                        featured?.map((data, index) => {
// console.log(data,"<<<<<blog");

                            if (index < 1) {
                            // console.log("data>", data);
                                return (
                                    <div className="row">
                                        <div className="col-img" data-aos="fade-right">
                                            <figure>
                                                <img src={
                                                    image2
                                                    // api + "/" + data?.file_path_details
                                                    } title="" alt="" style={{width:"100%"}} />
                                                <figcaption>
                                                    <div className="top d-flex justify-content-between align-items-center">
                                                        <Link to={"/blog-detail/" +  54 }><h5>{data?.category}</h5></Link>
                                                        <Link to={"/blog-detail/" + 54} className="btn-icon"><img src="images/icon-share.png" title="" alt="" /></Link>
                                                    </div>
                                                </figcaption>
                                            </figure>
                                        </div>
                                        <div className="col-text" data-aos="fade-left">
                                            <h5>Featured Blog</h5>
                                            <h2>{data?.title}</h2>
                                            <h6 className="auther">By <span>John Doy</span> |  OCT 25, 2022</h6>
                                            <p><div className="inner-text" dangerouslySetInnerHTML={{ __html: data?.description }}>

                                            </div></p>
                                            <Link to={"/blog-detail/" + 54} className="btn btn-secondary">Read More</Link>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            <div className="filter-section">
                <div className="container">
                    <div className="row justify-content-between align-items-center" data-aos="fade-up">
                        <div className="left">
                            <h2>All Posts</h2>
                        </div>
                        <div className="right d-flex">
                            <div className="column">
                                <div className="search">
                                    <input type="text" className="form-control" placeholder="Type here keywords" />
                                    <button type="button" className="btn_blogs btn btn-secondary">Search</button>
                                </div>
                            </div>
                            <div className="column">
                                <div className="custom-select">
                                    <select>
                                        <option>Category</option>
                                    </select>
                                </div>
                            </div>
                            <div className="column">
                                <div className="custom-select">
                                    <select>
                                        <option>Sorted By</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="feature-section">
                <div className="container">
                    <div className="row grid-3">
                        {
                            theytrusted?.map((data, index) => {
                                return (
                                    <div className="grid-col" data-aos="fade-up">
                                        <div className="column">
                                            <figure>
                                                <img src={api + "/" + data?.Image} alt="" />
                                                <figcaption>
                                                    <div className="top d-flex justify-content-between align-items-center">
                                                        <Link to={"/blog-detail/" + data?.id}><h5>{data?.category}</h5></Link>
                                                        <Link to={"/blog-detail/" + data?.id} className="btn-icon"><img src="images/icon-share.png" title="" alt="" /></Link>
                                                    </div>
                                                    <div className="bottom">
                                                        <ul>
                                                            <li>By John Doe</li>
                                                            <li>Oct 25, 2022</li>
                                                        </ul>
                                                        <div className="text">
                                                            <Link to={"/blog-detail/" + data?.id}>
                                                                <h3>
                                                                    {data?.title}
                                                                    <img src="images/arrow-right.png" />
                                                                </h3>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </figcaption>
                                            </figure>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="pagination" data-aos="fade-up">
                <ul>
                    <li className="active"><Link to="#">1</Link></li>
                    <li><Link to="#">2</Link></li>
                    <li><Link to="#">3</Link></li>
                    <li className="selected"><Link to="#">Next <img src="images/arrow-right.png" title="" alt="" /></Link></li>
                </ul>
            </div>
        </>
    )
}

export default Blog
