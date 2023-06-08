// import React, { useState } from "react";
// import { useEffect } from "react";
// import Add_user from "../dashboard/add_user";
// import Favourite from "../dashboard/favourite";
// import Product_showcase from "../dashboard/product_showcase";
// import User_management from "../dashboard/user_management";
// import Productresearhsection from "../suplpiersection/Productresearhsection";
// import ProductShowcase from "../suplpiersection/ProductShowcase";
// import Subscriptions from "../suplpiersection/Subscriptions";
// import Suppliersection1 from "../suplpiersection/Suppliersection1";
// import Left_menu from "./left_menu";
// import ProductDescription from "./ProductDescription";
// import Alert_notification from "../dashboard/alert_notification";
// import { useParams } from "react-router-dom";
// import Add_new_product from "../dashboard/add_new_product";
// import Edit_product from "../dashboard/edit_product";
// import Pandingmeeting from "../meetings/Pandingmeeting";
// import AcceptMeeting from "../meetings/AcceptMeeting";
// import MeetingDone from "../meetings/MeetingDone";
// import BuyerMeeting from "./BuyerMeeting";
// import Productaftermeeting from "./Productaftermeeting";
// import BuyerconfirmMetting from "../meetings/BuyerconfirmMetting";
// import BuyerpassedMeeting from "../meetings/BuyerpassedMeeting";
// import BuyerviewRemark from "../meetings/BuyerviewRemark";
// import Supplierpandingmeeting from "../meetings/Supplierpandingmeeting";
// import Supplierconfirmmeeting from "../meetings/Supplierconfirmmeeting";
// import Supplierpassedmeeting from "../meetings/SupplierPassedmeeting";
// import View_remark from "../middel/view_remark";
// import SupplierviewRemark from "../meetings/SupplierviewRemark";
// import Company_information from "../dashboard/company_information";
// import ProductBuyerSup from "./ProductBuyerSup";
// import Add_remark from "../meetings/Add_remark";

// // Supplierpassedmeeting


// function Productbuyer2() {
//   const [sidebar, setsidebar] = useState(true);
//   const [check, setcheck] = useState(true);
//   const [showdetails, setshowdetails] = useState(false);
//   const [meetingdone, setmeetingdone] = useState(false);
//   const [meetingdone2, setmeetingdone2] = useState(false);
//   const [completpayment, setcompletpayment] = useState(false);
//   const [productid, setproductid] = useState("");
//   const [section, setsection] = useState(
//     localStorage.getItem("sect") != null ? localStorage.getItem("sect") : 1
//   );
//   const [requestMeeting, setrequestMeeting] = useState(1);

//   const [buyer, setbuyer] = useState("");
//   const [supplier, setsupplier] = useState("Supplier");


//   // const {companyInformation} = useParams()
//   // console.log(companyInformation);

