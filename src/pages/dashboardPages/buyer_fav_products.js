import React, { useState } from 'react'
import Favourite from '../dashboard/favourite'
import Left_menu from '../productpages/left_menu'

function Favourite_products() {
  const [sidebar ,setsidebar] = useState(true)
  return (
    <div className="favorite_wrapper product_section Meeting_wrap"
    >
      <div className="main">
      <Left_menu sidebar={sidebar} setsidebar={setsidebar} />
        <Favourite sidebar={sidebar} />
      </div>
    </div>
  )
}

export default Favourite_products