import React, { useState } from 'react'
import Left_menu from '../productpages/left_menu'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function Company_information_first() {
    const [editcompany, seteditcompany] = useState(true)
    const navigate = useNavigate();
    return (
        <>
            <div className='company_wrapper product_section container'>
                {
                    editcompany == true ?
                        <div class={"router-body"}>

                            <div class="remark_wrap company_wrap row justify-content-between">
                                <div class="column">
                                    <h2>Company Information</h2>
                                </div>
                                <div class="column">
                                    {/* <p onClick={()=> seteditcompany(true)} >Edit Company Information<img src="images/edit (1).svg" alt="" /></p> */}
                                </div>
                            </div>
                            <div class="form-section">
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Company Name</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Beauty Meetings" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Company Website</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="www.beautymeetings.co.uk" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Industry Name</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Beauty Meetings" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Registration Number</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="1245627561" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Main Office Address</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="123, Lorem ipsum dolor sit amet" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-start">
                                    <div class="left">
                                        <label>Contact 1</label>
                                    </div>
                                    <div class="right pd-bt">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Richard D." />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Job Title" />
                                        </div>
                                        <div class="column">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="12456789451" />
                                            </div>
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="tomallen@gmail.com" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Upload Avtar</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="No File Choosen" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-start">
                                    <div class="left">
                                        <label>Contact 2</label>
                                    </div>
                                    <div class="right pd-bt">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Richard D." />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Job Title" />
                                        </div>
                                        <div class="column">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="12456789451" />
                                            </div>
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="richardd22@gmail.com" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Upload Avtar</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="No File Choosen" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-start">
                                    <div class="left">
                                        <label>About Company</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <textarea name="" class="form-control">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</textarea>
                                            <p
                                                style={{ textAlign: "right", color: "#999999" }}
                                            >0/250</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Facebook</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Twitter</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Instagram</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Linkedin</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Youtube</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Tiktok</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Wechat</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div class="btn_wrapper row">
                                    <Link to="/login" class="btn btn-secondary"
                                    // onClick={e => {
                                    //     navigate("/login")
                                    // }}
                                    >Submit</Link>
                                    <a href="" class="btn btn-primary">Cancel</a>
                                </div>
                            </div>
                        </div> :


                        <div class={"router-body"}>

                            <div class="company_wrap2 remark_wrap company_wrap row justify-content-between">
                                <div class="column">
                                    <h2>Company Information</h2>
                                </div>
                                <div class="column">
                                    <p onClick={() => seteditcompany(true)} style={{ cursor: "pointer" }} >Edit Company Information<img src="images/edit (1).svg" alt="" /></p>
                                </div>
                            </div>
                            <div class="form-section">
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Company Name</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Beauty Meetings" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Company Website</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="www.beautymeetings.co.uk" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Industry Name</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Beauty Meetings" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Registration Number</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="1245627561" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Main Office Address</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="123, Lorem ipsum dolor sit amet" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-start">
                                    <div class="left">
                                        <label>Contact 1</label>
                                    </div>
                                    <div class="right pd-bt">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Richard D." />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Job Title" />
                                        </div>
                                        <div class="column">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="12456789451" />
                                            </div>
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="tomallen@gmail.com" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Upload Avtar</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="No File Choosen" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-start">
                                    <div class="left">
                                        <label>Contact 2</label>
                                    </div>
                                    <div class="right pd-bt">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Richard D." />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Job Title" />
                                        </div>
                                        <div class="column">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="12456789451" />
                                            </div>
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="richardd22@gmail.com" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Upload Avtar</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="No File Choosen" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-start">
                                    <div class="left">
                                        <label>About Company</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <textarea name="" class="form-control">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</textarea>
                                            <p
                                                style={{ textAlign: "right", color: "#999999" }}
                                            >0/250</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Facebook</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Twitter</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Instagram</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Linkedin</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Youtube</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Tiktok</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="left">
                                        <label>Wechat</label>
                                    </div>
                                    <div class="right">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="link here" />
                                        </div>
                                    </div>
                                </div>
                                <div class="btn_wrapper row">
                                    <Link to="/login" class="btn btn-secondary"
                                    // onClick={e => {
                                    //     navigate("/login")
                                    // }}
                                    >Submit</Link>
                                    <a href="" class="btn btn-primary">Cancel</a>
                                </div>
                            </div>
                        </div>
                }
                {/* </div>
            </div> */}
            </div>
        </>
    )
}

export default Company_information_first