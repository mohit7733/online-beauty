import React, { useState, useEffect } from "react";
import { api } from "../base_url";
import { useNavigate } from "react-router-dom";
import pluscircle from "../../assets/images/plus-circle.svg";
import deleteicon from "../../assets/images/trash-2.svg";
import warningicon from "../../assets/images/warning2.png";
import editicon from "../../assets/images/edit (1).svg";
import { toast } from "react-toastify";

function Product_showcase(props) {
  const [theytrusted, settheytrusted] = useState([]);
  const [check, setcheck] = useState(true);
  const [deleteid, setdeleteid] = useState("");
  // console.log(theytrusted, "<<<<<<");
  const navigate = useNavigate();
  const [alertshow, setalertshow] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    if (currentPage != 1) {
      setcurrentPage(currentPage - 1);
    }
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(theytrusted?.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = theytrusted?.slice(indexOfFirstItem, indexOfLastItem);
  // console.log(currentPage ,pages ,currentItems);

  const checkSubscription = () => {
    return new Promise((resolve, reject) => {
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
      fetch(api + "/api/v1/details", requestOptions)
        .then((response) => response.json())
        .then((result) => resolve(result))
        .catch((error) => console.log("error", error));
    });
  };

  const theytrusted_data = () => {
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
    fetch(api + "/api/v1/supp_productlist", requestOptions)
      .then((response) => response.json())
      .then((result) => settheytrusted(result.data))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    if (check) {
      theytrusted_data();
      setcheck(false);
    }
  }, [check]);

  const deletedata = (id) => {
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
    fetch(api + "/api/v1/supp_productdelete?id=" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.type == "success") {
          toast.success(result?.message);
          setalertshow(false);
        }
        theytrusted_data();
      })
      .catch((error) => {
        if (error) {
          toast.error(error?.message);
        }
        console.log("error", error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);


  const user_type = localStorage.getItem("user_type")?.toLowerCase();


  return (
    <>
      {alertshow == true ? (
        <div className="alert_box">
          <div className="box_size">
            <img
              src={warningicon}
              style={{ paddingBottom: "14px" }}
              alt="warning"
            />
            <br />
            <p>Are you sure , you want to delete this product ?</p>

            <div>
              <button
                onClick={() => setalertshow(false)}
                className="btn btn-block btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => deletedata(deleteid)}
                className="btn btn-block btn-primary"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div class={(props.sidebar ? "active " : " ") + "router-body"}>
        <div class="breadcrumbs" data-aos="fade-down">
          <ul>
            <li>
              <a href="/dashboard"> Dashboard </a>
            </li>
            <li>
              <a href="#">
              {user_type == "both"
                  ? "Supplier"
                  : user_type == "buyer"
                  ? "Buyer"
                  : user_type == "supplier"
                  ? "Supplier"
                  : ""}             
              </a>
            </li>
            <li>
              <a href="#">
                <span> Product Showcase</span>
              </a>
            </li>
          </ul>
        </div>
        <div
          class="add_product_wrap row justify-content-between"
          data-aos="fade-up"
        >
          <div class="column">
            <div class="search">
              <input type="text" class="form-control" placeholder="Type here" />
            </div>
            <button type="submit" class="btn btn-block btn-secondary">
              Search
            </button>
          </div>
          <div class="column justify-end">
            {/* <!-- <button type="submit" class="btn-block btn btn-primary row align-item-center"><img src="images/plus-circle.svg" alt=""/>Add New Product</button> --> */}
            <a
              // href="/add-new-product"
              onClick={() => {
                checkSubscription().then((response) => {
                  console.log(response, "<<<<<<<," ,response?.message?.subscription_status ,                    response?.data.manage_type?.toLowerCase() == "shareduser"
                  );
                  if (response?.data?.subscription_status !== 0) {
                    navigate("/add-new-product");
                  } else if (
                    response?.message?.subscription_status != 0 &&
                    response?.data.manage_type?.toLowerCase() == "shareduser"
                  ) {
                    navigate("/add-new-product");
                  } else {
                    navigate("/company-subscription");
                  }
                });
              }}
              class="btn-block btn btn-primary row align-item-center"
            >
              <img src={pluscircle} alt="" />
              Add New Product
            </a>
            <div class="custom-select">
              <p className="sortbyclass" style={{ paddingTop: "7px" }}>
                Sorted by
              </p>
              {/* <select>
                            <option>Sorted by</option>
                        </select> */}
            </div>
          </div>
        </div>
        <div class="table_form" data-aos="fade-up">
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Full Name</th>
                <th>Short Name</th>
                {/* <th>Published</th>
                            <th>Expiry</th> */}
                <th>Category</th>
                <th>Sub-category</th>
                <th>Made In</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((data, index) => {
                if (
                  /^[\],:{}\s]*$/.test(
                    data?.sub_cat
                      .replace(/\\["\\\/bfnrtu]/g, "@")
                      .replace(
                        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                        "]"
                      )
                      .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
                  )
                ) {
                  var sub_cat = JSON.parse(data?.sub_cat);
                }

                return (
                  <tr key={index}>
                    <td>
                      <span>{index + 1}.</span>
                    </td>
                    <td>{data.product_name}</td>
                    <td>{data.product_short_name}</td>
                    <td>{data.category}</td>
                    <td>
                      {sub_cat?.map((item) => {
                        return (
                          <>
                            {item} <br />
                          </>
                        );
                      })}
                    </td>
                    {/* <td>{data.category}</td>
                                        <td>{data.sub_cat}</td> */}
                    <td>{data.made_in}</td>
                    <td className="ssetspace">
                      <img
                        class="space"
                        src={editicon}
                        alt=""
                        onClick={() => {
                          navigate("/edit-product/" + data?.id);
                        }}
                      />
                      <img
                        src={deleteicon}
                        alt=""
                        // onClick={(e) => {
                        //   setdeleteid(data.id);
                        //   setalertshow(true);
                        // }}
                        // onClick={(e) => deletedata(data.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {currentItems?.length == 0 ? (
            `You
                    don't have any products yet.`
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
        </div>
      </div>
    </>
  );
}
export default Product_showcase;
