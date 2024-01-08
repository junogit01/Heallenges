import axios from 'axios';
import { atom, selector } from 'recoil';

const baseURL = 'http://localhost:8001/challenges/';

// atom
export const challengesListState = atom({
  key: 'challenges/challengesListState',
  default: {},
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
  default: {},
});

export const challengesBoardState = atom({
  key: 'challenges/challengesBoardState',
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

//
export const challengesListSelector = selector({
  key: 'challenges/challengesSelector',
  get: ({ get, getCallback }) => {
    const getChallengeList = getCallback(({ set }) => async (no, size) => {
      const resp = await axios.get(`${baseURL}`, { params: { no, size } });
      set(challengesListState, resp.data);
    });
    const getChallengeDetail = getCallback(({ set }) => async id => {
      const resp = await axios.get(`${baseURL}/${id}`);
      // console.log('challenges', resp.data.data);
      set(challengesState, resp.data.data);
    });

    const updateChallenge = getCallback(({ set }) => async (item, id) => {
      const resp = await axios.put(`${baseURL}/${id}`);
    });

    const insertChallenge = getCallback(({ set }) => async item => {
      const resp = await axios.post(`${baseURL}`, item);
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
      // console.log(resp.data.data);
    });

    const insertChallengeBoard = getCallback(({ set }) => async (challengeId, item) => {
      const resp = await axios.post(`${baseURL}/${challengeId}/board`, item);
    });

    const updateChallengeBoard = getCallback(({ set }) => async (challengeId, postId, item) => {
      const resp = await axios.put(`${baseURL}/${challengeId}/board/${postId}`, item);
    });

    const deleteChallengeBoard = getCallback(({ set }) => async (challengeId, postId) => {
      const resp = await axios.delete(`${baseURL}/${challengeId}/board/${postId}`);
    });

    const insertChallengeBoardComment = getCallback(({ set }) => async (challengeId, postId, item) => {
      const resp = await axios.post(`${baseURL}/${challengeId}/board/${postId}`, item);
    });

    const deleteChallengeBoardComment = getCallback(({ set }) => async (challengeId, postId, id) => {
      const resp = await axios.delete(`${baseURL}/${challengeId}/board/${postId}/${id}`);
    });

    return {
      getChallengeList,
      getChallengeDetail,
      updateChallenge,
      insertChallenge,
      deleteChallenge,
      getChallengeBoardList,
      getChallengeBoardDetail,
      insertChallengeBoard,
      updateChallengeBoard,
      deleteChallengeBoard,
      insertChallengeBoardComment,
      deleteChallengeBoardComment,
    };
  },
});
