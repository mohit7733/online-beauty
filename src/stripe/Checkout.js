import React, { useEffect, useState } from "react";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { country } from "../pages/dashboard/country";
import {
  api,
  stripe_charge,
  stripe_tax_rate,
  Vat_check_api,
  vat_rate_api,
} from "../pages/base_url";
import Left_menu from "../pages/productpages/left_menu";
import { useLocation, useNavigate } from "react-router-dom";

export const CheckoutForm2 = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaymentLoading, setPaymentLoading] = React.useState(false);
  const [texdata, settexdata] = React.useState([]);
  const [amount, setamount] = React.useState(props.amount);
  const [countryCode, setCountryCode] = useState();
  const [sidebar, setsidebar] = useState(true);
  const [showVat, setshowVat] = useState(false);
  const [vat, setVat] = useState("");
  const [country_name,     setcountry_name] = useState("");
  const [vatError, setVatError] = useState();
  const { state } = useLocation();
  const navigate = useNavigate();
  let billingdata = {};
  let e = true;
  const [detail_data, setdetail_data] = React.useState({
    address: {
      city: "",
      country: "US",
      line1: "",
      postal_code: "",
    },
    email: "",
    name: "",
    phone: "",
  });

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": true,
      "Access-Control-Allow-Credentials": true,
    },
  };

  let coutnry_list = [
    "DE",
    "AT",
    "BE",
    "BG",
    "CY",
    "HR",
    "DK",
    "ES",
    "EE",
    "FI",
    "GR",
    "HU",
    "IE",
    "IT",
    "LV",
    "LT",
    "LU",
    "MT",
    "NL",
    "PL",
    "PT",
    "CZ",
    "RO",
    "SK",
    "SI",
    "SE",
    "FR",
  ];
