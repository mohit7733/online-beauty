import React, { useEffect, useState } from "react";
import InputWithButton from "../../components/input-with-button/input-with-button";
import { api } from "../base_url";
import Left_menu from "../productpages/left_menu";
import { country } from "../dashboard/country";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import pdficon from "../../assets/images/pdf_icon.png";
import trash from "../../assets/images/trash-2.svg";
import Select from "react-select";

const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

const url = RegExp(
  "^((((h|H)(t|T)|(f|F))(t|T)(p|P)((s|S)?)://[-.\\w]*)|(((w|W){3}\\.)[-.\\w]+))(/?)([-\\w.?,:'/\\\\+=&;%$#@()!~]*)?$"
);

function Productresearchsection(props) {
  const [image, setImage] = useState("");
  const [disableedit, setDisableedit] = useState(false);
  const [disableedit2, setDisableedit2] = useState(false);
  const [Madatoryfield, setMadatoryfield] = useState("");
  const [companySector, setCompanySector] = useState([]);
  const [nonmedId, setnonmedId] = useState([]);
  const [emptyans_id, setemptyans_id] = useState([]);
  const [sectors, setsectors] = useState([]);

  const companySectoroptions = [];
  companySector?.map((item) => {
    companySectoroptions.push({ value: item, label: item });
  });

  const navigate = useNavigate();
  const [contact, setcontact] = useState({
    p_name: "",
    ps_name: "",
    category: "",
    s_category: "",
    country: "",
    c_name: "",
    Description: "",
    product_file: [],
    thumb_index: "",
    Policy: "",
    Quantity: "",
    sector_name: [],
    Creation: "",
    product_file2: [],
    yt_link: "",
  });
  const [errorfield, seterrorfield] = useState({
    p_name: "",
    ps_name: "",
    category: "",
    s_category: "",
    country: "",
    c_name: "",
    Description: "",
    product_file: [],
    thumb_index: "",
    Policy: "",
    Quantity: "",
    sector_name: "",
    Creation: "",
    yt_link: "",
    yt_linkvalid: "",
  });

  const sectors2 = [];
  sectors?.map((item) => {
    sectors2.push(item.value);
  });

  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    axios
      .get(api + "/api/sector-category")
      .then((response) => {
        const short_list = response.data.data.map((data) => data.category_name);
        setCompanySector(short_list);
      })
      .catch((error) => {
        // handle error here, e.g. set error state
        console.log(error);
      });
  }, []);

  const [subcategory, setsubcategory] = useState([]);
  const [anserstyle, setanserstyle] = useState(false);
  const [anserstyle2, setanserstyle2] = useState(false);
  // console.log(true);
  const logins_field2 = (e) => {
    switch (e.target.name) {
      case "p_name":
        errorfield.p_name = e.target.value == "" ? "required" : "";
        break;
      case "ps_name":
        errorfield.ps_name = e.target.value == "" ? "required" : "";
        break;
      case "category":
        errorfield.category = e.target.value == "" ? "required" : "";
        break;
      case "s_category":
        errorfield.s_category = e.target.value == "" ? "required" : "";
        break;
      case "country":
        errorfield.country = e.target.value == "" ? "required" : "";
        break;
      case "c_name":
        errorfield.c_name = e.target.value == "" ? "required" : "";
        break;
      case "Description":
        errorfield.Description = e.target.value == "" ? "required" : "";
        break;
      case "Policy":
        errorfield.Policy = e.target.value == "" ? "required" : "";
        break;
      case "Quantity":
        errorfield.Quantity = e.target.value == "" ? "required" : "";
        break;
      case "sector_name":
        errorfield.sector_name = e.target.value == "" ? "required" : "";
        break;
      case "Creation":
        errorfield.Creation = e.target.value == "" ? "required" : "";
        break;
      case "yt_link":
        errorfield.yt_linkvalid = e.target.value == "" ? "required" : "";
        break;
      default:
        break;
    }
    seterrorfield({ ...errorfield });
    setcontact({ ...contact, [e.target.name]: e.target.value });
  };

  function matchYoutubeUrl(url) {
    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (contact.yt_link?.match(p)) {
      return true;
    }
    return false;
  }

  const [validlink, setvalidLink] = useState(false);

  useEffect(() => {
    setvalidLink(matchYoutubeUrl());
  }, [contact.yt_link]);

  const logins_field = (e) => {
    switch (e) {
      case "p_name":
        errorfield.p_name = contact.p_name == "" ? "required" : "";
        break;
      case "ps_name":
        errorfield.ps_name = contact.ps_name == "" ? "required" : "";
        break;
      case "category":
        errorfield.category = contact.category == "" ? "required" : "";
        break;
      case "s_category":
        errorfield.s_category = contact.s_category == "" ? "required" : "";
        break;
      case "country":
        errorfield.country = contact.country == "" ? "required" : "";
        break;
      case "c_name":
        errorfield.c_name = contact.c_name == "" ? "required" : "";
        break;
      case "Description":
        errorfield.Description = contact.Description == "" ? "required" : "";
        break;
      case "product_file":
        errorfield.product_file = contact.product_file == "" ? "required" : "";
        break;
      // case "Policy":
      //   errorfield.Policy = contact.Policy == "" ? "required" : "";
      //   break;
      case "Quantity":
        errorfield.Quantity = contact.Quantity == "" ? "required" : "";
        break;
      case "sector_name":
        errorfield.sector_name = contact.sector_name == "" ? "required" : "";
        break;
      case "Creation":
        errorfield.Creation = contact.Creation == "" ? "required" : "";
        break;
      default:
        break;
    }
    seterrorfield({ ...errorfield });
    setcontact({ ...contact });
  };
  const button = false;
  const [answerArray, setanswerArray] = useState([]);

  const [options, setOptions] = useState([]);

  const handlequestion2 = (e, id, type) => {
    if (type?.toLowerCase() === "checkbox") {
      if (e.target.checked) {
        if (!options.find((item) => item.id === id)) {
          const newOption = { id: id, checkboxValues: [e.target.value] };
          setOptions([...options, newOption]);
        } else {
          setOptions((prevOptions) =>
            prevOptions.map((option) =>
              option.id === id
                ? {
                    ...option,
                    checkboxValues: [...option.checkboxValues, e.target.value],
                  }
                : option
            )
          );
        }
      } else {
        setOptions((prevOptions) =>
          prevOptions.map((option) =>
            option.id === id
              ? {
                  ...option,
                  checkboxValues: option.checkboxValues.filter(
                    (value) => value !== e.target.value
                  ),
                }
              : option
          )
        );
      }
    }
  };

  useEffect(() => {
    console.log(options, "<<<<<<<,");
  }, [options]);

  useEffect(() => {
    setDisableedit(false);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  const get_companyinfo = async () => {
    await axios
      .get(api + "/api/company-profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log(res?.data, res?.data?.data?.company, "<<<,,");

        if (res?.data?.data?.company != null) {
          setTimeout(() => {
            setDisableedit(true);
          }, 500);
        }

        if (res?.data?.success == true) {
          setTimeout(() => {
            contact.p_name = res?.data?.data.company?.company_name;
            contact.ps_name = res?.data?.data.company?.company_short_name;
            contact.country = res?.data?.data.company?.country;
            contact.Description = res?.data?.data.company?.company_dec;
            contact.thumb_index = res?.data?.data.company?.thumb_index;
            // contact.sector_name = res?.data?.data.company?.sector;

            if (
              /^[\],:{}\s]*$/.test(
                res?.data?.data.company?.sector
                  ?.replace(/\\["\\\/bfnrtu]/g, "@")
                  .replace(
                    /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    "]"
                  )
                  .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
              )
            ) {
              const arrayof = JSON.parse(res?.data?.data.company?.sector);
              arrayof.map((item) => {
                selectOptions.push({ value: item, label: item });
              });
            }

            contact.Creation = res?.data?.data.company?.company_short_name;
            contact.product_file2 = res.data?.data?.media_files;
            contact.questions = res?.data?.data.questions;
            contact.yt_link =
              res?.data?.data.company?.youtube_link != null
                ? res?.data?.data.company?.youtube_link
                : "";
          }, 80);
        }

        // setcontact(res?.data?.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [emptyans, setempatyans] = useState([]);
  const [Mandetroy_quest, setnonMandetroy] = useState([]);

  const add_company_profile = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    var formdata = new FormData();
    formdata.append("company_name", contact.p_name);
    formdata.append("company_short_name", contact.ps_name);
    formdata.append("company_dec", contact.Description);
    formdata.append("country", contact.country);
    formdata.append("sector", JSON.stringify(sectors2));
    formdata.append("youtube_link", contact.yt_link);
    formdata.append("thumb_index", contact.thumb_index);
    contact.product_file?.map((data) => {
      formdata.append("documents[]", data);
    });

    answerArray?.map((question, index) => {
      if (
        nonmedId?.filter((item) => {
          return item == question?.questionId;
        })?.length == 0
      ) {
        console.log(
          nonmedId?.filter((item) => {
            return item == question?.questionId;
          }),
          "<<<<<"
        );

        nonmedId.map((itemid,index2) => {
          formdata.append(`company_question[${index2}][id]`, itemid);
          formdata.append(`company_question[${index2}][answer]`, null);
        });
      }

      formdata.append(`company_question[${index}][id]`, question?.questionId);
      formdata.append(
        `company_question[${index}][answer]`,
        options?.filter((item) => {
          return item?.id == question?.questionId;
        })[0]?.id == question?.questionId
          ? JSON.stringify(
              options?.filter((item) => {
                return item?.id == question?.questionId;
              })[0]?.checkboxValues
            )
          : question?.answer
      );
    });

    // formdata.append("documents[]", fileInput.files[0], "/C:/Users/HP/Downloads/Careable Plan Management Advert .docx");
    // formdata.append("documents[]", fileInput.files[0], "/C:/Users/HP/Downloads/63da574cbe414.png");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    // console.log(
    //   answerArray?.filter((item) => {
    //     return item?.mandatory != 0;
    //   })?.length != Mandetroy_quest?.length
    // );

    if (
      answerArray?.filter((item) => {
        return item?.mandatory != 0;
      }).length == Mandetroy_quest?.length
    ) {
      answerArray?.map((item) => {
        emptyans.push({ id: item?.questionId, answer: item?.answer });
      });
      toast.error("Please fill all required Answers !");
      window.scrollTo(0, 0);
      setanserstyle(true);
      setanserstyle2(true);
    } else {
      setanserstyle(false);

      fetch(api + "/api/add-company-profile", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setImage(result.message);
          toast.success("Company Profile Added successful!");
          // setDisableedit(false);
          // get_companyinfo();
          setTimeout(() => {
            // window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          toast.error("Something went wrong !");
          console.log("error", error);
        });
    }
  };

  useEffect(() => {
    // console.log(errorfield, contact, image);
  }, [errorfield, contact, image, answerArray?.length]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // console.log(contact?.category);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (
        contact?.product_file.filter((e) => e.type.split("/")[0] === "image")
          .length < 5 &&
        event.target.files[0].type.split("/")[0] === "image"
      ) {
        if (
          contact.product_file?.filter((file) => {
            return file?.type != "application/pdf";
          })?.length <= 5
        ) {
          contact.product_file.push(event.target.files[0]);
          setTimeout(() => {
            setcontact({ ...contact });
          }, 400);
        }
      } else if (
        contact?.product_file.filter(
          (e) => e.type.split("/")[0] === "application"
        ).length < 1 &&
        event.target.files[0].type.split("/")[0] === "application"
      ) {
        contact.product_file.push(event.target.files[0]);
        setTimeout(() => {
          setcontact({ ...contact });
        }, 400);
      }
    }
  };
  const deletedata = (a) => {
    let x = contact?.product_file;
    x.splice(a, 1);
    setcontact({ ...contact, product_file: x });
  };
  const check_data = [
    { name: "p_name" },
    { name: "ps_name" },
    { name: "country" },
    // { name: "c_name" },
    { name: "Description" },
    { name: "product_file" },
    { name: "sector_name" },
  ];
  const [question, setquestion] = useState([]);
  const [check, setcheck] = useState(true);

  const question_data = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(api + "/api/v1/company-profile-questions", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setquestion(result.data);
        // console.log(result.data , "<<<<<,");
        result.data?.map((item) => {
          if (item?.mandatory != 0) {
            emptyans_id.push(item?.id);
            Mandetroy_quest.push(item);
          }
          if (item?.mandatory == 0) {
            nonmedId.push(item?.id);
          }
        });
      })
      .catch((error) => console.log("error", error));
  };

  // console.log(nonmedId , "<<<<<<<<<<<nonmedId" , emptyans_id);

  useEffect(() => {
    answerArray?.map((item2) => {
      if (
        nonmedId?.filter((item) => {
          return item == item2?.questionId;
        })
      ) {
        console.log(
          nonmedId?.filter((item) => {
            return item == item2?.questionId;
          }),
          "<<<<<"
        );
      }
    });

    console.log(answerArray?.length);
  }, [answerArray?.length]);

  useEffect(() => {
    if (check) {
      question_data();
      setcheck(false);
    }
  }, [check, subcategory]);

  useEffect(() => {
    // get_companyinfo();
    return () => {};
  }, []);

  const handlequestion = (e, id, type, mandatory) => {
    if (answerArray.filter((data) => data.questionId == id)[0]) {
      answerArray.filter((data) => data.questionId == id)[0].answer =
        e.target.value;
    } else {
      answerArray.push({
        answer: e.target.value,
        questionId: id,
        mandatory: mandatory,
      });
    }

    answerArray?.map((item) => {
      // console.log(item, "<<<<<<<");
      if (item?.answer == "") {
        if (emptyans_id.filter((id) => id == item?.questionId)[0]) {
          emptyans_id.filter((id) => id == item?.questionId)[0] =
            item?.questionId;
        } else {
          emptyans_id.push(item?.questionId);
        }
      } else if (item?.answer != "") {
        setemptyans_id(emptyans_id?.filter((id) => id != item?.questionId));
      }
    });

    // console.log(
    //   answerArray?.filter((item) => {
    //     return item?.mandatory != 0;
    //   }).length != Mandetroy_quest?.length
    // );
  };

  useEffect(() => {
    answerArray?.map((item) => {
      if (item?.answer == "") {
        emptyans_id.push(item?.questionId);
      }
    });
  }, [answerArray.length, handlequestion]);

  const user_type = localStorage.getItem("user_type")?.toLowerCase();

  const controlStyle = {
    control: (provided) => ({
      ...provided,
      height: "48px",
      borderRadius: "33px",
      "&:hover": {
        border: "solid 1px #D9D9D9",
        boxShadow: "none",
        borderRadius: "33px",
      },
      "&:focus": {
        border: "solid 1px #D9D9D9",
        boxShadow: "none",
        borderRadius: "33px",
      },
      "&:acitve": {
        border: "solid 1px #D9D9D9",
        boxShadow: "none",
        borderRadius: "33px",
      },
    }),
  };
  return (
    <>
      <div className={props.sidebar ? "active router-body" : "router-body"}>
        <div className="breadcrumbs" data-aos="fade-down">
          <ul>
            <li>
              <a href="/dashboard">Dashboard </a>
            </li>
            <li>
              <a href="/dashboard">
                {user_type == "both"
                  ? "Supplier"
                  : user_type == "buyer"
                  ? "Buyer"
                  : user_type == "supplier"
                  ? "Supplier"
                  : ""}
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  setDisableedit(true);
                  setDisableedit2(false);
                }}
              >
                <span>My Company Profile</span>
              </a>
            </li>
            {disableedit2 == true ? (
              <li>
                <a href="#">
                  <span>Edit Company Profile</span>
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="product_prfile">
          <div class="  remark_wrap company_wrap row justify-content-between">
            <div class="column">
              <h2>My Company Profile</h2>
            </div>
            {disableedit == true ? (
              <div class="edit_headingadded column">
                <p className="">
                  <a
                    onClick={() => {
                      navigate("/buyer-company-profile-edit");
                    }}
                  >
                    Edit Company Profile
                    <img src="images/edit (1).svg" alt="" />
                  </a>
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* <h1>My Company Profile </h1>
          <p>Company Profile Edit</p> */}

          <div className="row">
            <div className="col_left">
              <div className="panel">
                <div className="form-group full">
                  <input
                    type="text"
                    placeholder="Company Full Name *"
                    className={
                      disableedit === true
                        ? "disabled2 form-control "
                        : "form-control"
                    }
                    name="p_name"
                    disabled={disableedit}
                    value={contact?.p_name}
                    onChange={(e) => logins_field2(e)}
                    style={
                      errorfield?.p_name == ""
                        ? {}
                        : { borderBottom: "1px solid red" }
                    }
                  />
                </div>
                <div className="form-group full">
                  <input
                    type="text"
                    placeholder="Company Short Name *"
                    className={
                      disableedit ? "disabled2 form-control " : "form-control"
                    }
                    name="ps_name"
                    disabled={disableedit}
                    value={contact?.ps_name}
                    onChange={(e) => logins_field2(e)}
                    style={
                      errorfield?.ps_name == ""
                        ? {}
                        : { borderBottom: "1px solid red" }
                    }
                  />
                </div>
                <div className="form_wrap full">
                  {/* <div className="form-group"> */}
                  <div
                    className={
                      disableedit ? "disabled2 custom-select " : "custom-select"
                    }
                    style={
                      errorfield?.country == ""
                        ? {}
                        : { borderBottom: "1px solid red" }
                    }
                  >
                    <select
                      name="country"
                      disabled={disableedit}
                      value={contact?.country}
                      onChange={(e) => logins_field2(e)}
                    >
                      <option>Country *</option>
                      {country.data.map((data, i) => {
                        return (
                          <option key={i} value={data.country}>
                            {data.country}
                          </option>
                        );
                      })}
                      {/* <option>india</option> */}
                    </select>
                    {/* </div> */}
                  </div>
                </div>
                <div
                  className=" form-group full"
                  style={
                    sectors.length == 0 && anserstyle == true
                      ? { borderBottom: "1px solid red", borderRadius: "43px" }
                      : {}
                  }
                >
                  <Select
                    isObject={false}
                    defaultValue={selectOptions}
                    options={companySectoroptions}
                    isMulti
                    name="colors"
                    className="Company_sector2 basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Company Sector *"
                    onChange={(e) => {
                      setsectors(e);
                    }}
                    styles={controlStyle}
                    isDisabled={disableedit}
                  />
                </div>
                <textarea
                  className={
                    disableedit ? "disabled2 form-control " : "form-control"
                  }
                  maxLength={250}
                  placeholder="Company Profile Description *"
                  name="Description"
                  value={contact.Description}
                  disabled={disableedit}
                  onChange={(e) => logins_field2(e)}
                  style={
                    errorfield?.Description == ""
                      ? {}
                      : { borderBottom: "1px solid red" }
                  }
                ></textarea>
                <p class="limit">{contact.Description?.length + "/" + "250"}</p>
              </div>
              {question?.map((quest, index) => {
                // console.log(quest);
                return (
                  <div className="radio_section">
                    <p>
                      Q {index + 1}.{" " + quest?.question}
                    </p>
                    <div className="radio_btn">
                      {quest?.type == "Subjective" ||
                      quest?.type.toLowerCase() === "textarea" ? (
                        <textarea
                          className={
                            disableedit
                              ? "disabled2 form-control "
                              : "form-control"
                          }
                          name="Policy"
                          disabled={disableedit}
                          placeholder={
                            quest?.mandatory != 0
                              ? "Your Answer *"
                              : "Your Answer"
                          }
                          onChange={(e) => {
                            handlequestion(
                              e,
                              quest.id,
                              quest?.type,
                              quest?.mandatory
                            );

                            setnonmedId(
                              nonmedId?.filter((item) => item == quest.id)
                                .length == 0
                                ? nonmedId
                                : nonmedId?.filter((item) => item != quest.id)
                            );
                            // console.log(nonmedId , "<<<<<<<<<nonmedId");
                          }}
                          defaultValue={
                            contact?.questions?.filter(
                              (data) => data?.company_question_id == quest?.id
                            )[0]?.answer
                          }
                          style={
                            emptyans_id?.filter((item) => {
                              return item === quest?.id;
                            })[0] == quest?.id &&
                            quest?.mandatory != 0 &&
                            anserstyle == true
                              ? { borderBottom: "1px solid red" }
                              : anserstyle == true &&
                                emptyans?.filter((item) => {
                                  return item?.id == quest?.id;
                                }) == undefined &&
                                quest?.mandatory != 0
                              ? { borderBottom: "1px solid red" }
                              : {}
                          }
                        ></textarea>
                      ) : (
                        ""
                      )}
                      {quest?.type.toLowerCase() === "select" ? (
                        <div className="custom-select">
                          <select
                            defaultValue={
                              contact?.questions?.filter(
                                (data) => data?.company_question_id == quest?.id
                              )[0]?.answer
                            }
                            onChange={(e) => {
                              handlequestion(
                                e,
                                quest.id,
                                quest?.type,
                                quest?.mandatory
                              );

                              setnonmedId(
                                nonmedId?.filter((item) => item == quest.id)
                                  .length == 0
                                  ? nonmedId
                                  : nonmedId?.filter((item) => item != quest.id)
                              );
                            }}
                            disabled={disableedit}
                            className=""
                            style={
                              emptyans_id?.filter((item) => {
                                return item === quest?.id;
                              })[0] == quest?.id && anserstyle == true
                                ? { borderBottom: "1px solid red" }
                                : anserstyle == true &&
                                  emptyans?.filter((item) => {
                                    return item?.id == quest?.id;
                                  }) == undefined
                                ? { borderBottom: "1px solid red" }
                                : {}
                            }
                          >
                            <option disabled={true}>
                              {" "}
                              {disableedit == true
                                ? contact?.questions?.filter(
                                    (data) =>
                                      data?.company_question_id == quest?.id
                                  )[0]?.answer
                                : "Select"}{" "}
                            </option>
                            {quest?.ques_obj?.map((option) => {
                              return <option value={option}>{option}</option>;
                            })}
                          </select>
                        </div>
                      ) : (
                        <>
                          {quest?.ques_obj?.map((option, index2) => {
                            // console.log(contact?.questions, option);
                            if (quest?.type.toLowerCase() == "checkbox") {
                              try {
                                if (
                                  /^[\],:{}\s]*$/.test(
                                    contact?.questions
                                      ?.filter(
                                        (data) =>
                                          data?.company_question_id == quest?.id
                                      )[0]
                                      .answer.replace(/\\["\\\/bfnrtu]/g, "@")
                                      .replace(
                                        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                                        "]"
                                      )
                                      .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
                                  )
                                ) {
                                  var ans = JSON.parse(
                                    contact?.questions?.filter(
                                      (data) =>
                                        data?.company_question_id == quest?.id
                                    )[0]?.answer
                                  );
                                }
                              } catch (error) {
                                console.log(error);
                              }
                              // console.log(
                              //   ans,
                              // );
                            }

                            if (option != null) {
                              return (
                                <div className="align-items-center">
                                  {disableedit == true ? (
                                    <>
                                      {quest?.type.toLowerCase() ==
                                      "objective" ? (
                                        <input
                                          type={
                                            quest?.type.toLowerCase() !==
                                            "objective"
                                              ? "Checkbox"
                                              : "radio"
                                          }
                                          id={"op" + index2}
                                          name={`question${quest.id}`}
                                          checked={
                                            contact?.questions
                                              ?.filter(
                                                (data) =>
                                                  data?.company_question_id ==
                                                  quest?.id
                                              )[0]
                                              ?.answer?.toLowerCase() ==
                                            option.toLowerCase()
                                          }
                                          onClick={(e) => {
                                            handlequestion2(
                                              e,
                                              quest.id,
                                              quest?.type
                                            );
                                            handlequestion(
                                              e,
                                              quest.id,
                                              quest?.type,
                                              quest?.mandatory
                                            );

                                            setnonmedId(
                                              nonmedId?.filter(
                                                (item) => item == quest.id
                                              ).length == 0
                                                ? nonmedId
                                                : nonmedId?.filter(
                                                    (item) => item != quest.id
                                                  )
                                            );
                                          }}
                                        />
                                      ) : (
                                        <input
                                          type={
                                            quest?.type.toLowerCase() !==
                                            "objective"
                                              ? "Checkbox"
                                              : "radio"
                                          }
                                          id={"op" + index2}
                                          name={`question${quest.id}`}
                                          // defaultvalue={option}
                                          defaultValue={
                                            quest?.type.toLowerCase() !==
                                            "objective"
                                              ? contact?.questions?.filter(
                                                  (data) =>
                                                    data?.company_question_id ==
                                                    quest?.id
                                                )[0]?.answer
                                              : option
                                          }
                                          onClick={(e) => {
                                            handlequestion2(
                                              e,
                                              quest.id,
                                              quest?.type
                                            );
                                            handlequestion(
                                              e,
                                              quest.id,
                                              quest?.type
                                            );
                                            setnonmedId(
                                              nonmedId?.filter(
                                                (item) => item == quest.id
                                              ).length == 0
                                                ? nonmedId
                                                : nonmedId?.filter(
                                                    (item) => item != quest.id
                                                  )
                                            );
                                          }}
                                          checked={
                                            ans
                                              ?.filter((item) => {
                                                return (
                                                  item?.toUpperCase() ==
                                                  option?.toUpperCase()
                                                );
                                              })[0]
                                              ?.toUpperCase() ==
                                            option?.toUpperCase()
                                          }
                                          // disabled={disableedit}
                                        />
                                      )}
                                    </>
                                  ) : (
                                    <input
                                      type={
                                        quest?.type.toLowerCase() !==
                                        "objective"
                                          ? "Checkbox"
                                          : "radio"
                                      }
                                      id={"op" + index2}
                                      name={`question${quest.id}`}
                                      // name={"fav_language" + index2}
                                      // defaultvalue={option}
                                      value={option}
                                      onClick={(e) => {
                                        handlequestion2(
                                          e,
                                          quest.id,
                                          quest?.type
                                        );
                                        handlequestion(
                                          e,
                                          quest.id,
                                          quest?.type
                                        );
                                        setnonmedId(
                                          nonmedId?.filter(
                                            (item) => item == quest.id
                                          ).length == 0
                                            ? nonmedId
                                            : nonmedId?.filter(
                                                (item) => item != quest.id
                                              )
                                        );
                                      }}
                                      defaultChecked={
                                        ans
                                          ?.filter((item) => {
                                            return (
                                              item?.toUpperCase() ==
                                              option?.toUpperCase()
                                            );
                                          })[0]
                                          ?.toUpperCase() ==
                                        option?.toUpperCase()
                                      }
                                      //  disabled={disableedit}
                                    />
                                  )}

                                  <label
                                    style={
                                      emptyans_id?.filter((item) => {
                                        return item === quest?.id;
                                      })[0] == quest?.id && anserstyle == true
                                        ? { borderBottom: "1px solid red" }
                                        : anserstyle == true &&
                                          emptyans?.filter((item) => {
                                            return item?.id == quest?.id;
                                          }) == undefined
                                        ? { borderBottom: "1px solid red" }
                                        : {}
                                    }
                                    for="Lorem Ipsum A"
                                  >
                                    {option}
                                  </label>
                                </div>
                              );
                            }
                          })}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col_right">
              <h6>Company Images</h6>
              <div
                // className="data_upload"
                className={
                  disableedit ? "disabled2 data_upload " : "data_upload"
                }
                style={
                  errorfield?.product_file == ""
                    ? {}
                    : { borderBottom: "2px solid red" }
                }
              >
                <input
                  disabled={
                    disableedit
                      ? disableedit
                      : contact.product_file?.length >= 6
                      ? true
                      : false
                  }
                  type={"file"}
                  name="product_file"
                  onChange={(e) => {
                    seterrorfield({ ...errorfield, product_file: "" });
                    onImageChange(e);
                  }}
                  accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation"
                />
                <img src="images/profile_upload.svg" alt="" />
                <h4>
                  Upload Company Logo <span style={{ color: "red" }}>*</span> or{" "}
                  <br />
                  Document
                  <br />
                  <p>Image , Document Size : 800kb</p>
                  <p
                    style={
                      contact.product_file?.filter((file) => {
                        return file?.type != "application/pdf";
                      })?.length >= 5
                        ? { color: "red" }
                        : {}
                    }
                  >
                    Can upload maximum 5 images and
                    <span
                      style={
                        contact.product_file?.filter((file) => {
                          return file?.type == "application/pdf";
                        })?.length > 1
                          ? { color: "red" }
                          : { color: "#999999" }
                      }
                    >
                      {" "}
                      1 document.
                    </span>
                    {/* 1 document. */}
                  </p>
                </h4>
              </div>
              <div className="thumbnail_section">
                <h6>Add Video Link</h6>
                <div className="form-group full">
                  <input
                    type="text"
                    disabled={disableedit}
                    placeholder="https://youtu.be/yAoLSRbzxL"
                    className={
                      disableedit ? "disabled2 form-control " : "form-control"
                    }
                    name="yt_link"
                    onChange={(e) => logins_field2(e)}
                  />
                  {
                    <p
                      style={
                        contact.yt_link == ""
                          ? { display: "none" }
                          : {
                              display: "block",
                              color: "red",
                              fontSize: "10px",
                            }
                      }
                    >
                      {validlink != true ? "Please Enter A valid Link !" : ""}
                    </p>
                  }
                </div>
              </div>
              <div className="thumbnail_section">
                <h6>Set Thumbnail Image</h6>
                {contact?.product_file.map((data, index) => {
                  if (data["type"].split("/")[0] === "image") {
                    return (
                      <div className="thumb_inner row align-items-center">
                        <input
                          type="radio"
                          id="profile"
                          name="thumb_index"
                          defaultChecked={contact?.thumb_index == index}
                          value={index}
                          onChange={(e) => logins_field2(e)}
                        />
                        <figure className="center">
                          <img src={URL.createObjectURL(data)} alt="" />
                        </figure>
                        <p>{data.name}</p>
                        <figure
                          onClick={(e) => {
                            deletedata(index);
                          }}
                        >
                          <img src="images/trash-2.svg" alt="" />
                        </figure>
                      </div>
                    );
                  }
                })}
                {/* <h6>Uploaded images</h6> */}

                {contact?.product_file2?.map((data, index) => {
                  if (data?.media_type == "image") {
                    return (
                      <div className="thumb_inner row align-items-center">
                        <input
                          disabled={disableedit}
                          type="radio"
                          id={"profile" + index}
                          name="thumb"
                          value={index}
                          checked={contact?.thumb_index == index}
                        />
                        <figure className="center">
                          <img src={data?.file_path} alt="" />
                        </figure>
                        <p>{"Uploaded images"}</p>
                        {disableedit == true ? (
                          ""
                        ) : (
                          <figure
                            onClick={(e) => {
                              // delete_image(data?.image_id);
                              deletedata(index);
                            }}
                          >
                            <img src={trash} alt="" />
                          </figure>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
              <div className="doc_upload">
                <h6>Uploaded Documents</h6>
                {contact?.product_file2?.map((data, index) => {
                  if (data["type"]?.split("/")[0] === "application") {
                    return (
                      <div className="inner_doc row align-items-center">
                        <figure>
                          <img src={pdficon} alt="" />
                        </figure>
                        <p>{data?.name}</p>
                        <figure
                          onClick={(e) => {
                            deletedata(index);
                          }}
                        >
                          {/* <img src={trash} alt="" /> */}
                        </figure>
                      </div>
                    );
                  } else if (data?.media_type == "doc") {
                    return (
                      <div className="inner_doc row align-items-center">
                        <figure>
                          <img src={pdficon} alt="" />
                        </figure>
                        <p>{"Uploaded doc"}</p>

                        {disableedit == true ? (
                          ""
                        ) : (
                          <figure
                            onClick={(e) => {
                              // delete_image(data?.image_id);
                              deletedata(index);
                            }}
                          >
                            <img src={trash} alt="" />
                          </figure>
                        )}
                      </div>
                    );
                  }
                })}
                {contact?.product_file.map((data, index) => {
                  if (data["type"].split("/")[0] === "application") {
                    return (
                      <div className="inner_doc row align-items-center">
                        <figure>
                          <img src={"images/pdf_icon.png"} alt="" />
                        </figure>
                        <p>{data.name}</p>
                        <figure
                          onClick={(e) => {
                            deletedata(index);
                          }}
                        >
                          <img src="images/trash-2.svg" alt="" />
                        </figure>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          {/* <p style={{ display: "block", color: "green", fontWeight: "700" }}>
            {image}
          </p> */}
          {/* {answer2 == "" ? (
            ""
          ) : (
            <p style={{ display: "block", color: "red", fontWeight: "700" }}>
              {answer2}
            </p>
          )} */}
          {disableedit === true ? (
            ""
          ) : disableedit2 === true ? (
            <div className="button_wrap row">
              <button
                // disabled={image != "" ? true : false}
                className="btn btn-secondary"
                onClick={(e) => {
                  if (
                    contact.p_name != "" &&
                    contact.ps_name != "" &&
                    contact.country != "" &&
                    contact.Description != "" &&
                    // contact.product_file != "" &&
                    contact.sector_name != ""
                    // contact.Guarantee != "" &&
                    // validlink != false &&
                    // contact.Creation != ""
                  ) {
                    // edit_company_profile();
                  } else {
                    check_data?.map((data) => {
                      logins_field(data.name);
                      setMadatoryfield("*Please Fill all required field !");
                      window.scrollTo(0, 100);
                      setTimeout(() => {
                        setMadatoryfield("");
                      }, 4000);
                    });
                    // setAnswerError("Please ill all Question")
                  }
                }}
              >
                Update
              </button>
              <a
                href="#"
                onClick={() => {
                  setDisableedit2(false);
                }}
                className="btn btn-primary"
              >
                Cancel
              </a>
            </div>
          ) : (
            <div className="button_wrap row">
              <button
                // disabled={image != "" ? true : false}
                className="btn btn-secondary"
                onClick={(e) => {
                  if (
                    contact.p_name != "" &&
                    contact.ps_name != "" &&
                    contact.country != "" &&
                    contact.Description != "" &&
                    contact.product_file != ""
                    // contact.sector_name != ""
                  ) {
                    add_company_profile();
                  } else {
                    check_data?.map((data) => {
                      logins_field(data.name);
                      window.scrollTo(0, 100);
                      setanserstyle(true);
                      setanserstyle2(true);
                    });
                  }
                }}
              >
                Submit
              </button>
              <a href="#" className="btn btn-primary">
                Cancel
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Productresearchsection;
