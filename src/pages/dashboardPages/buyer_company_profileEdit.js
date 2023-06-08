import React, { useEffect, useState } from "react";
import { api } from "../base_url";
import Left_menu from "../productpages/left_menu";
import Select from "react-select";
import moment from "moment";
import InputWithButton from "../../components/input-with-button/input-with-button";
import { country } from "../dashboard/country";
import { ToastContainer, toast } from "react-toastify";
import Left_menu2 from "./Left_menu2";
import { useNavigate, useParams } from "react-router-dom";
import pdficon from "../../assets/images/pdf_icon.png";
import trash from "../../assets/images/trash-2.svg";
import axios from "axios";
const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const options2 = [];
const url = RegExp(
  "^((((h|H)(t|T)|(f|F))(t|T)(p|P)((s|S)?)://[-.\\w]*)|(((w|W){3}\\.)[-.\\w]+))(/?)([-\\w.?,:'/\\\\+=&;%$#@()!~]*)?$"
);

function Company_profile_Edit(props) {
  const [image, setImage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebar, setsidebar] = useState(true);
  const [psname, setpsname] = useState("");
  const [Addstyel, setAddstyel] = useState(false);
  const [Addstyel2, setAddstyel2] = useState(false);
  const [checkoption, setcheckoption] = useState(false);
  const [options, setoptions] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [answerArray, setanswerArray] = useState([]);
  const [optionpush1, setoptionpush1] = useState(false);
  const [optionpush2, setoptionpush2] = useState(false);

  const sectors_array = [];
  selectOptions?.map((item) => {
    sectors_array?.push(item?.value);
  });

  const [contact, setcontact] = useState({
    p_name: "",
    ps_name: "",
    category: "",
    s_category: "",
    country: "",
    c_name: "",
    Description: "",
    product_file: [],
    product_file2: [],
    thumb_index: "",
    Policy: "",
    Quantity: "",
    sector_name: "",
    Creation: "",
    price_range: "",
    questions: [],
  });

  const [question, setquestion] = useState([]);
  const [emptyans_id, setemptyans_id] = useState([]);

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
        result.data?.map((item) => {
          if (item?.mandatory != 0) {
            emptyans_id.push(item?.id);
          }
        });
      })
      .catch((error) => console.log("error", error));
  };

  // console.log(contact?.thumb_index, "thumb_indexthumb_indexthumb_index");

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
  });
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
      case "Guarantee":
        errorfield.Guarantee = e.target.value == "" ? "required" : "";
        break;
      case "Creation":
        errorfield.Creation = e.target.value == "" ? "required" : "";
        break;
      case "thumb_index":
        errorfield.thumb_index = e.target.value == "" ? "required" : "";
        break;
      default:
        break;
    }
    seterrorfield({ ...errorfield });
    setcontact({ ...contact, [e.target.name]: e.target.value });
  };
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
      // case "product_file":
      //   errorfield.product_file = contact.product_file == "" ? "required" : "";
      //   break;
      case "Policy":
        errorfield.Policy = contact.Policy == "" ? "required" : "";
        break;
      case "Quantity":
        errorfield.Quantity = contact.Quantity == "" ? "required" : "";
        break;
      case "Guarantee":
        errorfield.Guarantee = contact.Guarantee == "" ? "required" : "";
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

  const [editData, setEditData] = useState([]);
  const [optionsedit, setoptions2] = useState([]);

  const handlequestion2 = (e, id, type, pqId) => {
    if (type?.toLowerCase() === "checkbox") {
      if (e.target.checked) {
        if (!optionsedit.find((item) => item.id === id)) {
          const newOption = { id: id, checkbox: [e.target.value] };
          setoptions2([...options, newOption]);
        } else {
          setoptions2((prevOptions) =>
            prevOptions.map((option) =>
              option.id === id
                ? {
                    ...option,
                    checkbox: [...option.checkbox, e.target.value],
                  }
                : option
            )
          );
        }
      } else {
        setoptions2((prevOptions) =>
          prevOptions.map((option) =>
            option.id === id
              ? {
                  ...option,
                  checkbox: option.checkbox.filter(
                    (value) => value !== e.target.value
                  ),
                }
              : option
          )
        );
      }
    }
  };

  // console.log(optionsedit, "debug2");
  useEffect(() => {
    console.log(optionsedit, answerArray, "debug1");
  }, [optionsedit]);

  

  const get_companyinfo = async () => {
    await axios
      .get(api + "/api/company-profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res?.data?.success == true) {

          setTimeout(() => {
            setEditData(res.data?.data);
            contact.p_name = res?.data?.data.company?.company_name;
            contact.ps_name = res?.data?.data.company?.company_short_name;
            contact.country = res?.data?.data.company?.country;
            contact.Description = res?.data?.data.company?.company_dec;
            contact.thumb_index = res?.data?.data.company?.thumb_index;
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
              console.log(optionpush1 , "<<<<<<<");

              if(optionpush1 == false){
                arrayof.map((item) => {
                  selectOptions.push({ value: item, label: item });
                });
              }
            }

            contact.Creation = res?.data?.data.company?.company_short_name;
            contact.product_file2 = res.data?.data?.media_files;
            contact.questions = res?.data?.data.questions;
            contact.yt_link =
              res?.data?.data.company?.youtube_link != null
                ? res?.data?.data.company?.youtube_link
                : "";

            res?.data?.data.questions?.map((item) => {
              if (item.type?.toLowerCase() == "checkbox") {
                if (
                  /^[\],:{}\s]*$/.test(
                    item?.answer
                      .replace(/\\["\\\/bfnrtu]/g, "@")
                      .replace(
                        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                        "]"
                      )
                      .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
                  )
                ) {
                  const ans22 = JSON.parse(item?.answer);
                  optionsedit?.push({
                    id: item.id,
                    checkbox: ans22,
                  });
                }
              }
            });
          }, 50);

          setTimeout(() => {
            setcontact({ ...contact });
            setoptionpush1(true)
          }, 100);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const edit_product = () => {
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
    formdata.append("sector", JSON.stringify(sectors_array));
    formdata.append("youtube_link", contact.yt_link);
    formdata.append("id", editData?.company?.id);
    formdata.append("thumb_index", contact?.thumb_index);

    answerArray?.map((question, index) => {
      // console.log(question);
      // if( question?.answer != ""){

      formdata.append(`company_question[${index}][id]`, question?.questionId);
      formdata.append(
        `company_question[${index}][answer]`,
        optionsedit?.filter((item) => {
          return item?.id == question?.questionId;
        })[0]?.id == question?.questionId
          ? JSON.stringify(
              optionsedit?.filter((item) => {
                return item?.id == question?.questionId;
              })[0]?.checkbox
            )
          : question?.answer
      );
      formdata.append(
        `company_question[${index}][pqid]`,
        question?.questionPqId
      );
      // }
    });

    contact.product_file.map((data) => {
      formdata.append("documents[]", data);
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    if (
      optionsedit.length < 1 ||
      answerArray?.filter((item) => {
        return item?.mandatory != 0 && item?.answer == "";
      })?.length > 0
    ) {
      toast.error("Please Fill required Answer !");
    } else {
      fetch(api + "/api/edit-company-profile", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success == true) {
            toast.success("Company profile updated successful!");
            setTimeout(() => {
              navigate("/buyer-company-profile");
              // window.location.reload();
            }, 2000);
          }
          setImage(result.message);
          if (result?.success == false) {
            toast.error("Please fill all required fields !");
            window.scrollTo(0, 0);
            setTimeout(() => {
              setImage("");
            }, 5000);
          }
        })
        .catch((error) => {
          toast.error("Please Fill all required answers !");
          // console.log("error", error);
        });
    }
  };
  useEffect(() => {
    console.log(errorfield);
  }, [errorfield, contact, image, contact]);

  const imagelimt =
    contact?.product_file2?.length + contact.product_file?.length;
  const imagelimt2 =
    contact?.product_file2?.filter((item) => item?.media_type == "image")
      ?.length +
    contact?.product_file?.filter((item) => {
      return item?.type == "image/png" || item?.type == "image/jpeg";
    })?.length;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (imagelimt2 <= 5) {
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
    { name: "category" },
    { name: "s_category" },
    { name: "country" },
    { name: "c_name" },
    { name: "Description" },
    { name: "sector_name" },
    { name: "Policy" },
    { name: "Quantity" },
    { name: "Guarantee" },
    { name: "Creation" },
  ];

  const delete_image = (id) => {
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
    fetch(
      api + `/api/v1/compnay-profile-image-delete?image_id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // get_companyinfo();
        if (result?.status == "success") {
          get_companyinfo();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handlequestion = (e, id, type, pq_id, mandatory) => {
    if (answerArray.filter((data) => data.questionId == id)[0]) {
      answerArray.filter((data) => data.questionId == id)[0].answer =
        e.target.value;
    } else {
      answerArray.push({
        answer: e.target.value,
        questionId: id,
        questionPqId: pq_id,
        mandatory: mandatory,
      });
    }
    // console.log(answerArray , answerArray?.filter((item)=>{
    //   return item?.mandatory != 0 && item?.answer == ""
    // }));
  };

  const [givenoptions, setgivenoptions] = useState();
  const companySectoroptions = [];

  givenoptions?.map((item) => {
    companySectoroptions.push({
      value: item?.category_name,
      label: item?.category_name,
    });
  });

  useEffect(() => {
    axios
      .get(api + "/api/sector-category")
      .then((response) => {
        const short_list = response.data.data;
        setgivenoptions(short_list);
      })
      .catch((error) => {
        // handle error here, e.g. set error state
        console.log(error);
      });
    question_data();
  }, []);

  useEffect(() => {
    get_companyinfo();
    setpsname(editData?.product_name);
  }, []);

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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      <div className="product_research_wrap2 product_research_wrap add_new_product Meeting_wrap profile_popup">
        <div className="main">
          <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
          <div className={sidebar ? "active router-body" : "router-body"}>
            <div className="breadcrumbs" data-aos="fade-down">
              <ul>
                <li>
                  <a href="/dashboard">Dashboard </a>
                </li>
                <li>
                  <a href="/dashboard">Buyer</a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      navigate("/buyer-company-profile");
                    }}
                  >
                    <span>My Company Profile</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>Edit Company Profile</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="product_prfile">
              <h1>Edit Company Profile</h1>
              <div className="row">
                <div className="col_left">
                  <div className="panel">
                    <div className="form-group full">
                      <input
                        type="text"
                        placeholder="Company Full Name *"
                        className="form-control"
                        name="p_name"
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
                        className="form-control"
                        name="ps_name"
                        value={contact?.ps_name}
                        onChange={(e) => logins_field2(e)}
                        style={
                          errorfield?.ps_name == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    <div className="form-group full">
                      <div
                        className="custom-select"
                        style={
                          errorfield?.country == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      >
                        <select
                          name="country"
                          value={contact?.country}
                          onChange={(e) => logins_field2(e)}
                        >
                          <option>Country *</option>
                          {country.data.map((data, i) => {
                            return (
                              <option value={data.country}>
                                {data.country}
                              </option>
                            );
                          })}
                          {/* <option>india</option> */}
                        </select>
                      </div>
                    </div>

                    <div
                      className="form-group full"
                      style={
                        selectOptions.length == 0
                          ? {
                              borderBottom: "1px solid red",
                              borderRadius: "43px",
                            }
                          : {}
                      }
                    >
                      {/* <div className="Company_sector form-group "> */}
                      <Select
                        isObject={false}
                        options={companySectoroptions}
                        defaultValue={selectOptions}
                        isMulti
                        className="Company_sector2 basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e) => setSelectOptions(e)}
                        placeholder="Company Sector *"
                        styles={controlStyle}
                        //  value={companySectoroptions}
                      />
                      {/* </div> */}
                    </div>

                    <textarea
                      className="form-control"
                      placeholder="Company Profile Description *"
                      name="Description"
                      maxLength={250}
                      value={contact.Description}
                      onChange={(e) => logins_field2(e)}
                      style={
                        errorfield?.Description == ""
                          ? {}
                          : { borderBottom: "1px solid red" }
                      }
                    ></textarea>
                    <p class="limit">
                      {contact.Description?.length + "/" + "250"}
                    </p>
                  </div>
                  {editData.questions?.map((item, index) => {
                    // console.log(item?.mandatory);
                    return (
                      <div className="radio_section">
                        <p>
                          Q {index + 1}.{" "+item?.question}
                        </p>
                        <div className="radio_btn">
                          {item?.type == "Subjective" ||
                          item?.type.toLowerCase() === "textarea" ? (
                            <textarea
                              className="form-control"
                              name="Policy"
                              placeholder={ item?.mandatory != 0  ? "Your Answer *" : "Your Answer" }
                              defaultValue={
                                contact?.questions?.filter(
                                  (data) =>
                                    data?.company_question_id ==
                                    item?.company_question_id
                                )[0]?.answer
                              }
                              onChange={(e) => {
                                handlequestion(
                                  e,
                                  item.id,
                                  item?.type,
                                  item?.company_question_id,
                                  item?.mandatory
                                );
                                if (
                                  answerArray?.filter(
                                    (data) => data?.questionId == item?.id
                                  )[0]?.answer == ""
                                ) {
                                  setAddstyel2(true);
                                } else {
                                  setAddstyel2(false);
                                }
                              }}
                              style={
                                answerArray?.filter(
                                  (data) => data?.questionId == item?.id
                                )[0]?.answer === "" &&
                                item?.mandatory != 0 &&
                                Addstyel2 == true
                                  ? { borderBottom: "1px solid red" }
                                  : {}
                              }
                            ></textarea>
                          ) : (
                            ""
                          )}
                          {item?.type.toLowerCase() === "select" ? (
                            <>
                          
                              <div
                                className="custom-select"
                                style={
                                  answerArray?.filter(
                                    (data) => data?.questionId == item?.id
                                  )[0]?.answer === "" &&
                                  item?.mandatory != 0 &&
                                  Addstyel2 == true
                                    ? { borderBottom: "1px solid red" }
                                    : {}
                                }
                              >
                                <select
                                  defaultValue={
                                    contact?.questions?.filter(
                                      (data) =>
                                        data?.company_question_id ==
                                        item?.company_question_id
                                    )[0]?.answer
                                  }
                                  onChange={(e) => {
                                    handlequestion(
                                      e,
                                      item.id,
                                      item?.type,
                                      item?.company_question_id,
                                      item?.mandatory
                                    );
                                  }}
                                  className=""
                                >
                                  <option disabled={true}>Select</option>
                                  {item?.objects?.map((option) => {
                                    return (
                                      <option value={option}>{option}</option>
                                    );
                                  })}
                                </select>
                              </div>
                            </>
                          ) : (
                            <>
                              {item?.objects?.map((option, indexkey) => {
                                if (item?.type.toLowerCase() == "checkbox") {
                                  try {
                                    if (
                                      /^[\],:{}\s]*$/.test(
                                        item?.answer
                                          .replace(/\\["\\\/bfnrtu]/g, "@")
                                          .replace(
                                            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                                            "]"
                                          )
                                          .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
                                      )
                                    ) {
                                      var ans = JSON.parse(item?.answer);
                                    }
                                  } catch (error) {
                                    console.log(error);
                                  }
                                  // console.log(ans);
                                }
                                if (option != null) {
                                  return (
                                    <>
                                      <div className="align-items-center">
                                        {item?.type.toLowerCase() ==
                                        "objective" ? (
                                          <>
                                            <input
                                              type={
                                                item?.type.toLowerCase() !==
                                                "objective"
                                                  ? "Checkbox"
                                                  : "radio"
                                              }
                                              // id={"op" + index2}
                                              value={option}
                                              name={`question${item.id}`}
                                              defaultChecked={
                                                contact?.questions
                                                  ?.filter(
                                                    (data) =>
                                                      data?.company_question_id ==
                                                      item?.company_question_id
                                                  )[0]
                                                  ?.answer?.toLowerCase() ==
                                                option.toLowerCase()
                                              }
                                              onClick={(e) => {
                                                handlequestion2(
                                                  e,
                                                  item.id,
                                                  item?.type,
                                                  item?.company_question_id,
                                                  item?.mandatory
                                                );
                                                handlequestion(
                                                  e,
                                                  item.id,
                                                  item?.type,
                                                  item?.company_question_id,
                                                  item?.mandatory
                                                );
                                              }}
                                            />
                                          </>
                                        ) : (
                                          <input
                                            type={
                                              item?.type.toLowerCase() !==
                                              "objective"
                                                ? "Checkbox"
                                                : "radio"
                                            }
                                            id={"op" + indexkey}
                                            name={`question${item.id}`}
                                            defaultChecked={
                                              ans
                                                ?.filter(
                                                  (item) =>
                                                    item?.toUpperCase() ==
                                                    option?.toUpperCase()
                                                )[0]
                                                ?.toUpperCase() ==
                                              option?.toUpperCase()
                                            }
                                            defaultValue={option}
                                            onClick={(e) => {
                                              handlequestion(
                                                e,
                                                item.id,
                                                item?.type,
                                                item?.company_question_id,
                                                item?.mandatory
                                              );
                                              handlequestion2(
                                                e,
                                                item.id,
                                                item?.type,
                                                item?.company_question_id,
                                                item?.mandatory
                                              );
                                             
                                              setcheckoption(true);
                                              setAddstyel(true);
                                            }}
                                          />
                                        )}
                                        <label
                                          for="Lorem Ipsum A"
                                          key={option}
                                          style={
                                            optionsedit?.length < 1 &&
                                            Addstyel == true &&
                                            item?.type.toLowerCase() ==
                                              "checkbox"
                                              ? {
                                                  borderBottom: "1px solid red",
                                                }
                                              : optionsedit?.filter((item3) => {
                                                  return item3?.id == item.id;
                                                })[0]?.checkbox?.length == 0 &&
                                                optionsedit?.filter((item2) => {
                                                  return item2?.id == item.id;
                                                })[0]?.id == item.id &&
                                                item?.type.toLowerCase() ==
                                                  "checkbox"
                                              ? {
                                                  borderBottom: "1px solid red",
                                                }
                                              : {}
                                          }
                                        >
                                          {option}
                                        </label>
                                      </div>
                                    </>
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
                  <h6>Product Images</h6>
                  <div
                    className="data_upload"
                    style={
                      imagelimt > 0 ? {} : { borderBottom: "2px solid red" }
                    }
                  >
                    <input
                      type={"file"}
                      name="product_file"
                      disabled={imagelimt >= 6 ? true : false}
                      onChange={(e) => {
                        seterrorfield({ ...errorfield, product_file: "" });
                        onImageChange(e);
                      }}
                      accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf,application/msword ,application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    />
                    <img src="images/profile_upload.svg" alt="" />
                    <h4>
                      Upload Company Logo{" "}
                      <span style={{ color: "red" }}>*</span> or <br />
                      Document
                      <br />
                      <p> Image , Document Size : 800kb </p>
                      <p style={imagelimt >= 6 ? { color: "red" } : {}}>
                        Can upload maximum 5 images and
                        <span style={{ color: "#999999" }}>1 document.</span>
                      </p>
                    </h4>
                  </div>
                  <div className="thumbnail_section">
                    <h6>Add Video Link</h6>
                    <div className="form-group full">
                      <input
                        type="text"
                        placeholder="https://youtu.be/yAoLSRbzxL"
                        className="form-control"
                        value={contact.yt_link == "null" ? "" : contact.yt_link}
                        name="yt_link"
                        onChange={(e) => logins_field2(e)}
                      />
                    </div>
                  </div>
                  <div className="thumbnail_section">
                    <h6>Set Thumbnail Image</h6>
                    {contact?.product_file?.map((data, index) => {
                      // console.log(data);
                      if (data["type"]?.split("/")[0] === "image") {
                        return (
                          <div className="thumb_inner row align-items-center">
                            <input
                              type="radio"
                              id={"profile" + data?.image_id}
                              value={index}
                              defaultChecked={contact?.thumb_index == index}
                              name="thumb_index"
                              onChange={(e) => logins_field2(e)}
                            />
                            <figure className="center">
                              <img
                                src={
                                  URL.createObjectURL(data)
                                    ? URL.createObjectURL(data)
                                    : data?.file_path
                                }
                                alt=""
                              />
                            </figure>
                            <p>{data?.name}</p>

                            <figure
                              onClick={(e) => {
                                deletedata(index);
                              }}
                            >
                              <img src={trash} alt="" />
                            </figure>
                          </div>
                        );
                      }
                    })}
                    {contact?.product_file2?.map((data, index) => {
                      if (data?.media_type == "image") {
                        return (
                          <div className="thumb_inner row align-items-center">
                            <input
                              defaultChecked={contact?.thumb_index == index}
                              type="radio"
                              id={"profile" + index}
                              name="thumb_index"
                              onChange={(e) => logins_field2(e)}
                              value={index}
                            />
                            <figure className="center">
                              <img src={data?.file_path} alt="" />
                            </figure>
                            <p>{"Uploaded images"}</p>
                            <figure
                              onClick={(e) => {
                                delete_image(data?.id);
                                deletedata(index);
                                // setoptionpush2(true)
                                // setSelectOptions([])

                              }}
                            >
                              <img src={trash} alt="" />
                            </figure>
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
                            <p>{data.name}</p>
                            <figure
                              onClick={(e) => {
                                deletedata(index);
                              }}
                            >
                              <img src={trash} alt="" />
                            </figure>
                          </div>
                        );
                      } else if (data?.media_type == "doc") {
                        // console.log(data , "<<");

                        return (
                          <div className="inner_doc row align-items-center">
                            <figure>
                              <img src={pdficon} alt="" />
                            </figure>
                            <p>{"Uploaded doc"}</p>
                            <figure
                              onClick={(e) => {
                                delete_image(data?.id);
                                deletedata(index);
                              }}
                            >
                              <img src={trash} alt="" />
                            </figure>
                          </div>
                        );
                      }
                    })}

                    {contact?.product_file?.map((data, index) => {
                      if (data["type"]?.split("/")[0] === "application") {
                        return (
                          <div className="inner_doc row align-items-center">
                            <figure>
                              <img src={pdficon} alt="" />
                            </figure>
                            <p>{data.name}</p>
                            <figure
                              onClick={(e) => {
                                deletedata(index);
                              }}
                            >
                              <img src={trash} alt="" />
                            </figure>
                          </div>
                        );
                      } else if (data?.media_type == "doc") {
                        // console.log(data , "<<");
                        return (
                          <div className="inner_doc row align-items-center">
                            <figure>
                              <img src={pdficon} alt="" />
                            </figure>
                            <p>{"Uploaded doc"}</p>
                            <figure
                              onClick={(e) => {
                                delete_image(data?.id);
                                deletedata(index);
                              }}
                            >
                              <img src={trash} alt="" />
                            </figure>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              {/* <p
                style={{ display: "block", color: "green", fontWeight: "700" }}
              >
                {image}
              </p> */}
              <div className="button_wrap row">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={(e) => {
                    if (
                      // errorfield?.p_name == ""
                      imagelimt === 0 &&
                      contact.p_name == "" &&
                      contact.ps_name == "" &&
                      contact.country == "" &&
                      contact.Description == ""
                      // errorfield?.c_name == ""
                    ) {
                      check_data?.map((data) => {
                        logins_field(data.name);
                      });
                      window.scrollTo(0, 100);
                      setAddstyel2(true);
                    } else {
                      if (imagelimt != 0 && selectOptions.length != 0) {
                        edit_product();
                      } else {
                        window.scrollTo(0, 100);
                      }
                    }
                  }}
                >
                  Submit
                </button>
                <a href="/buyer-company-profile" className="btn btn-primary">
                  Cancel
                </a>
              </div>
              <div className="error-button row justify-content-center">
                {/* <a className="error_icon" href="/dashboard/user-manegment">
                  <i className="fa fa-arrow-left left" aria-hidden="true"></i>
                  Back to Product Showcase
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Company_profile_Edit;
