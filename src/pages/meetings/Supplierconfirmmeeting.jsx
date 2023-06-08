import React, { useState, useEffect } from "react";
import downloadicon from "../../assets/images/download.svg";
import axios from "axios";
import { country } from "../../pages/dashboard/country";
import moment from "moment-timezone";
import { api } from "../base_url";
import { useNavigate } from "react-router-dom";
function Supplierconfirmmeeting(props) {
  const [accept, setaccept] = useState(false);
  const [meetingData, setmeetingData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(api + "/api/v1/supplier-confrm-meeting", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // Handle the response here
        console.log(response?.data?.data?.meetings);
        setmeetingData(response?.data?.data?.meetings);
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  }, []);
  const handleButtonClick = (id, event) => {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    axios
      .get(api + `/api/v1/supplier-meeting-done?meeting_id=${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // Handle successful response here
        console.log(response.data);
        // Do something with the data
      })
      .catch((error) => {
        // Handle error here
        console.error(error);
        // Display an error message or perform any necessary actions
      });
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
      meetingDateTimeStrings: [`${supplierAvailableDates[0]} ${supplierAvailableTimes[0]}`],
      supplieravailabledate:
        supplierAvailableDates.length > 0
          ? supplierAvailableDates
          : ["Not Added"],
      supplieravailabletime:
        supplierAvailableTimes.length > 0
          ? supplierAvailableTimes
          : ["Not Added"],
      supplierCityName: detail?.supplierCityName?.city_name,
      buyerCityName: detail?.buyerCityName?.city_name,
      buyerCountryCode: detail?.buyerCountryCode?.countrycode,
      supplierCountryCode: detail?.supplierCountryCode?.countrycode,
      buyer_id: detail?.buyer_id,
      buyername: detail?.buyerName?.buyername,
      countrycode:
        detail?.supplierCountryCode?.countrycode != null
          ? detail?.supplierCountryCode?.countrycode
          : "Not Added",
      meetingDates: detail?.meetDateTime?.map((date) => date.meet_date) || [
        "Not Added",
      ],
      meetingTime: detail?.meetDateTime?.map((time) => time.meet_time) || [
        "Not Added",
      ],
    };
});


  console.log(data, "this is data");
  return (
    <>
      <div className={(props.sidebar ? "active " : " ") + "router-body"}>
        <div className="breadcrumbs" data-aos="fade-down">
          <ul>
            <li>
              <a href="#"> Dashboard </a>
            </li>
            <li>
              <a href="#"> Supplier </a>
            </li>
            <li>
              <a href="#">
                <span> My Meetings</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span> Confirmed Meetings </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="add_product_wrap row justify-content-between">
          <div className="column">
            <div className="search">
              <input
                type="text"
                className="form-control"
                placeholder="Type here"
              />
            </div>
            <button type="submit" className="btn btn-block btn-secondary">
              Search
            </button>
          </div>
          <div className="column justify-end">
            <div className="custom-select">
              <select>
                <option>Sorted by</option>
              </select>
            </div>
          </div>
        </div>
        <div className="table_form">
          <table>
            <thead>
              <tr>
                <th>Buyer Name</th>
                <th>Country Codes</th>
                <th>Meeting Date</th>
                <th>
                  Meeting Time (paris)
                  {/* ({" "}
                  {meetingData[0]?.supplierCountryCode?.countrycode}) */}
                </th>
                <th>Buyer Time</th>
                <th>Buyer Profile</th>
                <th>Meeting Status</th>
                {/* <th>ICS</th> */}
              </tr>
            </thead>
            <tbody>
              {data?.map((meeting, index) => (
                <tr>
                  <td>{meeting?.buyername}</td>
                  <td>{meeting?.supplierCountryCode}</td>
                  <td>
                    {meeting?.supplieravailabledate?.map((date, index) => (
                      <div key={index}>{date}</div>
                    ))}
                  </td>

                  <td>
                    {meeting?.supplieravailabletime?.map((time, index) => {
                      const formattedTime = moment(time, "h:mm A").format(
                        "h:mm a"
                      );
                      return (
                        <div key={index}>
                          {moment(time, "h:mm A").isValid()
                            ? formattedTime
                            : time}
                        </div>
                      );
                    })}
                  </td>
                  <td>
                    {(() => {
                      const buyerCountry = country?.data?.find(
                        (c) => c?.code === meeting?.buyerCountryCode
                      );

                      const supplierCountry = country?.data?.find(
                        (c) => c.code === meeting?.supplierCountryCode
                      );

                      const buyerTimeZone = buyerCountry
                        ? buyerCountry?.continent + "/" + meeting?.buyerCityName
                        : null;
                      const supplierTimeZone = supplierCountry
                        ? supplierCountry?.continent +
                          "/" +
                          meeting?.supplierCityName
                        : null;
                      // console.log(supplierTimeZonexx`)

                      const meetingDateTimeStrings =
                        meeting?.meetingDateTimeStrings || [];

                      return meetingDateTimeStrings.map((time, index) => {
                        const buyerMeetingTime = moment.tz(
                          time,
                          "DD-MM-YYYY HH:mm",
                          buyerTimeZone
                        );
                        const timeDiffMinutes = moment
                          .tz(buyerMeetingTime, buyerTimeZone)
                          .diff(
                            moment.tz(buyerMeetingTime, supplierTimeZone),
                            "minutes"
                          );
                        const supplierMeetingTime = moment.tz(
                          buyerMeetingTime
                            .clone()
                            .add(timeDiffMinutes, "minutes"),
                          supplierTimeZone
                        );
                        const formattedSupplierMeetingTime =
                          supplierMeetingTime.format("h:mm A");
                        return (
                          <div key={index}>{formattedSupplierMeetingTime}</div>
                        );
                      });
                    })()}
                  </td>
                  <td className="roles">
                    <a
                      // href={`/buyer-profile/pending-meeting/${meeting?.buyer_id}`}
                      className="btn btn-success"
                      onClick={() => {
                        navigate(
                          `/buyer-profile/pending-meeting/${meeting?.buyer_id}`,
                          {
                            state: {
                              id: meeting?.id,
                              buyer_id: meeting?.buyer_id,
                            },
                          }
                        );
                      }}
                    >
                      View More
                    </a>
                  </td>
                  <td>
                    <div className="button_wrap row">
                      <a
                        href="#"
                        className="btn btn-secondary"
                        onClick={(event) =>
                          handleButtonClick(meeting?.id, event)
                        }
                      >
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Supplierconfirmmeeting;
