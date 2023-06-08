import React, { useState, useEffect } from "react";
import { api } from "../base_url";
import { toast } from "react-toastify";
import Product_showcase from "../dashboard/product_showcase";
import Left_menu from "../productpages/left_menu";

function Supplier_product_showcase(props) {
  const [sidebar, setsidebar] = useState(true);

  return (
    <div className="product_showcase product_showcase Meeting_wrap  Meeting_wrap">
      <div className="main">
        <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
       <Product_showcase sidebar={sidebar}/>
      </div>
    </div>
  );
}
export default Supplier_product_showcase;
