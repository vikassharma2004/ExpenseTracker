import axios from "axios";

// Create an Axios instance
export const AXIOS_INSTANCE = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_APP_BASE_URL, // Ensure this environment variable is correctly set
    withCredentials: true
});

