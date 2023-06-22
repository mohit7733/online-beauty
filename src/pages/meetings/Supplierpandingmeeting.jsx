import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import editicon from "../../assets/images/edit (1).svg";
// modal view import
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../base_url";
import { country } from "../../pages/dashboard/country";
import Modal from "../../components/modal";
import DatePicker from "../../components/datepicker";
import Timepicker from "../../components/timepicker";
import moment from "moment-timezone";
import momenttime from "moment";
import deleteicon from "../../assets/images/delete3.png";
import AcceptMeeting from "./AcceptMeeting";
// import { countryContinent } from "country-continents";
function Supplierpandingmeeting(props) {
  const [accept, setaccept] = useState(false);
  const [disabledState, setDisabledState] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [sDate, setSdate] = useState("");
  const [sTime, setSTime] = useState("");
  const [showTP, setShowTP] = useState();
  const [slots, setSlots] = useState([]);
  const [apiDateFormat, setApiDateFormat] = useState("");
  const [meetingDetails, setmeetingDetails] = useState([]);
  const [meetingDetails2, setmeetingDetails2] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [supplierTime, setSupplierTime] = useState([]);
  const [click, setclick] = useState(false);
  const [meetingAccept, setAcceptMeeting] = useState([]);
  const [acceptdate, setacceptDates] = useState([]);
  const [accepttime, setacceptTime] = useState([]);
  const [acceptId, setacceptId] = useState();
  const [shortby, setshortby] = useState("");
  const [searchdata, setsearchdata] = useState("");
  const [notavailable, setnotavailable] = useState([]);
  const path = window.location.pathname;

  // let acceptId = 0
  function showTimePicker(value) {
    if (slots.length >= 5) {
      toast.error("You can't select more than 5 availabilities");
    } else {
      const dm = moment(value).format("MMM D");
      setApiDateFormat(moment(value).format("DD-MM-YYYY"));
      setShowTP(true);
      setSdate(dm);
    }
  }
  const navigate = useNavigate();
  // fetching the data
  const removeSlot = (item) => {
    console.log("clicked happend");
    const index = slots.findIndex((slot) => slot.id === item.id);
    if (index !== -1) {
      const newSlots = [...slots];
      newSlots.splice(index, 1);
      setSlots(newSlots);
    }
  };

  const confirmSlots = () => {
    if (slots.length >= 5) {
      toast.error("you can't select more than 5 availabilites ");
      setTimeout(() => {
        setSdate("");
        setSTime("");
      }, 2000);
    } else {
      const mergedSlots = [
        ...slots,
        { sDate: sDate, sTime: sTime, apiDate: apiDateFormat },
      ];

      setSupplierTime((prevState) => {
        const updatedAvailability = [...prevState[0].availability];
        if (updatedAvailability.length < 5) {
          updatedAvailability.push({
            date: momenttime(sDate, "MMM DD").format("YYYY-MM-DD"),
            time: sTime,
          });
        }

        return [
          {
            type: 1,
            supplier_id: prevState[0].supplier_id,
            availability: updatedAvailability,
          },
        ];
      });

      setSlots(mergedSlots);
      setSdate("");
      setSTime("");
      setApiDateFormat("");
    }
  };

  console.log(slots.length);

  useEffect(() => {
    if (slots.length >= 5) {
      setDisabledState(true);
      setSdate("");
      setSTime("");
      console.log("now you are not able to click");
    }
  }, [slots]);
  // get meeting subscription details
  const [subscriptions, setSubscriptions] = useState([]);
  const getSubscriptions = () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${api}/api/meetingsubscription`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data[0].type, "tan");

        const meetingSubscriptions = result.data.filter(
          (subscription) => subscription.type === "Meeting"
        );

        setSubscriptions(meetingSubscriptions);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  console.log(
    {
      amount: subscriptions[0]?.price,
      plan: subscriptions[0]?.days,
      subscription_plan_id: subscriptions[0]?.id,
    },
    "subscriptions"
  );
  React.useEffect(() => {
    setmeetingDetails([]);
    axios
      .get(
        `${api}/api/v1/${
          path.includes("/pending-meeting/supplier")
            ? "suppliermeetingreqlist"
            : "suppliermeetingreqlist"
        }?sortBy=${shortby}&buyerName=${searchdata}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data?.data);
          setmeetingDetails2(Object.values(res.data?.data.meetings));
          setmeetingDetails(Object.values(res.data?.data.meetings));
          if (shortby == "A-Z") {
            searchfilter();
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [shortby]);
  console.log("clicked");

  const searchfilter = () => {
    const sortedData = [...meetingDetails2].sort((a, b) =>
      a.buyerName.buyername.localeCompare(b.buyerName.buyername)
    );
    setmeetingDetails(sortedData);
  };

  useEffect(() => {
    supplierTime.length > 0 &&
      axios
        .post(api + "/api/v1/supplier-meeting-avaiblity", supplierTime, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          toast.success("Availability added successfully");
          console.log(response);
        })
        .catch((error) => {
          toast.error("Something Went Wrong !");
          // handle error
        });
  }, [click]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);
  const [showModal, setShowModal] = useState(false);

  const handleAcceptClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (deleteId) {
      axios
        .get(`${api}/api/v1/supplier-meeting-refused?meeting_id=${deleteId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error); // Handle any errors
        });
    }
  }, [deleteId]);
  const getContinent = async (countryName) => {
    const response = await axios.get(
      `https://restcountries.com/v3/name/${countryName}`
    );
    const ans = response.data[0].region;
    return ans;
  };

  const data = meetingDetails?.map((detail) => {
    const buyertimeDate = detail?.meetDateTime.map((meet) => {
      return `${meet.meet_date} ${meet.meet_time}`;
    });

    const suppliertimeDate = detail?.meetDateTime.map((meet) => {
      return `${meet.supplier_timezone_date} ${meet.supplier_timezone_time}`;
    });
    const buyerslots = detail?.buyerSlot.flatMap((slot) => {
      const slotData = JSON.parse(slot.supplier_available);
      return slotData.map((data) => `${data.date} ${data.time}`);
    });

    return {
      id: detail?.id,
      supplier_id: detail?.supplier_id,
      status: detail?.status,
      supplier_Time_Zone: detail?.supplier_timezone,
      buyer_Time_Zone: detail?.buyer_timezone,
      supplierCityName: detail?.supplierCityName?.city_name,
      buyerCityName: detail?.buyerCityName?.city_name,
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
          : "",
      buyertimeDate,
      suppliertimeDate,
      buyerslots,
    };
  });
  console.log(data, "buyerslot");

  // accept meeting functionality
  const clickedAccept = () => {
    axios
      .post(api + "/api/v1/supplier-meeting-avaiblity", meetingAccept, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/payment", {
          state: {
            meeting_id: acceptId,
            amount: subscriptions[0]?.price,
            plan: subscriptions[0]?.days,
            subscription_plan_id: subscriptions[0]?.id,
          },
        });
      })
      .catch((error) => {
        // Handle error
      });
  };
  // console.log(meetingAccept, "acceptmeeting");
  // console.log(meetingDetails);
  return (
    <>
      <div class={(props.sidebar ? "active " : " ") + "router-body"}>
        <div class="breadcrumbs" data-aos="fade-down">
          <ul>
            <li>
              <a href="/dashboard"> Dashboard </a>
            </li>
            <li>
              <a href="#"> Supplier </a>
            </li>
            <li>
              <a href="/pending-meeting/supplier">
                <span> My Meetings</span>
              </a>
            </li>
            <li>
              <a href="/pending-meeting/supplier">
                <span> Pending Meetings </span>
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
                <th>Supplier Date / Time</th>
                <th>
                  Buyer Date / Time (
                  {data !== undefined
                    ? meetingDetails[0]?.buyerCountryCode.countrycode
                    : ""}
                  )
                  {/* ({" "}
                  {meetingData[0]?.supplierCountryCode?.countrycode}) */}
                </th>
                <th>
                  {path == "/passed-meeting/buyer" ? "Supplier" : "Buyer"}{" "}
                  Profile
                </th>
                {/* <th>Meeting Status</th> */}
                <th>Meeting status</th>
                <th>Edit Avaibility</th>
              </tr>
            </thead>

            <tbody>
              {data.map((meeting, index) => (
                <tr key={index}>
                  <td>{meeting?.buyername}</td>
                  <td>{meeting?.buyerCountryCode}</td>

                  <td>
                    <div>
                      {meeting?.suppliertimeDate?.map((date, index) => (
                        <div key={index}>{date}</div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div>
                      {meeting?.buyertimeDate?.map((date, index) => (
                        <div key={index}>{date}</div>
                      ))}
                    </div>
                  </td>

                  <td class="roles">
                    <a
                      // href={`/buyer-profile/pending-meeting/${meeting?.buyer_id}`}
                      class="btn btn-success"
                      onClick={() => {
                        navigate(
                          `/buyer-profile/pending-meeting/${meeting?.buyer_id}`,
                          {
                            state: {
                              id: meeting?.id,
                              buyer_id: meeting?.buyer_id,
                              time: meeting?.suppliertimeDate,
                              date: meeting?.suppliertimeDate,
                              supplier_id: meeting?.supplier_id,
                              meeting_id: meeting?.id,
                              amount: subscriptions[0]?.price,
                              plan: subscriptions[0]?.days,
                              subscription_plan_id: subscriptions[0]?.id,
                            },
                          }
                        );
                      }}
                    >
                      View More
                    </a>
                  </td>
                  <td>
                    <div class="button_wrap row">
                      <a
                        onClick={(e) => {
                          console.log(meeting.id);
                          setDeleteId(meeting.id);
                        }}
                        className="btn btn-primary"
                        style={{
                          display:
                            meeting?.status === 3 ? "none" : "inline-block",
                        }}
                      >
                        Refuse
                      </a>

                      {accept == true ? (
                        <a class="btn btn-secondary">Payment Pending</a>
                      ) : (
                        <div>
                          <a
                            className="btn btn-secondary"
                            onClick={() => {
                              if (
                                meeting?.status === 1 ||
                                meeting?.status === 2
                              ) {
                                handleAcceptClick(meeting?.id);
                                setacceptTime(meeting?.suppliertimeDate);
                                setnotavailable(meeting?.buyerslots);
                                console.log(
                                  meeting.suppliertimeDate,
                                  "id select"
                                );
                                // setacceptDates(meeting?.meetingDates);
                                // handlebuttonacceptclick(meeting?.id , meeting?.suppliertimeDate , meeting?.buyertimeDate)
                                setacceptId(meeting?.id);
                              }
                              // else if (meeting?.status === 2) {
                              //   // Direct navigation to '/payment's
                              //   navigate("/payment", {
                              //     state: {
                              //       meeting_id: meeting?.id,
                              //       amount: subscriptions[0]?.price,
                              //       plan: subscriptions[0]?.days,
                              //       subscription_plan_id: subscriptions[0]?.id,
                              //     },
                              //   });
                              // }
                            }}
                          >
                            {(() => {
                              switch (meeting?.status) {
                                case 1:
                                  return "Accept";
                                case 2:
                                  return "Pending Payment";
                                case 3:
                                  return "Meeting Refused";
                                default:
                                  return "";
                              }
                            })()}
                          </a>
                          {showModal && (
                            <div className="modal">
                              <div className="modal-content">
                                <span
                                  className="close"
                                  onClick={handleCloseModal}
                                >
                                  &times;
                                </span>
                                <div>
                                  <h3>Accept Meeting</h3>
                                  {accepttime?.map((dateTime, index) => {
                                    const [date, time] = dateTime.split(" ");
                                    const isDisabled =
                                      notavailable.includes(dateTime);

                                    return (
                                      <div key={index}>
                                        <input
                                          type="radio"
                                          id={`date${index}`}
                                          name="selectedDate"
                                          value={dateTime}
                                          onChange={() =>
                                            setAcceptMeeting([
                                              {
                                                supplier_id: acceptId,
                                                type: 0,
                                                availability: [
                                                  {
                                                    date: date,
                                                    time: time,
                                                  },
                                                ],
                                              },
                                            ])
                                          }
                                          disabled={isDisabled}
                                        />
                                        <label htmlFor={`date${index}`}>
                                          {dateTime}
                                          {isDisabled && (
                                            <span style={{ color: "red" }}>
                                              *Slot no longer available
                                            </span>
                                          )}
                                        </label>
                                      </div>
                                    );
                                  })}

                                  <button
                                    className="btn btn-secondary"
                                    onClick={() => clickedAccept()}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* {showModal && (
                            <div className="modal">
                              <div
                                className="modal-content"
                                style={{ position: "fixed" }}
                              >
                                <span
                                  className="close"
                                  onClick={handleCloseModal}
                                  style={{ right: "13px" }}
                                >
                                  &times;
                                </span>
                                <div>
                                  <h3>Accept Meeting</h3>
                                  <ul>
                                    {acceptdate?.map((date, index) => {
                                      console.log(date);
                                      const time = accepttime[index];
                                      const isDisabled = data.some((detail) =>
                                        detail.buyerSlot.some(
                                          (slot) =>
                                            slot.date === date &&
                                            slot.time === time
                                        )
                                      );

                                      return (
                                        <div key={index}>
                                          <input
                                            type="radio"
                                            id={`date${index}`}
                                            name="selectedDate"
                                            value={date}
                                            onChange={() =>
                                              setAcceptMeeting([
                                                {
                                                  supplier_id: acceptId,
                                                  type: 0,
                                                  availability: [
                                                    {
                                                      date: date,
                                                      time: time,
                                                    },
                                                  ],
                                                },
                                              ])
                                            }
                                            disabled={isDisabled}
                                          />
                                          <label htmlFor={`date${index}`}>
                                            {date} - {time}
                                            {isDisabled && (
                                              <span style={{ color: "red" }}>
                                                *Slot no longer available
                                              </span>
                                            )}
                                          </label>
                                        </div>
                                      );
                                    })}
                                  </ul>
                                  <button
                                    className="btn btn-secondary"
                                    onClick={() => clickedAccept()}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          )} */}
                        </div>
                      )}
                    </div>
                  </td>

                  <td>
                    <a
                      onClick={() => {
                        if (meeting?.type !== 1 && meeting?.status !== 3) {
                          setModalState(true);
                          setSupplierTime([
                            {
                              supplier_id: meeting?.id,
                              availability: [],
                            },
                          ]);
                        }
                      }}
                      className={`btn ${
                        meeting?.type === 1 || meeting?.status === 3
                          ? "disabled"
                          : ""
                      }`}
                      style={{
                        cursor:
                          meeting?.type === 1 || meeting?.status === 3
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      <img
                        src={editicon}
                        title="Reschedule Meeting Time"
                        alt=""
                        style={{
                          filter:
                            meeting?.type === 1 || meeting?.status === 3
                              ? "grayscale(100%)"
                              : "none",
                        }}
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        title="Request a meeting?"
        modalState={modalState}
        setModalState={() => {
          setSlots([]);
          setModalState(false);
        }}
      >
        <span
          className="close_modal"
          onClick={() => {
            setSlots([]);
            setModalState(false);
          }}
        >
          <img src={deleteicon} />
        </span>

        <div className="modal-header">
          <h3 style={{ color: "#fff" }}>Edit your Availability</h3>
        </div>
        <div className="calendar_fix calendar-wrapper">
          <DatePicker setDate={showTimePicker} />
          {showTP ? <Timepicker setTime={setSTime} sTime={sTime} /> : null}
        </div>
        <div className="selected-time">
          {slots.map((item) => {
            return (
              <p>
                {item.sDate + " - " + item.sTime}

                <span
                  style={{ marginLeft: "10px", paddingTop: "6px" }}
                  onClick={() => removeSlot(item)}
                >
                  {/* <button className=""> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
                  </svg>{" "}
                  {/* </button> */}
                </span>
              </p>
            );
          })}
          {sDate !== "" ? (
            <>
              {sDate + " - " + sTime}
              {sTime ? (
                <button
                  onClick={confirmSlots}
                  // disabled={slots.length >= 5}
                  className={`btn_confirm btn btn-primary ${
                    slots.length >= 5 ? "disabled" : ""
                  }`}
                  style={{
                    filter: slots.length >= 5 ? "grayscale(100%)" : "none",
                  }}
                >
                  Confirm ?
                </button>
              ) : null}
            </>
          ) : null}
        </div>
        <button
          className="btn btn-secondary"
          style={{ display: "block", margin: "0 auto" }}
          onClick={
            () => {
              setclick(true);
              setSlots([]);
              setModalState(false);
            }
            // requestMeeting(
            //   productData.product?.id,
            //   productData.product?.supplier_id
            // )
          }
        >
          Request Appointment
          {/* {sDate !== "" ? "on " + sDate + " at " + sTime : null} */}
        </button>
      </Modal>
    </>
  );
}

export default Supplierpandingmeeting;

// <tr>
// <td>Buyer Short Name</td>
// <td>ALB</td>
// <td>14/1/2023</td>
// <td>16h00 </td>
// <td>IST</td>
// <td class="roles">
//   <a href="#" class="btn btn-success">
//     View More
//   </a>
// </td>
// <td>
//   <div class="button_wrap row">
//     <a href="" class="btn btn-primary">
//       Refuse
//     </a>
//     <a href="" class="btn btn-secondary">
//       Accept
//     </a>
//   </div>
// </td>
// <td>
//   <a
//     onClick={() => {
//       setModalState(true);
//     }}
//     class="btn btn-success"
//   >
//     Open Meeting
//   </a>
// </td>
// </tr>
// <tr>
// <td>Buyer Short Name</td>
// <td>ASM</td>
// <td>13/1/2023</td>
// <td>9h30 - 11h30 </td>
// <td>VN : 3pm - 5:30pm</td>
// <td class="roles">
//   <a href="#" class="btn btn-success">
//     View More
//   </a>
// </td>
// <td>
//   <div class="button_wrap row">
//     <a href="" class="btn btn-primary">
//       Refuse
//     </a>
//     <a href="" class="btn btn-secondary">
//       Accept
//     </a>
//   </div>
// </td>
// <td>
//   <a
//     onClick={() => {
//       setModalState(true);
//     }}
//     class="btn btn-success"
//   >
//     Open Meeting
//   </a>
// </td>
// </tr>
// <tr>
// <td>Buyer Short Name</td>
// <td>ASM</td>
// <td>13/1/2023</td>
// <td>14h00 17h30 </td>
// <td>Japan : 9am</td>
// <td class="roles">
//   <a href="#" class="btn btn-success">
//     View More
//   </a>
// </td>
// <td>
//   <div class="button_wrap row">
//     <a href="" class="btn btn-primary">
//       Refuse
//     </a>
//     <a href="" class="btn btn-secondary">
//       Accept
//     </a>
//   </div>
// </td>
// <td>
//   <a
//     onClick={() => {
//       setModalState(true);
//     }}
//     class="btn btn-success"
//   >
//     Open Meeting
//   </a>
// </td>
// </tr>
