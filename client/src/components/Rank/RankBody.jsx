import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { searchKeywordState } from '@recoils/rank';
import { useRecoilValue } from 'recoil';

function RankBody() {
  const searchKeyword = useRecoilValue(searchKeywordState);

  const [rank, setRank] = useState({
    status: '',
    message: '',
    pageno: 1,
    pagesize: 10,
    total: 0,
    totalPage: 1,
    data: [],
  });
  // const getRank = useCallback(async (no = 1, size = 10) => {
  //   const resp = await axios.get('http://localhost:8001/Rank', { params: { no, size } });
  //   setRank(resp.data);
  // }, []);

  const getRank = useCallback(
    async (no = 1, size = 10) => {
      try {
        const resp = await (searchKeyword
          ? axios.get('http://localhost:8001/Rank/search', { params: { no, size, keyword: searchKeyword } })
          : axios.get('http://localhost:8001/Rank', { params: { no, size } }));

        setRank(resp.data);
      } catch (error) {
        console.error('Error fetching rank:', error);
      }
    },
    [searchKeyword],
  );

  useEffect(() => {
    getRank();
  }, [getRank, searchKeyword]);
  return (
    <div className="card">
      <div className="card-body p-2">
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: '10rem' }}>순위</th>
              <th style={{ wordSpacing: '4.5rem' }}>&nbsp;이름</th>
              <th style={{ width: '20rem' }}>포인트</th>
            </tr>
          </thead>
          <tbody style={{ verticalAlign: 'middle' }}>
            {rank.data.map(item => (
              <tr>
                <td>{item.rank}</td>
                <td>
                  <img
                    style={{ maxHeight: '50px', maxWidth: '50px', marginRight: '20px' }}
                    src={item.profile_image}
                    alt={''}></img>
                  {item.name}
                </td>
                <td>
                  <span>{item.reward_cnt}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer clearfix">
        <ul className="pagination pagination-sm m-0 float-right">
          <li className="page-item">
            <a className="page-link" href="#">
              &laquo;
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              &raquo;
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RankBody;
