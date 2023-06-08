import React, { useState } from "react";
import { useParams } from "react-router-dom";
import User_management from "../dashboard/user_management";
import Add_product from "./add_new_productS";
import Left_menu2 from "./Left_menu2";
import Left_menu from "../productpages/left_menu";

function User_manegment_Both() {
  const { usertype } = useParams();
  const [sidebar, setsidebar] = useState(true);

  return (
    <div
      className={
        usertype == "buyer"
          ? "product_showcase product_research_wrap product_showcase User_management Meeting_wrap  Meeting_wrap"
          : "product_research_wrap add_new_product product_showcase User_management Meeting_wrap  add_new_product  User_management Meeting_wrap"
      }
    >
      <div className="main">
        <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
          <User_management sidebar={sidebar} />
      
      </div>
    </div>
  );
}

export default User_manegment_Both;
