import axios from 'axios';
import { atom, selector } from 'recoil';

const baseURL = 'http://localhost:8001/challenges';

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

export const challengesListSelector = selector({
  key: 'challenges/challengesSelector',
  get: ({ get, getCallback }) => {
    const getChallengeList = getCallback(({ set }) => async (no, size) => {
      const resp = await axios.get(`${baseURL}`, { params: { no, size } });
      set(challengesListState, resp.data);
    });

    return { getChallengeList };
  },
});
