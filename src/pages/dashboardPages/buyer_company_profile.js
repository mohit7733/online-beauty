import React, { useEffect, useState } from "react";
import { api } from "../base_url";
import Productresearhsection from "../suplpiersection/Productresearhsection";
import Left_menu from "../productpages/left_menu";

function Buyer_company_profile(props) {
  const [sidebar ,setsidebar] = useState(true)

  return (
    <div className="product_research_wrap add_new_product Meeting_wrap">
      <div className="main">
      <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
        <Productresearhsection sidebar={sidebar} />
      </div>
    </div>
  );
}

export default Buyer_company_profile;
