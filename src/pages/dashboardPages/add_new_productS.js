import React, { useEffect, useRef, useState } from "react";
import InputWithButton from "../../components/input-with-button/input-with-button";
import { api } from "../base_url";
import Left_menu from "../productpages/left_menu";
import { country } from "../dashboard/country";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Select from "react-select";
import trash from "../../assets/images/trash-2.svg";
const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

const url = RegExp(
  "^((((h|H)(t|T)|(f|F))(t|T)(p|P)((s|S)?)://[-.\\w]*)|(((w|W){3}\\.)[-.\\w]+))(/?)([-\\w.?,:'/\\\\+=&;%$#@()!~]*)?$"
);

function Add_product(props) {
  const [image, setImage] = useState("");
  const [Guarntee, setGuarntee] = useState("");
  const [multis_category, setmultis_category] = useState([]);
  const [datemess, setdatemess] = useState(false);
  const [submitStatus, setsubmitStatus] = useState(false);
  const [answer2, setanswear2] = useState("");
  const [emptyans_id, setemptyans_id] = useState([]);
  const [emptyans, setempatyans] = useState([]);

  const navigate = useNavigate();
  const [contact, setcontact] = useState({
    p_name: "",
    ps_name: "",
    category: "",
    s_category: [],
    country: "",
    c_name: "",
    Description: "",
    product_file: [],
    thumb_index: 0,
    Policy: "",
    Quantity: "",
    Guarantee: "",
    Creation: "",
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
    Guarantee: "",
    Creation: "",
    yt_link: "",
    yt_linkvalid: "",
  });

  const [subcategory, setsubcategory] = useState([]);
  const [anserstyle, setanserstyle] = useState(false);

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
      case "thumb_index":
        errorfield.thumb_index = e.target.value == "" ? "required" : "";
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
      case "yt_link":
        errorfield.yt_linkvalid = e.target.value == "" ? "required" : "";
        break;
      default:
        break;
    }
    seterrorfield({ ...errorfield });
    setcontact({ ...contact, [e.target.name]: e.target.value });
  };

  function valDate(date) {
    let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])/;

    // Matching the date through regular expression
    if (date.match(dateformat)) {
      let operator = date.split("/");

      // Extract the string into month, date and year
      let datepart = [];
      if (operator.length > 1) {
        datepart = date.split("/");
      }
      let day = parseInt(datepart[0]);
      let month = parseInt(datepart[1]);
      let year = parseInt(datepart[2]);

      // Create a list of days of a month
      let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (month == 1 || month > 2) {
        if (day > ListofDays[month - 1]) {
          return false;
        }
      } else if (month == 2) {
        let leapYear = false;
        if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
        if (leapYear == false && day >= 29) {
          return false;
        } else if (leapYear == true && day > 29) {
          console.log("Invalid date format!");
          return false;
        }
      }
    } else {
      console.log("Invalid date format!");
      return false;
    }
    return "Valid date";
  }

  if (contact.Creation != "") {
    var errorme = valDate(contact.Creation) == "Valid date" ? "" : "error";
  }

  function matchYoutubeUrl(url) {
    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (contact.yt_link?.match(p)) {
      return true;
    }
    return false;
  }

  const [validlink, setvalidLink] = useState(false);
  const timeRef = useRef(null);

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
        errorfield.s_category = multis_category?.length == 0 ? "required" : "";
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
  const button = false;
  const [answerArray, setanswerArray] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log(options, "options");
  }, [options]);
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
    console.log(type, "type");
    console.log(id, "question id");
  };

  const subcate_id = [];
  const subcate_idvalue = [];
  multis_category?.map((item) => {
    subcate_id.push(item.id);
    subcate_idvalue.push(item.value);
  });
  // console.log(subcate_id, subcate_idvalue, "acate_idacate_idacate_id");
  const add_product = () => {
    setsubmitStatus(true)
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    var formdata = new FormData();
    formdata.append("product_name", contact.p_name);
    formdata.append("product_short_name", contact.ps_name);
    formdata.append("category", contact.category);
    formdata.append("sub_cat", JSON.stringify(subcate_idvalue));
    formdata.append("subcat_id", JSON.stringify(subcate_id));
    formdata.append("thumb_index", contact?.thumb_index);
    formdata.append("product_dec", contact.Description);
    formdata.append("made_in", contact.country);
    formdata.append("price_range", contact.c_name);
    formdata.append("price_policy", contact.Policy);
    formdata.append("min_quantity", contact.Quantity);
    formdata.append("guarantee", Guarntee);
    formdata.append("date_of_creation", contact.Creation);
    formdata.append("youtube_link", contact.yt_link);
    formdata.append("category_id", Category_Id);
    contact.product_file?.map((data) => {
      formdata.append("documents[]", data);
    });

    answerArray?.map((question, index) => {
      formdata.append(`product_question[${index}][id]`, question?.questionId);

      const matchingOption = options.find(
        (option) => option.id === question?.questionId
      );
      if (matchingOption) {
        formdata.append(
          `product_question[${index}][answer]`,
          JSON.stringify(matchingOption.checkboxValues)
        );
      } else {
        formdata.append(`product_question[${index}][answer]`, question?.answer);
      }
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    if (answerArray?.length != question?.length) {
      toast.error("Please fill all required Answers !");
      answerArray?.map((item) => {
        emptyans.push({ id: item?.questionId, answer: item?.answer });
      });
      window.scrollTo(0, 0);
      setanserstyle(true);
      setsubmitStatus(false)
    } else {
      // setanserstyle(false);

      fetch(api + "/api/add_product", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setImage(result.message);

          toast.success("Product Added successful!");

          setTimeout(() => {
            navigate("/supplier-product-showcase");
          }, 2000);
        })
        .catch((error) => {
          toast.error("Something went wrong !");
          console.log("error", error);
          setsubmitStatus(false)

        });
    }
  };
  useEffect(() => {
    // console.log(errorfield, contact, image);
  }, [errorfield, contact, image]);

  // console.log(contact?.category);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (
        contact?.product_file.filter((e) => e.type.split("/")[0] === "image")
          .length < 5 &&
        event.target.files[0].type.split("/")[0] === "image"
      ) {
        if (event.target.files[0].size < 838000) {
          if (event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('\\') + 1).split('.')[1] != "jfif") {
            contact.product_file.push(event.target.files[0]);
          } else {
            toast.error("This is not supported!");
          }
        } else {
          toast.error("Please upload image size max 800 KB.");
        }

        setTimeout(() => {
          setcontact({ ...contact });
        }, 400);
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
    { name: "category" },
    { name: "s_category" },
    { name: "country" },
    { name: "c_name" },
    { name: "Description" },
    { name: "product_file" },
    // { name: "Policy" },
    { name: "Quantity" },
    // { name: "Guarantee" },
    { name: "Creation" },
  ];
  const [question, setquestion] = useState([]);
  const [categories, setcategories] = useState([]);
  const [check, setcheck] = useState(true);
  // console.log(contact?.s_category, "<<<<<<< contact?.s_category");

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
    fetch(api + "/api/v1/products_questions", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setquestion(result.data);
        result.data?.map((item) => {
          emptyans_id.push(item?.id);
        });
      })
      .catch((error) => console.log("error", error));
  };

  const getsub_category = () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(api + "/api/category", requestOptions)
      .then((response) => response.json())
      .then((result) => setcategories(result?.category))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getsub_category();
  }, []);

  useEffect(() => {
    if (check) {
      question_data();
      setcheck(false);
    }
  }, [check, subcategory]);

  const handlequestion = (e, id) => {
    if (answerArray.filter((data) => data.questionId == id)[0]) {
      answerArray.filter((data) => data.questionId == id)[0].answer =
        e.target.value;
    } else {
      answerArray.push({ answer: e.target.value, questionId: id });
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

    console.log(answerArray);
    // console.log(answerArray?.length, question?.length);
  };

  useEffect(() => {
    answerArray?.map((item) => {
      if (item?.answer == "") {
        emptyans_id.push(item?.questionId);
      }
    });
  }, [answerArray.length, handlequestion]);

  useEffect(() => {
    console.log(answerArray);
  }, [answerArray]);

  const [sidebar, setsidebar] = useState(true);
  const [subcategories, setsubcategories] = useState([]);
  const [Category_Id, setCategory_Id] = useState("");
  const [Category_subId, setCategory_subId] = useState("");

  let subcategoriesoptions = [];

  subcategories?.map((item) => {
    subcategoriesoptions.push({
      value: item?.subcategory_name,
      label: item?.subcategory_name,
      id: item.id,
    });
  });

  const selcetcate = (e) => {
    categories.filter((itemId) => {
      if (itemId.category_name == e) {
        console.log(itemId);
        setCategory_Id(itemId?.id);
        axios
          .get(`${api}/api/subcategory?category_id=${itemId?.id}`)
          .then((res) => {
            if (res.status == 200) {
              setsubcategories(res?.data?.subcategory);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

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
      <div className=" product_research_wrap2 product_research_wrap add_new_product Meeting_wrap profile_popup">
        <div className="main">
          <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
          <div className={sidebar ? "active router-body" : " router-body"}>
            <div className="breadcrumbs" data-aos="fade-down">
              <ul>
                <li>
                  <a href="/dashboard">Dashboard </a>
                </li>
                <li>
                  <a href="/dashboard">Supplier</a>
                </li>
                <li>
                  <a href="/supplier-product-showcase">
                    <span>Product Showcase</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>Add New Product</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="product_prfile">
              <h1>Add New Product</h1>
              <div className="row">
                <div className="col_left">
                  <div className="panel">
                    <div className="form-group full">
                      {/* {
                      contact.p_name == "" ? <span className="setRedStar">
                      *</span>
                     :"" } */}
                      <input
                        type="text"
                        placeholder="Product Full Name *"
                        className=" form-control"
                        name="p_name"
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
                        placeholder="Product Short Name *"
                        className="form-control"
                        name="ps_name"
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
                          errorfield?.category == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      >
                        <select
                          className={
                            contact?.category?.length > 15
                              ? "overflowhandle"
                              : ""
                          }
                          // onFocus={}
                          name="category"
                          onChange={(e) => {
                            logins_field2(e);
                            selcetcate(e.target.value);
                          }}
                          disabled={multis_category?.length >= 1 ? true : false}
                        >
                          <option className="hover_color" value="">
                            Category <span style={{ color: "red" }}>*</span>
                          </option>{" "}
                          :
                          {categories?.map((data, index) => {
                            return (
                              <>
                                {data?.category_name == null ? (
                                  <option value="">Category</option>
                                ) : (
                                  <option value={data?.category_name}>
                                    {data?.category_name}
                                  </option>
                                )}
                              </>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div
                      style={
                        multis_category?.length == 0 && anserstyle == true
                          ? {
                            borderBottom: "1px solid red",
                            borderRadius: "43px",
                          }
                          : {}
                      }
                      className="form-group full"
                    >
                      {multis_category?.length > 2 ? (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          Select maximum 3 options.
                        </p>
                      ) : (
                        ""
                      )}
                      <Select
                        isObject={false}
                        options={subcategoriesoptions}
                        value={multis_category}
                        isMulti
                        name="colors"
                        className=" Company_sector2 basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Sub-Category"
                        onChange={(e) => {
                          setmultis_category(e);
                        }}
                        isOptionDisabled={() => multis_category?.length >= 3}
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
                          onChange={(e) => logins_field2(e)}
                        >
                          <option value="">
                            Made In <span style={{ color: "red" }}>*</span>
                          </option>

                          {country.data.map((data, i) => {
                            return (
                              <option value={data.country}>
                                {data.country}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    {/* <div className="form_wrap row">
                      <div className="column">
                        <div
                          className="custom-select"
                          style={
                            errorfield?.category == ""
                              ? {}
                              : { borderBottom: "1px solid red" }
                          }
                        >
                          <select
                            // style={contact?.category?.length >15 ? {fontSize:"13px"} :{}}
                            className={
                              contact?.category?.length > 15
                                ? "overflowhandle"
                                : ""
                            }
                            name="category"
                            onChange={(e) => {
                              logins_field2(e);
                              selcetcate(e.target.value);
                            }}
                            // value={contact?.category?.substring(0, 8)}
                          >
                            <option value="">
                              Category <span style={{ color: "red" }}>*</span>
                            </option>{" "}
                            :
                            {categories?.map((data, index) => {
                              return (
                                <>
                                  {data?.category_name == null ? (
                                    <option value="">Category</option>
                                  ) : (
                                    <option value={data?.category_name}>
                                      {data?.category_name}
                                    </option>
                                  )}
                                </>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="column">
                        <div
                          className="custom-select"
                          style={
                            errorfield?.s_category == ""
                              ? {}
                              : { borderBottom: "1px solid red" }
                          }
                        >
                          <select
                            name="s_category"
                            onChange={(e) => {
                              logins_field2(e);
                              setsubIdHandle(e.target.value);
                            }}
                          >
                            <option value="">
                              Sub-Category{" "}
                              <span style={{ color: "red" }}>*</span>
                            </option>
                            {subcategories?.map((data, index) => {
                              return (
                                <option value={data?.subcategory_name}>
                                  {data?.subcategory_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="column">
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
                            onChange={(e) => logins_field2(e)}
                          >
                            <option value="">
                              Made In <span style={{ color: "red" }}>*</span>
                            </option>

                            {country.data.map((data, i) => {
                              return (
                                <option value={data.country}>
                                  {data.country}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div> */}
                    <div className="form-group full">
                      <input
                        type="text"
                        placeholder="Price Range *"
                        className="form-control"
                        name="c_name"
                        onChange={(e) => logins_field2(e)}
                        style={
                          errorfield?.c_name == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    <textarea
                      maxLength="100"
                      className="form-control"
                      name="Policy"
                      placeholder="Price Policy"
                      onChange={(e) => logins_field2(e)}
                      style={
                        errorfield?.Policy == ""
                          ? {}
                          : { borderBottom: "1px solid red" }
                      }
                    ></textarea>
                    <p className="limit">{contact?.Policy.length}/100</p>
                    <div className="form-group full">
                      <input
                        type="text"
                        placeholder="Minimum Quantity *"
                        className="form-control"
                        name="Quantity"
                        onChange={(e) => logins_field2(e)}
                        style={
                          errorfield?.Quantity == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    <div className="form-group full">
                      <input
                        type="text"
                        placeholder="Guarantee"
                        className="form-control"
                        name="Guarantee *"
                        // value={contact?.Guarantee}
                        onChange={(e) => {
                          logins_field2(e);
                          setGuarntee(e.target.value);
                        }}
                        style={
                          errorfield?.Guarantee == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    <div className="form-group full">
                      <input
                        type="text"
                        placeholder="Date Of Creation *"
                        className="form-control"
                        name="Creation"
                        // value={contact?.Creation !="" ? moment(contact?.Creation).format("DD-MMM-YYYY") :""}
                        onChange={(e) => {
                          logins_field2(e);
                          setdatemess(true);
                        }}
                        style={
                          errorfield?.Creation == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                      {errorme == "" ? (
                        ""
                      ) : datemess ? (
                        <p className="errordate">
                          {" "}
                          Please enter the date in the format "dd/mm/yy"
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <textarea
                      maxLength="250"
                      className="form-control"
                      name="Description"
                      placeholder="Product Details Description *"
                      onChange={(e) => logins_field2(e)}
                      style={
                        errorfield?.Description == ""
                          ? {}
                          : { borderBottom: "1px solid red" }
                      }
                    ></textarea>
                    <p className="limit">{contact.Description?.length}/250</p>
                  </div>
                  {question?.map((quest, index) => {
                    // console.log(quest?.ques_obj);
                    return (
                      <div className="radio_section">
                        <p>
                          Q {index + 1}.{" " + quest?.question}
                        </p>
                        <div className="radio_btn">
                          {quest?.type == "Subjective" ||
                            quest?.type.toLowerCase() === "textarea" ? (
                            <textarea
                              className="form-control"
                              name="Policy"
                              placeholder="Your Answer *"
                              onKeyPress={(e) => {
                                if (e.key == "Enter") {
                                  console.log(
                                    "jhii",
                                    e.target.value + "978569"
                                  );
                                }
                              }}
                              onChange={(e) => {
                                handlequestion(e, quest.id);
                                if (
                                  answerArray?.filter(
                                    (data) => data?.questionId == item?.id
                                  )[0]?.answer == ""
                                ) {
                                  setanserstyle(true);
                                } else {
                                  setanserstyle(false);
                                }
                              }}
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
                            ></textarea>
                          ) : (
                            ""
                          )}
                          {quest?.type.toLowerCase() === "select" ? (
                            <div
                              className="custom-select"
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
                              <select
                                onChange={(e) => {
                                  handlequestion(e, quest.id);
                                }}
                                className=""
                              >
                                <option>Select</option>
                                {quest?.ques_obj?.map((option) => {
                                  return (
                                    <option value={option}>{option}</option>
                                  );
                                })}
                              </select>
                            </div>
                          ) : (
                            <>
                              {quest?.ques_obj?.map((option, index2) => {
                                // console.log(option);
                                if (option != null) {
                                  return (
                                    <div className="align-items-center">
                                      <input
                                        type={
                                          quest?.type.toLowerCase() !==
                                            "objective"
                                            ? quest?.type.toLowerCase()
                                            : "radio"
                                        }
                                        id="Lorem Ipsum A"
                                        name={`question${quest.id}`} // Assign a unique name for each group of radio buttons
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
                                        }}
                                      />
                                      <label
                                        htmlFor="Lorem Ipsum A"
                                        style={
                                          emptyans_id?.filter((item) => {
                                            return item === quest?.id;
                                          })[0] == quest?.id &&
                                            anserstyle == true
                                            ? { borderBottom: "1px solid red" }
                                            : anserstyle == true &&
                                              emptyans?.filter((item) => {
                                                return item?.id == quest?.id;
                                              }) == undefined
                                              ? { borderBottom: "1px solid red" }
                                              : {}
                                        }
                                      >
                                        {option}
                                      </label>{" "}
                                      {/* Use htmlFor instead of for for labels */}
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
                  <h6>Product Images</h6>
                  <div
                    className="data_upload"
                    style={
                      errorfield?.product_file == ""
                        ? {}
                        : { borderBottom: "1px solid red" }
                    }
                  >
                    <input
                      type={"file"}
                      disabled={
                        contact.product_file?.length >= 6 ? true : false
                      }
                      name="product_file"
                      onChange={(e) => {
                        seterrorfield({ ...errorfield, product_file: "" });
                        onImageChange(e);
                      }}
                      accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    />
                    <img src="images/profile_upload.svg" alt="" />
                    <h4>
                      Upload Image <span style={{ color: "red" }}>*</span> or{" "}
                      <br />
                      Document
                      <br />
                      <p>Image , Document Size : 800kb</p>
                      <p
                        style={
                          contact.product_file?.length >= 6
                            ? { color: "red" }
                            : {}
                        }
                      >
                        Can upload maximum 5 images and 1 document.
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
                          {validlink != true
                            ? "Please Enter A valid Link !"
                            : ""}
                        </p>
                      }
                    </div>
                  </div>
                  <div className="thumbnail_section">
                    <h6>Set Thumbnail Image </h6>
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
                  </div>
                  <div className="doc_upload">
                    <h6>Uploaded Documents</h6>
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
                              <img src={trash} alt="" />
                            </figure>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>

              {/* {answer2 == "" ? (
                ""
              ) : (
                <p
                  style={{ display: "block", color: "red", fontWeight: "700" }}
                >
                  {answer2}
                </p>
              )} */}

              <div className="button_wrap row">
                <button
                  disabled={submitStatus}
                  className="btn btn-secondary"
                  onClick={(e) => {
                    console.log("clicked");

                    if (
                      contact.p_name != "" &&
                      contact.ps_name != "" &&
                      contact.category != "" &&
                      contact.country != "" &&
                      contact.c_name != "" &&
                      contact.Description != "" &&
                      contact.product_file != "" &&
                      contact.Quantity != "" &&
                      multis_category?.length != 0 &&
                      contact.Creation != ""
                    ) {
                      add_product();
                    } else {
                      check_data?.map((data) => {
                        logins_field(data.name);
                        setanserstyle(true);
                        window.scrollTo(0, 100);
                      });
                      // setAnswerError("Please ill all Question")
                    }
                  }}
                >
                  Submit
                </button>
                <a href="" className="btn btn-primary">
                  Cancel
                </a>
              </div>
              <div className="error-button row justify-content-center">
                <a
                  className="error_icon"
                  href="/supplier-product-showcase"
                  onClick={(e) => {
                    window.scrollTo(0, 100);
                  }}
                >
                  <i className="fa fa-arrow-left left" aria-hidden="true"></i>
                  Back to Product Showcase
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Add_product;
