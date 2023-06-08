

import React, { useState } from 'react'
import Add_user from '../dashboard/add_user'
import EditUserSection from './edit_user_section'
import Left_menu2 from './Left_menu2'

function Edit_user() {
  const [sidebar ,setsidebar] = useState(true)

  return (
    <div className="product_research_wrap add_new_product user_wrap Meeting_wrap profile_popup"
    >
      <div className="main">
      <Left_menu2 sidebar={sidebar} setsidebar={setsidebar} />
        <EditUserSection sidebar={sidebar} />
      </div>
    </div>
  )
}

export default Edit_user