import { create } from "zustand";
import { axioInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axioInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.log("error in checkingAuth", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axioInstance.post("auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created Successfully");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("An error occurred while signing up.");
    } finally {
      set({ isSigningUp: false });
   }
},

logout: async () =>{
  try {
    await axioInstance.post("/auth/logout");
    set({ authUser: null });
    toast.success("Logged out Sucessfully");
  } catch (error) {
    toast.error("Error logging out:", error);
  }
},


}));
