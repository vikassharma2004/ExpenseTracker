import React from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'

const Dashboardlayout = ({children,activemenu}) => {
    let user="vikas"
  return (
    <div className=''>

<Navbar activemenu={activemenu} />
{user &&(
    <div className='flex'>
<div className="max-[1080px]:hidden  z-50">
    <SideBar activemenu={activemenu} />
</div>

<div className="grow mx-5">{children}</div>
    </div>



)

}














    </div>
  )
}

export default Dashboardlayout