// 리코일
import { atom, atomFamily } from 'recoil';

// 각 커뮤니티 게시물의 상태를 관리하는 아톰 패밀리
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

// 커뮤니티 댓글의 상태를 관리하는 아톰
export const communityCommentState = atom({
  key: 'community/communityCommentState',
  default: [],
});

// 커뮤니티 검색 키워드 상태를 관리하는 아톰
export const CommunitysearchKeywordState = atom({
  key: 'CommunitysearchKeyword',
  default: [],
});
