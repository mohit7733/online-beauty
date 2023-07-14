import React, { useEffect, useState } from "react";
import { api } from "../base_url";
import Left_menu from "../productpages/left_menu";
import Moment from "react-moment";
import moment from "moment";
import InputWithButton from "../../components/input-with-button/input-with-button";
import { country } from "../dashboard/country";
import { ToastContainer, toast } from "react-toastify";
import Left_menu2 from "./Left_menu2";
import { useNavigate, useParams } from "react-router-dom";
import pdficon from "../../assets/images/pdf_icon.png";
import Select from "react-select";
import trash from "../../assets/images/trash-2.svg";
import axios from "axios";
const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

const url = RegExp(
  "^((((h|H)(t|T)|(f|F))(t|T)(p|P)((s|S)?)://[-.\\w]*)|(((w|W){3}\\.)[-.\\w]+))(/?)([-\\w.?,:'/\\\\+=&;%$#@()!~]*)?$"
);

function Edit_productS(props) {
  const [image, setImage] = useState("");
  const [docx, setdocx] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebar, setsidebar] = useState(true);
  const [psname, setpsname] = useState("");
  const [category, setcategory] = useState("");
  const [editData, setEditData] = useState([]);
  const [submitStatus, setsubmitStatus] = useState(false);
  const [options, setoptions] = useState([]);
  const [oncepush, setonece] = useState(false);
  const [Category_Id, setCategory_Id] = useState("");
  const [Addstyel, setAddstyel] = useState(false);
  const [Addstyel2, setAddstyel2] = useState(false);
  const [answerArray, setanswerArray] = useState([]);


  useEffect(() => {
    console.log(submitStatus, "<<<<<<<<<");

  }, [submitStatus])

  const [selectOptions, setSelectOptions] = useState([]);

  const s_categoryarray = [];
  const s_category_idarray = [];
  const s_category_idarray2 = [];

  function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  selectOptions?.map((item) => {
    s_categoryarray?.push(item?.value);
    if (item?.id != undefined) {
      if (item?.id == s_categoryarray?.map((item) => item)) {
        removeItemAll(s_categoryarray, item?.id);
      } else {
        s_category_idarray?.push(item?.id);
      }
    }
  });

  if (
    /^[\],:{}\s]*$/.test(
      editData?.subcategory_id
        ?.replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    )
  ) {
    var subcategory_id = JSON.parse(editData?.subcategory_id);
    subcategory_id?.map((item) => {
      s_category_idarray2.push(item);
    });
  }

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
    Guarantee: "",
    Creation: "",
    price_range: "",
    questions: [],
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
  });
  const [optionsedit, setoptions2] = useState([]);
  const [dateOfCreation, setDateOfCreation] = useState("");

  const [subcategory, setsubcategory] = useState([]);
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

  const fetch_editProductdetails = () => {
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
    fetch(api + "/api/v1/productsdetails?product_id=" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEditData(result.data);
        if (result?.success == true) {
          setTimeout(() => {
            axios
              .get(
                `${api}/api/subcategory?category_id=${result.data?.category_id}`
              )
              .then((res) => {
                if (res.status == 200) {
                  setsubcategories(res?.data?.subcategory);
                }
              })
              .catch((error) => {
                console.log(error.message);
              });

            contact.p_name = result.data?.product_name;
            contact.ps_name = result.data?.product_short_name;
            contact.category = result.data?.category;
            contact.s_category = result.data?.sub_cat;
            contact.thumb_index = result?.data?.thumb_index != null && result?.data?.thumb_index != "null" ? parseInt(result?.data?.thumb_index) : 0;

            if (
              /^[\],:{}\s]*$/.test(
                result.data?.sub_cat
                  ?.replace(/\\["\\\/bfnrtu]/g, "@")
                  .replace(
                    /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    "]"
                  )
                  .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
              )
            ) {
              var sub_categoryoptions = JSON.parse(result.data?.sub_cat);
              if (oncepush == false) {
                sub_categoryoptions?.map((item) => {
                  if (sub_categoryoptions.length > selectOptions.length) {
                    selectOptions.push({ value: item, label: item });
                  }
                });
              }
            }
            contact.country = result.data?.made_in;
            contact.Description = result.data?.product_dec;
            contact.c_name = result.data?.price_range;
            contact.Policy = result.data?.price_policy;
            contact.Quantity = result.data?.min_quantity;
            contact.Guarantee = result.data?.guarantee;
            contact.Creation = result.data?.date_of_creation;
            contact.product_file2 = result.data?.media_files;
            contact.questions = result.data?.questions;
            contact.thumb_index = result?.data?.thumb_index != null && result?.data?.thumb_index != "null" ? parseInt(result?.data?.thumb_index) : 0;
            contact.yt_link =
              result.data?.youtube_link != "undefined"
                ? result.data?.youtube_link
                : "null";
            result.data?.questions?.map((item) => {
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
                  console.log(optionsedit, ans22, "<<<<<,");
                }
              }
            });
          }, 50);
          setTimeout(() => {
            setcontact({ ...contact });
            setonece(true);
          }, 100);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const imagelimit =
    contact.product_file2?.length + contact.product_file?.length;
  useEffect(() => {
    fetch_editProductdetails();
    setpsname(editData?.product_name);
  }, []);

  // let options = []

  // const handlequestion2 = (e, id, type, pqId) => {
  //   if (type?.toLowerCase() === "checkbox") {
  //     setoptions2((prevOptions) => {
  //       const updatedOptions = [...prevOptions];
  //       const existingOptionIndex = updatedOptions.findIndex(
  //         (option) => option.id === id
  //       );

  //       if (existingOptionIndex > -1) {
  //         const existingOption = updatedOptions[existingOptionIndex];
  //         const existingCheckbox = [...existingOption.checkbox];

  //         if (!existingCheckbox.includes(e.target.value)) {
  //           existingCheckbox.push(e.target.value);
  //         }

  //         updatedOptions[existingOptionIndex] = {
  //           ...existingOption,
  //           checkbox: existingCheckbox,
  //         };
  //       } else {
  //         updatedOptions.push({ id, checkbox: [e.target.value] });
  //       }

  //       return updatedOptions;
  //     });
  //   }

  //   console.log(id, e.target.value);
  //   console.log(type);
  // };

  useEffect(() => {
    // console.log(optionsedit)
    console.log(optionsedit, contact.thumb_index, "debug3");
  }, [handlequestion2]);

  const edit_product = () => {
    setsubmitStatus(true);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    var formdata = new FormData();
    formdata.append("product_name", contact.p_name);
    formdata.append("product_short_name", contact.ps_name);
    formdata.append("category", contact.category);
    formdata.append("sub_cat", JSON.stringify(s_categoryarray));
    //  formdata.append("country", contact.country);
    //  formdata.append("company_name", contact.c_name);
    formdata.append("thumb_index", contact?.thumb_index);

    formdata.append("product_dec", contact.Description);
    formdata.append("made_in", contact.country);
    formdata.append("price_range", contact.c_name);
    if (contact.Policy != null) {
      formdata.append("price_policy", contact?.Policy);
    }
    console.log(contact.yt_link, contact.Guarantee, contact.Policy, "<<<<<<<<");
    formdata.append("min_quantity", contact.Quantity);
    if (contact.Guarantee != null) {
      formdata.append("guarantee", contact?.Guarantee);
    }

    formdata.append(
      "category_id",
      Category_Id == "" ? editData?.category_id : Category_Id
    );

    formdata.append(
      "subcat_id",
      s_category_idarray?.length == 0
        ? JSON.stringify(s_category_idarray2)
        : JSON.stringify(s_category_idarray)
    );
    formdata.append("date_of_creation", dateOfCreation);
    formdata.append("id", editData.id);
    if (contact.yt_link != null) {
      formdata.append("youtube_link", contact.yt_link);
    }

    answerArray?.map((question, index) => {
      formdata.append(`product_question[${index}][id]`, question?.questionId);

      const matchingOption = optionsedit.find(
        (option) => option.id === question?.questionId
      );
      if (matchingOption) {
        formdata.append(
          `product_question[${index}][answer]`,
          JSON.stringify(matchingOption.checkbox)
        );
      } else {
        formdata.append(`product_question[${index}][answer]`, question?.answer);
      }

      formdata.append(
        `product_question[${index}][pqid]`,
        question?.questionPqId
      );
    });
    contact.product_file.map((data) => {
      formdata.append("documents[]", data);
    });
    // formdata.append("documents[]", fileInput.files[0], "/C:/Users/HP/Downloads/Careable Plan Management Advert .docx");
    // formdata.append("documents[]", fileInput.files[0], "/C:/Users/HP/Downloads/63da574cbe414.png");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(api + "/api/edit_product", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success == true) {
          toast.success("Product updated successful!");
          setTimeout(() => {
            navigate("/supplier-product-showcase");
            // window.location.reload();
          }, 2000);
        }
        setImage(result.message);
        if (result?.success == false) {
          toast.error("Please fill all required fields !");
          window.scrollTo(0, 0);
          setsubmitStatus(false);
          setTimeout(() => {
            setImage("");
          }, 5000);
        }
      })
      .catch((error) => {
        toast.error("Please fill all required answers !");
        console.log("error", error);
        setsubmitStatus(false);
      });
  };
  useEffect(() => {
    // console.log(errorfield);
  }, [errorfield, contact, image, contact]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size < 838000) {
        contact.product_file.push(event.target.files[0]);
      } else {
        toast.error("Please upload image size max 800 KB. ");
      }
      setTimeout(() => {
        setcontact({ ...contact });
      }, 400);
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
    // { name: "product_file" },
    { name: "Policy" },
    { name: "Quantity" },
    { name: "Guarantee" },
    { name: "Creation" },
  ];

  const [categories, setcategories] = useState([]);
  // console.log(categories);

  const get_category = () => {
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
    fetch(api + `/api/v1/imagedelete?image_id=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success == true) {
          fetch_editProductdetails();
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    get_category();
  }, []);

  const [subcategories, setsubcategories] = useState([]);

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
        // console.log(itemId);
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

  const handlequestion = (e, id, pq_id) => {
    if (answerArray.filter((data) => data.questionId == id)[0]) {
      answerArray.filter((data) => data.questionId == id)[0].answer =
        e.target.value;
    } else {
      answerArray.push({
        answer: e.target.value,
        questionId: id,
        questionPqId: pq_id,
      });
    }
    console.log(answerArray);
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
                  <a href="/dashboard">
                    {/* {localStorage.getItem("user_type") == "Both"
                      ? props.supplier
                      : localStorage.getItem("user_type")} */}
                    Supplier
                  </a>
                </li>
                <li>
                  <a href="/supplier-product-showcase">
                    <span>Product Showcase</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>Edit Product</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="product_prfile">
              <h1>Edit Product</h1>
              <div className="row">
                <div className="col_left">
                  <div className="panel">
                    <div className="form-group full">
                      <input
                        type="text"
                        placeholder="Product Full Name *"
                        className="form-control"
                        value={contact.p_name}
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
                        value={contact.ps_name}
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
                          name="category"
                          value={contact?.category}
                          onChange={(e) => {
                            logins_field2(e);
                            selcetcate(e.target.value);
                          }}
                          disabled={selectOptions?.length >= 1 ? true : false}
                        >
                          {categories?.map((data, index) => {
                            return (
                              <>
                                {data?.category_name == null ? (
                                  <option value="">Category *</option>
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
                      className="form-group full "
                      style={
                        selectOptions.length == 0
                          ? {
                            borderBottom: "1px solid red",
                            borderRadius: "43px",
                          }
                          : {}
                      }
                    >
                      {selectOptions?.length > 2 ? (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          Select maximum 3 options.
                        </p>
                      ) : (
                        ""
                      )}

                      <Select
                        isObject={false}
                        options={subcategoriesoptions}
                        isMulti
                        // defaultValue={selectOptions}
                        value={selectOptions}
                        name="colors"
                        className="Company_sector2 basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Sub-Category *"
                        // isOptionDisabled={() => selectOptions?.length >= 3}
                        onChange={(Option) => {
                          if (selectOptions?.length <= 2) {
                            setSelectOptions(Option);
                          }
                        }}
                      // onEditOption={handleEditOption}
                      />
                    </div>

                    <div className="form-group full">
                      <div className="custom-select">
                        <select
                          name="country"
                          value={contact?.country}
                          onChange={(e) => logins_field2(e)}
                          style={
                            errorfield?.country == ""
                              ? {}
                              : { borderBottom: "1px solid red" }
                          }
                        >
                          <option value="">Made In *</option>
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

                    <div className="form-group full">
                      <input
                        type="text"
                        placeholder="Price Range *"
                        value={contact.c_name != null ? contact.c_name : ""}
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
                      maxlength="100"
                      className="form-control"
                      name="Policy"
                      placeholder="Price Policy"
                      value={contact?.Policy == null ? "" : contact?.Policy}
                      onChange={(e) => logins_field2(e)}
                    // style={
                    //   errorfield?.Policy == ""
                    //     ? {}
                    //     : { borderBottom: "1px solid red" }
                    // }
                    ></textarea>
                    <p className="limit">{contact?.Policy?.length}/100</p>
                    <div className="form-group full">
                      <input
                        type="text"
                        placeholder="Minimum Quantity *"
                        value={contact.Quantity}
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
                        value={
                          contact?.Guarantee != "null" ? contact.Guarantee : ""
                        }
                        className="form-control"
                        name="Guarantee"
                        onChange={(e) => logins_field2(e)}
                        style={
                          errorfield?.Guarantee == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div>
                    {/* <div className="form-group full">
                      <input
                        type="text"
                        placeholder="Date Of Creation *"
                        value={contact?.Creation}
                        className="form-control"
                        name="Creation"
                        onChange={(e) => logins_field2(e)}
                        style={
                          errorfield?.Creation == ""
                            ? {}
                            : { borderBottom: "1px solid red" }
                        }
                      />
                    </div> */}


                    <div className="form-group full">
                      <input
                        type="date"
                        placeholder="Date Of Creation *"
                        className="form-control"
                        name="Creation"
                        maxLength={8}
                        onChange={(e) => {
                          const { value } = e.target;
                          console.log(value, "value")
                          // console.log(dateOfCreation , anserstyle)
                          setDateOfCreation(moment(value).format('DD-MM-YYYY'));
                          // const cleanedValue = value.replace(/\D/g, ''); // Remove non-digit characters
                          // const formattedValue = cleanedValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'); // Format as MM/DD/YYYY
                          e.target.value = formattedValue;
                          logins_field2(e);
                          setdatemess(true);
                        }}

                      />

                      {/* {errorme == "" ? (
                        ""
                      ) : datemess ? (
                        <p className="errordate">
                          {" "}
                          Please enter the date in the format "dd/mm/yy"
                        </p>
                      ) : (
                        ""
                      )} */}
                    </div>




                    <textarea
                      maxlength="250"
                      className="form-control"
                      name="Description"
                      value={contact?.Description}
                      placeholder="Product Profile Description *"
                      onChange={(e) => logins_field2(e)}
                      style={
                        errorfield?.Description == ""
                          ? {}
                          : { borderBottom: "1px solid red" }
                      }
                    ></textarea>
                    <p className="limit">{contact?.Description?.length}/250</p>
                  </div>

                  {editData.questions?.map((item, index) => {
                    // console.log(item , item.id,
                    //   item?.product_question_id);
                    return (
                      <div className="radio_section">
                        <p>
                          Q {index + 1}.{" " + item?.question}
                        </p>
                        <div className="radio_btn">
                          {item?.type == "Subjective" ||
                            item?.type.toLowerCase() === "textarea" ? (
                            <textarea
                              className="form-control"
                              name="Policy"
                              placeholder="Your Answer *"
                              // defaultValue={
                              //   contact?.questions?.filter(
                              //     (data) =>
                              //       data?.product_question_id ==
                              //       item?.product_question_id
                              //   )[0]?.answer
                              // }
                              defaultValue={
                                contact?.questions?.filter(
                                  (data) =>
                                    data?.id ==
                                    item?.id
                                )[0]?.answer
                              }
                              onChange={(e) => {
                                handlequestion(
                                  e,
                                  item.id,
                                  item?.product_question_id
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
                                )[0]?.answer === "" && Addstyel2 == true
                                  ? { borderBottom: "1px solid red" }
                                  : {}
                              }
                            ></textarea>
                          ) : (
                            ""
                          )}
                          {item?.type.toLowerCase() === "select" ? (
                            <div className="custom-select">
                              <select
                                defaultValue={item?.answer}
                                onChange={(e) => {
                                  handlequestion(
                                    e,
                                    item.id,
                                    item?.product_question_id
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
                                    <div
                                      className="align-items-center"
                                    // style={
                                    //   optionsedit?.length < 1 &&
                                    //   Addstyel == true
                                    //     ? { borderBottom: "1px solid red" }
                                    //     : {}
                                    // }
                                    >
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
                                            id={"op" + `question${item.id}`}
                                            defaultChecked={
                                              item?.answer == option
                                            }
                                            value={option}
                                            name={`question${item.id}`}
                                            onClick={(e) => {
                                              handlequestion(
                                                e,
                                                item.id,
                                                item?.product_question_id
                                              );
                                              handlequestion2(
                                                e,
                                                item.id,
                                                item?.type,
                                                item?.product_question_id
                                              );
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <input
                                          // id={}
                                          type={
                                            item?.type.toLowerCase() !==
                                              "objective"
                                              ? "Checkbox"
                                              : "radio"
                                          }
                                          id={"op" + indexkey}
                                          name={"fav_language" + indexkey}
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
                                              item?.product_question_id
                                            );
                                            handlequestion2(
                                              e,
                                              item.id,
                                              item?.type,
                                              item?.product_question_id
                                            );
                                            setAddstyel(true);
                                          }}
                                        />
                                      )}

                                      <label
                                        for="Lorem Ipsum A"
                                        style={
                                          optionsedit?.filter((item3) => {
                                            return item3?.id == item.id;
                                          })[0]?.checkbox?.length == 0 &&
                                            optionsedit?.filter((item2) => {
                                              return item2?.id == item.id;
                                            })[0]?.id == item.id &&
                                            item?.type.toLowerCase() == "checkbox"
                                            ? {
                                              borderBottom: "1px solid red",
                                            }
                                            : {}
                                        }
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
                  <h6>Product Images</h6>
                  <div
                    className="data_upload"
                    style={
                      imagelimit != 0 ? {} : { borderBottom: "1px solid red" }
                    }
                  >
                    <input
                      type={"file"}
                      disabled={imagelimit >= 6 ? true : false}
                      name="product_file"
                      onChange={(e) => {
                        seterrorfield({ ...errorfield, product_file: "" });
                        onImageChange(e);
                      }}
                      accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf,application/msword ,application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    />
                    <img src="images/profile_upload.svg" alt="" />
                    <h4>
                      Upload Image or <br />
                      Document
                      <br />
                      <p>
                        {" "}
                        Image <span style={{ color: "red" }}>*</span> , Document
                        Size : 800kb{" "}
                      </p>
                      <p style={imagelimit >= 6 ? { color: "red" } : {}}>
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
                                delete_image(data?.image_id);
                                deletedata(index);
                              }}
                            >
                              <img src={trash} alt="" />
                            </figure>
                          </div>
                        );
                      }
                    })}
                    {/* {
     editData?.media_files.map((data, index) => {
        if (data['type']?.split('/')[0] === 'image') {
            return (
                <div className="thumb_inner row align-items-center">
                    <input type="radio" id="profile" name="thumb" value="" />
                    <figure className="center"><img src={URL.createObjectURL(data)} alt="" /></figure>
                    <p>{data.name}</p>
                    <figure onClick={e => {
                        deletedata(index)
                    }}><img src="images/trash-2.svg" alt="" /></figure>
                </div>
            )
        }
    })
} */}
                  </div>
                  <div className="doc_upload">
                    <h6>Uploaded Documents</h6>
                    {contact?.product_file2.map((data, index) => {
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
                        return (
                          <div className="inner_doc row align-items-center">
                            <figure>
                              <img src={pdficon} alt="" />
                            </figure>
                            <p>{"Uploaded doc"}</p>
                            <figure
                              onClick={(e) => {
                                delete_image(data?.image_id);
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
                        return (
                          <div className="inner_doc row align-items-center">
                            <figure>
                              <img src={pdficon} alt="" />
                            </figure>
                            <p>{"Uploaded doc"}</p>
                            <figure
                              onClick={(e) => {
                                delete_image(data?.image_id);
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

              <div className="button_wrap row">
                <button
                  disabled={submitStatus}
                  className="btn btn-secondary"
                  type="button"
                  onClick={(e) => {
                    console.log("clicked");
                    if (
                      // errorfield?.p_name == ""
                      contact.p_name == "" &&
                      contact.ps_name == "" &&
                      contact.category == "" &&
                      contact.s_category == "" &&
                      contact.country == "" &&
                      contact.c_name == "" &&
                      contact.Description == "" &&
                      // contact.product_file == "" &&
                      contact.thumb == "" &&
                      errorfield?.c_name == "" &&
                      contact.Quantity == "" &&
                      contact.Creation == ""
                      // errorfield?.c_name == ""
                    ) {
                      check_data?.map((data) => {
                        logins_field(data.name);
                      });
                      window.scrollTo(0, 100);
                      // alert("error")
                    } else {
                      if (imagelimit != 0 && selectOptions.length != 0 && submitStatus == false) {
                        edit_product();
                      } else {
                        window.scrollTo(0, 100);
                      }
                    }
                  }}
                >
                  Submit
                </button>
                <a href="/dashboard/user-manegment" className="btn btn-primary">
                  Cancel
                </a>
              </div>
              <div className="error-button row justify-content-center">
                <a className="error_icon" href="/dashboard/user-manegment">
                  <i className="fa fa-arrow-left left" aria-hidden="true"></i>
                  Back to Product Showcase
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <span className="scroll-up active" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-chevron-up" aria-hidden="true"></i></span> */}
    </>
  );
}

export default Edit_productS;
