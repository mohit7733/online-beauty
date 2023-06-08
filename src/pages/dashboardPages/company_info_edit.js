import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Left_menu2 from './Left_menu2';

function Company_info_edit() {
    const [sidebar, setsidebar] = useState(true);
    const navigate =useNavigate()

  return (
    <div className="company_wrapper product_section Meeting_wrap profile_popup">
        <div className="main"> 
        <Left_menu2 sidebar={sidebar} setsidebar={setsidebar} />
        <div className={(sidebar ? "active " : " ") + "router-body"}>
                <div className="breadcrumbs" data-aos="fade-down">
                    <ul>
                        <li><a href="/dashboard/user-manegment">Dashboard </a></li>
                        <li><a href="/">My Profile</a></li>
                        <li><a  style={{cursor:"pointer"}}><span> Company Information </span></a></li>
                        <li><a href="#"><span> Edit Company Information </span></a></li>
                    </ul>
                </div>
                <div className="remark_wrap company_wrap row justify-content-between">
                    <div className="column">
                        <h2>Company Information</h2>
                    </div>
                    <div className="column">
                        {/* <p onClick={()=> seteditcompany(true)} >Edit Company Information<img src="images/edit (1).svg" alt="" /></p> */}
                    </div>
                </div>
                <div className="form-section">
                    <div className="form-row align-items-center">
                        <div className="left">
                            <label>Company Name</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Beauty Meetings" />
                            </div>
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                        <div className="left">
                            <label>Company Website</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="www.beautymeetings.co.uk" />
                            </div>
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                        <div className="left">
                            <label>Industry Name</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Beauty Meetings" />
                            </div>
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                        <div className="left">
                            <label>Registration Number</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="1245627561" />
                            </div>
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                        <div className="left">
                            <label>Main Office Address</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="123, Lorem ipsum dolor sit amet" />
                            </div>
                        </div>
                    </div>
                    <div className="form-row align-items-start">
                        <div className="left">
                            <label>Contact 1</label>
                        </div>
                        <div className="right pd-bt">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Richard D." />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Job Title" />
                            </div>
                            <div className="column">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="12456789451" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="tomallen@gmail.com" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                        <div className="left">
                            <label>Upload Avtar</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="No File Choosen" />
                            </div>
                        </div>
                    </div>
                    <div className="form-row align-items-start">
                        <div className="left">
                            <label>Contact 2</label>
                        </div>
                        <div className="right pd-bt">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Richard D." />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Job Title" />
                            </div>
                            <div className="column">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="12456789451" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="richardd22@gmail.com" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                        <div className="left">
                            <label>Upload Avtar</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="No File Choosen" />
                            </div>
                        </div>
                    </div>
                    <div className="form-row align-items-start">
                        <div className="left">
                            <label>About Company</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <textarea name="" className="form-control">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</textarea>
                                <p 
                                style={{textAlign: "right", color: "#999999"}}
                                >0/250</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                        <div className="left">
                            <label>Facebook</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="link here" />
                            </div>
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                        <div className="left">
                            <label>Twitter</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="link here" />
                            </div>
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                        <div className="left">
                            <label>Instagram</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="link here" />
                            </div>
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                        <div className="left">
                            <label>Linkedin</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="link here" />
                            </div>
                        </div>
                    </div>
                    <div className="form-row align-items-center">
                        <div className="left">
                            <label>Youtube</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="link here" />
                            </div>
                        </div>
                    </div>  
                    <div className="form-row align-items-center">
                        <div className="left">
                            <label>Tiktok</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="link here" />
                            </div>
                        </div>
                    </div> 
                    <div className="form-row align-items-center">
                        <div className="left">
                            <label>Wechat</label>
                        </div>
                        <div className="right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="link here" />
                            </div>
                        </div>
                    </div> 
                    <div className="btn_wrapper row">
                        <a href="" className="btn btn-secondary">Submit</a>
                        <a onClick={()=>navigate(-1)} className="btn btn-primary">Cancel</a>
                    </div>
                </div>
            </div>

    </div>
    </div>
  )
}

export default Company_info_edit