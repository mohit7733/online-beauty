import React, { useEffect, useState } from "react";
import { api } from "../base_url";
import { filter } from "lodash";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Favourite(props) {
  const [searchvalue, setsearchvalue] = useState("");

  const [favrite, setfavrite] = useState();
  const [pagination, setpagination] = useState(8);
  const navigate = useNavigate();

  const page = favrite?.length / 8;
  // console.log(page ,pagination ,favrite?.length);

  const handlesearch = () => {
    setfavrite(
      favrite?.filter((value) => {
        if (searchvalue === "") {
          return value;
        } else if (
          value?.category?.toLowerCase().includes(searchvalue.toLowerCase()) ||
          value?.made_in?.toLowerCase().includes(searchvalue.toLowerCase()) ||
          value?.product_name?.toLowerCase().includes(searchvalue.toLowerCase())
        ) {
          return value;
        }
      })
    );
  };

  const favurate_data = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(api + "/api/v1/favoriteslist", requestOptions)
      .then((response) => response.json())
      .then((result) => setfavrite(result?.data))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    favurate_data();
  }, []);

  const removefavorite = (product_id) => {
    var myHeaders = new Headers();
    var formvalues = new FormData();
    console.log("api hit");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    formvalues.append("product_id", product_id);

    var requestOptions = {
      method: "post",
      headers: myHeaders,
      redirect: "follow",
      body: formvalues,
    };
    fetch(api + "/api/v1/favorites", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.type == "success") {
          favurate_data();
          toast.success(result?.message);
        }
        console.log(result);
      })
      .catch((error) => {
        console.log("error", error);
        if (error) {
          toast.error(error.message);
        }
      });
  };
  console.log()

  return (
    <div className={(props.sidebar ? "active " : " ") + "router-body"}>
      <div className="breadcrumbs" data-aos="fade-down">
        <ul>
          <li>
            <a href="/dashboard">Dashboard </a>
          </li>
          <li>
            <a href="#">
              Buyer
              {/* {localStorage.getItem("user_type") == "Both" ? props.supplier  : localStorage.getItem("user_type")  }  */}
            </a>
          </li>
          <li>
            <a href="#">
              <span> My Meetings </span>
            </a>
          </li>
          <li>
            <a href="#">
              <span> Favourites List </span>
            </a>
          </li>
        </ul>
      </div>
      <h2>Favourites List</h2>
      <div className="add_product_wrap row justify-content-between">
        <div className="column">
          <div className="search">
            <input
              type="text"
              className="form-control"
              placeholder="Type here"
              onChange={(e) => {
                setsearchvalue(e.target.value);
                if (e.target.value == "") {
                  favurate_data();
                }
              }}
              onKeyPress={(e) => {
                // console.log(e.key);
                if (e.key == "Enter") {
                  handlesearch();
                }
              }}
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              if (searchvalue != "") {
                handlesearch();
              }
            }}
            className="btn btn-block btn-secondary"
          >
            Search
          </button>
          <button onClick={() => navigate('/product-view')}>
            View all products
          </button>

          {
            favrite?.length == 0 ?
              <button
                type="button"
                onClick={() => {
                  favurate_data();
                  setsearchvalue("");
                  // console.log("sdfsa clicked");

                }}
                style={{ marginLeft: "5px" }}
                className="btn btn-block btn-primary"
              >
                All Clear
              </button> : ""

          }
        </div>
      </div>
      <ol
        className="favourite_fix sub_category list grid-view-filter"
        id="product"
      >
        {favrite?.length == 0 ? (
          ""
        ) : (
          <>
            {favrite?.map((item, i) => {
              if (i < pagination) {
                return (
                  <li className="row align-items-center" key={i}>
                    <div
                      className="col_img"
                      onClick={() => {
                        navigate(
                          "/product-view/" +
                            item.product_id +
                            "/" +
                            item?.product_short_name
                              ?.replace(/\s+/g, "-")
                              .normalize("NFD")
                              .replace(/[\u0300-\u036f]/g, ""),
                          {
                            state: {
                              id: item.id,
                            },
                          }
                        );
                      }}
                      target="blank"
                    >
                      <figure style={{ cursor: "pointer" }}>
                        <img
                          src={
                            item?.mediaFiles[
                              Number(
                                item?.thumb_index == "null"
                                  ? "0"
                                  : item?.thumb_index
                              )
                            ]?.file_path
                          }
                          alt=""
                        />
                      </figure>
                    </div>
                    <div className="col_category">
                      <div className="row justify-content-between">
                        <h4
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(
                              "/product-view/" +
                                item.product_id +
                                "/" +
                                item?.product_short_name
                                  ?.replace(/\s+/g, "-")
                                  .normalize("NFD")
                                  .replace(/[\u0300-\u036f]/g, ""),
                              {
                                state: {
                                  id: item.id,
                                },
                              }
                            );

                          }}
                        >
                          {item?.product_name
                            ? item?.product_name
                            : "Sub-category"}
                        </h4>
                        <img
                          style={{ cursor: "pointer" }}
                          onClick={() => removefavorite(item.product_id)}
                          src="images/heart-icon 2.svg"
                          alt=""
                        />
                      </div>

                      <ul className="d-flex align-items-center">
                        <li>
                          <span>
                            <img src="images/Product.svg" alt="" />
                          </span>{" "}
                          {item?.category ? item?.category : "category"}
                        </li>
                        <li>
                          <span>
                            <img src="images/country.svg" alt="" />
                          </span>{" "}
                          {item?.made_in ? item?.made_in : " Product Country"}
                          {/* Product Country */}
                        </li>
                      </ul>
                    </div>
                  </li>
                );
              }
            })}
          </>
        )}
      </ol>
      {/* <div className="pagination">
        {currentItems?.length == 0 ? (
          <button className="btn " onClick={() => {
            favurate_data()
            setsearchvalue("")
          } }>
            No product found.
          </button>
        ) : (
          <ul>
            {currentPage != 1 ? (
              <li onClick={handlePrevbtn}>
                <a href="#">Previous</a>
              </li>
            ) : (
              ""
            )}
            {pages?.map((page, index) => {
              if (index > currentPage - 3 && index < currentPage + 3) {
                return (
                  <li key={index} onClick={() => setcurrentPage(page)}>
                    <a
                      className={currentPage == page ? "active" : ""}
                      style={{ cursor: "pointer" }}
                    >
                      {page}
                    </a>
                  </li>
                );
              }
            })}
            {currentItems?.length > 5 ? (
              <li className="selected" onClick={handleNextbtn}>
                <a href="#">
                  Next <img src="images/arrow-right.png" title="" alt="" />
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        )}
      </div> */}

      <div className="pagination">
        <ul style={{ marginTop: "1rem" }}>
          {favrite?.length > 0 ? (
            [
              ...Array(
                parseInt(
                  JSON.stringify(page)
                    .substr(JSON.stringify(page).lastIndexOf("\\") + 1)
                    .split(".")[1]
                )
                  ? parseInt(
                    JSON.stringify(page)
                      .substr(JSON.stringify(page).lastIndexOf("\\") + 1)
                      .split(".")[0]
                  ) + 1
                  : parseInt(
                    JSON.stringify(page)
                      .substr(JSON.stringify(page).lastIndexOf("\\") + 1)
                      .split(".")[0]
                  )
              ),
            ].map((data, i) => {
              i += 1;
              return (
                <>
                  {i == 1 ? (
                    <li
                      className={
                        pagination == i * 8
                          ? "remove_ho active"
                          : favrite?.length <= 8
                            ? "remove_ho "
                            : ""
                      }
                      onClick={(e) => {
                        if (i != pagination) {
                          console.log(i, "<<<<<<<<");
                          setpagination(i * 8)

                        } else {
                          setpagination(i * 8)
                        }

                      }}
                    >
                      <a>{i}</a>
                    </li>
                  ) : (
                    <li
                      className={pagination == i * 8 ? " active" : " "}
                      onClick={(e) => setpagination(i * 8)}
                    >
                      <a>{i}</a>
                    </li>
                  )}
                </>
              );
            })
          ) : (
            <button className="btn">No Product Found.</button>
          )}
          {pagination < favrite?.length ? (
            <li
              className="hover_remove2 selected"
              onClick={(e) => setpagination(pagination + 8)}
            >
              <a>
                Next <img src="images/arrow-right.png" title="" alt="" />
              </a>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
}
