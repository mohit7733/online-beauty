import React, { useEffect, useRef, useState } from "react";
import { api } from "./base_url";
import moment from "moment";
import ReactPlayer from "react-player";
import axios from "axios";

function Our_videos() {
  const [theytrusted, settheytrusted] = useState([]);

  const [VideoCat, setVideoCat] = useState([]);
  const [cateValue, setcateValue] = useState("");
  const [keywords, setkeywords] = useState("");

  const [btnhide, setbtnhide] = useState(false);
  const [btnhide2, setbtnhide2] = useState(false);
  const [btnhide3, setbtnhide3] = useState(false);
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
    fetch(
      api + `/api/videos?keywords=${keywords}&cat_id=${cateValue}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => settheytrusted(result.data.videos))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    if (check) {
      theytrusted_data();
      setcheck(false);
    }
  }, [check]);

  useEffect(()=>{
    theytrusted_data();
  },[cateValue])
  const videoRef = useRef(null);
  const videoRef3 = useRef(null);

  const videoplayhandle = () => {
    videoRef.current.play();
    setbtnhide(true);
    setbtnhide2(true);
    setbtnhide3(true);
  };
  const videoplayhandle3 = () => {
    videoRef3.current.play();
    setbtnhide3(true);
  };

  // const handleSearchvideo = (e) => {
  // };

  const searchvideo =()=>{
    setkeywords(keywords)
    theytrusted_data();
    console.log(keywords);
  }
  const getCategory = async () => {
    await axios
      .get(api + "/api/videoCategory")
      .then((res) => {
        setVideoCat(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <div className="breadcrumbs" data-aos="fade-down">
        <div className="container" >
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#">
                <span>Our Videos</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="video-head">
        <div className="container">
          <h1 data-aos="fade-up">Our Videos</h1>
          <div className="filter-section">
            <div
              className="row justify-content-between align-items-center"
              data-aos="fade-up"
            >
              <div className="left">
                <div className="search">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type here keywords"
                    onChange={(e)=>setkeywords(e.target.value)}
                  />
                  <button type="button" onClick={()=>searchvideo()} className="btn_set btn btn-secondary">
                    Search
                  </button>
                </div>
              </div>
              <div className="right d-flex">
                <div className="column">
                  <div className="custom-select">
                    <select
                      value={cateValue}
                      onChange={(e) => {
                        setcateValue(e.target.value);
                      }}
                    >
                      <option value="">Category</option>
                      {VideoCat?.map((data, index) => {
                        return (
                          <option key={index} value={data?.id}>
                            {data?.cat_name}
                          </option>
                        );
                      })}
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
      </div>
      <div className="video-section">
        <div className="container">
          {theytrusted?.length == 0 ? (
            ""
          ) : (
            <div className="row grid-2 columesetClass">
              <div className="grid-col" data-aos="fade-right">
                <div className="column">
                  <div className="img">
                    {theytrusted[0]?.yt_link != null ? (
                      <figure width="100%" height="100%">
                        <ReactPlayer
                          url={theytrusted[0]?.yt_link}
                          width={"auto"}
                          height={"295px"}
                        />
                      </figure>
                    ) : (
                      <>
                        <video
                          width="100%"
                          height="100%"
                          ref={videoRef}
                          controls
                          loop
                        >
                          <source
                            src={
                              api +
                              "/assets/images/contentfeed/" +
                              theytrusted[0]?.video
                            }
                            type="video/mp4"
                          />
                          <source
                            src={
                              api +
                              "/assets/images/contentfeed/" +
                              theytrusted[0]?.video
                            }
                            type="video/ogg"
                          ></source>
                        </video>
                      </>
                    )}
                    <a href="#">
                      <h6>
                        {theytrusted[0]?.categoryName
                          ? theytrusted[0]?.categoryName
                          : "Beauty & Spa"}
                        {/* Beauty & Spa */}
                      </h6>
                    </a>
                    {theytrusted[0]?.yt_link == "" ? (
                      <>
                        {btnhide2 == true ? (
                          ""
                        ) : (
                          <span
                            onClick={videoplayhandle}
                            className="btn-video"
                          ></span>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="text">
                    <h4>
                      {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry */}
                      {theytrusted[0]?.description
                        ? theytrusted[0]?.description
                        : ""}
                    </h4>
                    <div className="d-flex justify-content-between align-items-center">
                      <p>
                        {/* Oct 25, 2022 */}
                        {moment(theytrusted[0]?.created_at).format(
                          "MMM  DD, YYYY"
                        )}
                      </p>
                      <a href="#">
                        <img src="images/icon-o-share.svg" title="" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {theytrusted[1] ? (
                <div className="grid-col" data-aos="fade-left">
                  <div className="column">
                    <div className="img">
                      {theytrusted[1]?.yt_link != null ? (
                        <figure width="100%" height="100%">
                          <ReactPlayer
                            url={theytrusted[1]?.yt_link}
                            width={"auto"}
                            height={"295px"}
                          />
                        </figure>
                      ) : (
                        <>
                          <video
                            width="100%"
                            height="100%"
                            className="setvideoheight"
                            controls
                            loop
                            ref={videoRef}
                          >
                            <source
                              src={
                                api +
                                "/assets/images/contentfeed/" +
                                theytrusted[1]?.video
                              }
                              type="video/mp4"
                            />
                            <source
                              src={
                                api +
                                "/assets/images/contentfeed/" +
                                theytrusted[1]?.video
                              }
                              type="video/ogg"
                            ></source>
                          </video>
                        </>
                      )}
                      <a href="#">
                        <h6>
                          {theytrusted[1]?.categoryName
                            ? theytrusted[1]?.categoryName
                            : "Beauty & Spa"}
                          {/* Beauty & Spa */}
                        </h6>
                      </a>
                      {theytrusted[1]?.yt_link == null ? (
                        <>
                          {btnhide == true ? (
                            ""
                          ) : (
                            <span
                              onClick={videoplayhandle}
                              className="btn-video"
                            ></span>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="text">
                      <h4>
                        {theytrusted[1]?.description
                          ? theytrusted[1]?.description
                          : ""}
                      </h4>
                      <div className="d-flex justify-content-between align-items-center">
                        <p>
                          {/* Oct 25, 2022 */}
                          {moment(theytrusted[1]?.created_at).format(
                            "MMM  DD, YYYY"
                          )}
                        </p>
                        <a href="#">
                          <img src="images/icon-o-share.svg" title="" alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          )}

          {theytrusted?.length > 1 ? (
            <div className="row grid-3 ">
              {theytrusted
                ?.slice(2, theytrusted?.length)
                ?.map((data, index) => {
                  return (
                    <div className="grid-col " data-aos="fade-up">
                      <div className="column">
                        <div className="img">
                          {data?.yt_link != null ? (
                            <figure width="100%" height="100%">
                              <ReactPlayer
                                url={data?.yt_link}
                                width={"auto"}
                                height={"190px"}
                              />
                            </figure>
                          ) : (
                            <video
                              width="100%"
                              height="100%"
                              ref={videoRef3}
                              controls
                              loop
                            >
                              <source
                                src={
                                  api +
                                  "/assets/images/contentfeed/" +
                                  data?.video
                                }
                                type="video/mp4"
                              />
                              <source
                                src={
                                  api +
                                  "/assets/images/contentfeed/" +
                                  data?.video
                                }
                                type="video/ogg"
                              ></source>
                            </video>
                          )}
                          <a href="#">
                            <h6>{data?.categoryName}</h6>
                          </a>
                          {data?.yt_link == null ? (
                            <>
                              {btnhide3 == true ? (
                                ""
                              ) : (
                                <span
                                  onClick={videoplayhandle3}
                                  className="btn-video"
                                ></span>
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="text">
                          <h4>{data?.description}</h4>
                          <div className="d-flex justify-content-between align-items-center">
                            <p>
                              {month[new Date(data?.created_at).getMonth()] +
                                " " +
                                new Date(data?.created_at).getDate()}
                              , {new Date(data?.created_at).getFullYear()}
                            </p>
                            <a href="#">
                              <img
                                src="images/icon-o-share.svg"
                                title=""
                                alt=""
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Our_videos;
