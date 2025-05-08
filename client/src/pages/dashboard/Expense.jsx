import React, { useEffect } from "react";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";
import BudgetVsExpenseChart from "../../components/Expense/CustomComposedChart";
import TransactionCard from "../../components/Dashboard/TransactionCard";
import useExpenseStore from "../../store/useExpenseStrore";

const Expense = () => {
  const dummyData = [
    {
      month: "January",
      data: [
        { category: "Food", budget: 4000, expense: 4500 },
        { category: "Travel", budget: 2000, expense: 1500 },
        { category: "Rent", budget: 8000, expense: 8000 },
      ],
    },
    {
      month: "February",
      data: [
        { category: "Food", budget: 4000, expense: 4800 },
        { category: "Travel", budget: 2000, expense: 2300 },
        { category: "Rent", budget: 8000, expense: 8000 },
      ],
    },
    {
      month: "March",
      data: [
        { category: "Food", budget: 4500, expense: 4700 },
        { category: "Travel", budget: 2500, expense: 2000 },
        { category: "Rent", budget: 8000, expense: 8000 },
      ],
    },
    {
      month: "April",
      data: [
        { category: "Food", budget: 4200, expense: 4100 },
        { category: "Travel", budget: 2300, expense: 2500 },
        { category: "Rent", budget: 8000, expense: 8000 },
      ],
    },
    {
      month: "May",
      data: [
        { category: "Food", budget: 4300, expense: 4600 },
        { category: "Travel", budget: 2200, expense: 2100 },
        { category: "Rent", budget: 8000, expense: 8000 },
      ],
    },
    {
      month: "June",
      data: [
        { category: "Food", budget: 4400, expense: 4300 },
        { category: "Travel", budget: 2000, expense: 1950 },
        { category: "Rent", budget: 8000, expense: 8000 },
      ],
    },
    {
      month: "July",
      data: [
        { category: "Food", budget: 4600, expense: 4700 },
        { category: "Travel", budget: 2100, expense: 2050 },
        { category: "Rent", budget: 8000, expense: 8000 },
      ],
    },
    {
      month: "August",
      data: [
        { category: "Food", budget: 4700, expense: 4900 },
        { category: "Travel", budget: 2200, expense: 2400 },
        { category: "Rent", budget: 8000, expense: 8000 },
      ],
    },
    {
      month: "September",
      data: [
        { category: "Food", budget: 4800, expense: 4600 },
        { category: "Travel", budget: 2300, expense: 2500 },
        { category: "Rent", budget: 8000, expense: 8000 },
      ],
    },
    {
      month: "October",
      data: [
        { category: "Food", budget: 4900, expense: 5100 },
        { category: "Travel", budget: 2400, expense: 2300 },
        { category: "Rent", budget: 8000, expense: 8000 },
      ],
    },
    {
      month: "November",
      data: [
        { category: "Food", budget: 5000, expense: 5200 },
        { category: "Travel", budget: 2500, expense: 2700 },
        { category: "Rent", budget: 8000, expense: 8000 },
      ],
    },
    {
      month: "December",
      data: [
        { category: "Food", budget: 5100, expense: 5000 },
        { category: "Travel", budget: 2600, expense: 2600 },
        { category: "Rent", budget: 8000, expense: 8000 },
      ],
    },
  ];
  const { expenses, fetchExpenses, loading } = useExpenseStore();
  useEffect(() => {
    fetchExpenses();
  }, []);

  
  console.log(expenses);
  return (
    <Dashboardlayout activemenu={"Expenses"}>
      <div className="my-5 mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="w-full md:w-1/2">
            <BudgetVsExpenseChart data={dummyData} />
          </div>
          <div className="w-full md:w-1/2">
          {expenses.length === 0 && (
            <div className="w-full text-center py-10 text-gray-500 text-sm">
              No data found
            </div>
          )}
          {loading? (
            <div className="w-full text-center py-10 text-gray-500 text-sm">
              Loading...
            </div>
          ):null}
            {expenses?.map((transaction, index) => (
              <TransactionCard
                key={index} // Ensure to use a unique key for each item
                title={transaction.category} // You can change this to any other title you want to show
                icon={transaction.icon}
                date={new Date(transaction.date).toLocaleDateString()} // Formats the date as needed
                amount={transaction.amount}
                type={transaction.type}
                hideDeleteBtn={transaction.hideDeleteBtn}
              />
            ))}
            
          </div>
        </div>
      </div>
    </Dashboardlayout>
  );
};

export default Expense;
