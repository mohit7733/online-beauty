// import React from 'react'
// import Slider from "react-slick";
// import ReactPlayer from "react-player"

// function Slider_com({main  ,media_files}) {

//     console.log(main , media_files);
//   return (
//     <>
//   <div class="col_img" data-aos="fade-right">
//                                     <div class="slider-for" style={{ minHeight: "500px" }}>
//                                         <Slider {...settings}>
//                                             {
//                                                 main?.map((item) => {
//                                                     if (item.media_type === "image") {
//                                                         return (
//                                                             <div>
//                                                                 <figure>
//                                                                     <img class="mainimg-display" src={item.file_path} alt="" />
//                                                                 </figure>
//                                                             </div>
//                                                         )
//                                                     }
//                                                     else if (item.media_type === "doc") {
//                                                         return (
//                                                             <div>
//                                                                 <figure>
//                                                                     <iframe src={"https://view.officeapps.live.com/op/embed.aspx?src=" + item.file_path + "&embedded=true"} style={{ height: "500px" }}></iframe>
//                                                                 </figure>
//                                                             </div>
//                                                         )
//                                                     }

//                                                 })
//                                             }
//                                             {
//                                                 link != "" ?
//                                                     <div>
//                                                         <figure>
//                                                             <ReactPlayer url={productData?.product.youtube_link} width={"auto"} height={"300"} />
//                                                         </figure>
//                                                     </div>
//                                                     : null
//                                             }


//                                         </Slider>
//                                     </div>
//                                     <div class="slider-nav">
//                                         <Slider {...settings2}>
//                                             {
//                                                 productData.media_files?.map((item,index) => {
//                                                     if (item.media_type === "image") {
//                                                         return (
//                                                             <div>
//                                                                 <figure className={select == index ? "active":""}><img class="thumbnail" src={item.file_path} alt={item.file_path} onClick={e => {
//                                                                     setlink("")
//                                                                     setmain([item])
//                                                                     setselect(index)
//                                                                 }} /></figure>

//                                                             </div>
//                                                         )
//                                                     } else if (item.media_type === "doc") {
//                                                         return (
//                                                             <div>
//                                                                 <figure className={select == index ? "active":""} onClick={e => {
//                                                                     setlink("")
//                                                                     setTimeout(() => {
//                                                                         setlink("")
//                                                                         setmain([item])
//                                                                         setselect(index)
//                                                                     }, 200);
//                                                                     setselect(index)
//                                                                     setmain([item])
//                                                                 }}>
//                                                                     {/* <iframe src={"https://docs.google.com/gview?url=" + item.file_path + "&embedded=true"} ></iframe> */}
//                                                                     <img class="thumbnail" src={"/images/pdf_icon.png"} alt="" />
//                                                                 </figure>
//                                                             </div>
//                                                         )
//                                                     }
//                                                 })
//                                             }

//                                             {
//                                                 productData.product?.youtube_link ?
//                                                     <div>
//                                                         <figure className={select == 100 ? "active":""} onClick={e => {
//                                                             setmain([])
//                                                             setTimeout(() => {
//                                                                 setmain([])
//                                                                 setselect(100)
//                                                             }, 200);
//                                                             setselect(100)
//                                                             setlink(productData.product?.youtube_link)
//                                                         }}>
//                                                             {/* <ReactPlayer url={productData?.product.youtube_link} width={"auto"} height={"300"} /> */}
//                                                             <i class="fa-brands fa-square-youtube thumbnail" style={{ color: "#E30613", fontSize: "67px",textAlign:"center", cursor: "pointer" }} />
//                                                         </figure>
//                                                     </div>
//                                                     : null
//                                             }
//                                         </Slider>

//                                     </div>
//                                 </div>
//     </>
//   )
// }

// export default Slider_com