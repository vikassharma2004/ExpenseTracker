// src/store/expenseStore.js
import { create } from 'zustand'
import { AXIOS_INSTANCE as axios } from '../config/axios.config'

const useExpenseStore = create((set) => ({
  expenses: [],
  totalExpense: 0,
  loading: false,
  error: null,

  // Fetch all expenses
  fetchExpenses: async () => {
    set({ loading: true, error: null })
    try {
      const res = await axios.get('expense/getExpenses')
      console.log(res.data)
      set({ expenses: res.data.expenses, loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  // Fetch total expense
  fetchTotalExpense: async () => {
    try {
      const res = await axios.get('/expense/gettotalExpense')
      set({ totalExpense: res.data.total })
    } catch (err) {
      set({ error: err.message })
    }
  },

  // Add an expense
  addExpense: async (expenseData) => {
    try {
      const res = await axios.post('/expense/addExpense', expenseData)
      set((state) => ({
        expenses: [...state.expenses, res.data],
      }))
    } catch (err) {
      set({ error: err.message })
    }
  },

  // Delete an expense
  deleteExpense: async (id) => {
    try {
      await axios.delete(`/expense/deleteExpense/${id}`)
      set((state) => ({
        expenses: state.expenses.filter((e) => e._id !== id),
      }))
    } catch (err) {
      set({ error: err.message })
    }
  },
}))

export default useExpenseStore
