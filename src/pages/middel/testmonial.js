import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { api } from '../base_url';


function Testmonial() {
    const [theytrusted, settheytrusted] = useState([])
    const [check, setcheck] = useState(true)
    const theytrusted_data = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(api + "/api/testimonials", requestOptions)
            .then(response => response.json())
            .then(result => settheytrusted(result.data.testimonials))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        if (check) {
            theytrusted_data()
            setcheck(false)
        }
    }, [check])
    var settings = {
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: true,
        // speed: 5000,
        pauseOnHover: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 4000,
        cssEase: "linear"
    };
    return (
        <>
            <div className="testimonial-section text-center" >
                <div className="container" data-aos="fade-up">
                    <h2>Testimonials</h2>
                    <h4>What people say about Beauty Meetings</h4>
                    <div className="testimonial-items">
                        <Slider {...settings}>
                            {
                                theytrusted?.map((data, index) => {
                                    return <div className="box" key={index?.toString()}>
                                        <p>{data?.discription}</p>
                                        <div className="profile">
                                            <img src={api + "/assets/images/testimonial/" + data?.image} className="img-rounded" title="" alt="" />
                                            <h3>{data?.name} <span>{data?.location}</span></h3>
                                        </div>
                                    </div>
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testmonial
