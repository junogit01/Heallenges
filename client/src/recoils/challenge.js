import axios from 'axios';
import { atom, selector } from 'recoil';
import Swal from 'sweetalert2';
// atom

// 챌린지 리스트 
export const challengesListState = atom({
  key: 'challenges/challengesListState',
  default: [],
});

// 챌린지 검색 키워드
export const challengeSearchKeywordState = atom({
  key: 'challengeSearchKeyword',
  default: [],
});


// 챌린지 참여인원 파악
export const participatedChallengesState = atom({
  key: 'participatedChallengesState',
  default: [],
});

// 챌린지 상세
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

// 챌린지 별 커뮤니티 게시글 리스트
export const challengesBoardListState = atom({
  key: 'challenges/challengesBoardListState',
  default: [],
});

// 챌리지 별 커뮤니티 게시글 상세
export const challengesBoardState = atom({
  key: 'challenges/challengesBoardState',
  default: [],
});

// 챌린지 별 커뮤니티 게시글 별 댓글
export const challengesBoardCommentState = atom({
  key: 'challenges/challengesBoardCommentState',
  default: [],
});

// 챌린지 별 커뮤니티 검색 키워드 
export const challengesSearchKeywordState = atom({
  key: 'challenges/challengesSearchKeywordState',
  default: [],
});

// 챌린지 참여 여부 확인용
export const challengesParticipantsState = atom({
  key: 'challenges/challengesParticipantsState',
  default: [],
});

// 메인화면 챌린지 Swiper용
export const challengesMain = atom({
  key: 'challenges/mainChallengesState',
  default: [],
});


export const challengesListSelector = selector({
  key: 'challenges/challengesSelector',
  get: ({ get, getCallback }) => {
    const getChallengeList = getCallback(({ set }) => async (no, size, id) => {
      const resp = await axios.get(`/challenges`, { params: { no, size, id } });
      set(challengesListState, resp.data);
    });

    const getMainChallengeList = getCallback(({ set }) => async () => {
      const resp = await axios.get(`/main`);
      set(challengesMain, resp.data);
    });
    const getchallengeParticipants = getCallback(({ set }) => async id => {
      const resp = await axios.get(`/challenges/${id}/participants`);
      set(challengesParticipantsState, resp.data.data);
    });
    const getChallengeDetail = getCallback(({ set }) => async id => {
      const resp = await axios.get(`/challenges/${id}`);
      set(challengesState, resp.data.data);
    });

    const updateChallenge = getCallback(({ set }) => async (item, id) => {
      const resp = await axios.put(`/challenges/${id}`);
    });

    const insertChallenge = getCallback(({ set }) => async item => {
      const formData = new FormData();
      formData.append('profile', item.main_image);
      formData.append('data', JSON.stringify(item));

      const resp = await axios({
        method: 'POST',
        url: `/challenges`,
        headers: { 'Content-type': 'multipart/form-data' },
        data: formData,
      });
    });

    const deleteChallenge = getCallback(({ set }) => async id => {
      const resp = await axios.delete(`/challenges/${id}`);
    });

    const getChallengeBoardList = getCallback(({ set }) => async (id, no, size) => {
      const resp = await axios.get(`/challenges/${id}/board`, { params: { no, size } });
      set(challengesBoardListState, resp.data.data);
    });

    const getChallengeBoardDetail = getCallback(({ set }) => async (challengeId, postId) => {
      const resp = await axios.get(`/challenges/${challengeId}/board/${postId}`);
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
      const resp = await axios.delete(`/challenges/${challengeId}/board/${postId}`);
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
      const resp = await axios.post(`/challenges/${challengeId}/board/${postId}`, item);
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
      const resp = await axios.delete(`/challenges/${challengeId}/board/${postId}/${id}`);
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
      updateChallenge,
      deleteChallenge,
      insertChallenge,
      getMainChallengeList,
      insertChallengeBoardComment,
      deleteChallengeBoardComment,
      getchallengeParticipants,
    };
  },
});
