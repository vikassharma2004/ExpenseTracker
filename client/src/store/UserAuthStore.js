import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";


import { AXIOS_INSTANCE as axios } from "../config/axios.config.js";




export const useUserAuthStore = create(
  persist(
    (set, ) => ({
      user: null,
      loading:false,
      ischeckingAuth:false,
      isAuthenticated: false,
      error: null,

      // Refresh Token
      refreshToken: async () => {
        try {
          await axios.get("/auth/refreshToken");
          
        } catch (error) {
          console.log("Error while refreshing token", error);
          toast.error("Failed to refresh token");
        }
      },

   

     

      // Register User
      register: async (userData) => {
        try {
          set({ loading: true, error: null });
          const { data } = await axios.post("/auth/register", userData);
          
          set({ user: data.user, isAuthenticated: true, loading: false });
          toast('Registration successful',
        {
          
          style: {
            borderRadius: '10px',
            background: '#14b51f',
            color: '#fff',
          },
        }
      );

         
         // start token timer
        } catch (error) {
          set({
            error: error.response?.data?.message || "Registration failed",
            loading: false,
          });
          toast.error(error.response?.data?.message || "Registration failed");
          
          
        }
      },

      // Login User
      login: async (credentials) => {
        try {
          set({ loading: true, error: null });
          const { data } = await axios.post("/auth/login", credentials);
          console.log(data.user)
          set({ user: data.user, isAuthenticated: true, loading: false });
          
          toast(`welcome  ${data.user.name}`,
            {
          
          style: {
            borderRadius: '10px',
            background: '#14b51f',
            color: '#fff',
          },
        }
          );
          
          return data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Login failed",
            loading: false,
          });
          toast.error(error.response?.data?.message || "Login failed");
        }
      },

      // Logout User
      logout: async () => {
        try {
          set({ loading: true, error: null });
          await axios.post("/auth/logout");
          toast.success("Logout Successfully");
          set({ user: null, isAuthenticated: false, loading: false });
          
        } catch (error) {
          set({
            error: error.response?.data?.message || "Logout failed",
            loading: false,
          });
        }
      },

      // Get Profile
      getProfile: async () => {
        try {
          set({ ischeckingAuth: true, error: null });
          const { data } = await axios.get("/auth/getUserProfile");
          console.log(data.user)
          set({ user: data.user, isAuthenticated: true,ischeckingAuth:false});
          
           
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            error: error.response?.data?.message || "Fetch profile failed",
            loading: false,
            ischeckingAuth:false
          });
          
        }
      },
    }),
    {
      name: "user-auth-storage",
      getStorage: () => localStorage,
    }
  )
);

