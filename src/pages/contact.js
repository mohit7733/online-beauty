import React, { useEffect, useState } from 'react'
import { api } from './base_url'

const emailRegex = RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
);

const url = RegExp("^((((h|H)(t|T)|(f|F))(t|T)(p|P)((s|S)?)://[-.\\w]*)|(((w|W){3}\\.)[-.\\w]+))(/?)([-\\w.?,:'/\\\\+=&;%$#@()!~]*)?$");
function Contact() {
    const [theytrusted, settheytrusted] = useState("")
    const [check, setcheck] = useState(true)
    const [contact, setcontact] = useState({
        Email: "",
        MultiLine: "",
        Name_First: "",
        Name_Last: "",
        PhoneNumber_countrycode: "",
        Radio: "",
        SingleLine: "",
        SingleLine1: "",
        SingleLine2: "",
        SingleLine3: "",
        Website: ""
    })
    const [errorfield, seterrorfield] = useState({
        Email: "",
        MultiLine: "",
        Name_First: "",
        Name_Last: "",
        PhoneNumber_countrycode: "",
        Radio: "",
        SingleLine: "",
        SingleLine1: "",
        SingleLine2: "",
        SingleLine3: "",
        Website: ""
    })
    const logins_field2 = (e) => {
        switch (e.target.name) {
            case 'Email':
                errorfield.Email =
                    emailRegex.test(e.target.value) ? "" : "Email not valid.";
                break;
            case 'PhoneNumber_countrycode':
                errorfield.PhoneNumber_countrycode =
                    e.target.value.length <= 9
                        ? "required"
                        : "";
                break;
            case 'Name_First':
                errorfield.Name_First =
                    contact.Name_First == ''
                        ? "required"
                        : "";
                break;
            case 'Name_Last':
                errorfield.Name_Last =
                    contact.Name_Last == ''
                        ? "required"
                        : "";
                break;

            case 'SingleLine2':
                errorfield.SingleLine2 =
                    contact.SingleLine2 == ''
                        ? "required"
                        : "";
                break;
            case 'SingleLine3':
                errorfield.SingleLine3 =
                    contact.SingleLine3 == ''
                        ? "required"
                        : "";
                break;
            case 'Website':
                errorfield.Website =
                    url.test(e.target.value)
                        ? ""
                        : "required";
                break;
            case 'SingleLine':
                errorfield.SingleLine =
                    contact.SingleLine == ''
                        ? "required"
                        : "";
                break;
            case 'SingleLine1':
                errorfield.SingleLine1 =
                    contact.SingleLine1 == ''
                        ? "required"
                        : "";
                break;
            case 'MultiLine':
                errorfield.MultiLine =
                    contact.MultiLine == ''
                        ? "required"
                        : "";
                break;
            case 'Radio':
                errorfield.Radio =
                    contact.Radio == ''
                        ? "required"
                        : "";
                break;
            default:
                break;
        }
        seterrorfield({ ...errorfield })
        setcontact({ ...contact, [e.target.name]: e.target.value })
    }
    const logins_field = (e) => {
        switch (e) {
            case 'Name_First':
                errorfield.Name_First =
                    contact.Name_First == ''
                        ? "required"
                        : "";
                break;
            case 'Name_Last':
                errorfield.Name_Last =
                    contact.Name_Last == ''
                        ? "required"
                        : "";
                break;
            case 'Email':
                errorfield.Email =
                    contact.Email == "" ? "required" : "";
                break;
            case 'PhoneNumber_countrycode':
                errorfield.PhoneNumber_countrycode =
                    contact.PhoneNumber_countrycode == ''
                        ? "required"
                        : "";
                break;
            case 'SingleLine2':
                errorfield.SingleLine2 =
                    contact.SingleLine2 == ''
                        ? "required"
                        : "";
                break;
            case 'SingleLine3':
                errorfield.SingleLine3 =
                    contact.SingleLine3 == ''
                        ? "required"
                        : "";
                break;
            case 'Website':
                errorfield.Website =
                    contact.Website == ''
                        ? "required"
                        : "";
                break;
            case 'SingleLine':
                errorfield.SingleLine =
                    contact.SingleLine == ''
                        ? "required"
                        : "";
                break;
            case 'SingleLine1':
                errorfield.SingleLine1 =
                    contact.SingleLine1 == ''
                        ? "required"
                        : "";
                break;
            case 'MultiLine':
                errorfield.MultiLine =
                    contact.MultiLine == ''
                        ? "required"
                        : "";
                break;
            case 'Radio':
                errorfield.Radio =
                    contact.Radio == ''
                        ? "required"
                        : "";
                break;
            default:
                break;
        }
        seterrorfield({ ...errorfield })
        // setcontact({ ...contact, [e.target.name]: e.target.value })
    }
    const theytrusted_data = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            f_name: contact.Name_First,
            l_name: contact.Name_Last,
            email: contact.Email,
            phone: contact.PhoneNumber_countrycode,
            city: contact.SingleLine2,
            country: contact.SingleLine3,
            website: contact.Website,
            company_name: contact.SingleLine1,
            job_position: contact.SingleLine,
            message: contact.MultiLine,
            youare: contact.Radio
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(api + "/api/sendenquiry", requestOptions)
            .then(response => response.json())
            .then(result => {
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
                settheytrusted(result.message)
            })
            .catch(error => console.log('error', error));
    }
    const check_data = [
        { name: "f_name" },
        { name: "l_name" },
        { name: "email" },
        { name: "phone" },
        { name: "city" },
        { name: "country" },
        { name: "website" },
        { name: "company_name" },
        { name: "job_position" },
        { name: "message" },
        { name: "youare" }
    ]
    useEffect(() => {
        if (check) {
            about_data()
            setcheck(false)
        }
        console.log(errorfield, contact);
    }, [errorfield, contact])


    const [number, setnumber] = useState()
    const about_data = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(api + "/api/contactus", requestOptions)
            .then(response => response.json())
            .then(result => setnumber(result.data))
            .catch(error => console.log('error', error));
    }
  
    return (
        <>
            <div class="breadcrumbs" data-aos="fade-down">
                <div class="container aos-init aos-animate" >
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#"><span>Contact Us</span></a></li>
                    </ul>
                </div>
            </div>
            <div class="create-account  conatct_us" >
                <div class="container" data-aos="fade-up">
                    <h1 class="">Contact Us</h1>
                    <p class="wd-50">For any enquiries regarding our events, please fill the form below and we will reply to you
                        soon.</p>
                    <div class="row justify-content-between">
                        <div class="col_left" data-aos="fade-right">
                            <div class="panel panel-default">
                                <form action='https://forms.zohopublic.eu/healthandbeautyfrance/form/ContactUs/formperma/AEhsrzf8fq_x2TjnQ3QxhaH6wz1DJQ9nr0Slja0r98I/htmlRecords/submit'
                                    name='form' method='POST' onSubmit='javascript:document.charset="UTF-8"; return zf_ValidateAndSubmit();'
                                    accept-charset='UTF-8' enctype='multipart/form-data' id='form' target='_blank'>
                                    <div class="form__wrapper row justify-content-between">
                                        <div class="form-group">
                                            <input required type="text" placeholder="First Name*" name='Name_First' class="form-control" onChange={e => logins_field2(e)} style={errorfield?.Name_First == "" ? {} : { borderBottom: "1px solid red" }} />
                                        </div>
                                        <div class="form-group">
                                            <input required type="text" placeholder="Last Name*" name='Name_Last' class="form-control" onChange={e => logins_field2(e)} style={errorfield?.Name_Last == "" ? {} : { borderBottom: "1px solid red" }} />
                                        </div>
                                        <div class="form-group">
                                            <input required type="text" placeholder="Job Position*" name='SingleLine' class="form-control" onChange={e => logins_field2(e)} style={errorfield?.SingleLine == "" ? {} : { borderBottom: "1px solid red" }} />
                                        </div>
                                        <div class="form-group">
                                            <input required type="text" placeholder="Company Name*" name='SingleLine1' class="form-control" onChange={e => logins_field2(e)} style={errorfield?.SingleLine1 == "" ? {} : { borderBottom: "1px solid red" }} />
                                        </div>
                                        <div class="form-group">
                                            <input required type="email" placeholder="Email Address*" name='Email' class="form-control" onChange={e => logins_field2(e)} style={errorfield?.Email == "" ? {} : { borderBottom: "1px solid red" }} />
                                        </div>
                                        <div class="form-group">
                                            <input required type="text" placeholder="Phone Number*" name='PhoneNumber_countrycode' class="form-control" onChange={e => logins_field2(e)} style={errorfield?.PhoneNumber_countrycode == "" ? {} : { borderBottom: "1px solid red" }} />
                                        </div>
                                        <div class="form-group">
                                            <input required type="text" placeholder="City" name='SingleLine2' class="form-control" onChange={e => logins_field2(e)} style={errorfield?.SingleLine2 == "" ? {} : { borderBottom: "1px solid red" }} />
                                        </div>
                                        <div class="form-group">
                                            <input required type="text" placeholder="Country*" name='SingleLine3' class="form-control" onChange={e => logins_field2(e)} style={errorfield?.SingleLine3 == "" ? {} : { borderBottom: "1px solid red" }} />
                                        </div>
                                        <div class="form-group full">
                                            <input required type="text" placeholder="Website" name='Website' class="form-control" onChange={e => logins_field2(e)} style={errorfield?.Website == "" ? {} : { borderBottom: "1px solid red" }} />
                                        </div>
                                    </div>
                                    <div class="radio_btn">
                                        <p>You are:</p>
                                        <div class="row align-items-center">
                                            <input required type="radio" id="buyer" name="Radio" value="A buyer" onClick={e => logins_field2(e)} />
                                            <label for="buyer">A buyer</label>
                                        </div>
                                        <div class="row align-items-center">
                                            <input required type="radio" id="supplier" name="Radio" value="A supplier" onClick={e => logins_field2(e)} />
                                            <label for="A supplier">A supplier</label>
                                        </div>
                                        <div class="row align-items-center">
                                            <input required type="radio" id="Others" name="Radio" value="Others" onClick={e => logins_field2(e)} />
                                            <label for="javascript">Both</label>
                                        </div>
                                    </div>
                                    <textarea required placeholder="Message*" name='MultiLine' class="form-control" onChange={e => logins_field2(e)} style={errorfield?.MultiLine == "" ? {} : { borderBottom: "1px solid red" }}></textarea>
                                    {/* <input required  type="button" class="btn btn-secondary" placeholder='Submit' name='submit' /> */}
                                    <button class="btn btn-secondary" onClick={theytrusted_data}>Submit</button>
                                </form>
                                {/* <button class="btn btn-secondary"
                                    onClick={e => {
                                        if (contact.f_name == "" || contact.l_name == "" || contact.Email == "" || contact.phone == "" || contact.city == "" || contact.country == "" || contact.website == "" || contact.company_name == "" || contact.job_position == "" || contact.message == "") {
                                            check_data.map((data) => {
                                                logins_field(data.name)
                                            })
                                        } else {
                                            theytrusted_data()
                                        }
                                    }}>
                                    Submit
                                </button> */}
                                <p style={{
                                    marginLeft: "10px", marginRight: "0",
                                    fontSize: "14px"
                                }}>{theytrusted}</p>
                            </div>
                        </div>
                        <div class="col_right" data-aos="fade-left">
                            <div class="direct-contact-container">

                                <ul class="contact-list">
                                    <li class="list-item"><span class="contact-text place">You are a supplier, contact:</span>
                                    </li>
                                    <li class="heading">
                                        <h3>{number?.contactus?.supplier_name}</h3>
                                    </li>
                                    <li class="list-item"><a href="tel:1-212-555-5555" title="Give me a call">{number?.contactus?.supplier_no}</a></li>
                                </ul>
                                <ul class="contact-list">
                                    <li class="list-item"><span class="contact-text place pt-32">You are a buyer,
                                        contact:</span></li>
                                    <li class="heading">
                                        <h3 class="heading">{number?.contactus?.buyer_name}</h3>
                                    </li>
                                    <li class="list-item"><a href="tel:1-212-555-5555" title="Give me a call">{number?.contactus?.buyer_no}</a></li>
                                </ul>
                                <ul class="contact-list">
                                    <li class="list-item"><span class="contact-text mail">Or send us an email:</span></li>
                                    <li class="heading"><a href="mailto:#"
                                        title="Send me an email">{number?.contactus?.admin_email}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default Contact
