import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EditRemark from "../meetings/EditRemark";
import Left_menu from "../productpages/left_menu";

function Edit_remarkboth(props) {
  const [sidebar, setsidebar] = useState(false);
const {usertype} = useParams()
  return (
    <>
      <div className="edit_remark Meeting_wrap">
        <div className="main">
          <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
          <EditRemark sidebar={sidebar} usertype={usertype} />
        </div>
      </div>
    </>
  );
}

export default Edit_remarkboth;
