import React from "react";
import TransactionCard from "./TransactionCard";

const RecentTransactions = ({ transactions, onSeeMore,title,text }) => {
  console.log(transactions);
  return (
    <div className="bg-white p-6  shadow-md shadow-gray-200 border border-gray-200/50 rounded-2xl mb-4">
    <div className="flex justify-between items-center  ">
      <h5 className="text-lg m-4">{title}</h5>
      {text? <p className="text-xs text-gray-400">
            Track your earnings over time and analyze your income
          </p>:null}
      <button onClick={onSeeMore} className="flex items-center gap-3 text-[12px] font-medium text-gray-700 bg-gray-50 hover:text-purple-500 hover:bg-purple-50 px-4 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer">
        View All
      </button>

    </div>
      {transactions?.slice(0, 6)?.map((item) => (
        <TransactionCard
          key={item._id}
          title={item.type === "expense" ? item.category : item.source}
          icon={item.icon}
          date={item.date}
          amount={item.amount}
          type={item.type}
          hideDeleteBtn={item.hideDeleteBtn}
        />
      ))}
    </div>
  );
};

export default RecentTransactions;
