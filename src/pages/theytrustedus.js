import React, { useEffect, useState } from 'react'
import { api } from './base_url';

function Theytrustedus() {
    const [theytrusted, settheytrusted] = useState()
    const [check, setcheck] = useState(true)
    const [pagination, setpagination] = useState(25);
    const theytrusted_data = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(api + "/api/theytrustedus", requestOptions)
            .then(response => response.json())
            .then(result => {
                result.data.logos.sort((a, b) => {
                    return a.ranking - b.ranking;
                });
                settheytrusted(result.data)
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        if (check) {
            theytrusted_data()
            setcheck(false)
        }
    }, [check])
    const page = theytrusted?.logos.length / 25;
    return (
        <>
            <div className="breadcrumbs" data-aos="fade-down">
                <div className="container aos-init aos-animate" >
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#"><span>Buyers</span></a></li>
                    </ul>
                </div>
            </div>
            <div className="buyers_wrapper"  >
                <div className="container" data-aos="fade-up" >
                    <div className="trust_section row justify-content-between"   >
                        <div className="col_left aos-init aos-animate"  >
                            <div className="buyers">
                                <h1 >{theytrusted?.theytrustedus.title}</h1>
                                <p>{theytrusted?.theytrustedus.description}</p>
                            </div>
                        </div>
                        {
                            localStorage.getItem("token") != null ? "" :
                                <div className="col_right">
                                    <div className="button-wrapper">
                                        <a href="#"><h2>Do you want more information?</h2></a>
                                        <a href="/login" className="btn btn-secondary">Sign In</a>
                                        <p>Or</p>
                                        <a href="/login" className="btn btn-secondary btn-default">Create a new account</a>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className="row grid-5">
                        {
                            theytrusted?.logos?.map((logos, index) => {
                                if (index < pagination) {
                                    return (
                                        <div className="grid-col aos-init aos-animate" data-aos="fade-in" key={index}>
                                            <div className="column">
                                                <img src={api + "/assets/cms/" + logos.logo} title="" alt="" />
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <div className="pagination">
                    <ul style={{ marginTop: "1rem" }}>
                        {theytrusted?.logos?.length > 0
                            ? [
                                ...Array(
                                    parseInt(
                                        JSON.stringify(page)
                                            .substr(JSON.stringify(page).lastIndexOf("\\") + 1)
                                            .split(".")[1]
                                    )
                                        ? parseInt(
                                            JSON.stringify(page)
                                                .substr(
                                                    JSON.stringify(page).lastIndexOf("\\") + 1
                                                )
                                                .split(".")[0]
                                        ) + 1
                                        : parseInt(
                                            JSON.stringify(page)
                                                .substr(
                                                    JSON.stringify(page).lastIndexOf("\\") + 1
                                                )
                                                .split(".")[0]
                                        )
                                ),
                            ].map((data, i) => {
                                i += 1;
                                return (
                                    <li
                                        className={pagination == i * 8 ? "active" : ""}
                                        onClick={(e) => setpagination(i * 25)}
                                    >
                                        <a>{i}</a>
                                    </li>
                                );
                            })
                            : ""}
                            {
                                theytrusted?.logos?.length <= 25 ? "" :
                                
                        <li
                            className="selected"
                            onClick={(e) => setpagination(pagination + 25)}
                        >
                            <a>
                                Next <img src="images/arrow-right.png" title="" alt="" />
                            </a>
                        </li>
                            }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Theytrustedus
