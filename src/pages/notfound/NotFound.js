import React from "react";

const NotFound404 = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Online Beauty Meeting || 404</title>
        <link rel="icon" href="images/fav-icon.png" type="image/x-icon" />
        <link href="css/fontawesome.min.css" rel="stylesheet" type="text/css" />
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
        <link href="css/slick.min.css" rel="stylesheet" type="text/css" />
        <link href="css/reset.css" rel="stylesheet" type="text/css" />
        <link href="css/style.css" rel="stylesheet" type="text/css" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body>
        <div className="header">{/* Header content */}</div>
        <div className="breadcrumbs">{/* Breadcrumbs content */}</div>
        <div className="container">
          <div className="error_page row justify-content-around">
            <figure>
              <img src="images/404.jpg" alt="" />
            </figure>
          </div>
          <div className="error-button row justify-content-center">
            <a className="error_icon" href="index.html">
              <i className="fa fa-arrow-left left" aria-hidden="true"></i>Back
              to Homepage
            </a>
          </div>
        </div>
        <footer>{/* Footer content */}</footer>
        <span className="scroll-up">
          <i className="fa fa-chevron-up" aria-hidden="true"></i>
        </span>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <script src="js/main.js"></script>
      </body>
    </html>
  );
};

export default NotFound404;