//   useEffect(() => {
//     console.log(section);
//     if (check) {
//       localStorage.getItem("user_type") == "Supplier" ||
//         localStorage.getItem("user_type") == "Both"
//         ? setsection(
//           localStorage.getItem("sect") != null
//             ? localStorage.getItem("sect")
//             : 3
//         )
//         : localStorage.getItem("user_type") == "Buyer"
//           ? setsection(
//             localStorage.getItem("sect") != null
//               ? localStorage.getItem("sect")
//               : 5
//           )
//           : setsection(
//             localStorage.getItem("sect") != null
//               ? localStorage.getItem("sect")
//               : 1
//           );
//       setcheck(!check);
//     }
//   }, [section]);
//   return (
//     <>
//       <div
//         className={
//           section == 3
//             ? "product_showcase Meeting_wrap"
//             : section == 8
//               ? "favorite_wrapper product_section Meeting_wrap"
//               : section == 5
//                 ? "product_showcase User_management Meeting_wrap profile_popup"
//                 // : section == 14 ? "Accept_meeting_wrap"
//                 : section == 16 ? "product_showcase supplier_pending_wrap Meeting_wrap"
//                   : section == 17 ? "product_showcase supplier_pending_wrapper Meeting_wrap"
//                     : section == 18 ? "edit_remark Meeting_wrap"
//                       : section == 19 ? "product_showcase supplier_pending_wrap Meeting_wrap"
//                         : section == 20 ? "product_showcase supplier_pending_wrap Meeting_wrap"
//                           : section == 21 ? "product_showcase supplier_pending_wrapper Meeting_wrap "
//                             : section == 22 ? "edit_remark Meeting_wrap "
//                               : section == 25 ? "edit_remark Meeting_wrap "
//                                 : section == 23 ? "company_wrapper product_section "
//                                   : section == 6
//                                     ? "product_research_wrap add_new_product user_wrap Meeting_wrap"
//                                     : "product_research_wrap Meeting_wrap profile_popup"
//         }
//       >
//         <div class="main">
//           <Left_menu
//             sidebar={sidebar}
//             setbuyer={setbuyer}
//             setsupplier={setsupplier}
//             setsidebar={setsidebar}
//             setsection={setsection}
//             meetingdone={meetingdone}
//           />
//           <div
//             className="bg-light supplier-meetings dropdown-container"
//             tabIndex="-1"
//           >
//             <h4>
//               My Meetings
//               {/* <!-- <i class="fa fa-angle-up" aria-hidden="true"></i> --> */}
//             </h4>
//             <div class="dropdown-item-div">
//               <a class="dropdown-item" href="#">
//                 Pending Meetings
//               </a>
//               <a class="dropdown-item" href="#">
//                 Confirmed Meetings
//               </a>
//               <a class="dropdown-item" href="#">
//                 Passed Meetings
//               </a>
//             </div>
//           </div>
//           <div class="bg-light buyer-meetings dropdown-container" tabindex="-1">
//             <h4>
//               My Meetings
//               {/* <!-- <i class="fa fa-angle-up" aria-hidden="true"></i> --> */}
//             </h4>
//             <div class="dropdown-item-div">
//               <a
//                 class="dropdown-item"
//                 href="https://onlinebeautymeeting.sdsstaging.co.uk/product_view.html"
//               >
//                 View All Products
//               </a>
//               <a class="dropdown-item" href="#">
//                 Favourite List
//               </a>
//               <a class="dropdown-item" href="#">
//                 Confirmed Meetings
//               </a>
//               <a class="dropdown-item" href="#">
//                 Passed Meetings
//               </a>
//             </div>
//           </div>
//           {section == 2 ? (
//             <Productresearhsection sidebar={sidebar} />
//           ) : section == 3 ? (
//             <Product_showcase
//               setsection={setsection}
//               supplier={supplier}
//               sidebar={sidebar}
//               setproductid={setproductid}
//             />
//           )
//             : section == 12 ? (
//               <Add_new_product setsection={setsection} supplier={supplier} />)
//               : section == 26 ? (
//                 <Edit_product setsection={setsection} supplier={supplier} productid={productid} />)
//                 : section == 4 ? (
//                   <Alert_notification supplier={supplier} sidebar={sidebar} />
//                 ) : section == 8 ? (
//                   <Favourite supplier={supplier} sidebar={sidebar} />
//                 ) : section == 5 ? (
//                   <User_management
//                     supplier={supplier}
//                     setsection={setsection}
//                     sidebar={sidebar}
//                   />
//                 ) : section == 6 ? (
//                   <Add_user supplier={supplier} sidebar={sidebar} />
//                 ) :
//                   section == 13 ? <Pandingmeeting sidebar={sidebar} /> :
//                     section == 14 ? <AcceptMeeting sidebar={sidebar} /> :
//                       section == 15 ? <MeetingDone sidebar={sidebar} /> :
//                         section == 16 ? <BuyerconfirmMetting sidebar={sidebar} /> :
//                           section == 17 ? <BuyerpassedMeeting sidebar={sidebar} setsection={setsection} /> :
//                             section == 18 ? <BuyerviewRemark setsupplier={setsupplier}
//                               sidebar={sidebar} setsection={setsection} /> :
//                               section == 19 ? <Supplierpandingmeeting sidebar={sidebar} setsection={setsection} /> :
//                                 section == 20 ? <Supplierconfirmmeeting sidebar={sidebar} setsection={setsection} /> :
//                                   section == 21 ? <Supplierpassedmeeting sidebar={sidebar} setsection={setsection} /> :
//                                     section == 22 ? <SupplierviewRemark setsupplier={setsupplier}
//                                       sidebar={sidebar} setsection={setsection} /> :
//                                       section == 23 ? <Company_information sidebar={sidebar} setsection={setsection} /> :
//                                         section == 24 ? <ProductBuyerSup sidebar={sidebar} setsection={setsection} /> :
//                                           section == 25 ? <Add_remark supplier={supplier}
//                                             sidebar={sidebar} setsection={setsection} /> :
//                                             section == 27 ? <Subscriptions supplier={supplier}
//                                               sidebar={sidebar} setsection={setsection} /> :
//                                               (
//                                                 <div className={"router-body" + (sidebar ? " active" : "")}>
//                                                   <div class="breadcrumbs" data-aos="fade-down">
//                                                     {localStorage.getItem("user_type") == "Buyer" ? (
//                                                       <ul>
//                                                         <li>
//                                                           <a href="#">Dashboard </a>
//                                                         </li>
//                                                         <li>
//                                                           <a href="#">Buyer </a>
//                                                         </li>
//                                                         <li>
//                                                           <a href="#">My Meetings</a>
//                                                         </li>
//                                                         {meetingdone == true ? (
//                                                           <li>
//                                                             <a href="#">Passed Meetings</a>
//                                                           </li>
//                                                         ) : (
//                                                           <li>
//                                                             <a href="#">View all products</a>
//                                                           </li>
//                                                         )}

