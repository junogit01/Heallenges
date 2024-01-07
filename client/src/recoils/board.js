/* eslint-disable no-unused-vars */
import axios from 'axios';
import {atom, selector} from 'recoil';

const baseURL = 'http://localhost:8000/boards/';

// atom
export const boardListState = atom({
  key: 'board/boardListState',
  default: {},
});

export const boardState = atom({
  key: 'board/boardState',
  default: {
    id: '',
    userId: '',
    title: '',
    content: '',
    attachFilePath: '',
    attachFileName: '',
    cnt: '',
    createdAt: '',
    updatedAt: '',
  },
});

export const boardReplyState = atom({
  key: 'board/boardReplyState',
  default: [],
});

// selector
export const boardListSelector = selector({
  key: 'board/boardSelector',
  get: ({get, getCallback}) => {
    const getBoardList = getCallback(({set}) => async (no, size) => {
      const resp = await axios.get(`${baseURL}`, {params: {no, size}});
      set(boardListState, resp.data);
    });
    const getBoard = getCallback(
      ({set}) =>
        async (id) => {
          const resp = await axios.get(`${baseURL}${id}`);
          // console.log('board', resp.data.board);
          set(boardState, resp.data.board);
        },
      []
    );
    const updateBoard = getCallback(({set}) => async (item) => {
      const resp = await axios.put(`${baseURL}`, item);
      // console.log('update', resp);
    });

    const insertBoard = getCallback(({set}) => async (item) => {
      const resp = await axios.post(`${baseURL}`, item);
      // console.log('insert', resp);
    });

    const deleteBoard = getCallback(({set}) => async (id) => {
      const resp = await axios.delete(`${baseURL}${id}`);
      console.log('delete', resp);
    });

    const getBoardReplyList = getCallback(({set}) => async (id) => {
      const resp = await axios.get(`${baseURL}/reply/${id}`);
      console.log('replyList', resp.board);
      set(boardReplyState, resp.data);
    });

    return {getBoardList, getBoard, updateBoard, insertBoard, deleteBoard, getBoardReplyList};
  },
});
