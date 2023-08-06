import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const userInfo = atom({
  key: "hqinfo",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
