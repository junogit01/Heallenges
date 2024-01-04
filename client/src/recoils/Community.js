// recoils/Community 모듈
import axios from 'axios';
import { atom, atomFamily, selector } from 'recoil';

const baseURL = 'http://localhost:8001/community';

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

// export const boardReplyState = atom({
//   key: 'board/boardReplyState',
//   default: [],
// });

// selector
export const communityListSelector = selector({
  key: 'community/communitySelector',
  get: ({ get, getCallback }) => {
    const getcommunityList = getCallback(({ set }) => async () => {
      const resp = await axios.get(`${baseURL}`);
      set(communityListState, resp.data);
    });
    const getcommunity = getCallback(
      ({ set }) =>
        async id => {
          const resp = await axios.get(`${baseURL}${id}`);
          // console.log('community', resp.data.community);
          set(communityState, resp.data.community);
        },
      [],
    );

    const insertCommunity = getCallback(({ set }) => async item => {
      const resp = await axios.post(`${baseURL}`, item);
      // console.log('insert', resp);
    });

    return { getcommunityList, getcommunity, insertCommunity };
  },
});

// deletecommunity, getcommunityReplyList, updatecommunity

// const updateBoard = getCallback(({set}) => async (item) => {
//   const resp = await axios.put(`${baseURL}`, item);
//   // console.log('update', resp);
// });

// const deleteBoard = getCallback(({set}) => async (id) => {
//   const resp = await axios.delete(`${baseURL}${id}`);
//   console.log('delete', resp);
// });

// const getBoardReplyList = getCallback(({set}) => async (id) => {
//   const resp = await axios.get(`${baseURL}/reply/${id}`);
//   console.log('replyList', resp.board);
//   set(boardReplyState, resp.data);
// });
