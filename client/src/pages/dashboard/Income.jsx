import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";
import IncomeOverView from "../../components/income/IncomeOverView";
import CustomLineChart from "../../components/income/CustomLineChart";
import IncomePieChartWithFilter from "../../components/income/PieChartWithFilter";
import useIncomeStore from "../../store/UseIncomeStrore";
import { useUserAuthStore } from "../../store/UserAuthStore";
import { AXIOS_INSTANCE as axios } from "../../config/axios.config.js";



const Income = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useUserAuthStore();
  const { incomes, fetchIncomes, fetchMonthData, monthData,incomeOverview } = useIncomeStore();

  let UserId=null
  if(user){
     UserId=user._id
  }
  // Form state
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    note: "",
    date: "",
    mode: "",
    category: "",
    icon: "",
  });

  useEffect(() => {
    fetchIncomes();
    fetchMonthData(UserId);
  }, []);

  console.log("income overview at income page",incomeOverview);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { source, amount, date, mode, category } = formData;

    if (!source || !amount || !date || !mode || !category) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await axios.post("/income/addIncome", {
        ...formData,
        icon: formData.icon || "💰",
        hideDeleteBtn: false,
        type: "income",
      });

      if (res.data.success) {
        alert("Income added successfully!");
        fetchIncomes(); // refresh incomes
        fetchMonthData(UserId);
        setOpenModal(false);
        setFormData({
          source: "",
          amount: "",
          note: "",
          date: "",
          mode: "",
          category: "",
          icon: "",
        });
      }
    } catch (error) {
      alert("Failed to add income: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <Dashboardlayout activemenu={"Incomes"}>
      <div className="my-5 mx-auto">
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg float-right"
          onClick={() => setOpenModal(true)}
        >
          Add Income
        </button>

        <CustomLineChart  />
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="w-full md:w-1/2">
            <IncomeOverView
              transactions={incomes}
              onopenModel={() => setOpenModal(true)}
            />
          </div>
          <div className="w-full md:w-1/2">
            <IncomePieChartWithFilter data={monthData} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/80 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Income</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="Income Source"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Note (optional)"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                placeholder="Payment Mode (e.g., UPI, Cash)"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="Icon (optional, e.g., 💼)"
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Dashboardlayout>
  );
};

export default Income;
