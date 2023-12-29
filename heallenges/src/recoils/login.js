import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "login",
  storage: localStorage,
});

export const loginState = atom({
  key: "login/loginState",
  default: { name: "", email: "" },
  effects: [persistAtom],
});
