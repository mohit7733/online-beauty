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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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

  const totalPages = Math.ceil(billingdata.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = billingdata.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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
                  <th>Payment Date</th>
                  <th>Invoice Number</th>
                  <th>Package Price</th>
                  <th>Package Details</th>
                  <th>Product Name</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.length == 0 ? (
                  ""
                ) : (
                  <>
                    {currentItems?.map((item, index) => {
                      const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;

                      return (
                        <tr key={index}>
                          <td>
                            <span>{serialNumber}.</span>
                          </td>
                          <td>{item?.date}</td>
                          <td>{item?.invoice_number}</td>
                          <td>€{item?.amount}</td>
                          <td>{item?.title}</td>
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
          <div className="pagination">
            {currentItems?.length === 0 ? (
              `You don't have any products yet.`
            ) : (
              <ul>
                {currentPage !== 1 && (
                  <li onClick={handlePrevBtn}>
                    <a>Previous </a>
                  </li>
                )}
                {pages?.map((page, index) => {

                  if (index > currentPage - 3 && index < currentPage + 3) {
                    return (
                      <li
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "active" : ""}
                      >
                        <a
                          style={{ cursor: "pointer" }}
                        >
                          {page}
                        </a>
                      </li>
                    );
                  }
                })}
                {currentPage !== totalPages && (
                  <li className="selected" onClick={handleNextBtn}>
                    <a >
                      Next <img src="images/arrow-right.png" title="" alt="" />
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>


        </div>
      </div>
    </div>
  );
}

export default Billing;
