import React from 'react'
import Dashboardlayout from '../../components/layouts/Dashboardlayout'
import InfoCard from '../../components/layouts/InfoCard'
import { IoMdCard } from 'react-icons/io'

const Home = () => {
  return (

    <Dashboardlayout activemenu={"Dashboard"}>

    <div className='my-5 mx-auto  '>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <InfoCard 
                icon={<IoMdCard/>}
                label="Total Balance"
                value="₹ 1000"
                color="bg-[#62a7f4]"
            />
             <InfoCard 
                icon={'📈'}
                label="Total Income "
                value="₹ 1000"
                color="bg-[#ee7114]"
            />
             <InfoCard 
                icon={'📉'}
                label="Total Expenses"
                value="₹ 1000"
                color="bg-red-500"
            />
        </div>
       
    </div>
    </Dashboardlayout>
  )
}

export default Home