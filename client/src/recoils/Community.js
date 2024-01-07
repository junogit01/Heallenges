// 리코일

import axios from 'axios';
import { atom, atomFamily, selector } from 'recoil';

const baseURL = 'http://localhost:8001/community';

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
    },
    comments: [],
  }),
});

export const communityCommentState = atom({
  key: 'community/communityCommentState',
  default: [],
});

// export const searchKeywordState = atom({
//   key: 'searchKeyword',
//   default: '',
// });

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
          set(communityState(id), resp.data.community);
        },
      [],
    );

    const insertCommunity = getCallback(({ set }) => async item => {
      try {
        const resp = await axios.post(`${baseURL}`, item);
        await getcommunityList();
        return resp.data; // 수정된 부분: 서버 응답 데이터 반환
      } catch (error) {
        console.error('Error inserting community:', error);
        throw error;
      }
    });

    const updateCommunity = getCallback(({ set }) => async item => {
      console.log('recoil update', item);
      const resp = await axios.put(`${baseURL}/${item.id}`, item);
    });

    const deleteCommunity = getCallback(({ set }) => async id => {
      const resp = await axios.delete(`${baseURL}/${id}`);
      console.log('delete', resp);
    });

    const insertComment = getCallback(({ set }) => async comment => {
      try {
        const resp = await axios.post(`${baseURL}/comment`, comment);
        // console.log('insertComment response:', resp.data);

        // resp.data.post_id 값이 있는 경우에만 getcommunity를 호출
        if (resp.data.post_id !== undefined) {
          await getcommunity(resp.data.post_id);
        }

        return resp.data;
      } catch (error) {
        console.error('Error inserting comment:', error);
        throw error;
      }
    });

    return {
      getcommunityList,
      getcommunity,
      insertCommunity,
      updateCommunity,
      deleteCommunity,
      insertComment,
    };
  },
});
