import React, { useState } from 'react'

function About_banner(props) {
    const [data, setdata] = useState(props.aboutdata)
    return (
        <>
            <div className="breadcrumbs" data-aos="fade-down">
                <div className="container">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#"><span>About Us</span></a></li>
                    </ul>
                </div>
            </div>
            <div className="about font-sm">
                <div className="container">
                    <div className="inner" data-aos="fade-up">
                        <h1 className="heading">{props.aboutdata?.aboutus?.title}</h1>
                        <div className="inner-text" dangerouslySetInnerHTML={{ __html: props.aboutdata?.aboutus?.description }}>

                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="key-figure row">
                        <div className="column">
                            <h1>{props.aboutdata?.aboutus?.title1}</h1>
                            <h4>{props.aboutdata?.aboutus?.subtitle1}</h4>
                        </div>
                        <div className="column">
                            <h1>{props.aboutdata?.aboutus?.title2}</h1>
                            <h4>{props.aboutdata?.aboutus?.subtitle2}</h4>
                        </div>
                        <div className="column">
                            <h1>{props.aboutdata?.aboutus?.title3}</h1>
                            <h4>{props.aboutdata?.aboutus?.subtitle3}</h4>
                        </div>
                        <div className="column">
                            <h1>{props.aboutdata?.aboutus?.title4}</h1>
                            <h4>{props.aboutdata?.aboutus?.subtitle4}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About_banner
