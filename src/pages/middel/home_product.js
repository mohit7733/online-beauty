import React, { useEffect, useState } from "react";
import { api } from "../base_url";

function Home_product() {
  const [productData, setProductData] = useState([]);
  // console.log(productData);
  const [check, setcheck] = useState(true);
  const homeproduc_data = () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(api + "/api/home-page-category", requestOptions)
      .then((response) => response.json())
      .then((result) => setProductData(result?.data))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    if (check) {
      homeproduc_data();
      setcheck(false);
    }
  }, [check]);

  return (
    <>
      <div className="category-section section">
        <div className="container">
          <div
            className="heading row justify-content-between align-items-center"
            data-aos="fade-up"
          >
            <h2>Product Category</h2>
            <a href="/product-view" className="btn-link">
              View All
            </a>
          </div>
          <div className="row text-center">
            {productData?.map((item, index) => {
              let url2 = item?.category_name?.replace(/\s+/g, '-')
              // console.log(url2);

              return (
                <div className="column" style={item?.category_name?.toLowerCase() == "coming soon"  ? {display:"none"} : {}} data-aos="zoom-in" key={index}>
                  <a href={`/product-view/${url2}`}>
                    <img
                      src={
                        item?.file_path
                          ? item?.file_path
                          : "images/product_1.jpg"
                      }
                      className="img-rounded"
                      title=""
                      alt=""
                    />
                    <h6>
                      {item?.category_name ? item?.category_name : "Category 1"}
                    </h6>
                  </a>
                </div>
              );
            })}

          </div>
          <div className="text-center pt-30" data-aos="fade-up">
            <a href={localStorage.getItem("token") != null  ? "/supplier-product-showcase" : "/login"} className="btn btn-secondary">
              I want to list my product
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home_product;
