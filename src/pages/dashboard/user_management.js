import React, { useEffect, useState } from "react";
import editicon from "../../assets/images/edit (1).svg";
import deleteicon from "../../assets/images/trash-2.svg";
import addicon from "../../assets/images/plus-circle.svg";
import axios from "axios";
import { api } from "../base_url";
import { useNavigate } from "react-router-dom";
import warningicon from "../../assets/images/warning2.png";
import { toast } from "react-toastify";

function User_management(props) {
  const navigate = useNavigate();
  const [alertshow, setalertshow] = useState(false);
  const [user_id, setuser_id] = useState("");
  const [users, setusers] = useState();
  const get_users = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: api + "/api/shared-user-list",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await axios
      .request(config)
      .then((response) => {
        if (response.data?.success == true) {
          setusers(response.data?.data);
          // window.location.reload()

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteuser = async (user_id) => {
    // let data = JSON.stringify({
    //   user_type: user_id,
    // });
    let config = {
      method: "get",
      url: api + "/api/delete-shared-user?id=" + user_id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      // data: data,
    };
    await axios
      .request(config)
      .then((response) => {
        if (response.data?.success == true) {
          get_users();
          toast.success(response.data?.message);
          setalertshow(false);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.success("Something went wrong !");
      });
  };

  useEffect(() => {
    get_users();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  return (
    <>
      {alertshow == true ? (
        <div className="alert_box">
          <div className="box_size">
            <img
              src={warningicon}
              style={{ paddingBottom: "14px" }}
              alt="warning"
            />
            <br />
            <p>Are you sure , you want to delete this user ?</p>

            <div>
              <button
                onClick={() => setalertshow(false)}
                className="btn btn-block btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteuser(user_id)}
                className="btn btn-block btn-primary"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={(props.sidebar ? "active " : " ") + "router-body"}>
        <div className="breadcrumbs" data-aos="fade-down">
          <ul>
            <li>
              <a href="/dashboard"> Dashboard </a>
            </li>
            <li>
              <a href="/buyer-company-profile">
                My Profile
                {/* {localStorage.getItem("user_type") == "Both" ? props.supplier  : localStorage.getItem("user_type")  }  */}
              </a>
            </li>
            <li>
              <a href="#">
                <span> User Management</span>
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
            {users?.super_admin?.manage_type?.toLowerCase() == "superadmin" &&
            users?.super_admin?.id == localStorage.getItem("user_id") ? (
              <button
                // disabled={users?.shared_user?.length == 4 ? true : false}
                type="submit"
                className="btn-block btn btn-primary row align-item-center"
                onClick={() => {
                  if (users?.shared_user?.length === 4) {
                    toast.error("You can add maximum 4 user !");
                  } else {
                    navigate("/add-new-user");
                    // navigate("#");
                  }
                  console.log(users?.shared_user.length);
                }}
                title={
                  users?.shared_user?.length == 4
                    ? "You can add maximum 4 user !"
                    : ""
                }
              >
                <img src={addicon} alt="" />
                Add New User
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="table_form">
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Contact Number</th>
                <th>Roles</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span>1.</span>
                </td>
                <td>{users?.super_admin?.fname}</td>
                <td>{users?.super_admin?.lname}</td>
                <td>{users?.super_admin?.email}</td>
                <td>
                  {users?.super_admin?.contact_no == "null"
                    ? ""
                    : users?.super_admin?.contact_no}
                </td>

                {/* <td>+237 6 99 88 77 66</td> */}
                <td className="roles">
                  {users?.super_admin?.manage_type?.toLowerCase() ==
                  "superadmin" ? (
                    <span className="super-admin">Super Admin</span>
                  ) : (
                    <span className="shared-user">Shared User</span>
                  )}
                </td>
                <td className="action">
                  {/* <span>
                  {users?.super_admin?.status == 1 ? "Active" : "Inactive"}
                </span> */}
                  {users?.super_admin?.manage_type?.toLowerCase() ==
                    "superadmin" &&
                  users?.super_admin?.id == localStorage.getItem("user_id") ? (
                    <img
                      className="space_user spac "
                      onClick={() =>
                        navigate(`/add-new-user-edit/${users?.super_admin?.id}`)
                      }
                      src={editicon}
                      alt=""
                    />
                  ) : (
                    ""
                  )}

                  {users?.super_admin?.created_by?.toLowerCase() == "admin"
                    ? ""
                    : ""}
                  {/* <img src={deleteicon} alt="" /> */}
                </td>
              </tr>

              {users?.shared_user?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <span>{index + 2}</span>
                    </td>
                    <td>{item?.fname}</td>
                    <td>{item?.lname}</td>
                    <td>{item?.email}</td>
                    <td>{item?.contact_no}</td>
                    <td className="roles">
                      <span className="shared-user">
                        {item?.manage_type?.toLowerCase() == "shareduser"
                          ? "Shared User"
                          : ""}
                      </span>
                    </td>
                    <td className="action">
                      {/* <span>{item?.status == 1 ? "Active" : "Inactive"}</span> */}

                      {users?.super_admin?.manage_type?.toLowerCase() ==
                        "superadmin" &&
                      users?.super_admin?.id ==
                        localStorage.getItem("user_id") ? (
                        <img
                          onClick={() =>
                            navigate(`/add-new-user-edit/${item?.id}`)
                          }
                          className="space_user spac "
                          src={editicon}
                          alt=""
                        />
                      ) : (
                        ""
                      )}

                      {item?.id == localStorage.getItem("user_id") ? (
                        <img
                          onClick={() =>
                            navigate(`/add-new-user-edit/${item?.id}`)
                          }
                          className="space_user spac "
                          src={editicon}
                          alt=""
                        />
                      ) : (
                        ""
                      )}

                      {users?.super_admin?.manage_type?.toLowerCase() ==
                        "superadmin" &&
                      users?.super_admin?.id ==
                        localStorage.getItem("user_id") ? (
                        <img
                          onClick={() => {
                            setalertshow(true);
                            setuser_id(item?.id);
                          }}
                          src={deleteicon}
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default User_management;