//                                                         <li>
//                                                           <a href="#">
//                                                             <span>Supplier A</span>
//                                                           </a>
//                                                         </li>
//                                                       </ul>
//                                                     ) : (
//                                                       <ul>
//                                                         <li>
//                                                           <a href="#">Dashboard </a>
//                                                         </li>
//                                                         <li>
//                                                           <a href="#">Supplier </a>
//                                                         </li>
//                                                         <li>
//                                                           <a href="#">My Meetings</a>
//                                                         </li>
//                                                         {completpayment == true ? (
//                                                           <>
//                                                             {meetingdone2 == true ? (
//                                                               <li>
//                                                                 <a href="#">Passed Meetings</a>
//                                                               </li>
//                                                             ) : (
//                                                               <li>
//                                                                 <a href="#">Confirmed Meetings</a>
//                                                               </li>
//                                                             )}
//                                                           </>
//                                                         ) : (
//                                                           <li>
//                                                             <a href="#">(PENDING) Meetings</a>
//                                                           </li>
//                                                         )}

//                                                         <li>
//                                                           <a href="#">
//                                                             <span>Buyer A</span>
//                                                           </a>
//                                                         </li>
//                                                       </ul>
//                                                     )}
//                                                   </div>
//                                                   {localStorage.getItem("user_type") == "Buyer" ? (
//                                                     <>
//                                                       <div class="product_detail product_supplier">
//                                                         <div class="row">
//                                                           <div class="col_img">
//                                                             <div class="slider-for">
//                                                               <div>
//                                                                 <figure>
//                                                                   <img
//                                                                     class="mainimg-display"
//                                                                     src="images/banner_supplier.jpg"
//                                                                     alt=""
//                                                                   />
//                                                                 </figure>
//                                                               </div>
//                                                             </div>
//                                                           </div>
//                                                           {meetingdone == true ? (
//                                                             <div class="col_text">
//                                                               <div class="button">
//                                                                 <button class="btn btn-secondary">
//                                                                   Category 1
//                                                                 </button>
//                                                                 <button class="btn btn-secondary btn-default">
//                                                                   Sub Category 1
//                                                                 </button>
//                                                               </div>
//                                                               <h2>Product Name (Full)</h2>
//                                                               <ul>
//                                                                 <li class="after_meeting_li">
//                                                                   <h5>Made In:</h5>
//                                                                 </li>
//                                                                 <li class="after_meeting_li">
//                                                                   <h5>
//                                                                     Price Range: : € 10.000{" "}
//                                                                     <a href="">
//                                                                       <span>(See Price Policy)</span>
//                                                                     </a>
//                                                                   </h5>
//                                                                 </li>
//                                                                 <li class="after_meeting_li">
//                                                                   <h5>Minimum Quantity:</h5>
//                                                                 </li>
//                                                                 <li class="after_meeting_li">
//                                                                   <h5>Guarantee:</h5>
//                                                                 </li>
//                                                                 <li class="after_meeting_li">
//                                                                   <h5>Date Of Creation:</h5>
//                                                                 </li>
//                                                                 <li class="after_meeting_li">
//                                                                   <h5>Training:</h5>
//                                                                 </li>
//                                                               </ul>
//                                                               <div class="button-wrapper">
//                                                                 <a href="#" class="btn btn-secondary">
//                                                                   <span>
//                                                                     <img src="images/favourite.svg" alt="" />
//                                                                   </span>
//                                                                   Add your favourites
//                                                                 </a>
//                                                                 <a href="#" class="btn btn-primary">
//                                                                   <span>
//                                                                     <img src="images/check.svg" alt="" />
//                                                                   </span>
//                                                                   Meeting Done
//                                                                 </a>
//                                                               </div>
//                                                             </div>
//                                                           ) : (
//                                                             <div class="col_text">
//                                                               <div class="button">
//                                                                 <button class="btn btn-secondary">
//                                                                   Category 1
//                                                                 </button>
//                                                                 <button class="btn btn-secondary btn-default">
//                                                                   Sub Category 1
//                                                                 </button>
//                                                               </div>
//                                                               <h2>Product Name (Full)</h2>
//                                                               <ul>
//                                                                 <li>
//                                                                   <h5>Made In:</h5>
//                                                                 </li>
//                                                                 <li>
//                                                                   <h5>Guarantee:</h5>
//                                                                 </li>
//                                                                 <li>
//                                                                   <h5>Date Of Creation:</h5>
//                                                                 </li>
//                                                                 <li>
//                                                                   <h5>Training:</h5>
//                                                                 </li>
//                                                               </ul>
//                                                               <div class="button-wrapper">
//                                                                 <a href="#" class="btn btn-secondary">
//                                                                   <span>
//                                                                     <img src="images/favourite.svg" alt="" />
//                                                                   </span>
//                                                                   Add your favourites
//                                                                 </a>

