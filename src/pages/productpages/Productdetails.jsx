import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { api } from "../base_url";
import Slider from "react-slick";
import ReactPlayer from "react-player";
// import ProductImage from "../../../public/images/prod-detail_1.jpg"
function Productdetails() {
  const [productData, setProductData] = useState([]);
  const [check, setcheck] = useState(true);
  const { id } = useParams();
  const { state } = useLocation();
  const slugdata = useParams();
  let token = localStorage.getItem("token");
  const path = window.location.pathname;
  console.log(token, path);
  console.log(productData);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      token !== null &&
      path.includes("/product-details") &&
      localStorage.getItem("user_type") !== "Supplier"
    ) {
      const newPath = path.replace("/product-details", "/product-view");
      navigate(newPath);
    }
  }, [token]);
  const getProductDetails = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    var requestOptions = {
      method: "GET",
      // headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      api + "/api/v1/products_details?product_id=" + slugdata?.id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setProductData(result.data))
      .catch((error) => {
        console.log("error", error);
        navigate("/notfound");
      });
  };

  useEffect(() => {
    if (check) {
      getProductDetails();
      setcheck(false);
    }
    window.scrollTo(0, 0);
  }, []);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (
    /^[\],:{}\s]*$/.test(
      productData?.sub_cat
        ?.replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    )
  ) {
    var sub_categorries = JSON.parse(productData?.sub_cat);
    console.log(sub_categorries);
  }

  let url2 = productData?.category?.replace(/\s+/g, "-");

  return (
    <>
      <div className="product_wrap">
        <div className="breadcrumbs" data-aos="fade-down">
          <div className="container">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href={`/product-view`}>Products</a>
              </li>
              <li>
                <a href={"/product-view/" + url2}>{productData?.category}</a>
              </li>
              <li>
                <a href="#">
                  <span>
                    {productData?.product_short_name
                      ? productData?.product_short_name
                      : "Product Name"}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="product_detail product_supplier">
          <div className="container">
            <div className="row">
              <div className=" col_img" data-aos="fade-right">
                <div className="slider-for">
                  {productData?.media_files ? (
                    <Slider {...settings}>
                      {productData?.media_files.media_type === "image" ? (
                        <div>
                          <figure>
                            <img
                              className="mainimg-display"
                              src={productData?.media_files.file_path}
                              alt=""
                            />
                          </figure>
                        </div>
                      ) : productData?.media_files.media_type === "doc" &&
                        productData?.media_files.file_path
                          .substr(
                            productData?.media_files.file_path.lastIndexOf(
                              "\\"
                            ) + 1
                          )
                          .split(".")[3] != "pdf" ? (
                        <div>
                          <figure>
                            <iframe
                              src={
                                "https://view.officeapps.live.com/op/embed.aspx?src=" +
                                productData?.media_files.file_path +
                                "&embedded=true"
                              }
                              style={{ height: "500px" }}
                            ></iframe>
                          </figure>
                        </div>
                      ) : productData?.media_files.file_path
                          .substr(
                            productData?.media_files.file_path.lastIndexOf(
                              "\\"
                            ) + 1
                          )
                          .split(".")[3] == "pdf" ? (
                        <div>
                          <figure>
                            <embed
                              src={
                                productData?.media_files.file_path +
                                "#toolbar=1&scrollbar=0"
                              }
                              height="500px"
                              width="100%"
                            />
                          </figure>
                        </div>
                      ) : (
                        ""
                      )}
                    </Slider>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col_textpading col_text" data-aos="fade-left">
                <div className="button">
                  <button
                    onClick={() => {
                      navigate("/product-view/" + url2);
                    }}
                    className="btn_margin thiredbtn2 btn btn-secondary"
                  >
                    {productData?.category}
                  </button>

                  {sub_categorries?.map((item) => {
                    return (
                      <button className="btn_margin thiredbtn btn btn-secondar btn-defaul">
                        {item}
                      </button>
                    );
                  })}
                </div>
                <h2>{productData?.product_short_name}</h2>
                <p>{productData?.product_dec}</p>
                {console.log(localStorage.getItem("user_type")?.toLowerCase())}

                <div
                  style={
                    localStorage.getItem("user_type")?.toLowerCase() ==
                    "supplier"
                      ? { display: "none" }
                      : {}
                  }
                  className={
                    localStorage.getItem("user_type")?.toLowerCase() ==
                    "supplier"
                      ? "button_wrapperhide"
                      : "button-wrapper style2"
                  }
                >
                  <a href="#">
                    <h3>Do you want more information?</h3>
                  </a>
                  <div className="button_row row align-items-center">
                    <a href="/login" className="btn btn-secondary">
                      Sign In
                    </a>
                    <p>Or</p>
                    <a href="/login" className="btn btn-secondary btn-default">
                      Create a new account
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="similar__product" style={{ display: "none" }}>
          <div className="container">
            <h2>Other Similar products for the same company</h2>
            <div className="row">
              <div className="grid-col" data-aos="fade-up">
                <div className="col">
                  <div className="img_box">
                    <figure
                      onClick={() => {
                        if (localStorage.getItem("token") != null) {
                          navigate("/product-before-meeting");
                        } else {
                          navigate("/product-details");
                        }
                      }}
                    >
                      <img
                        src={
                          window.location.origin + "/images/prod-detail_1.jpg"
                        }
                        alt=""
                      />
                    </figure>
                  </div>
                  <div className="text_box">
                    <h5>Sub-category</h5>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/Product (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Short Name
                    </li>
                    <li className="build-img">
                      <span>
                        <img
                          src={window.location.origin + "/images/building.svg"}
                          alt=""
                        />
                      </span>{" "}
                      Product Company
                    </li>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/country (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Country
                    </li>
                  </div>
                </div>
              </div>
              <div className="grid-col" data-aos="fade-up">
                <div className="col">
                  <div className="img_box">
                    <figure>
                      <img
                        src={
                          window.location.origin + "/images/prod-detail_2.jpg"
                        }
                        alt=""
                      />
                    </figure>
                  </div>
                  <div className="text_box">
                    <h5>Sub-category</h5>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/Product (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Short Name
                    </li>
                    <li className="build-img">
                      <span>
                        <img
                          src={window.location.origin + "/images/building.svg"}
                          alt=""
                        />
                      </span>{" "}
                      Product Company
                    </li>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/country (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Country
                    </li>
                  </div>
                </div>
              </div>
              <div className="grid-col" data-aos="fade-up">
                <div className="col">
                  <div className="img_box">
                    <figure>
                      <img
                        src={
                          window.location.origin + "/images/prod-detail_3.jpg"
                        }
                        alt=""
                      />
                    </figure>
                  </div>
                  <div className="text_box">
                    <h5>Sub-category</h5>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/Product (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Short Name
                    </li>
                    <li className="build-img">
                      <span>
                        <img
                          src={window.location.origin + "/images/building.svg"}
                          alt=""
                        />
                      </span>{" "}
                      Product Company
                    </li>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/country (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Country
                    </li>
                  </div>
                </div>
              </div>
              <div className="grid-col" data-aos="fade-up">
                <div className="col">
                  <div className="img_box">
                    <figure onClick={() => navigate("/product-before-meeting")}>
                      <img
                        src={
                          window.location.origin + "/images/prod-detail_4.jpg"
                        }
                        alt=""
                      />
                    </figure>
                  </div>
                  <div className="text_box">
                    <h5>Sub-category</h5>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/Product (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Short Name
                    </li>
                    <li className="build-img">
                      <span>
                        <img
                          src={window.location.origin + "/images/building.svg"}
                          alt=""
                        />
                      </span>{" "}
                      Product Company
                    </li>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/country (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Country
                    </li>
                  </div>
                </div>
              </div>
              <div className="grid-col" data-aos="fade-up">
                <div className="col">
                  <div className="img_box">
                    <figure>
                      <img
                        src={
                          window.location.origin + "/images/prod-detail_5.jpg"
                        }
                        alt=""
                      />
                    </figure>
                  </div>
                  <div className="text_box">
                    <h5>Sub-category</h5>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/Product (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Short Name
                    </li>
                    <li className="build-img">
                      <span>
                        <img
                          src={window.location.origin + "/images/building.svg"}
                          alt=""
                        />
                      </span>{" "}
                      Product Company
                    </li>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/country (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Country
                    </li>
                  </div>
                </div>
              </div>
              <div className="grid-col" data-aos="fade-up">
                <div className="col">
                  <div className="img_box">
                    <figure>
                      <img
                        src={
                          window.location.origin + "/images/prod-detail_6.jpg"
                        }
                        alt=""
                      />
                    </figure>
                  </div>
                  <div className="text_box">
                    <h5>Sub-category</h5>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/Product (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Short Name
                    </li>
                    <li className="build-img">
                      <span>
                        <img
                          src={window.location.origin + "/images/building.svg"}
                          alt=""
                        />
                      </span>{" "}
                      Product Company
                    </li>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/country (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Country
                    </li>
                  </div>
                </div>
              </div>
              <div className="grid-col" data-aos="fade-up">
                <div className="col">
                  <div className="img_box">
                    <figure>
                      <img
                        src={
                          window.location.origin + "/images/prod-detail_7.jpg"
                        }
                        alt=""
                      />
                    </figure>
                  </div>
                  <div className="text_box">
                    <h5>Sub-category</h5>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/Product (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Short Name
                    </li>
                    <li className="build-img">
                      <span>
                        <img
                          src={window.location.origin + "/images/building.svg"}
                          alt=""
                        />
                      </span>{" "}
                      Product Company
                    </li>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/country (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Country
                    </li>
                  </div>
                </div>
              </div>
              <div className="grid-col" data-aos="fade-up">
                <div className="col">
                  <div className="img_box">
                    <figure>
                      <img
                        src={
                          window.location.origin + "/images/prod-detail_8.jpg"
                        }
                        alt=""
                      />
                    </figure>
                  </div>
                  <div className="text_box">
                    <h5>Sub-category</h5>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/Product (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Short Name
                    </li>
                    <li className="build-img">
                      <span>
                        <img
                          src={window.location.origin + "/images/building.svg"}
                          alt=""
                        />
                      </span>{" "}
                      Product Company
                    </li>
                    <li>
                      <span>
                        <img
                          src={
                            window.location.origin + "/images/country (1).svg"
                          }
                          alt=""
                        />
                      </span>{" "}
                      Product Country
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Productdetails;
