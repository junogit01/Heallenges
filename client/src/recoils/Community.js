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

export const CommunitysearchKeywordState = atom({
  key: 'CommunitysearchKeyword',
  default: '',
});

export const communityListSelector = selector({
  key: 'community/communitySelector',
  get: ({ get }) => {
    const CommunitysearchKeyword = get(CommunitysearchKeywordState);
    const allPosts = get(communityListState);

    // 검색어가 비어 있으면 전체 게시물 반환
    if (!CommunitysearchKeyword) {
      return allPosts;
    }

    // 검색어가 포함된 게시물 필터링
    return allPosts.filter(post => post.title.toLowerCase().includes(CommunitysearchKeyword.toLowerCase()));
  },
});
