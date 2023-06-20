import React from "react";
import "../../style/reset.css";
import "../../style/style.css";
import "../../style/stylenew.css";
const NotFound404 = () => {
  return (
    <div>
      <div className="breadcrumbs">
        <div className="container aos-init aos-animate" data-aos="fade-up">
          <ul>
            <li>
              <a href="/product-view">Home</a>
            </li>
            <li>
              <a href="/product-view">
                <span>Products</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <center>
        <p>Sorry , we couldn't find any product</p>
      </center>
      <div className="container">
        <div className="error_page row justify-content-around">
          <figure>
            <img src="images/404.jpg" alt="" />
          </figure>
        </div>
        <div className="error-button row justify-content-center">
          <a className="error_icon" href="/product-view">
            <i className="fa fa-arrow-left left" aria-hidden="true"></i>Back To
            All Products
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
