import React from "react";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";
import InfoCard from "../../components/layouts/InfoCard";
import { IoMdCard } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import Lat30daysExpenses from "./Lat30daysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";

const Transactions = [
  {
    _id: "1",
    type: "expense",
    category: "Groceries",
    source: "Local Market",
    icon: "🛒",
    date: "2025-05-01",
    amount: 45.6,
    hideDeleteBtn: false,
  },
  {
    _id: "2",
    type: "income",
    category: "Monthly Income",
    source: "Salary",
    icon: "💼",
    date: "2025-05-01",
    amount: 3200.0,
    hideDeleteBtn: false,
  },
  {
    _id: "3",
    type: "expense",
    category: "Utilities",
    source: "Electricity Bill",
    icon: "💡",
    date: "2025-05-03",
    amount: 120.25,
    hideDeleteBtn: true,
  },
  {
    _id: "4",
    type: "income",
    category: "Side Hustle",
    source: "Freelance Work",
    icon: "🧑‍💻",
    date: "2025-05-04",
    amount: 800.0,
    hideDeleteBtn: false,
  },
  {
    _id: "5",
    type: "expense",
    category: "Dining",
    source: "Pizza Hut",
    icon: "🍕",
    date: "2025-05-05",
    amount: 62.15,
    hideDeleteBtn: false,
  },
  {
    _id: "6",
    type: "expense",
    category: "Transport",
    source: "Fuel Station",
    icon: "⛽",
    date: "2025-05-06",
    amount: 50.0,
    hideDeleteBtn: true,
  },
  {
    _id: "7",
    type: "income",
    category: "Gift Income",
    source: "Birthday Gift",
    icon: "🎁",
    date: "2025-05-07",
    amount: 200.0,
    hideDeleteBtn: false,
  },
  {
    _id: "8",
    type: "expense",
    category: "Entertainment",
    source: "Movie Tickets",
    icon: "🎬",
    date: "2025-05-07",
    amount: 30.0,
    hideDeleteBtn: false,
  },
  {
    _id: "9",
    type: "income",
    category: "Investment",
    source: "Stock Dividends",
    icon: "📈",
    date: "2025-05-08",
    amount: 150.75,
    hideDeleteBtn: true,
  },
  {
    _id: "10",
    type: "expense",
    category: "Subscription",
    source: "Netflix",
    icon: "📺",
    date: "2025-05-09",
    amount: 15.99,
    hideDeleteBtn: false,
  },
];
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
  // ... continue for 50 more entries
];

const last30daysExpenses = [
  {
    date: "2023-05-10",
    day: "Wed",
    amount: 124,
    category: "Shopping",
    id: "2023-05-10-0",
  },
  {
    date: "2023-05-10",
    day: "Wed",
    amount: 78,
    category: "Transport",
    id: "2023-05-10-1",
  },
  {
    date: "2023-05-11",
    day: "Thu",
    amount: 42,
    category: "Food",
    id: "2023-05-11-0",
  },
  {
    date: "2023-05-12",
    day: "Fri",
    amount: 0,
    category: "No expenses",
    id: "2023-05-12",
  },
  {
    date: "2023-05-13",
    day: "Sat",
    amount: 156,
    category: "Entertainment",
    id: "2023-05-13-0",
  },
];

const Home = ({ activemenu }) => {
  const navigate = useNavigate();

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
          <RecentTransactions
            transactions={Transactions}
            title="Recent Transactions"
            onSeeMore={() => navigate("/Expenses")}
          />

          <FinanceOverview
            TotalBalance=" 7000"
            TotalIncome=" 1000"
            TotalExpenses=" 6000"
          />
          {/*  last thirty days data */}
          <RecentTransactions
            transactions={Transactions}
            title="Expances"
            onSeeMore={() => navigate("/Expenses")}
          />
          <Lat30daysExpenses data={last30daysExpenses} />
          <RecentIncomeWithChart data={incomeData} />
        </div>
      </div>
    </Dashboardlayout>
  );
};

export default Home;
