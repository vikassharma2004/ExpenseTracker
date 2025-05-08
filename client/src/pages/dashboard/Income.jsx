import React, { useState } from "react";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";
import IncomeOverView from "../../components/income/IncomeOverView";
import CustomLineChart from "../../components/income/CustomLineChart";
import IncomePieChartWithFilter from "../../components/income/PieChartWithFilter";

const TotalIncomes = [
  {
    _id: "i1",
    type: "income",
    source: "Salary",
    category: "Monthly Income",
    icon: "💼",
    amount: 3200.0,
    month: "May",
    year: 2025,
  },
  {
    _id: "i2",
    type: "income",
    source: "Freelance Work",
    category: "Side Hustle",
    icon: "🧑‍💻",
    amount: 800.0,
    month: "May",
    year: 2025,
  },
  {
    _id: "i3",
    type: "income",
    source: "Birthday Gift",
    category: "Gift Income",
    icon: "🎁",
    amount: 200.0,
    month: "May",
    year: 2025,
  },
  {
    _id: "i4",
    type: "income",
    source: "Stock Dividends",
    category: "Investment",
    icon: "📈",
    amount: 150.75,
    month: "May",
    year: 2025,
  },
  {
    _id: "i5",
    type: "income",
    source: "Blog Earnings",
    category: "Passive Income",
    icon: "📝",
    amount: 95.0,
    month: "April",
    year: 2025,
  },
  {
    _id: "i6",
    type: "income",
    source: "Selling Items",
    category: "One-Time Income",
    icon: "📦",
    amount: 180.0,
    month: "March",
    year: 2025,
  },
  {
    _id: "i7",
    type: "income",
    source: "Tutoring",
    category: "Side Hustle",
    icon: "📚",
    amount: 250.0,
    month: "February",
    year: 2025,
  },
  {
    _id: "i8",
    type: "income",
    source: "Bonus",
    category: "Work Bonus",
    icon: "💰",
    amount: 500.0,
    month: "January",
    year: 2025,
  },
];

const monthlyIncomeData = [
  {
    month: "January",
    incomes: [
      { category: "Salary", amount: 3000 },
      { category: "Freelance", amount: 700 },
      { category: "Dividends", amount: 300 },
    ],
  },
  {
    month: "February",
    incomes: [
      { category: "Salary", amount: 3100 },
      { category: "Tutoring", amount: 400 },
    ],
  },
  {
    month: "March",
    incomes: [
      { category: "Salary", amount: 3200 },
      { category: "Freelance", amount: 500 },
      { category: "Bonus", amount: 300 },
    ],
  },
  {
    month: "April",
    incomes: [
      { category: "Salary", amount: 3150 },
      { category: "Freelance", amount: 550 },
    ],
  },
  {
    month: "May",
    incomes: [
      { category: "Salary", amount: 3100 },
      { category: "Dividends", amount: 400 },
    ],
  },
  {
    month: "June",
    incomes: [
      { category: "Salary", amount: 3300 },
      { category: "Freelance", amount: 800 },
      { category: "Side Hustle", amount: 200 },
    ],
  },
  {
    month: "July",
    incomes: [
      { category: "Salary", amount: 3400 },
      { category: "Freelance", amount: 650 },
    ],
  },
  {
    month: "August",
    incomes: [
      { category: "Salary", amount: 3450 },
      { category: "Tutoring", amount: 300 },
    ],
  },
  {
    month: "September",
    incomes: [
      { category: "Salary", amount: 3500 },
      { category: "Dividends", amount: 350 },
    ],
  },
  {
    month: "October",
    incomes: [
      { category: "Salary", amount: 3550 },
      { category: "Freelance", amount: 600 },
    ],
  },
  {
    month: "November",
    incomes: [
      { category: "Salary", amount: 3600 },
      { category: "Bonus", amount: 500 },
    ],
  },
  {
    month: "December",
    incomes: [
      { category: "Salary", amount: 3700 },
      { category: "Freelance", amount: 750 },
    ],
  },
];

const Income = () => {
  const [setopenModal, openModal] = useState(false);
  return (
    <Dashboardlayout activemenu={"Incomes"}>
      <div className="my-5 mx-auto">
        {/* Add flex layout to place overviews side by side */}
        <CustomLineChart />
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="w-full md:w-1/2">
            <IncomeOverView
              transactions={TotalIncomes}
              onopenModel={() => setopenModal(true)}
            />
          </div>
          <div className="w-full md:w-1/2">
            <IncomePieChartWithFilter data={monthlyIncomeData} />
          </div>
        </div>
      </div>
    </Dashboardlayout>
  );
};

export default Income;
