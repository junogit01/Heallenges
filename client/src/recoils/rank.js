import { atom } from 'recoil';

const baseURL = 'http://localhost:8001/rank/';

export const searchKeywordState = atom({
  key: 'searchKeyword',
  default: '',
});
