import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Left_menu2 from "./Left_menu2";
import axios from "axios";
import { api } from "../base_url";
import Left_menu from "../productpages/left_menu";
function View_remarkBoth() {
  const { id, usertype } = useParams();
  const [sidebar, setsidebar] = useState(true);
  const [formdata, setFormData] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  // const {usertype}  = useParams
  const path = window.location.pathname;

  const remarkid = path.substring(path.lastIndexOf("/") + 1);

  const handleSubmit = (e) => {
    // e.preventDefault();
    const token = "Bearer " + localStorage.getItem("token");
    const apiUrl = `${api}/api/v1/supplier-view-remark?id=${remarkid}`;

    axios
      .get(apiUrl, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const { data } = response?.data;
        const { remark } = data;

        const supplierRemark = JSON.parse(remark?.supplier_remark);
        const title = supplierRemark?.title;
        const description = supplierRemark?.description;

        const updatedFormData = {
          title: title || "",
          description: description || "",
        };

        setFormData(updatedFormData);
        console.log(updatedFormData, "this is we get");
        console.log(remarkid);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleSubmit();
  }, []);
  // console.log(formdata)
  return (
    <>
      <div className="edit_remark Meeting_wrap">
        <div className="main">
          <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
          <div className={sidebar ? "active router-body" : "router-body"}>
            <div className="breadcrumbs" data-aos="fade-down">
              <ul>
                <li>
                  <a href="/dashboard/user-manegment">Dashboard </a>
                </li>
                <li>
                  <a href="#">{usertype == "buyer" ? "Buyer" : "Supplier"}</a>
                </li>
                <li>
                  <a href={`/passed-meeting/${usertype}`}>
                    <span> My Meetings </span>
                  </a>
                </li>
                <li>
                  <a>
                    <span> Passed Meetings </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span> View Remark</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="remark_wrap row justify-content-between">
              <div className="column">
                <h2>View Remark</h2>
              </div>
              <div className="column">
                <p
                  id="edit"
                  onClick={() => navigate("/edit-remark/2/" + usertype)}
                  style={{ cursor: "pointer" }}
                >
                  Edit Remark <img src="images/edit (1).svg" alt="" />
                </p>
              </div>
            </div>
            <form action="">
              <div className="form">
                <input
                  type="text"
                  id="text"
                  value={formdata?.title}
                  className="form-control"
                  placeholder=""
                  disabled
                />
              </div>
              <div className="form">
                <textarea
                  name="description"
                  id="textarea"
                  value={formdata?.description}
                ></textarea>
              </div>
              <div className="btn_wrapper row">
                <a id="back" href="" className="btn btn-secondary">
                  Back
                </a>
                <a
                  id="resubmit"
                  type="submit"
                  href=""
                  className="btn btn-secondary"
                  style={{ display: "none" }}
                >
                  Resubmit
                </a>
                <a
                  id="cancel"
                  href=""
                  className="btn btn-primary"
                  style={{ display: "none" }}
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default View_remarkBoth;
