import React, { useEffect, useState } from 'react';
import CustomBarChart from '../../components/Dashboard/CustomBarChart';



const PrepareExpenseBarChartData=(data)=>{
    const chartdata=data.map((item)=>({
        caterory:item.category,
        amount:item.amount
    }))
    return chartdata
}
const Lat30daysExpenses = ({data}) => {

    const [Chart, setChart] = useState([]);

    useEffect(() => {
      const result=PrepareExpenseBarChartData(data)
      setChart(result)
    }, [data]);
  return (
    <div className="bg-white p-6 shadow-md shadow-gray-200 border border-gray-200/50 rounded-2xl mb-4 col-span-1">
      <div className="flex justify-between items-center">
        <h5 className="text-lg m-4">Latest 30 days Expenses</h5>
      </div>





      <CustomBarChart data={Chart}/>
    </div>
  );
};

export default Lat30daysExpenses;
