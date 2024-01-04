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
    pagesize: 20,
    total: 0,
    totalPage: 1,
    data: [],
  });

  const getRank = useCallback(
    async (no = 1, size = 20) => {
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
            {rank.data.map((item, index) => (
              <tr key={index}>
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
      {/* <div className="card-footer clearfix">
        <div className="container">
          <nav>
            {currentSet > 1 && (
              <button onClick={() => setRank(startPage - 1)} $active={false}>
                &lt;
              </button>
            )}
            {Array(btnRange)
              .fill(startPage)
              .map((_, i) => {
                return (
                  <button key={i} onClick={() => setRank(startPage + i)} $active={rank.pageno === startPage + i}>
                    {startPage + i}
                  </button>
                );
              })}
            {totalSet > currentSet && (
              <button onClick={() => setRank(endPage + 1)} $active={false}>
                &gt;
              </button>
            )}
          </nav>
        </div>
      </div> */}
    </div>
  );
}

export default RankBody;
