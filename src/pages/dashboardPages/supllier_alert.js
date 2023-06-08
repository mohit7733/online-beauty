import React, { useState } from 'react'
import Left_menu2 from './Left_menu2';

function Alert_Supllier(props) {
    const [sidebar ,setsidebar] = useState(false)
    return (
    <div
    className="product_showcase supplier_pending_wrap Meeting_wrap"
    >
                <div className="main">
                <Left_menu2 sidebar={sidebar} setsidebar={setsidebar} />
                <div className={sidebar ? "active router-body" :" for_padding router-body"}>    
                <div className="alerthanding_fix breadcrumbs row justify-content-between" data-aos="fade-down">
                    <ul>
                        <li><a href="/dashboard" > Dashboard </a></li>
                        <li><a href="#" > 
                        {/* {localStorage.getItem("user_type") == "Both" ? props.supplier  : localStorage.getItem("user_type")  }  */}
                        Supplier
                          </a></li>
                        <li><a href="#"><span > Alert  Notification</span></a></li>
                    </ul>
                    <a href="" className="default" style={{color:"#19A0DD"}}>Clear All</a>
                </div>
               <ul className="notification_wrapper">
                <li className="row justify-content-between">
                    <div className="column_left">
                        <figure>
                        <img src="images/auther_1.jpg" alt="" />
                        </figure>
                        <p><span>Lorem ipsum dolor sit amet dummy text</span></p>
                    </div>
                    <div className="column_right">
                        <p>Now</p>
                        <img src="images/trash-2.svg" alt="" />
                    </div>
                </li>
                <li className="row justify-content-between">
                    <div className="column_left">
                        <figure>
                        <img src="images/auther_2.jpg" alt="" />
                        </figure>
                        <p><span>Lorem ipsum dolor sit amet dummy text</span></p>
                    </div>
                    <div className="column_right">
                        <p>2 min ago</p>
                        <img src="images/trash-2.svg" alt="" />
                    </div>
                </li>
                <li className="row justify-content-between">
                    <div className="column_left">
                        <figure>
                        <img src="images/auther_1.jpg" alt="" />
                        </figure>
                        <p><span>Lorem ipsum dolor sit amet dummy text</span></p>
                    </div>
                    <div className="column_right">
                        <p>5 min ago</p>
                        <img src="images/trash-2.svg" alt="" />
                    </div>
                </li>
                <li className="row justify-content-between">
                    <div className="column_left">
                        <figure>
                        <img src="images/auther_2.jpg" alt="" />
                        </figure>
                        <p><span>Lorem ipsum dolor sit amet dummy text</span></p>
                    </div>
                    <div className="column_right">
                        <p>1 day ago</p>
                        <img src="images/trash-2.svg" alt="" />
                    </div>
                </li>
                <li className="row justify-content-between">
                    <div className="column_left">
                        <figure>
                        <img src="images/auther_1.jpg" alt="" />
                        </figure>
                        <p><span>Lorem ipsum dolor sit amet dummy text</span></p>
                    </div>
                    <div className="column_right">
                        <p>2 days ago</p>
                        <img src="images/trash-2.svg" alt="" />
                    </div>
                </li>
                <li className="row justify-content-between">
                    <div className="column_left">
                        <figure>
                        <img src="images/auther_2.jpg" alt="" />
                        </figure>
                        <p><span>Lorem ipsum dolor sit amet dummy text</span></p>
                    </div>
                    <div className="column_right">
                        <p>5 days ago</p>
                        <img src="images/trash-2.svg" alt="" />
                    </div>
                </li>
               </ul>
            



    </div>
    </div>
    </div>
  )
}

export default Alert_Supllier