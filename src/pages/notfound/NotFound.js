import React from "react";
import "../../style/reset.css";
import "../../style/style.css";

const NotFound404 = () => {
  return (
    <div>
      <div className="breadcrumbs">
        <div className="container aos-init aos-animate" data-aos="fade-up">
          <ul>
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="error.html">
                <span>Page not found</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="error_page row justify-content-around">
          <figure>
            <img src="images/404.jpg" alt="" />
          </figure>
        </div>
        <div className="error-button row justify-content-center">
          <a className="error_icon" href="/dashboard">
            <i className="fa fa-arrow-left left" aria-hidden="true"></i>Back to
            Homepage
          </a>
        </div>
      </div>

      <span className="scroll-up">
        <i className="fa fa-chevron-up" aria-hidden="true"></i>
      </span>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
      <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
      <script src="js/main.js"></script>
    </div>
  );
};

export default NotFound404;