useEffect(()=>{

  console.log(country_name,detail_data, props, props);
},[detail_data])
  useEffect(() => {
    axios
      .get(`${Vat_check_api}=${vat}`)
      .then(
        (res) => {
          if (res.data.valid === true) {
            setCountryCode(res.data.country_code);
            // console.log(res.data.country_code , "siddhu")
            if (coutnry_list.includes(res.data.country_code)) {
              setVatError(false);
            }
            console.log("success");
          } else {
            console.log("failed");
            setVatError(true);
            e = true;
          }
        },
        [vat]
      )
      .catch((error) => {
        console.log("failed with catch");
        setVatError(true);
        e = true;
      });
  }, [vat]);

  const handleSubmit = async (event) => {
    if (vatError === true && showVat === true) {
      event.preventDefault();
      return;
    }
    console.log("payment happend");
    event.preventDefault();
    setPaymentLoading(true);
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
      card: cardExpiryElement,
      card: cardCvcElement,
      // card: elements.getElement(CardElement),
      billing_details: detail_data,
    });
    axios.get();

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          `${stripe_charge}`,
          {
            amount:
              // non europe country with vat or non vat number holder

              !coutnry_list.includes(detail_data.address.country)
                ? texdata.filter(
                    (data) => data.country == detail_data.address.country
                  )[0]
                  ? amount +
                    (amount *
                      texdata.filter(
                        (data) => data.country == detail_data.address.country
                      )[0].percentage) /
                      100
                  : amount
                : // europe country with vat  number holder
                vatError === false &&
                  showVat === true &&
                  coutnry_list.includes(detail_data.address.country)
                ? texdata.filter(
                    (data) => data.country == detail_data.address.country
                  )[0]
                  ? amount +
                    (amount *
                      texdata.filter(
                        (data) => data.country == detail_data.address.country
                      )[0].percentage) /
                      100
                  : amount
                : // europe country with no valid vat holder

                  (texdata.filter(
                    (data) => data.country == detail_data.address.country
                  )[0]
                    ? amount +
                      (amount *
                        texdata.filter(
                          (data) => data.country == detail_data.address.country
                        )[0].percentage) /
                        100
                    : amount) +
                  (amount * 20) / 100,
            id: id,
            currency: "EUR",
            description: "All Payments Done by " + detail_data.name,
          },
          axiosConfig
        );
        if (response.data.success) {
          billingdata = response.data.payment.charges.data[0].billing_details;
          purchase(response.data.payment);
          toast.success("Payment Successful!");
          window.scrollTo(0, 0);
          navigate("/add-new-product");
        } else {
          toast.error("Payment Failed!");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error(error.message);
    }

    setPaymentLoading(false);
  };
  // function handleVatChange(event) {
  //   setVat(event.target.value);
  //   console.log(event.target.value);
  // }

  // console.log(detail_data.address.country , "hey budy")
  const purchase = (data) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "onlinebeauty_session=" + localStorage.getItem("token")
    );

    var raw = JSON.stringify({
      plan_type: props.plan,
      payment_status: data?.status,
      billing_details: billingdata,
      payment_id: data?.id,
      amount: data?.amount,
      payment_json_data: data,
      subscription_plan_id: state.subscription_plan_id,
      address_line :billingdata?.address?.line1
    });

    fetch(`${api}/api/v1/addpaymentsdetail`, {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
    })
      .then((res) => res.json())
      .then((result) => {
        // toast.success("Purchase Successful");
        // setTimeout(function () { window.location.reload(false) }, 2000);
      })
      .catch((error) => console.log("error", error));
  };

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

  useEffect(() => {
    fetch(`${stripe_tax_rate}`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer sk_test_51MYmQELa6FsGayAC9LmXsHYeT4qRKmZQThSrWsnZo4duI2lC0ZBaiuCusMA4xInrQ6JZpbQdH5rBw89Kexs2bMfV00TRx3nf1W",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        settexdata(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      <div className="Payment_form_Wrapper Meeting_wrap profile_popup">
        <div className="main">
          <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
          <div className={sidebar ? "active router-body" : "router-body"}>
            <div
              className="breadcrumbs aos-init aos-animate"
              data-aos="fade-down"
            >
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
                        console.log(response, "<<<<<<<,");
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
                    <span onClick={() => navigate("/company-subscription")}>
                      {" "}
                      Payment{" "}
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span> Payment Form </span>
                  </a>
                </li>
              </ul>
            </div>
            <h2>Payment Form</h2>
            <form className="payment_form_wrap" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  name=""
                  onChange={(e) =>
                    setdetail_data({ ...detail_data, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="form-control"
                  onChange={(e) =>
                    setdetail_data({ ...detail_data, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Address"
                  className="form-control"
                  onChange={(e) =>
                    setdetail_data({
                      ...detail_data,
                      address: {
                        ...detail_data.address,
                        line1: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
              <div className="row justify-content-between">
                <div className="column pd-b">
                  <div className="custom-select">
                    <select
                      onChange={(e) =>
                        setdetail_data({
                          ...detail_data,
                          address: {
                            ...detail_data.address,
                            country: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="" disabled selected>
                        Country
                      </option>
                      {country.data?.map((data, i) => {
                        return (
                          <option key={i} onClick={()=>{
                            setcountry_name( data.country )
                          }} value={data.code}>{data.country}</option>
                        );
                      })}{" "}
                    </select>
                  </div>
                </div>
                <div className="column">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                      onChange={(e) =>
                        setdetail_data({
                          ...detail_data,
                          address: {
                            ...detail_data.address,
                            city: e.target.value,
                          },
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="column">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="form-control"
                      onChange={(e) =>
                        setdetail_data({
                          ...detail_data,
                          address: {
                            ...detail_data.address,
                            postal_code: e.target.value,
                          },
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="column">
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="form-control"
                      onChange={(e) =>
                        setdetail_data({
                          ...detail_data,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                {/* <input
                  type="text"
                  placeholder="Card Number"
                  className="form-control"
                />
                            <CardNumberElement className="form-control payformd" /> */}
                <div className="paddCss" style={{ padding: "6px 10px 0" }}>
                  <label>
                    <strong>Card Number</strong>
                  </label>
                </div>
                <div
                  className="col-sm-12 paddCss"
                  style={{ padding: "6px 10px " }}
                >
                  <CardNumberElement className="form-control payformd" />
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="column">
                  <div className="form-group">
                    {/* <input
                      type="text"
                      placeholder="Expiry Date"
                      className="form-control"
                    /> */}
                    <div
                      className="col-sm-12 paddCss"
                      style={{ padding: "6px 10px 0" }}
                    >
                      <label>
                        <strong>Expiry</strong>
                      </label>
                    </div>
                    <div
                      className="col-sm-12 paddCss"
                      style={{ padding: "6px 10px" }}
                    >
                      <CardExpiryElement className="form-control payformd" />
                    </div>
                  </div>
                </div>
                <div className="column">
                  {/* <!-- <select>
                        </select> --> */}
                  {/* <input
                    type="text"
                    placeholder="CVV"
                    className="form-control"
                  /> */}
                  <div
                    className="col-sm-12 paddCss"
                    style={{ padding: "6px 10px 0" }}
                  >
                    <label>
                      <strong>CVV</strong>
                    </label>
                  </div>
                  <div
                    className="col-sm-12 paddCss"
                    style={{ padding: "6px 10px" }}
                  >
                    <CardCvcElement className="form-control payformd" />
                  </div>
                </div>
              </div>
              <div className="radio_btn row">
                <p>Do you have VAT number?</p>
                <div className="row align-items-center">
                  <input
                    type="radio"
                    id="buyer"
                    name="fav_language"
                    value="A buyer"
                    // checked=""
                    onChange={(e) => {
                      setshowVat(true);
                      // console.log(e);
                    }}
                  />
                  <label for="buyer" className="">
                    Yes
                  </label>
                </div>
                <div className="row mb-l align-items-center">
                  <input
                    type="radio"
                    id="supplier"
                    name="fav_language"
                    value="A supplier"
                    onChange={(e) => {
                      setshowVat(false);
                      // console.log(e);
                    }}
                  />
                  <label for="A supplier" className="removeClass">
                    No
                  </label>
                </div>

                <h6>
                  (-*VAT, EU without a valid VAT to pay 20% while non-EU and EU
                  with a valid VAT are exempted.)
                </h6>
              </div>
              <div
                className="form-group toggle-form-box"
                style={showVat ? {} : { display: "none" }}
              >
                <input
                  type="text"
                  placeholder="VAT Number"
                  className="form-control"
                  onChange={(event) => setVat(event.target.value)}
                />
                {vatError === true && vat === "" ? (
                  <h6 style={{ color: "red" }}>Text Field Must Be not empty</h6>
                ) : (
                  ""
                )}
                {(vatError === true && vat !== "") ||
                (countryCode !== detail_data.address.country && vat !== "") ? (
                  <h6 style={{ color: "red" }}>Vat Number is Not Valid</h6>
                ) : (
                  ""
                )}
              </div>

              <div className="button row justify-content-center">
                <button
                  className="btn btn-secondary pay-butto"
                  disabled={isPaymentLoading}
                >
                  {isPaymentLoading ? "Loading..." : "Pay"}
                </button>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "5rem" }}
                  onClick={() => navigate("/company-subscription")}
                >
                  Cancel
                </button>
                {/* <a href="#" className="btn btn-secondary">
                  Pay
                </a> */}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="row col-sm-12 card carddetail"
        style={{ display: "none" }}
      >
        <div className="col-sm-12 ">
          <div className="col-sm-12 paddCss" style={{ padding: "6px 10px 0" }}>
            {/* <<<<<<< HEAD */}
            {/* ======= */}
            <label>
              <strong>Subscription Plan :</strong> {props.plan}
            </label>
          </div>
          <div className="col-sm-12 paddCss" style={{ padding: "6px 10px 0" }}>
            {/* >>>>>>> fcff1acc5148440602396167bbe747bb33dfb4f9 */}
            <label>
              <strong>Subtotal :</strong> €{amount}
            </label>
          </div>
          <div className="col-sm-12 paddCss" style={{ padding: "6px 10px 0" }}>
            <label>
              <strong>
                Tax{" "}
                {texdata.filter(
                  (data) => data.country == detail_data.address.country
                )[0]
                  ? texdata.filter(
                      (data) => data.country == detail_data.address.country
                    )[0].percentage
                  : 0}
                % (inclusive) :
              </strong>{" "}
              {texdata.filter(
                (data) => data.country == detail_data.address.country
              )[0]
                ? "€" +
                  (amount *
                    texdata.filter(
                      (data) => data.country == detail_data.address.country
                    )[0].percentage) /
                    100
                : "€" + 0}
            </label>
          </div>
          <div className="col-sm-12 paddCss" style={{ padding: "6px 10px 0" }}>
            <label>
              <strong>Total :</strong>{" "}
              {texdata.filter(
                (data) => data.country == detail_data.address.country
              )[0]
                ? "€" +
                  (amount +
                    (amount *
                      texdata.filter(
                        (data) => data.country == detail_data.address.country
                      )[0].percentage) /
                      100)
                : "€" + amount}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
