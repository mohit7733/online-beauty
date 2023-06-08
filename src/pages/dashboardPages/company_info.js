import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Company_information from "../dashboard/company_information";
import Left_menu2 from "./Left_menu2";
import Left_menu from "../productpages/left_menu";

function Company_info() {
  const { usertype } = useParams();
  const [sidebar, setsidebar] = useState(true);

  return (
    <>
        <div className="company_wrapper product_section Meeting_wrap profile_popup"> 
          <Company_information  /> 
      </div>
    </>
  );
}

export default Company_info;
