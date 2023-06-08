import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Add_remark from "../meetings/Add_remark";
import Left_menu from "../productpages/left_menu";

function Add_remarkBoth() {
  const [sidebar, setsidebar] = useState(true);
  const navigate = useNavigate();
  const { id, usertype } = useParams();

  return (
    <>
      <div className="edit_remark Meeting_wrap">
        <div className="main">
          <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
          <Add_remark sidebar={sidebar} usertype={usertype}/>
        </div>
      </div>
    </>
  );
}

export default Add_remarkBoth;
