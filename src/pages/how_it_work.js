import React, { useEffect, useState } from 'react'
import { api } from './base_url';

function How_it_work() {
    const [how_work, sethow_work] = useState()
    const [check, setcheck] = useState(true)
    const how_work_data = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(api + "/api/howitworks", requestOptions)
            .then(response => response.json())
            .then(result => sethow_work(result.data))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        if (check) {
            how_work_data()
            setcheck(false)
        }
    }, [check])
    return (
        <>
            <div class="breadcrumbs" data-aos="fade-down">
                <div class="container">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#"><span>How it works</span></a></li>
                    </ul>
                </div>
            </div>
            <div class="about font-sm">
                <div class="container">
                    <div class="inner" data-aos="fade-up">
                        <h1 className="heading">{how_work?.howitworks?.title}</h1>
                        <div className="inner-text" dangerouslySetInnerHTML={{ __html: how_work?.howitworks?.description }}>

                        </div>
                    </div>
                </div>
                {/* <div class="container">
                    <div class="banner-work">
                        <img src={api + "/assets/cms/" + how_work?.howitworks?.image} alt="" />
                    </div>
                </div> */}
            </div>
            {/* <div class="our-section">
                <div class="container">
                    <div class="row justify-content-between">
                        <div className="column col-text  aos-init aos-animate" data-aos="fade-right">
                            <h5>{how_work?.timesaving?.title}</h5>
                            <div dangerouslySetInnerHTML={{ __html: how_work?.timesaving?.description }}>

                            </div>
                        </div>
                        <div className="column col-text  aos-init aos-animate" data-aos="fade-left">
                            <h5>{how_work?.efficiency?.title}</h5>
                            <div dangerouslySetInnerHTML={{ __html: how_work?.efficiency?.description }}>

                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div class="Quality-section">
                <div class="container">
                    <div class=" row justify-content-between">
                        <div class="column register-sec col-text col-text aos-init aos-animate" data-aos="fade-right">
                            <div class="row">
                                <div class="round-circle">
                                    <span>{how_work?.register?.title}</span>
                                </div>
                                <div className="head">
                                    <h3>{how_work?.register?.subtitle}</h3>
                                </div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: how_work?.register?.description }}>

                            </div>
                        </div>
                        <div className="column col-img aos-init aos-animate" data-aos="fade-left">
                            <img src={api + "/assets/cms/" + how_work?.register?.image} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="Quality-section">
                <div class="container">
                    <div class="handle_col_res row justify-content-between">

                        <div class="column match-sec col-img col-text aos-init aos-animate" data-aos="fade-right">
                            <img src={api + "/assets/cms/" + how_work?.match?.image} alt="" />
                        </div>
                        <div class="column col-text col-text aos-init aos-animate" data-aos="fade-left">
                            <div class="row">
                                <div class="round-circle">
                                    <span>{how_work?.match?.title}</span>
                                </div>
                                <div className="head">
                                    <h3>{how_work?.match?.subtitle}</h3>
                                </div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: how_work?.match?.description }}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="Quality-section">
                <div class="container">
                    <div class="row justify-content-between">
                        <div class="column register-sec col-text col-text aos-init aos-animate" data-aos="fade-right">
                            <div class="row">
                                <div class="round-circle">
                                    <span>{how_work?.meet?.title}</span>
                                </div>
                                <div className="head">
                                    <h3>{how_work?.meet?.subtitle}</h3>
                                </div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: how_work?.meet?.description }}>

                            </div>
                        </div>
                        <div className="column col-img aos-init aos-animate" data-aos="fade-left">
                            <img src={api + "/assets/cms/" + how_work?.meet?.image} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default How_it_work
