import React, { useState } from 'react'
import Supplierpandingmeeting from '../meetings/Supplierpandingmeeting'
import Left_menu from '../productpages/left_menu'

function Supplier_pending_me() {
  const [sidebar ,setsidebar] = useState(true)

  return (
    <div className="product_showcase supplier_pending_wrap Meeting_wrap"
    >
      <div className="main">
      <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
        <Supplierpandingmeeting  sidebar={sidebar}/>
      </div>
    </div>
  )
}

export default Supplier_pending_me