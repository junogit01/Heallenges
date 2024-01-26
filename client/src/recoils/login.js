import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// persist를 통해 localStorage 활용
const { persistAtom } = recoilPersist({
  key: 'login',
  storage: localStorage,
});

export const loginState = atom({
  key: 'login/loginState',
  default: { name: '', email: '', id: '' },
  effects: [persistAtom],
});
