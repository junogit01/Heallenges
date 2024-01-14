// 리코일
import { atom, atomFamily } from 'recoil';

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

export const CommunitysearchKeywordState = atom({
  key: 'CommunitysearchKeyword',
  default: [],
});

// export const communityListSelector = selector({
//   key: 'community/communitySelector',
//   // get: ({ get }) => {},
// });
