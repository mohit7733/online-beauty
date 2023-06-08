import React from 'react'

function View_remark(props) {
  return (
    <>
         <div class={(props.sidebar ? "active " : " ") + "router-body"}>
                <div class="breadcrumbs" data-aos="fade-down">
                    <ul>
                        <li><a href="#">Dashboard </a></li>
                        <li><a href="#">Supplier</a></li>
                        <li><a href="#"><span> My Meetings </span></a></li>
                        <li><a href="#"><span> Passed Meetings </span></a></li>
                        <li><a href="#"><span> View Remark</span></a></li>
                    </ul>
                </div>
                <div class="remark_wrap row justify-content-between">
                    <div class="column">
                        <h2>View Remark</h2>
                    </div>
                    <div class="column">
                        <p id="edit">Edit Remark <img src="images/edit (1).svg" alt="" /></p>
                    </div>
                </div>
                <form action="">
                    <div class="form">
                        <input type="text" id="text" value="Lorem Ipsum dolor" class="form-control" placeholder="" disabled />
                    </div>
                    <div class="form"> 
                        <textarea name="description" id="textarea" value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,">
                        </textarea>
                    </div>
                    <div class="btn_wrapper row">
                        <a id="back" href="" class="btn btn-secondary">Back</a>
                        <a id="resubmit" type="submit" href="" class="btn btn-secondary"
                         style={{display:"none"}}
                         >Resubmit</a>
                        <a id="cancel" href="" class="btn btn-primary" 
                         style={{display:"none"}}
                         >Cancel</a>
                    </div>
                </form>
            </div>


    </>
  )
}

export default View_remark