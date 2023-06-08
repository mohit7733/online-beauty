import React, { useEffect, useState } from 'react'
import { api } from './base_url'
import About_banner from './middel/about_banner'
function About() {
    const [about, setabout] = useState()
    const [check, setcheck] = useState(true)
    const about_data = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(api + "/api/aboutus", requestOptions)
            .then(response => response.json())
            .then(result => setabout(result.data))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        if (check) {
            about_data()
            setcheck(false)
        }
    }, [check])
    return (
        <>
            <About_banner aboutdata={about} />
            {/* <div className="our-section">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="column aos-init aos-animate" data-aos="fade-right">
                            <h5>{about?.ourmission?.title}</h5>
                            <div dangerouslySetInnerHTML={{ __html: about?.ourmission?.description }}>

                            </div>
                        </div>
                        <div className="column aos-init aos-animate" data-aos="fade-left">
                            <h5>{about?.ourvision?.title}</h5>
                            <div dangerouslySetInnerHTML={{ __html: about?.ourvision?.description }}>

                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="Quality-section concept-section">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="column concept col-text aos-init aos-animate" data-aos="fade-right">
                            <div className="row">
                                <div className="round-circle">
                                    <span>{about?.concept?.title}</span>
                                </div>
                                <div className="head">
                                    <h3>{about?.concept?.subtitle}</h3>
                                </div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: about?.concept?.description }}>

                            </div>
                        </div>
                        <div className="column col-img aos-init aos-animate" data-aos="fade-left">
                            <img src={api + "/assets/cms/" + about?.concept?.image} alt="" />
                        </div>

                    </div>

                </div>
            </div>
            <div className="Quality-section">
                <div className="container">
                    <div className="handle_col_res row justify-content-between">
                        <div className="column col-img aos-init aos-animate" data-aos="fade-right">
                            <img src={api + "/assets/cms/" + about?.quality?.image} alt="" />
                        </div>
                        <div className="column Quality col-text aos-init aos-animate" data-aos="fade-left">
                            <div className="row">
                                <div className="round-circle">
                                    <span>{about?.quality?.title}</span>
                                </div>
                                <div className="head">
                                    <h3>{about?.quality?.subtitle}</h3>
                                </div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: about?.quality?.description }}>
                            {/* <p>&nbsp;</p> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default About
