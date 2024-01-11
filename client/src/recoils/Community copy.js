// 리코일

// import axios from 'axios';
import { atom, atomFamily, selector } from 'recoil';

// const baseURL = 'http://localhost:8001/community';

export const communityListState = atom({
  key: 'communityListState',
  default: [],
});

export const communityState = atomFamily({
  key: 'community/id/communityState',
  default: id => ({
    board: {
      id: id,
      user_id: '',
      title: '',
      contents: '',
      view_cnt: '',
      created_at: '',
      like_cnt: '',
      category: '',
      Image: '',
    },
    comments: [],
  }),
});

export const communityCommentState = atom({
  key: 'community/communityCommentState',
  default: [],
});

export const searchKeywordState = atom({
  key: 'searchKeyword',
  default: '',
});

export const communityListSelector = selector({
  key: 'community/communitySelector',
  get: () => {
    return {};
  },
});