//                                                                 {requestMeeting == 2 ? (
//                                                                   <>
//                                                                     {meetingdone == true ? (
//                                                                       <a href="#" class="btn btn-primary">
//                                                                         <span>
//                                                                           <img src="images/check.svg" alt="" />
//                                                                         </span>
//                                                                         Meeting Done
//                                                                       </a>
//                                                                     ) : (
//                                                                       <a
//                                                                         onClick={() => setmeetingdone(true)}
//                                                                         class="btn btn-primary"
//                                                                       >
//                                                                         <span>
//                                                                           <img
//                                                                             src="images/Meeting Schedule.svg"
//                                                                             alt=""
//                                                                           />
//                                                                         </span>
//                                                                         Pending Approval
//                                                                       </a>
//                                                                     )}
//                                                                   </>
//                                                                 ) : (
//                                                                   <a
//                                                                     onClick={() => setrequestMeeting(2)}
//                                                                     class="btn btn-primary"
//                                                                   >
//                                                                     <span>
//                                                                       <img
//                                                                         src="images/Meeting Schedule.svg"
//                                                                         alt=""
//                                                                       />
//                                                                     </span>
//                                                                     Request a meeting
//                                                                   </a>
//                                                                 )}
//                                                               </div>
//                                                             </div>
//                                                           )}
//                                                         </div>
//                                                       </div>

