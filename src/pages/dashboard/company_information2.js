import React, { useEffect, useState } from 'react'
import Left_menu from '../productpages/left_menu'
import { api } from "../base_url";

function Company_information(props) {
    const [editcompany, seteditcompany] = useState(false);
    const [cInfo, setCInfo] = useState({});
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    function onChangeValues (e) { 
        if(e.target.files) {
            setCInfo({...cInfo, [e.target.name] : e.target.files[0]});
        }else {
            setCInfo({...cInfo, [e.target.name] : e.target.value});
        }
    }

    function getCompanyInfo() {
        console.log("getCompanyInfo called")
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
            api + "/api/company-detail",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setCInfo(result.data);
            })
            .catch((error) => console.log("error", error));
    }


    function editCompanyInfo(event) {
        console.log("asd", event.target["company_name"].value);
        var formvalues = new FormData();
        //formvalues = {...formvalues , ...cInfo};
        for( let key in cInfo){
            formvalues.append(key, cInfo[key]);
        }
        console.log(formvalues);
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer " + localStorage.getItem("token")
        );
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            body: formvalues
        };
        fetch(
            api + "/api/company-information_edit",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                if(result.success){
                    setCInfo(result.data)
                }else {
                    event.preventDefault();
                    setSuccessMsg(result.message)
                }
            })
            .catch((error) => {
                setErrMsg(error);
                console.log("error", error)
            });
    }

    useEffect(() => {
        console.log("props.pageType", props.pageType);
        if (props.pageType !== "new") {
            getCompanyInfo();
            
        }else {
            seteditcompany(true);
        }
        if (props.pageType === "edit") {
            seteditcompany(false)
        }
    },[])

    return (
        <>
        <div style={{width: "100%"}}>
        {
            cInfo ? 
            
            <div class={(props.sidebar ? "active " : " ") + "router-body"}>
                <div class="breadcrumbs" data-aos="fade-down">
                    <ul>
                        <li><a href="/">Dashboard </a></li>
                        <li><a href="/">My Profile</a></li>
                        <li><a onClick={() => seteditcompany(false)} style={{ cursor: "pointer" }}><span> Company Information </span></a></li>
                        <li><a href="#"><span> Edit Company Information </span></a></li>
                    </ul>
                </div>
                <div class="remark_wrap company_wrap row justify-content-between">
                    <div class="column">
                        <h2>Company Information</h2>
                    </div>
                    {
                        editcompany ?
                            null :
                            <div class="column">
                                <p><a onClick={() => seteditcompany(true)} >Edit Company Information<img src="images/edit (1).svg" alt="" /></a></p>
                            </div>
                    }
                </div>
                <div class="form-section">
                    <form onSubmit={(e) => { e.preventDefault(); editCompanyInfo(e) }}>
                        <div class="form-row align-items-center">
                            <div class="left">
                                <label>Company Name</label>
                            </div>
                            <div class="right">
                                <div class="form-group">
                                    <input type="text" name="company_name" value={cInfo?.company_name} onChange={onChangeValues} className={editcompany ? "form-control" : "form-control disabled"} placeholder="Beauty Meetings" disabled={!editcompany} />
                                </div>
                            </div>
                        </div>
                        <div class="form-row align-items-center">
                            <div class="left">
                                <label>Brand Name</label>
                            </div>
                            <div class="right">
                                <div class="form-group">
                                    <input type="text" className={editcompany ? "form-control" : "form-control disabled"} name="brand_name" onChange={onChangeValues} value={cInfo?.brand_name} placeholder="Beauty Meetings" disabled={!editcompany} />
                                </div>
                            </div>
                        </div>
                        <div class="form-row align-items-center">
                            <div class="left">
                                <label>Brand Logo</label><br />
                                <span className='sub-label'>File Type: JPEG, PNG <br />
                                    Size: Max 800kb</span>
                            </div>
                            <div class="right">
                                <div class="form-group">
                                    {
                                        cInfo?.brand_logo && !editcompany ?
                                            cInfo?.brand_logo
                                            :
                                            <input type="file" name="brand_logo" onChange={onChangeValues} className="form-control" placeholder="Beauty Meetings" />
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="form-row align-items-start">
                            <div class="left">
                                <label>Head Office Address</label>
                            </div>
                            <div class="right pd-bt">
                                <div class="form-group">
                                    <input type="text" name="address1" onChange={onChangeValues} value={cInfo?.address1} className={editcompany ? "form-control" : "form-control disabled"} placeholder="Address line 1" disabled={!editcompany} />
                                </div>
                                <div class="form-group">
                                    <input type="text" name="address2" onChange={onChangeValues} value={cInfo?.address2} className={editcompany ? "form-control" : "form-control disabled"} placeholder="Address line 2" disabled={!editcompany} />
                                </div>
                                <div class="form-group">
                                    <input type="text" name="address3" onChange={onChangeValues} value={cInfo?.address3} className={editcompany ? "form-control" : "form-control disabled"} placeholder="Address line 3" disabled={!editcompany} />
                                </div>
                                <div class="form-group">
                                    <input type="text" name="post_code" onChange={onChangeValues} value={cInfo?.post_code} className={editcompany ? "form-control" : "form-control disabled"} placeholder="Postal Code" disabled={!editcompany} />
                                </div>
                                <div class="form-group">
                                    <input type="text" name="city" onChange={onChangeValues} value={cInfo?.city} className={editcompany ? "form-control" : "form-control disabled"} placeholder="City" disabled={!editcompany} />
                                </div>
                                <div class="form-group">
                                    <input type="text" name="state" onChange={onChangeValues} value={cInfo?.state} className={editcompany ? "form-control" : "form-control disabled"} placeholder="State" disabled={!editcompany} />
                                </div>
                                <div class="form-group">
                                    <select className={editcompany ? "form-control" : "form-control disabled"} name="country" value={cInfo?.country} disabled={!editcompany} onChange={onChangeValues}>
                                        <option>Select Country</option>
                                        <option value="france">France</option>
                                        <option value="india">India</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <input type="text" name="country_code" onChange={onChangeValues} value={cInfo?.country_code} className={editcompany ? "form-control" : "form-control disabled"} placeholder="Country Code" disabled={!editcompany} />
                                </div>
                                <div class="form-group">
                                    <input type="checkbox" />
                                    <label>Copy the address to Billing Information</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-row align-items-start">
                            <div class="left">
                                <label>Contact 1</label>
                            </div>
                            <div class="right pd-bt">
                                <div class="form-group">
                                    <input type="text" name="contact1_name" onChange={onChangeValues} value={cInfo?.contact1_name} className={editcompany ? "form-control" : "form-control disabled"} placeholder="Full Name" disabled={!editcompany} />
                                </div>
                                <div class="form-group">
                                    <input type="text" name="contact1_job" onChange={onChangeValues} value={cInfo?.contact1_job} className={editcompany ? "form-control" : "form-control disabled"} placeholder="Job Title" disabled={!editcompany} />
                                </div>
                                <div className='column'>
                                    <div class="form-group">
                                        {/* <select className={editcompany ? "form-control" : "form-control disabled"} name="county" value={cInfo?.county} disabled={!editcompany} onChange={onChangeValues}>
                                            <option>Select</option>
                                            <option value="+91">+91</option>
                                        </select> */}
                                        <input type="text" name="contact1_phone" onChange={onChangeValues} value={cInfo?.contact1_phone} className={editcompany ? "form-control" : "form-control disabled"} placeholder="Phone Number" disabled={!editcompany} />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="contact1_email" onChange={onChangeValues} value={cInfo?.contact1_email} className={editcompany ? "form-control" : "form-control disabled"} placeholder="Email Address" disabled={!editcompany} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-row align-items-center">
                            <div class="left">
                                <label>Upload Profile Photo</label><br />
                                <span className='sub-label'>File Type: JPEG, PNG <br />
                                    Size: Max 800kb</span>
                            </div>
                            <div class="right">
                                <div class="form-group">
                                    {cInfo?.contact1_image && !editcompany?
                                        cInfo?.contact1_image
                                        :
                                        <input type="file" name="contact1_image" onChange={onChangeValues} class="form-control" placeholder="Choose Profile Photo" onChange={onChangeValues} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="form-row align-items-start">
                            <div class="left">
                                <label>Contact 2</label>
                            </div>
                            <div class="right pd-bt">
                                <div class="form-group">
                                    <input type="text" name="contact2_name" onChange={onChangeValues} value={cInfo?.contact2_name} className={editcompany ? "form-control" : "form-control disabled"} placeholder="Full Name" disabled={!editcompany} />
                                </div>
                                <div class="form-group">
                                    <input type="text" name="contact2_job" onChange={onChangeValues} value={cInfo?.contact2_job} className={editcompany ? "form-control" : "form-control disabled"} placeholder="Job Title" disabled={!editcompany} />
                                </div>
                                <div className='column'>
                                    <div class="form-group">
                                        <input type="text" name="contact2_phone" onChange={onChangeValues} value={cInfo?.contact2_phone} className={editcompany ? "form-control" : "form-control disabled"} placeholder="Phone Number" disabled={!editcompany} />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="contact2_email" onChange={onChangeValues} value={cInfo?.contact2_email} className={editcompany ? "form-control" : "form-control disabled"} placeholder="Email Address" disabled={!editcompany} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-row align-items-center">
                            <div class="left">
                                <label>Upload Profile Photo</label><br />
                                <span className='sub-label'>File Type: JPEG, PNG <br />
                                    Size: Max 800kb</span>
                            </div>
                            <div class="right">
                                <div class="form-group">
                                    {cInfo?.contact2_image && !editcompany?
                                        cInfo?.contact2_image
                                        :
                                        <input type="file" name="contact2_image" class="form-control" onChange={onChangeValues} placeholder="Choose Profile Photo" disabled={!editcompany} readOnly={editcompany} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="form-row align-items-center">
                            <div class="left">
                                <label>Company Website</label>
                            </div>
                            <div class="right">
                                <div class="form-group">
                                    <input type="text" name="website" onChange={onChangeValues} value={cInfo?.website} className={editcompany ? "form-control" : "form-control disabled"} placeholder="www.beautymeetings.co.uk" disabled={!editcompany} />
                                </div>
                            </div>
                        </div>
                        <div class="form-row align-items-center">
                            <div class="left">
                                <label>Facebook</label>
                            </div>
                            <div class="right">
                                <div class="form-group">
                                    <input type="text" name="facebook" onChange={onChangeValues} value={cInfo?.facebook} className={editcompany ? "form-control" : "form-control disabled"} placeholder="link here" disabled={!editcompany} />
                                </div>
                            </div>
                        </div>
                        <div class="form-row align-items-center">
                            <div class="left">
                                <label>Instagram</label>
                            </div>
                            <div class="right">
                                <div class="form-group">
                                    <input type="text" name="instagram" onChange={onChangeValues} value={cInfo?.instagram} className={editcompany ? "form-control" : "form-control disabled"} placeholder="link here" disabled={!editcompany} />
                                </div>
                            </div>
                        </div>
                        <div class="form-row align-items-center">
                            <div class="left">
                                <label>Linkedin</label>
                            </div>
                            <div class="right">
                                <div class="form-group">
                                    <input type="text" name="linkedin" onChange={onChangeValues} value={cInfo?.linkedin} className={editcompany ? "form-control" : "form-control disabled"} placeholder="link here" disabled={!editcompany} />
                                </div>
                            </div>
                        </div>
                        <div class="form-row align-items-center">
                            <div class="left">
                                <label>Youtube</label>
                            </div>
                            <div class="right">
                                <div class="form-group">
                                    <input type="text" name="youtube" onChange={onChangeValues} value={cInfo?.youtube} className={editcompany ? "form-control" : "form-control disabled"} placeholder="link here" disabled={!editcompany} />
                                </div>
                            </div>
                        </div>
                        {
                            successMsg !== "" ?
                            <p className='success'>{successMsg}</p>
                            : null
                        }
                        {
                            errMsg !== "" ?
                            <p className='error'>{errMsg}</p>
                            : null
                        }
                        {
                            editcompany ?
                                <div class="btn_wrapper row">
                                    <button class="btn btn-secondary" type="submit">Submit</button>
                                    <button class="btn btn-primary">Cancel</button>
                                </div>
                                : null
                        }
                    </form>
                </div>
            </div>
            : null
        }
        </div>
        </>
    )
}

export default Company_information