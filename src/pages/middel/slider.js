import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { api } from '../base_url';

function Slider_home() {
    const [banner, setbanner] = useState([])
    const [check, setcheck] = useState(true)
    const banner_data = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(api + "/api/homebanner", requestOptions)
            .then(response => response.json())
            .then(result => setbanner(result.data.home))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        if (check) {
            banner_data()
            setcheck(false)
        }
    }, [check])
    useEffect(() => {
            banner_data()
        
    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 600,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <>
            <div className="banner-section">
                <div className="single-item">
                    <Slider {...settings}>
                        {
                            banner?.map((data, index) => {
                                return <div className="banner-slide" data-aos="fade-up" key={index}  >
                                    <div className='background'
                                        style={{
                                            backgroundImage: `url(` + api + "/" + data?.image + `)`
                                        }}>
                                        <div className="container">
                                            <div className="handle_bannner row justify-content-end">
                                                <div className="banner-text">
                                                    <h1><span>{data?.title1}</span> {data?.title2}</h1>
                                                    <p>{data?.description}</p>
                                                    <div className="button d-flex">
                                                        <a href={localStorage.getItem("token") == null ? "/login" : "#"} className="btn btn-secondary">I am a Buyer</a>
                                                        <a href={localStorage.getItem("token") == null ? "/login" : "#"} className="btn btn-primary">I am a Supplier</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default Slider_home
