import React, { useEffect, useState } from "react";
import { api } from "../base_url";
import { Link } from "react-router-dom";

function Feature_post() {
  const [theytrusted, settheytrusted] = useState([]);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [check, setcheck] = useState(true);
  const theytrusted_data = () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(api + "/api/featuredpost", requestOptions)
      .then((response) => response.json())
      .then((result) => settheytrusted(result.data.featuredpost))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    if (check) {
      // theytrusted_data();
      setcheck(false);
    }
  }, [check]);
  // console.log(theytrusted);
  return (
    <>
      <div className="feature-section bg-gray section">
        <div className="container">
          <div className="text-center" data-aos="fade-up">
            <h2>Featured Articles</h2>
          </div>
          <div className="row grid-3" style={{justifyContent:"center"}}>
            {/* {theytrusted?.map((data, index) => {
              return (
                <div className="grid-col" key={index}>
                  <div className="column">
                    <figure>
                      <img src={api + "/" + data?.file_path} alt="" />
                      <figcaption>
                        <div className="top d-flex justify-content-between align-items-center">
                          <a href={"/blog-detail/" + data?.id}>
                            <h5>{data?.category}</h5>
                          </a>
                        </div>
                        <div className="bottom">
                          <ul>
                            <li>{data?.title}</li>
                            <li>
                              {month[new Date(data?.created_at).getMonth()] +
                                " " +
                                new Date(data?.created_at).getDate()}
                              , {new Date(data?.created_at).getFullYear()}
                            </li>
                          </ul>
                          <div className="text">
                            <a href={"/blog-detail/" + data?.id}>
                              <h3>
                                {data?.title}
                                <img src="images/arrow-right.png" />
                              </h3>
                            </a>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              );
            })} */}
            <h4 style={{color :"#19A0DD"}}>
            Coming Soon

            </h4>
          </div>
          <div
            className="text-center pt-40"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <a href="/blogs" style={{display:"none"}} className="btn btn-secondary">
              View All
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feature_post;
