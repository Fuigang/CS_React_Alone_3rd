import { create } from "zustand";

// 1. 🚨 sessionStorage에서 babySeq를 읽어옵니다. (필수)
const storedBabySeq = sessionStorage.getItem("babySeq");
const initialBabySeq = storedBabySeq ? Number(storedBabySeq) : 1;

const useAuthStore = create((set) => ({
  token: "",
  id: "",
  isLogin: false,
  babySeq : initialBabySeq,

  getbabySeq : (seq)=>{
    set((state)=>{
      sessionStorage.setItem("babySeq", seq);
      return {babySeq : seq};
    });
  },

  login: (token, id) => {
    set((state) => {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("id", id);
      return { token: token, id: id, isLogin: true };
    });
  },

  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    set({ token: "", id: "", isLogin: false });

    sessionStorage.removeItem("jamesAccessToken");
    set({ token: "", id: "", isLogin: false });
  },
}));
export default useAuthStore;