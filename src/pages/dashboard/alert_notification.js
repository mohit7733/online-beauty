import React from 'react'

function Alert_notification(props) {
    console.log(props);
  return (
                <div class={(props.sidebar ? "active " : " ") + "for_padding router-body"} >
    
    
                <div class="alerthanding_fix breadcrumbs row justify-content-between" data-aos="fade-down">
                    <ul>
                        <li><a href="#" > Dashboard </a></li>
                        <li><a href="#" > 
                        {localStorage.getItem("user_type") == "Both" ? props.supplier  : localStorage.getItem("user_type")  } 
                          </a></li>
                        <li><a href="#"><span > Alert  Notification</span></a></li>
                    </ul>
                    <a href="" class="default" style={{color:"#19A0DD"}}>Clear All</a>
                </div>
               <ul class="notification_wrapper">
                <li class="row justify-content-between">
                    <div class="column_left">
                        <figure>
                        <img src="images/auther_1.jpg" alt="" />
                        </figure>
                        <p><span>Lorem ipsum dolor sit amet dummy text</span></p>
                    </div>
                    <div class="column_right">
                        <p>Now</p>
                        <img src="images/trash-2.svg" alt="" />
                    </div>
                </li>
                <li class="row justify-content-between">
                    <div class="column_left">
                        <figure>
                        <img src="images/auther_2.jpg" alt="" />
                        </figure>
                        <p><span>Lorem ipsum dolor sit amet dummy text</span></p>
                    </div>
                    <div class="column_right">
                        <p>2 min ago</p>
                        <img src="images/trash-2.svg" alt="" />
                    </div>
                </li>
                <li class="row justify-content-between">
                    <div class="column_left">
                        <figure>
                        <img src="images/auther_1.jpg" alt="" />
                        </figure>
                        <p><span>Lorem ipsum dolor sit amet dummy text</span></p>
                    </div>
                    <div class="column_right">
                        <p>5 min ago</p>
                        <img src="images/trash-2.svg" alt="" />
                    </div>
                </li>
                <li class="row justify-content-between">
                    <div class="column_left">
                        <figure>
                        <img src="images/auther_2.jpg" alt="" />
                        </figure>
                        <p><span>Lorem ipsum dolor sit amet dummy text</span></p>
                    </div>
                    <div class="column_right">
                        <p>1 day ago</p>
                        <img src="images/trash-2.svg" alt="" />
                    </div>
                </li>
                <li class="row justify-content-between">
                    <div class="column_left">
                        <figure>
                        <img src="images/auther_1.jpg" alt="" />
                        </figure>
                        <p><span>Lorem ipsum dolor sit amet dummy text</span></p>
                    </div>
                    <div class="column_right">
                        <p>2 days ago</p>
                        <img src="images/trash-2.svg" alt="" />
                    </div>
                </li>
                <li class="row justify-content-between">
                    <div class="column_left">
                        <figure>
                        <img src="images/auther_2.jpg" alt="" />
                        </figure>
                        <p><span>Lorem ipsum dolor sit amet dummy text</span></p>
                    </div>
                    <div class="column_right">
                        <p>5 days ago</p>
                        <img src="images/trash-2.svg" alt="" />
                    </div>
                </li>
               </ul>
            



    </div>
  )
}

export default Alert_notification