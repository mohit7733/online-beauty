import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { api } from "../base_url";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { country } from "../dashboard/country";

function Invoicepage() {
  const componentRef = useRef();
  const { id } = useParams();
  const [billingdata, setbillingdata] = useState({});
  const [personaldata, setpersonal] = useState({});

  useEffect(() => {
    let config = {
      method: "get",
      url: api + "/api/billing-details",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response?.status == 200) {
          //   console.log(response.data);
          setbillingdata(
            response.data?.data?.filter((item) => {
              return item?.id == id;
            })[0]
          );

          setpersonal(
            JSON.parse(
              response.data?.data?.filter((item) => {
                return item?.id == id;
              })[0]?.billing_details
            )
          );
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }, []);

  let country_Name = country?.data?.filter((data) => {
    return data?.code == personaldata?.address?.country;
  })[0];
  // console.log(
  //   billingdata,
  //   country?.data?.filter((data) => {
  //     return data?.code == personaldata?.address?.country;
  //   })[0],
  //   "<<<<<<<<",
  //   personaldata
  // );

  return (
    <>
      <div className="mainDiv" ref={componentRef}>
        <table>
          <tr>
            <td>
              <table className="table_1">
                <tr>
                  <td>
                    <p>Invoice</p>
                  </td>
                  <td>
                    <p className="t-rt">Online Beauty</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table className="table_2">
                <tr>
                  <td>
                    <p>Invoice number</p>
                  </td>
                  <td>
                    <p className="m_rt">{billingdata?.invoice_number}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Date of issue</p>
                  </td>
                  <td>
                    <p className="m_rt">
                      {moment(billingdata?.date).format("MMM  DD, YYYY")}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table className="table_3">
                <tr>
                  <td>
                    <p>Bill to</p>
                    <p className="css">{personaldata?.name}</p>

                    <p>
                      {billingdata?.copy_billing_details == "1" ? (
                        <>{billingdata?.address_line} </>
                      ) : (
                        <></>
                      )}
                      {billingdata?.copy_billing_details != "1" ? (
                        <>
                          {" "}
                          {personaldata.address?.line1}{" "}
                          {", " + personaldata.address?.city + ","}{" "}
                          {personaldata.address?.postal_code}{" "}
                        </>
                      ) : (
                        ""
                      )}
                      {/* {"(" + personaldata.address?.city + ")"}{" "} */}
                    </p>
                    <p>
                      {billingdata?.copy_billing_details != "1" ? (
                        <>{country_Name?.country} </>
                      ) : (
                        ""
                      )}

                      {/* {country_Name?.country} */}
                    </p>
                    <p>
                      <a href="tel:+91 80057 00764">
                        {" "}
                        {/* {country_Name?.dial_code + "-"} */}
                         {personaldata?.phone}
                      </a>
                    </p>
                    <p>
                      <a
                        href="mailto:mohitbeniwal68@gmail.com
                            "
                      >
                        {personaldata?.email}
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table className="table_4" cellspacing="0" cellpadding="0">
                <thead>
                  <tr className="tr_1">
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Unit price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="tr_2">
                    {
                      console.log(billingdata , "<<<<<")
                    }
                    <td>
                      <p>{billingdata?.title}</p>
                      <p>
                        {billingdata?.endDate?.start_date == null ? (
                          <>
                            {moment(billingdata?.date).format("MMM  DD, YYYY")}
                          </>
                        ) : (
                          <>
                            {moment(billingdata?.endDate?.start_date).format(
                              "MMM  DD, YYYY"
                            )}
                            –{" "}
                            {moment(billingdata?.endDate?.end_date).format(
                              "MMM  DD, YYYY"
                            )}
                          </>
                        )}
                      </p>
                    </td>
                    <td>1</td>
                    <td>£{billingdata?.amount}.00</td>
                    <td>£ {billingdata?.amount}.00</td>
                  </tr>

                  <tr className="tr_2">
                    <td></td>
                    <td
                      className="css_2"
                      style={{ borderBottom: "solid 1px #000" }}
                    >
                      Subtotal
                    </td>
                    <td
                      className="css_2"
                      style={{ borderBottom: "solid 1px #000" }}
                    ></td>
                    <td
                      className="css_2"
                      style={{ borderBottom: "solid 1px #000" }}
                    >
                      £ {billingdata?.amount}.00
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="css_2">Total</td>
                    <td className="css_2"></td>
                    <td className="css_2">£ {billingdata?.amount}.00</td>
                  </tr>
                  <tr>
                    <td className="ht_60px"></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </table>
      </div>
      <ReactToPrint
        trigger={() => <button className="print_btn">Download</button>}
        content={() => componentRef.current}
      />
    </>
  );
}

export default Invoicepage;
