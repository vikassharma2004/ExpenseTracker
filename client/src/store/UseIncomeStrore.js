import { create } from "zustand";
import { AXIOS_INSTANCE as axios } from "../config/axios.config.js";


export const useIncomeStore = create((set, get) => ({
  // State variables
  incomes: [],
  totalIncome: 0,
  incomeOverview: [],
  monthData: [],
  monthlyIncome: [],

  isLoading: {
    fetching: false,  // For fetching data
    adding: false,    // For adding income
    deleting: false,  // For deleting income
    overview: false,  // For income overview loading
    monthData: false, // For loading monthly data
  },
  error: null,

  // Fetch Incomes
  fetchIncomes: async () => {
    set({ isLoading: { ...get().isLoading, fetching: true }, error: null });
    try {
      const response = await axios.get(`/income/getIncome`);
      console.log("income data all",response)
      set({ incomes: response.data.incomes, isLoading: { ...get().isLoading, fetching: false } });
      set({ totalIncome: response.data.incomes.reduce((total, income) => total + income.amount, 0) });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: { ...get().isLoading, fetching: false } });
    }
  },

  // Fetch Income Overview (summary data like totals per category)
  fetchIncomeOverview: async (userId) => {
    set({ isLoading: { ...get().isLoading, overview: true }, error: null });
    try {
      const response = await axios.get(`/api/incomes/overview/${userId}`);
      set({ incomeOverview: response.data.result, isLoading: { ...get().isLoading, overview: false } });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: { ...get().isLoading, overview: false } });
    }
  },

  // Fetch Monthly Data (income data for each month)
  fetchMonthData: async (userId) => {
    set({ isLoading: { ...get().isLoading, monthData: true }, error: null });
    try {
      const response = await axios.get(`/income/monthdata/${userId}`);
      console.log("monthdata",response)
      set({ monthData: response.data.result, isLoading: { ...get().isLoading, monthData: false } });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: { ...get().isLoading, monthData: false } });
    }
  },

  // Fetch Monthly Income for specific months
  fetchMonthlyIncome: async (userId) => {
    set({ isLoading: { ...get().isLoading, fetching: true }, error: null });
    try {
      const response = await axios.get(`/income/getLast30DaysIncome/${userId}`)
     console.log("30days monthly data", response)
      set({ monthlyIncome: response.data.result, isLoading: { ...get().isLoading, fetching: false } });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: { ...get().isLoading, fetching: false } });
    }
  },

  // Add Income
  addIncome: async (incomeData, userId) => {
    set({ isLoading: { ...get().isLoading, adding: true }, error: null });
    try {
      const response = await axios.post(`/api/incomes/${userId}`, incomeData);
      set((state) => ({
        incomes: [response.data.income, ...state.incomes],
        isLoading: { ...get().isLoading, adding: false },
        totalIncome: state.totalIncome + response.data.income.amount,
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: { ...get().isLoading, adding: false } });
    }
  },

  // Delete Income
  deleteIncome: async (incomeId, userId) => {
    set({ isLoading: { ...get().isLoading, deleting: true }, error: null });
    try {
      await axios.delete(`/auth/income/deleteIncome/${userId}`);
      set((state) => ({
        incomes: state.incomes.filter((income) => income._id !== incomeId),
        isLoading: { ...get().isLoading, deleting: false },
        totalIncome: state.incomes.reduce((total, income) => total + income.amount, 0),
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: { ...get().isLoading, deleting: false } });
    }
  },

  // Fetch Recent Transactions
  getRecentTransactions: async () => {
    set({ isLoading: { ...get().isLoading, fetching: true }, error: null });
    try {
      const { data } = await axios.get("/auth/transactions/recent");
      set({ incomes: data, isLoading: { ...get().isLoading, fetching: false } });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: { ...get().isLoading, fetching: false } });
    }
  },

  // Calculate Total Income
  calculateTotalIncome: () => {
    set((state) => ({
      totalIncome: state.incomes.reduce((total, income) => total + income.amount, 0),
    }));
  },
}));

export default useIncomeStore;
