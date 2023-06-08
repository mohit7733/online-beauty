import axios from "axios";
import React, { useEffect, useState } from "react";
import Left_menu from "../productpages/left_menu";
import Left_menu2 from "./Left_menu2";
// import author from "../../assets/images/auther_2.jpg";
import transicon from "../../assets/images/trash-2.svg";
import { useParams } from "react-router-dom";

function Alert_Buyer(props) {
  const [sidebar, setsidebar] = useState(true);
  const [notefication, setnotefication] = useState([]);
  const { usertype } = useParams();
  //   console.log(notefication);
  const fatchnoteficetion = async () => {
    var config = {
      method: "get",
      url: "http://localhost:5500/api/get-notefication",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGMyNzVlNzM4M2NkZGRmNDE3ZWViMSIsImlhdCI6MTY3OTA0MDY4MywiZXhwIjoxNjc5MTI3MDgzfQ.FqHZpkZYBGGW78KkzL0vbOPdjzqf7kOB1qWnmz_bTGo",
      },
    };

    await axios(config)
      .then((response) => {
        setnotefication(response.data?.notefication);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fatchnoteficetion();
  }, []);

  const deletenote = async (id) => {
    console.log("Click");
    var config = {
      method: "delete",
      url: "http://localhost:5500/api/delete-notefication/" + id,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGMyNzVlNzM4M2NkZGRmNDE3ZWViMSIsImlhdCI6MTY3OTA0MDY4MywiZXhwIjoxNjc5MTI3MDgzfQ.FqHZpkZYBGGW78KkzL0vbOPdjzqf7kOB1qWnmz_bTGo",
      },
    };

    await axios(config)
      .then((response) => {
        if (response.status == 200) {
          fatchnoteficetion();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="product_showcase supplier_pending_wrap Meeting_wrap product_research_wrap" style={localStorage.getItem("usertype") == "Both" ? {height:"600px"} :{}}>
      <div className="main">
        <Left_menu2
          sidebar={sidebar}
          setsidebar={setsidebar}
          notefication={notefication}
        />
        <div
          className={
            sidebar ? "active router-body" : " for_padding router-body"
          }
          style={sidebar ? {height:"600px"}:{}}
        >
          <div
            className="alerthanding_fix breadcrumbs row justify-content-between"
            data-aos="fade-down"
          >
            <ul>
              <li>
                <a href="/dashboard/user-manegment"> Dashboard </a>
              </li>
              <li>
                <a href="#">{usertype == "buyer" ? "Buyer" : "Supplier"}</a>
              </li>
              <li>
                <a href="#">
                  <span> Alert Notification</span>
                </a>
              </li>
            </ul>
            <a href="" className="default" style={{ color: "#19A0DD" }}>
              Clear All
            </a>
          </div>
          <ul className="notification_wrapper">
            {/* {notefication != [] ? (
              notefication.map((item, i) => {
                return (
                  <li className="row justify-content-between" key={i}>
                    <div className="column_left">
                      <figure>
                        <img src={author} alt="" />
                      </figure>
                      <p>
                        <span>{item?.title}</span>
                      </p>
                    </div>
                    <div className="column_right">
                      <p>Now</p>
                      <img
                        onClick={() => deletenote(item?._id)}
                        style={{ cursor: "pointer" }}
                        src={transicon}
                        alt=""
                      />
                    </div>
                  </li>
                );
              })
            ) : (
              <li>
                <p>
                  <span>Lorem ipsum dolor sit amet dummy text</span>
                </p>
              </li>
            )} */}

            <li className="row justify-content-between">
              <div className="column_left">
                <figure>
                  {/* <img src={author} alt="" /> */}
                </figure>
                <p>
                  <span>Lorem ipsum dolor sit amet dummy text</span>
                </p>
              </div>
              <div className="column_right">
                <p>5 days ago</p>
                <img src={transicon} alt="" />
              </div>
            </li>
            <li className="row justify-content-between">
              <div className="column_left">
                <figure>
                  {/* <img src={author} alt="" /> */}
                </figure>
                <p>
                  <span>Lorem ipsum dolor sit amet dummy text</span>
                </p>
              </div>
              <div className="column_right">
                <p>5 days ago</p>
                <img src={transicon} alt="" />
              </div>
            </li>
            <li className="row justify-content-between">
              <div className="column_left">
                <figure>
                  {/* <img src={author} alt="" /> */}
                </figure>
                <p>
                  <span>Lorem ipsum dolor sit amet dummy text</span>
                </p>
              </div>
              <div className="column_right">
                <p>5 days ago</p>
                <img src={transicon} alt="" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Alert_Buyer;
