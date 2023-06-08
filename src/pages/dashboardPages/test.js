import React, { useState } from "react";
import Left_menu from "../productpages/left_menu";

function Test() {
    const [sidebar, setsidebar] = useState(true);

  return (
    <div className="Payment_form_Wrapper Meeting_wrap profile_popup">
      <div className="main">
      <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
        <div className={sidebar ? "active router-body" : "router-body"}>
                <div className="breadcrumbs aos-init aos-animate" data-aos="fade-down">
                    <ul>
                        <li><a href="#">Dashboard </a></li>
                        <li><a href="#">Supplier </a></li>
                        <li><a href="#"><span> Product Showcase </span></a></li>
                        <li><a href="#"><span> Add New Product </span></a></li>
                        <li><a href="#"><span> Payment </span></a></li>
                        <li><a href="#"><span> Payment Form </span></a></li>
                    </ul>
                </div>
                <h2>Payment Form</h2> 
                <div className="payment_form_wrap">
                    <div className="form-group">
                        <input type="text" placeholder="Name" className="form-control"/>
                    </div> 
                    <div className="form-group">
                        <input type="text" placeholder="Email Address" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Address" className="form-control"/>
                    </div>
                   <div className="row justify-content-between">
                    <div className="column">
                        <div className="form-group">
                            <input type="text" placeholder="City" className="form-control"/>
                        </div>
                    </div>
                    <div className="column pd-b">
                        <div className="custom-select">
                            <select>
                                <option>Country</option>
                            </select>
                        </div>
                    </div>
                    <div className="column">
                        <div className="form-group">
                            <input type="text" placeholder="Postal Code" className="form-control"/>
                        </div>
                    </div>
                    <div className="column">
                        <div className="form-group">
                            <input type="text" placeholder="Phone Number" className="form-control"/>
                        </div>
                    </div>
                   </div>
                   <div className="form-group">
                    <input type="text" placeholder="Card Number" className="form-control"/>
                   </div>
                   <div className="row justify-content-between">
                    <div className="column">
                        <div className="form-group">
                            <input type="text" placeholder="Expiry Date" className="form-control"/>
                        </div>
                    </div>
                    <div className="column">
                        {/* <!-- <select>
                        </select> --> */}
                        <input type="text" placeholder="CVV" className="form-control"/>
                    </div>
                   </div>
                   <div className="radio_btn row">
                    <p>Do you have VAT number?</p>
                    <div className="row align-items-center">
                        <input type="radio" id="buyer" name="fav_language" value="A buyer" checked=""/>
                        <label for="buyer" className="active">Yes</label>
                    </div>
                    <div className="row mb-l align-items-center">
                        <input type="radio" id="supplier" name="fav_language" value="A supplier"/>
                        <label for="A supplier" className="removeClass">No</label>
                    </div>
                </div>
                <div className="form-group toggle-form-box" style={{display: "none"}}>
                    <input type="text" placeholder="VAT Number" className="form-control" />
                </div>
                
                   <div className="button row justify-content-center">
                        <a href="#" className="btn btn-secondary">Pay</a>
                   </div>
                </div>
            </div>


      </div>
    </div>
  );
}

export default Test;
