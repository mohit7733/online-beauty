import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Supplierpandingmeeting from '../meetings/Supplierpandingmeeting'
import Supplierpassedmeeting from '../meetings/SupplierPassedmeeting'
import Left_menu2 from './Left_menu2'
import Left_menu from '../productpages/left_menu'

function Supplier_passed_me() {
  const {usertype} = useParams()
  const [sidebar ,setsidebar] = useState(true)

  return (
    <div className="product_showcase product_showcase supplier_pending_wrapper Meeting_wrap  supplier_pending_wrap Meeting_wrap"
    >
      <div className="main">
      <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
        <Supplierpassedmeeting usertype={usertype} sidebar={sidebar} />
      </div>
    </div>
  )
}

export default Supplier_passed_me