//                                                       {showdetails == true ? (
//                                                         <ProductDescription />
//                                                       ) : meetingdone == true ? (
//                                                         <ProductDescription />
//                                                       ) : (
//                                                         <>
//                                                           <div class="product_supplier_inner">
//                                                             <h2>Product Details</h2>
//                                                             <p class="justify-para">
//                                                               Lorem Ipsum is simply dummy text of the printing and
//                                                               typesetting industry. Lorem Ipsum has been the
//                                                               industry's standard dummy text ever since the 1500s,
//                                                               when an unknown printer took a galley of type and
//                                                               scrambled it to make a type specimen book. It has
//                                                               survived not only five centuries, but also the leap
//                                                               into electronic typesetting, remaining essentially
//                                                               unchanged. It was popularised in the 1960s with the
//                                                               release of Letraset sheets containing Lorem Ipsum
//                                                               passages, and more recently with desktop publishing
//                                                               software like Aldus PageMaker including versions of
//                                                               Lorem Ipsum.
//                                                             </p>
//                                                           </div>
//                                                           <div class="product_supplir_profile">
//                                                             <div class="profile-list">
//                                                               <h2>Profile</h2>
//                                                               <div class="row justify-content-between">
//                                                                 <div class="col_left">
//                                                                   <ul>
//                                                                     <li>
//                                                                       <h6>
//                                                                         Your Brand Belongs To One Of The Following
//                                                                         Category?
//                                                                       </h6>
//                                                                     </li>
//                                                                     <li>
//                                                                       <p>Machines & Equipments</p>
//                                                                     </li>
//                                                                   </ul>
//                                                                   <ul>
//                                                                     <li>
//                                                                       <h6>
//                                                                         If You Are An Equipment Brand, Please
//                                                                         Describe Your Technology
//                                                                       </h6>
//                                                                     </li>
//                                                                     <li>
//                                                                       <p>Laser, Hair Removal</p>
//                                                                     </li>
//                                                                   </ul>
//                                                                   <ul>
//                                                                     <li>
//                                                                       <h6>
//                                                                         Describe Your Brand Concept, Philosophy And
//                                                                         Identity
//                                                                       </h6>
//                                                                     </li>
//                                                                     <li>
//                                                                       <p>
//                                                                         Aerolase Corporation (NY USA) Manufacturers
//                                                                         Completely Uniqe And <br />
//                                                                         Portable Laser Technology For The Treatment
//                                                                         Of All Skin Types.
//                                                                       </p>
//                                                                     </li>
//                                                                   </ul>
//                                                                 </div>
//                                                                 <div class="col_right">
//                                                                   <div class="information">
//                                                                     <a href="#">
//                                                                       <h3>Do you want more information?</h3>
//                                                                     </a>
//                                                                     <a
//                                                                       onClick={() => setshowdetails(true)}
//                                                                       class="btn btn-secondary"
//                                                                       style={{ marginRight: "0" }}
//                                                                     >
//                                                                       Request to Admin
//                                                                     </a>
//                                                                   </div>
//                                                                 </div>
//                                                               </div>
//                                                             </div>
//                                                           </div>
//                                                         </>
//                                                       )}
//                                                     </>
//                                                   ) : (
//                                                     <>
//                                                       <Suppliersection1
//                                                         setcompletpayment={setcompletpayment}
//                                                         completpayment={completpayment}
//                                                         setmeetingdone2={setmeetingdone2}
//                                                         meetingdone2={meetingdone2}
//                                                       />
//                                                     </>
//                                                   )}
//                                                 </div>
//                                               )}{" "}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Productbuyer2;
