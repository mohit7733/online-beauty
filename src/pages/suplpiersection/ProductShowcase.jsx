import React from 'react'

function ProductShowcase() {
  return (
    <>
        <div class="product_research_wrap add_new_product Meeting_wrap profile_popup">


<div class="router-body">
                <div class="breadcrumbs" data-aos="fade-down">
                    <ul>
                        <li><a href="#">Dashboard </a></li>
                        <li><a href="#">Supplier</a></li>
                        <li><a href="#"><span>Product Showcase</span></a></li>
                        <li><a href="#"><span>Add New Product</span></a></li>
                    </ul>
                </div>
                <div class="product_prfile">
                    <h1>Add New Product</h1>
                    <div class="row">
                        <div class="col_left">
                            <div class="panel">
                                <div class="form-group full">
                                    <input type="text" placeholder="Product Full Name" class="form-control"/>
                                </div>
                                <div class="form-group full">
                                    <input type="text" placeholder="Product Short Name" class="form-control"/>
                                </div>
                                <div class="form_wrap row">
                                    <div class="column">
                                        <div class="custom-select">
                                            <select>
                                                <option>Category</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="custom-select">
                                            <select>
                                                <option>Sub-Category</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="custom-select">
                                            <select>
                                                <option>Country</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group full">
                                    <input type="text" placeholder="Company Name" class="form-control"/>
                                </div>
                                <textarea maxlength="50" class="form-control"
                                    placeholder="Company Profile Description"></textarea>
                                    <p class="limit">0/50</p>
                            </div>
                            <div class="button_wrap row">
                                <a href="" class="btn btn-secondary">Submit</a>
                                <a href="" class="btn btn-primary">Cancel</a>
                            </div>
                            <div class="error-button row justify-content-center">
                                <a class="error_icon" href="index.html"><i class="fa fa-arrow-left left" aria-hidden="true"></i>Back to Product Showcase</a>
                            </div>

                        </div>
                        <div class="col_right">
                            <h6>Product Images</h6>
                            <div class="data_upload">
                                <img src="images/profile_upload.svg" alt="" />
                                <h4>Upload Image, Video or <br/>
                                    Document</h4>
                            </div>
                            <div class="thumbnail_section">
                                <h6>Set Thumbnail Image</h6>
                                <div class="thumb_inner row align-items-center">
                                    <input type="radio" id="profile" name="thumb" value=""/>
                                    <figure class="center"><img src="images/thumbnail_1.svg" alt="" /></figure>
                                    <p>product1.jpg</p>
                                    <figure><img src="images/trash-2.svg" alt="" /></figure>
                                </div>
                                <div class="thumb_inner row align-items-center">
                                    <input type="radio" id="profile" name="thumb" value=""/>
                                    <figure class="center"><img src="images/thumbnail_1.svg" alt="" /></figure>
                                    <p>product1.jpg</p>
                                    <figure><img src="images/trash-2.svg" alt="" /></figure>
                                </div>
                                <div class="thumb_inner row align-items-center">
                                    <input type="radio" id="profile" name="thumb" value=""/>
                                    <figure class="center"><img src="images/thumbnail_2.svg" alt="" /></figure>
                                    <p>product1.jpg</p>
                                    <figure><img src="images/trash-2.svg" alt="" /></figure>
                                </div>
                            </div>
                            <div class="doc_upload">
                                <h6>Uploaded Documents</h6>
                                <div class="inner_doc row align-items-center">
                                    <figure>
                                        <img src="images/pdf_icon.png" alt="" />
                                    </figure>
                                    <p>product-doc.pdf</p>
                                    <figure>
                                        <img src="images/trash-2.svg" alt="" />
                                    </figure>
                                </div>
                                <div class="inner_doc row align-items-center">
                                    <figure>
                                        <img src="images/pdf_icon.png" alt="" />
                                    </figure>
                                    <p>product-doc.pdf</p>
                                    <figure>
                                        <img src="images/trash-2.svg" alt="" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>


    </>
  )
}

export default ProductShowcase