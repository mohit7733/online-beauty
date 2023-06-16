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
import validator from "validator";
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
  const [country_name, setcountry_name] = useState("");
  const [vatError, setVatError] = useState();
  const { state } = useLocation();
  const [paymentCardData, setPaymentCardData] = useState({});
  const navigate = useNavigate();
  let billingdata = {};
  let e = true;
  const [detail_data, setdetail_data] = React.useState({
    address: {
      city: "",
      country: "",
      line1: paymentCardData?.charges?.data[0]?.billing_details?.address?.line1,
      postal_code: "",
    },
    email: paymentCardData?.charges?.data[0]?.billing_details?.email,
    name: paymentCardData?.charges?.data[0]?.billing_details?.name,
    phone: paymentCardData?.charges?.data[0]?.billing_details?.name,
  });

  const [isEmailValid, setIsEmailValid] = useState();

  const validateEmail = (email) => {
    setIsEmailValid(validator.isEmail(email.target.value));
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": true,
      "Access-Control-Allow-Credentials": true,
    },
  };
  // console.log(state, "subscriptionplan id ");
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
  useEffect(() => {
    // console.log(country_name, detail_data, props, props?.subscription_plan_id);
  }, [detail_data]);
  useEffect(() => {
    axios
      .get(`${Vat_check_api}=${vat}`)
      .then(
        (res) => {
          if (res.data.valid === true) {
            setCountryCode(res.data.country_code);
            if (coutnry_list.includes(res.data.country_code)) {
              setVatError(false);
            }
          } else {
            setVatError(true);
            e = true;
          }
        },
        [vat]
      )
      .catch((error) => {
        setVatError(true);
        e = true;
      });
  }, [vat]);

  // calculate ammount

  const calculateAmount = () => {
    let amount = props.amount;
    // Calculate the amount based on your conditions
    if (!coutnry_list.includes(detail_data.address.country)) {
      amount = texdata.filter(
        (data) => data.country === detail_data.address.country && detail_data.address.country !== "IN"
      )[0]?.percentage
        ? amount * 100 +
        ((amount *
          texdata.filter(
            (data) => data.country === detail_data.address.country
          )[0].percentage) /
          100) *
        100
        : amount * 100;
    } else if (
      vatError === false &&
      showVat === true &&
      coutnry_list.includes(detail_data.address.country)
    ) {
      amount = texdata.filter(
        (data) => data.country === detail_data.address.country
      )[0]?.percentage
        ? amount +
        ((amount *
          texdata.filter(
            (data) => data.country === detail_data.address.country
          )[0].percentage) /
          100) *
        100
        : amount * 100;
    } else {
      amount =
        (texdata.filter(
          (data) => data.country === detail_data.address.country
        )[0]
          ? amount +
          amount *
          texdata.filter(
            (data) => data.country === detail_data.address.country
          )[0].percentage
          : amount) *
        100 +
        amount * 20;
    }
    final_amount_show = amount / 100;
    return amount;
  };

  let final_amount_show = 0;
  console.log(calculateAmount(), "calculate_ammount");
  useEffect(() => {
    calculateAmount();
  }, []);
  const handleSubmit = async (event) => {
    if (isEmailValid === false) {
      window.scrollTo(0, 0);
      event.preventDefault();
    }
    if (vatError === true && showVat === true) {
      event.preventDefault();
      return;
    }
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

    //  email validation

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          `${stripe_charge}`,
          {
            amount: calculateAmount(),
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
          // console.log(response.data.payment.charges.data[0].billing_details);
          window.scrollTo(0, 0);
          if (state?.meeting_id == undefined) {
            navigate("/dashboard");
          } else {
            navigate("/confirmed-meeting/supplier");
          }
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
      address_line: billingdata?.address?.line1,
      meeting_id: state?.meeting_id,
    });

    fetch(
      `${api}/api/v1/${state?.meeting_id == undefined
        ? "addpaymentsdetail"
        : "supplier-meeting-payment"
      } `,
      {
        method: "POST",
        body: raw,
        headers: myHeaders,
        redirect: "follow",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        // toast.success("Purchase Successful");
        // setTimeout(function () { window.location.reload(false) }, 2000);
      })
      .catch((error) => console.log("error", error));
  };
  // axios.post('https://adminbm.health-and-beauty.fr/api/v1/supplier-meeting-payment')
  // let final_amount_show = 0;

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

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [detail_data]);

  useEffect(() => {
    axios
      .get(api + "/api/payment-details", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (data != null) {

          const { data } = response.data;
          const paymentJsonData = JSON.parse(data.payment_json_data);
          setPaymentCardData(paymentJsonData);
          setTimeout(() => {
            detail_data.name =
              paymentJsonData?.charges?.data[0]?.billing_details?.name;
            detail_data.email =
              paymentJsonData?.charges?.data[0]?.billing_details?.email;
            detail_data.phone =
              paymentJsonData?.charges?.data[0]?.billing_details?.phone;
            detail_data.address.city =
              paymentJsonData.charges?.data[0]?.billing_details?.address?.city;
            detail_data.address.postal_code =
              paymentJsonData.charges?.data[0]?.billing_details?.address?.postal_code;
            detail_data.address.country =
              paymentJsonData.charges?.data[0]?.billing_details?.address?.country;
            detail_data.address.line1 =
              paymentJsonData.charges?.data[0]?.billing_details?.address?.line1;
          }, 50);
          setTimeout(() => {
            setdetail_data({ ...detail_data });
          }, 150);
          setTimeout(() => {
            setdetail_data({ ...detail_data });
          }, 250);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(detail_data, country, "detaildata information", texdata);
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
                  value={detail_data?.name}
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
                  placeholder="email"
                  className="form-control"
                  style={
                    isEmailValid === false
                      ? { borderBottom: "1px solid red" }
                      : {}
                  }
                  value={detail_data?.email}
                  onChange={(e) => {
                    setdetail_data({ ...detail_data, email: e.target.value });
                    validateEmail(e);
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="address"
                  value={detail_data?.address?.line1}
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
                      value={detail_data.address.country}
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
                      <option value="" disabled>
                        Country
                      </option>
                      {country.data?.map((data, i) => {
                        return (
                          <option
                            key={i}
                            onClick={() => {
                              setdetail_data({
                                ...detail_data,
                                address: {
                                  ...detail_data.address,
                                  country: data.code,
                                },
                              });
                            }}
                            value={data.code}
                          >
                            {data.country}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="column">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="City"
                      value={detail_data?.address?.city}
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
                      value={detail_data?.address?.postal_code}
                      className="form-control"
                      onKeyPress={(e) => {
                        const pattern = /[0-9a-zA-Z]/; // Updated pattern to include numerics (0-9) and alphabets (a-z, A-Z)
                        const enteredValue = e.target.value + e.key;
                        const isAllSelected =
                          e.target.selectionStart === 0 &&
                          e.target.selectionEnd === e.target.value.length;

                        if (isAllSelected && enteredValue.length === 1) {
                          e.target.value = ""; // Clear the input field
                        } else if (isAllSelected && pattern.test(e.key)) {
                          // Remove the selected text
                          e.target.value = e.key;
                        }

                        if (!pattern.test(e.key) || enteredValue.length > 8) {
                          e.preventDefault();
                        }
                      }}
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
                      value={detail_data?.phone}
                      onKeyPress={(e) => {
                        const pattern = /[0-9]/;
                        const enteredValue = e.target.value + e.key;
                        const isAllSelected =
                          e.target.selectionStart === 0 &&
                          e.target.selectionEnd === e.target.value.length;

                        if (isAllSelected && enteredValue.length === 1) {
                          e.target.value = ""; // Clear the input field
                        } else if (isAllSelected && pattern.test(e.key)) {
                          // Remove the selected text
                          e.target.value = e.key;
                        }

                        if (!pattern.test(e.key) || enteredValue.length > 10) {
                          e.preventDefault();
                        }
                      }}
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
              <div className="form-group">
                <input
                  type="text"
                  value={" €" + props.amount}
                  className="form-control"
                  required
                  disabled={true}
                />
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
              <div className="form-group">
                <input
                  type="text"
                  value={"Final Amount :  €" + final_amount_show}
                  className="form-control"
                  required
                  disabled={true}
                />
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
