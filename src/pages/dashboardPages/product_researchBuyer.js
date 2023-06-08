import React, { useEffect, useState } from "react";
import { api } from "../base_url";
import Left_menu from "../productpages/left_menu";
import Productresearhsection from "../suplpiersection/Productresearhsection";
import Left_menu2 from "./Left_menu2";

function Product_Reseach_Buyer(props) {
  const [sidebar ,setsidebar] = useState(true)

  return (
    <div className="product_research_wrap add_new_product Meeting_wrap profile_popup">
        <div className="main">
      <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
        <Productresearhsection sidebar={sidebar} />
      </div>
    </div>
  );
}

export default Product_Reseach_Buyer;
