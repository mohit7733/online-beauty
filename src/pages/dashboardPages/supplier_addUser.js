import React, { useState } from 'react'
import Add_user from '../dashboard/add_user'
import Supplierpandingmeeting from '../meetings/Supplierpandingmeeting'
import Left_menu from '../productpages/left_menu'

function Supplier_addUser() {
  const [sidebar ,setsidebar] = useState(true)

  return (
    <div className="product_research_wrap add_new_product user_wrap Meeting_wrap profile_popup">
      <div className="main">
      <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
        <Add_user sidebar={sidebar} />
      </div>
    </div>
  )
}

export default Supplier_addUser