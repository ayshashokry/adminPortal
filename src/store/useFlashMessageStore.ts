// store/flashMessageStore.ts
import { create } from "zustand";

type FlashMessageState = {
  message: string;
  setMessage: (msg: string) => void;
  clearMessage: () => void;
};

const useFlashMessageStore = create<FlashMessageState>((set) => ({
  message: "",
  setMessage: (msg) => set({ message: msg }),
  clearMessage: () => set({ message: "" }),
}));

export default useFlashMessageStore;
