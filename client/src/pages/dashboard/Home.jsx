import React, { useEffect, useState } from "react";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";
import InfoCard from "../../components/layouts/InfoCard";
import { IoMdCard } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import Lat30daysExpenses from "./Lat30daysExpenses.jsx";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";

import useIncomeStore from "../../store/UseIncomeStrore";
import { useUserAuthStore } from "../../store/UserAuthStore.js";



const incomeData = [
  { date: "2025-03-09", amount: 183, name: "Gift", mode: "Cash" },
  { date: "2025-03-10", amount: 264, name: "Other", mode: "Cheque" },
  { date: "2025-03-11", amount: 271, name: "Gift", mode: "Cheque" },
  { date: "2025-03-12", amount: 262, name: "Freelancing", mode: "Cheque" },
  { date: "2025-03-13", amount: 212, name: "Freelancing", mode: "UPI" },
  { date: "2025-03-14", amount: 178, name: "Gift", mode: "Cash" },
  { date: "2025-03-15", amount: 253, name: "Salary", mode: "Cheque" },
  { date: "2025-03-16", amount: 120, name: "Salary", mode: "Bank Transfer" },
  { date: "2025-03-17", amount: 185, name: "Gift", mode: "Cheque" },
  { date: "2025-03-18", amount: 160, name: "Other", mode: "Cash" },
];

// const last30daysExpenses = [
//   {
//     date: "2023-05-10",
//     day: "Wed",
//     amount: 124,
//     category: "Shopping",
//     id: "2023-05-10-0",
//   },
//   {
//     date: "2023-05-10",
//     day: "Wed",
//     amount: 78,
//     category: "Transport",
//     id: "2023-05-10-1",
//   },
//   {
//     date: "2023-05-11",
//     day: "Thu",
//     amount: 42,
//     category: "Food",
//     id: "2023-05-11-0",
//   },
//   {
//     date: "2023-05-12",
//     day: "Fri",
//     amount: 0,
//     category: "No expenses",
//     id: "2023-05-12",
//   },
//   {
//     date: "2023-05-13",
//     day: "Sat",
//     amount: 156,
//     category: "Entertainment",
//     id: "2023-05-13-0",
//   },
// ];

const Home = ({ activemenu }) => {
  const navigate = useNavigate();
  const {user}=useUserAuthStore()
  const {incomes, isLoading,getRecentTransactions, fetchMonthlyIncome , monthlyIncome}=useIncomeStore();
  

  useEffect(() => {
    getRecentTransactions()
    fetchMonthlyIncome(user._id)
  }, []);
console.log(incomes)
console.log(monthlyIncome,"month")
  return (
    <Dashboardlayout activemenu={"Dashboard"}>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -z-10">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value="₹ 1000"
            color="bg-[#62a7f4]"
          />
          <InfoCard
            icon={"📈"}
            label="Total Income "
            value="₹ 1000"
            color="bg-[#ee7114]"
          />
          <InfoCard
            icon={"📉"}
            label="Total Expenses"
            value="₹ 1000"
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          { isLoading.fetching? (
            <div className="flex justify-center items-center">
              <div className="spinner-border animate-spin text-blue-500" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <RecentTransactions
              transactions={incomes} // Show fetched data or fallback to hardcoded Transactions
              title="Recent Transactions"
              onSeeMore={() => navigate("/Expenses")}
            />
          )}

          <FinanceOverview
            TotalBalance=" 7000"
            TotalIncome=" 1000"
            TotalExpenses=" 6000"
          />
          {/*  last thirty days data */}
          <RecentTransactions
            transactions={incomes.filter((item) => item.type === "expense")}
            title="Expances"
            onSeeMore={() => navigate("/Expenses")}
          />
          <Lat30daysExpenses data={monthlyIncome} />
          <RecentIncomeWithChart data={incomeData} />
        </div>
      </div>
    </Dashboardlayout>
  );
};

export default Home;