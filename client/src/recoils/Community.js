// recoils/Community 모듈
import { atom, atomFamily } from 'recoil';

export const communityListState = atom({
  key: 'communityListState',
  default: [],
});

export const communityState = atomFamily({
  key: 'board/id/communityState',
  default: id => ({
    board: {
      id: id,
      user_id: '',
      title: '',
      contents: '',
      view_cnt: '',
      created_at: '',
      like_cnt: '',
    },
    comments: [
      {
        nickname: '',
        contents: '',
        create_date: '',
      },
    ],
  }),
});
