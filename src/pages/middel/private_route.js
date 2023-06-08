import React from "react";
import { Navigate } from "react-router-dom";

function Private_route(props) {
  return (
    <>
      {localStorage.getItem("token") != null ? (
        props.element
      ) : (
        <Navigate to={"/login"} />
        // props.element

      )}
    </>
  );
}

export default Private_route;
