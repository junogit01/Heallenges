import { atom } from 'recoil';

// 게시물 가져오기
export const allPostsState = atom({
  key: 'allPostsState',
  default: [],
});
