import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
import { country } from "../../pages/dashboard/country";
import { api } from "../base_url";
function Supplierpassedmeeting(props) {
  const [accept, setaccept] = useState(false);
  const [meetingData, setMeetingData] = useState([]);
  const [meetingData2, setmeetingData2] = useState([]);
  const navigate = useNavigate();
  const path = window.location.pathname;
  const [shortby, setshortby] = useState("");
  const [searchdata, setsearchdata] = useState("");

  useEffect(() => {
    setMeetingData([]);
    axios
      .get(
        api +
          "/api/v1/" +
          (path == "/passed-meeting/buyer"
            ? "buyermeetingreqlist?sortBy=" +
              shortby +
              "&buyerName=" +
              searchdata
            : "supplier-complete-meeting?sortBy=" +
              shortby +
              "&buyerName=" +
              searchdata),
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        // Handle the response here
        // console.log(response?.data?.data?.meetings);
        setMeetingData(Object.values(response?.data?.data?.meetings));
        setmeetingData2(Object.values(response?.data?.data?.meetings));
        if (shortby == "A-Z") {
          searchfilter();
        }
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  }, [shortby]);

  const searchfilter = () => {
    if (path != "/confirmed-meeting/buyer") {
      const sortedData = [...meetingData].sort((a, b) =>
        a.buyerName.buyername.localeCompare(b.buyerName.buyername)
      );
      setmeetingData(sortedData);
    } else {
      const sortedData = [...meetingData].sort((a, b) =>
        a.supplierName.supliername.localeCompare(b.supplierName.supliername)
      );
      setmeetingData(sortedData);
    }
  };
  const data = meetingData?.map((detail) => {
    const supplierAvailable = detail?.supplier_available
      ? JSON.parse(detail.supplier_available)
      : [];
    const supplierAvailableDates = supplierAvailable.map(
      (availability) => availability.date
    );
    const supplierAvailableTimes = supplierAvailable.map(
      (availability) => availability.time
    );

    return {
      id: detail?.id,
      supplier_id: detail?.supplier_id,
      status: detail?.status,
      meetingDateTimeStrings: [
        `${supplierAvailableDates[0]} ${supplierAvailableTimes[0]}`,
      ],
      supplieravailabledate:
        supplierAvailableDates.length > 0
          ? supplierAvailableDates
          : ["Not Added"],
      supplieravailabletime:
        supplierAvailableTimes.length > 0
          ? supplierAvailableTimes
          : ["Not Added"],
      supplier_Time_Zone: detail?.supplier_timezone,
      buyer_Time_Zone: detail?.buyer_timezone,
      supplierCityName: detail?.supplierCityName?.city_name,
      remarks: detail?.supplier_remark,
      buyerCityName: detail?.buyerCityName?.city_name,
      buyerStatus: detail?.buyer_status,
      buyerCountryCode:
        detail?.buyerCountryCode?.countrycode !== "undefined"
          ? detail.buyerCountryCode.countrycode
          : "",
      supplierCountryCode: detail?.supplierCountryCode?.countrycode,
      buyer_id: detail?.buyer_id,
      buyername: detail?.buyerName?.buyername,
      countrycode:
        detail?.supplierCountryCode?.countrycode != null
          ? detail?.supplierCountryCode?.countrycode
          : "Not Added",
      meetingDates: detail?.supplier_available
        ? JSON.parse(detail?.supplier_available)?.map((date) => date.date)
        : ["Not Added"],
      meetingTime: detail?.supplier_available
        ? JSON.parse(detail?.supplier_available).map((time) => time.time)
        : ["Not Added"],
      meetingTime2: detail?.buyer_availaible_timezone
        ? JSON.parse(detail?.buyer_availaible_timezone).map((time) => time)
        : ["Not Added"],
    };
  });

  const handleViewRemark = (id) => {
    navigate(`/add-remark/${id}`);
  };
  console.log(data, "this is data");
  return (
    <>
      <div class={(props.sidebar ? "active " : " ") + "router-body"}>
        <div class="breadcrumbs" data-aos="fade-down">
          <ul>
            <li>
              <a href="/dashboard"> Dashboard </a>
            </li>
            <li>
              <a href="/"> Supplier </a>
            </li>
            <li>
              <a href="/pending-meeting/supplier">
                <span> My Meetings</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span> Passed Meetings </span>
              </a>
            </li>
          </ul>
        </div>
        <div class="add_product_wrap row justify-content-between">
          <div class="column">
            <div class="search">
              <input
                type="text"
                class="form-control"
                placeholder="Type here"
                onChange={(e) => setsearchdata(e.target.value)}
              />
            </div>
            <button
              type="submit"
              class="btn btn-block btn-secondary"
              onClick={(e) => setshortby(shortby == " " ? "" : " ")}
            >
              Search
            </button>
          </div>
          <div class="column justify-end">
            <div class="custom-select">
              <select onChange={(e) => setshortby(e.target.value)}>
                <option value={""}>
                  <span>Sorted by</span>
                </option>
                <option value={"A-Z"}>Alphabetic</option>
                <option value={"DESC"}>Latest buyers</option>
              </select>
            </div>
          </div>
        </div>
        <div class="table_form">
          <table>
            <thead>
              <tr>
                <th>
                  {path == "/passed-meeting/buyer" ? "Supplier" : "Buyer"} Name
                </th>
                <th>Country Codes</th>
                <th>
                  {" "}
                  {path != "/passed-meeting/buyer"
                    ? " Buyer Date / Time"
                    : "Supplier Date / Time"}{" "}
                </th>
                <th>
                  {path == "/passed-meeting/buyer"
                    ? " Buyer Date / Time"
                    : "Supplier Date / Time"}
                  (
                  {data !== undefined
                    ? meetingData[0]?.buyerCountryCode.countrycode
                    : ""}
                  )
                  {/* ({" "}
                  {meetingData[0]?.supplierCountryCode?.countrycode}) */}
                </th>
                <th>
                  {path == "/passed-meeting/buyer" ? "Supplier" : "Buyer"}{" "}
                  Profile
                </th>
                <th>Remarks</th>
                <th>Meeting Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((meeting, index) =>
                (path === "/passed-meeting/buyer" &&
                  meeting?.buyerStatus === 2) ||
                (path === "/passed-meeting/supplier" &&
                  meeting?.status === 5) ? (
                  <tr>
                    <td>
                      {path === "/passed-meeting/buyer"
                        ? meetingData[index]?.supplierName?.suppliername
                        : meetingData[index]?.buyerName?.buyername}
                    </td>
                    <td>
                      {" "}
                      {path === "/passed-meeting/buyer"
                        ? meeting?.supplierCountryCode
                        : meeting?.buyerCountryCode}
                    </td>

                    {path === "/passed-meeting/buyer" ? (
                      <>
                        <td>
                          <div>
                            {meeting?.meetingDates?.map((date, index) => {
                              return date;
                            })}{" "}
                            {meeting?.supplieravailabletime?.map(
                              (time, index) => {
                                return time;
                              }
                            )}
                          </div>
                        </td>
                        <td>
                          {meeting?.meetingTime2.map((date, index) => {
                            return date;
                          })}
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          {meeting?.meetingTime2.map((date, index) => {
                            return date;
                          })}
                        </td>
                        <td>
                          <div>
                            {meeting?.meetingDates?.map((date, index) => {
                              return date;
                            })}{" "}
                            {meeting?.supplieravailabletime?.map(
                              (time, index) => {
                                return time;
                              }
                            )}
                          </div>
                        </td>
                      </>
                    )}

                    <td>
                      <a
                        // href={`/buyer-profile/pending-meeting/${meeting?.buyer_id}`}
                        className="btn btn-success"
                        onClick={() => {
                          path === "/passed-meeting/buyer"
                            ? navigate(
                                "/product-view/" +
                                  meetingData[index].product_id +
                                  "/" +
                                  meetingData[index]?.product_name?.replace(
                                    /\s+/g,
                                    "-"
                                  ),
                                {
                                  state: {
                                    id: data.id,
                                  },
                                }
                              )
                            : navigate(
                                `/buyer-profile/pending-meeting/${meeting?.buyer_id}`,
                                {
                                  state: {
                                    id: meeting?.id,
                                    buyer_id: meeting?.buyer_id,
                                    time: meeting?.meetingDates,
                                    date: meeting?.meetingTime,
                                    supplier_id: meeting?.supplier_id,
                                  },
                                }
                              );
                        }}
                      >
                        View More
                      </a>
                    </td>
                    <td>
                      {path !== "/passed-meeting/buyer" ? (
                        !meeting?.remarks ? (
                          <a
                            onClick={() => handleViewRemark(meeting?.id)}
                            className="btn22 btn btn-warning"
                          >
                            Add Remark
                          </a>
                        ) : (
                          <a
                            onClick={() =>
                              navigate(
                                `/view-remark/${meeting?.id}/${meeting?.id}`
                              )
                            }
                            className="btn22 btn btn-warnings"
                          >
                            View Remarks
                          </a>
                        )
                      ) : !meetingData[index]?.buyer_remark ? (
                        <a
                          onClick={() => handleViewRemark(meeting?.id)}
                          className="btn22 btn btn-warning"
                        >
                          Add Remark
                        </a>
                      ) : (
                        <a
                          onClick={() =>
                            navigate(
                              `/view-remark/${meeting?.id}/${meeting?.id}`
                            )
                          }
                          className="btn22 btn btn-warnings"
                        >
                          View Remarks
                        </a>
                      )}
                    </td>
                    <td>
                      <div className="button_wrap row">
                        <a href="" className="btn btn-secondary">
                          {meeting?.status === 4
                            ? "Supplier confirm Meeting"
                            : meeting?.status === 5
                            ? "Completed"
                            : meeting?.status === 1
                            ? "In Progress"
                            : meeting?.status === 2
                            ? "Supplier confirm Meeting. Payment Pending"
                            : meeting?.status === 3
                            ? "Refused"
                            : ""}
                        </a>
                      </div>
                    </td>
                  </tr>
                ) : (
                  ""
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Supplierpassedmeeting;

// dummy

// <tbody>
//               {data?.map((meeting, index) => (
//                 <React.Fragment key={index}>
//                   <tr>
//                     <td>Buyer Short Name</td>
//                     <td>ALB</td>
//                     <td>17/1/2023</td>
//                     <td>16h00 - 17h00</td>
//                     <td>
//                       Korean Time A <br /> Korean Time A1
//                     </td>
//                     <td>
//                       <a href="#" className="btn btn-success">
//                         View More
//                       </a>
//                     </td>
//                     <td>
//                       <a
//                         onClick={() => navigate("/view-remark/3/3")}
//                         className="btn22 btn btn-warnings"
//                       >
//                         View Remark
//                       </a>
//                     </td>
//                     <td>
//                       <div className="button_wrap row">
//                         <a href="" className="btn btn-secondary">
//                           Completed
//                         </a>
//                       </div>
//                     </td>
//                   </tr>

//                   <tr>
//                     <td>Buyer Short Name</td>
//                     <td>ASM</td>
//                     <td>13/1/2023</td>
//                     <td>9h30 - 11h30</td>
//                     <td>VN: 3pm - 5:30pm</td>
//                     <td>
//                       <a href="#" className="btn btn-success">
//                         View More
//                       </a>
//                     </td>
//                     <td>
//                       <a
//                         onClick={() => handleViewRemark(23)}
//                         className="btn22 btn btn-warning"
//                       >
//                         Add Remark
//                       </a>
//                     </td>
//                     <td>
//                       <div className="button_wrap row">
//                         <a href="" className="btn btn-secondary">
//                           Completed
//                         </a>
//                       </div>
//                     </td>
//                   </tr>
//                 </React.Fragment>
//               ))}
//             </tbody>
