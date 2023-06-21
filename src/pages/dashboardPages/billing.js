import React, { useEffect, useState } from "react";
import Left_menu from "../productpages/left_menu";
import downloadpng from "../../assets/images/download.svg";
import axios from "axios";
import { api } from "../base_url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Billing() {
  const [sidebar, setsidebar] = useState(true);
  const [billingdata, setbillingdata] = useState([]);
  const navigate = useNavigate();
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
        console.log(response.data);
        if (response?.status == 200) {
          setbillingdata(response.data?.data);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }, []);
  console.log(billingdata , "this is billing data");

  return (
    <div className="product_showcase Billing_wrapper Meeting_wrap profile_popup">
      <div className="main">
        <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
        <div
          className={
            sidebar == true
              ? "router-body billingInners active"
              : "router-body billingInners"
          }
        >
          <div class="breadcrumbs" data-aos="fade-down">
            <ul>
              <li>
                <a href="/dashboard"> Dashboard </a>
              </li>
              <li>
                <a href="#"> My Profile</a>
              </li>
              <li>
                <a href="#">
                  <span> Administrative Informations</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span> Billing</span>
                </a>
              </li>
            </ul>
          </div>
          <h2>Billing</h2>
          <div class="table_form billingTable">
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Package</th>
                  <th>Price</th>
                  <th>Package Details</th>
                  <th>Product Name</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                {billingdata?.length == 0 ? (
                  ""
                ) : (
                  <>
                    {billingdata?.map((item, index) => {
                      console.log(JSON.parse(item?.billing_details));
                      console.log(item , "this is item")
                      return (
                        <tr key={index}>
                          <td>
                            <span>{index + 1}.</span>
                          </td>
                          <td>{item?.title}</td>
                          <td>${item?.amount}</td>
                          <td>{item?.subtitle}</td>
                          <td>{item.productName?.product_name ?? ""}</td>
                          <td>
                            <img
                              onClick={() =>
                                navigate("/billing/invoice/" + item?.id)
                              }
                              src={downloadpng}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
