import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../base_url";
import { toast } from "react-toastify";

export default function Subscriptions(props) {
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();


  const getSubscriptions = () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(api + "/api/subscription", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data[0].type, "tan");

        const meetingSubscriptions = result.data.filter(
          (subscription) => subscription.type === "Product"
        );

        setSubscriptions(meetingSubscriptions);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getSubscriptions();
  }, []);



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
        .then((result) => resolve(result.data))
        .catch((error) => console.log("error", error));
    });
  };

  console.log(subscriptions);

  return (
    <div className={props.sidebar ? "router-body active " : "router-body"}>
      <div className="breadcrumbs aos-init aos-animate" data-aos="fade-down">
        <ul>
          <li>
            <a href="/dashboard">Dashboard </a>
          </li>
          <li>
            <a href="#">Supplier </a>
          </li>
          <li>
            <a href="/supplier-product-showcase">
              <span> Product Showcase </span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                checkSubscription().then((response) => {
                  // console.log(response, "<<<<<<<,");
                  if (response.subscription_status !== 0) {
                    navigate("/add-new-product");
                  } else {
                    navigate("/company-subscription");
                  }
                });
              }}
            >
              <span> Add New Product </span>
            </a>
          </li>
          <li>
            <a href="#">
              <span> Payment </span>
            </a>
          </li>
        </ul>
      </div>
      <h2>Payment</h2>
      <p style={{ lineHeight: "normal" }}>
        We warmly thank you for your trust.
        <span style={{ display: "block" }}>To go ahead and discover more about our coming steps write us at {"   "}
          <a style={{ paddingLeft: "4px", color: "#19a0dd" }} href="mailto:contact@beauty-meetings">
            {"   "} contact@beauty-meetings.
          </a></span>
      </p>
      <br />
      <br />
      <div className="payment_wrapper row justify-content-center">
        {subscriptions?.map((item) => {
          console.log(item);
          return (
            <>
              {item?.title?.toLowerCase() == "monthly" ? (
                <div className="column">
                  <div className="button">Monthly</div>
                  <p>
                    <span>{item?.subtitle}</span>
                  </p>
                  <h3>{" €" + item?.price}</h3>
                  <p>{item?.title}</p>
                  <button
                    className="btn11 btn btn-secondary"
                    style={{ background: "#9f9f9f", color: "white", lineHeight: "40px", minWidth: "200px" }}
                  // onClick={() => {
                  //   if (
                  //     localStorage.getItem("manage_type").toLowerCase() ==
                  //     "superadmin"
                  //   ) {
                  //     navigate("/payment", {
                  //       state: {
                  //         amount: parseInt(item?.price),
                  //         plan: item?.days,
                  //         subscription_plan_id : item?.id

                  //       },
                  //     });
                  //   } else {
                  //     toast.error("Only superadmin can do the payments !");
                  //   }
                  // }}
                  >
                    Continue
                  </button>
                </div>
              ) : item?.title?.toLowerCase() == "yearly" ? (
                <div className="column col_right">
                  <div className="button">Yearly</div>
                  <p>{item?.subtitle}</p>
                  <h3>{" €" + item?.price}</h3>
                  <p>
                    <span>{item?.title}</span>
                  </p>
                  <button
                    className="btn11 btn btn-primary"
                    style={{ background: "#9f9f9f", color: "white", lineHeight: "40px", minWidth: "200px" }}
                  // onClick={() => {
                  //   console.log(item?.id , "subscription plan id ")
                  //   if (
                  //     localStorage.getItem("manage_type").toLowerCase() ===
                  //     "superadmin"
                  //   ) {
                  //     navigate("/payment", {
                  //       state: {
                  //         amount: parseInt(item?.price),
                  //         plan: item?.days,
                  //         subscription_plan_id : item?.id

                  //       },
                  //     });
                  //   } else {
                  //     toast.error("Only superadmin can do the payments !");
                  //   }
                  // }}
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <div className="column col_right">
                  <div className="button">{item?.title}</div>
                  <p>{item?.subtitle}</p>
                  <h3>{" €" + item?.price}</h3>
                  <p>
                    <span>{item?.title}</span>
                  </p>
                  <button
                    className="btn11 btn btn-primary"
                    style={{ background: "#9f9f9f", color: "white", lineHeight: "40px", minWidth: "200px" }}
                  // onClick={() => {
                  //   if (
                  //     localStorage.getItem("manage_type").toLowerCase() ===
                  //     "superadmin"
                  //   ) {
                  //     navigate("/payment", {
                  //       state: {
                  //         amount: parseInt(item?.price),
                  //         plan: item?.days,
                  //         subscription_plan_id : item?.id
                  //       },
                  //     });
                  //   } else {
                  //     toast.error("Only superadmin can do the payments !");
                  //   }
                  // }}
                  >
                    Continue
                  </button>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
