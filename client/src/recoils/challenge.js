import axios from 'axios';
import { atom, selector } from 'recoil';
import Swal from 'sweetalert2';
const baseURL = 'http://localhost:8001/challenges';
// atom
export const challengesListState = atom({
  key: 'challenges/challengesListState',
  default: [],
});

export const challengesState = atom({
  key: 'challenges/challengesState',
  default: {
    id: '',
    title: '',
    description: '',
    type: '',
    total_participants: '',
    rules: '',
    start_date: '',
    end_date: '',
    created_at: '',
    status: '',
    host_id: '',
    main_image: '',
    reward: '',
  },
});

export const challengesBoardListState = atom({
  key: 'challenges/challengesBoardListState',
  default: [],
});

export const challengesBoardState = atom({
  key: 'challenges/challengesBoardState',
  default: [],
});

export const challengesBoardCommentState = atom({
  key: 'challenges/challengesBoardCommentState',
  default: [],
});

export const challengesSearchKeywordState = atom({
  key: 'challenges/challengesSearchKeywordState',
  default: [],
});

export const challengesListSelector = selector({
  key: 'challenges/challengesSelector',
  get: ({ get, getCallback }) => {
    const getChallengeList = getCallback(({ set }) => async (no, size) => {
      const resp = await axios.get(`${baseURL}`, { params: { no, size } });
      set(challengesListState, resp.data);
    });
    const getChallengeDetail = getCallback(({ set }) => async id => {
      const resp = await axios.get(`${baseURL}/${id}`);
      set(challengesState, resp.data.data);
    });

    const updateChallenge = getCallback(({ set }) => async (item, id) => {
      const resp = await axios.put(`${baseURL}/${id}`);
    });

    const insertChallenge = getCallback(({ set }) => async item => {
      console.log('item before', item);

      const formData = new FormData();
      formData.append('profile', item.main_image);
      formData.append('data', JSON.stringify(item));

      // console.log('image=> ', item.main_image[0])

      const resp = await axios({
        method: 'POST',
        url: `${baseURL}`,
        headers: { 'Content-type': 'multipart/form-data' },
        data: formData,
      });

      console.log('insert=> ', resp);
    });

    const deleteChallenge = getCallback(({ set }) => async id => {
      const resp = await axios.delete(`${baseURL}/${id}`);
    });

    const getChallengeBoardList = getCallback(({ set }) => async (id, no, size) => {
      const resp = await axios.get(`${baseURL}/${id}/board`, { params: { no, size } });
      set(challengesBoardListState, resp.data.data);
    });

    const getChallengeBoardDetail = getCallback(({ set }) => async (challengeId, postId) => {
      const resp = await axios.get(`${baseURL}/${challengeId}/board/${postId}`);
      // console.log(resp.data.status);
      if (resp.data.status === 200) {
        set(challengesBoardState, resp.data.data);
        set(challengesBoardCommentState, resp.data.comment);
      } else {
        Swal.fire({
          title: '게시글 불러오기 중 에러 발생',
          text: '다시 시도해주십시오',
          icon: 'error',
        });
      }
    });

    const deleteChallengeBoard = getCallback(({ set }) => async (challengeId, postId) => {
      const resp = await axios.delete(`${baseURL}/${challengeId}/board/${postId}`);
      if (resp.data.status === 200) {
        Swal.fire({
          title: '게시글이 삭제되었습니다.',
          text: '',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: '게시글 삭제 실패',
          text: '다시 시도해주세요',
          icon: 'error',
        });
      }
    });

    const insertChallengeBoardComment = getCallback(({ set }) => async (challengeId, postId, item) => {
      const resp = await axios.post(`${baseURL}/${challengeId}/board/${postId}`, item);
      if (resp.data.status === 200) {
        Swal.fire({
          title: '댓글 작성 완료',
          text: '1초뒤 자동으로 사라집니다.',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: '댓글 작성 실패',
          text: '1초뒤 자동으로 사라집니다.',
          icon: 'error',
        });
      }
    });

    const deleteChallengeBoardComment = getCallback(({ set }) => async (challengeId, postId, id) => {
      const resp = await axios.delete(`${baseURL}/${challengeId}/board/${postId}/${id}`);
      if (resp.data.status === 200) {
        Swal.fire({
          title: '댓글 삭제 완료',
          text: '1초뒤 자동으로 사라집니다.',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: '댓글 삭제 실패',
          text: '1초뒤 자동으로 사라집니다.',
          icon: 'error',
        });
      }
    });

    return {
      getChallengeList,
      getChallengeDetail,
      getChallengeBoardList,
      getChallengeBoardDetail,
      deleteChallengeBoard,
      insertChallengeBoardComment,
      deleteChallengeBoardComment,
    };
  },
});
