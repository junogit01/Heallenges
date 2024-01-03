import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'user',
  storage: localStorage,
});

export const userState = atom({
  key: 'user/userState',
  default: {
    id: '',
    name: '',
    email: '',
    nickname: '',
    phone_number: '',
    about_me: '',
    blog: '',
    zipcode: '',
    address: '',
    addressDetail: '',
    createdAt: '',
    reward: '',
  },
  effects: [persistAtom],
});
