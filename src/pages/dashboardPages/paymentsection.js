import React, { useState } from "react";
import Subscriptions from "../suplpiersection/Subscriptions";
import Left_menu2 from "./Left_menu2";
function Paymentsection(props) {
    const [sidebar ,setsidebar] = useState(false)

  return (
    <>
      <div className="product_research_wrap add_new_product user_wrap Meeting_wrap">
        <div className="main">
        <Left_menu2 sidebar={sidebar} setsidebar={setsidebar} />
          <Subscriptions
            // sidebar={prosidebar}
          />
        </div>
      </div>
    </>
  );
}

export default Paymentsection;
