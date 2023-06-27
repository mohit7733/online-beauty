import React, { useEffect, useState } from "react";
import { api } from "../base_url";

function Clients() {
  const [theytrusted, settheytrusted] = useState();
  const [check, setcheck] = useState(true);
  const theytrusted_data = () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(api + "/api/theytrusteduslogos", requestOptions)
      .then((response) => response.json())
      .then((result) => settheytrusted(result.data))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    if (check) {
      theytrusted_data();
      setcheck(false);
    }
  }, [check]);
  console.log(theytrusted, "they trusted data");
  return (
    <>
      <div className="section client-section">
        <div className="container">
          <div
            className="heading row justify-content-between align-items-center"
            data-aos="fade-up"
          >
            <h2>Buyers Who Trusted Us</h2>
            <a href="/they-trusted-us" className="btn-link">
              View All Buyers
            </a>
          </div>
          <div className="row grid-5">
            {theytrusted?.logos?.map((logos, index) => {
              return (
                <div key={index} className="grid-col" data-aos="zoom-in">
                  <div className="column">
                    <img src={logos?.logo} title="" alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Clients;
