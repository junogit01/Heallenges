import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
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

  const handlePageChange = page => {
    getRank(page);
  };

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
            {rank.data?.map((item, index) => (
              <tr key={index}>
                <td>{item.rank}</td>
                <td>
                  <img
                    style={{ maxHeight: '50px', maxWidth: '50px', marginRight: '20px' }}
                    src={item.profile_image}
                    alt={''}></img>
                  {item.name}
                  {item.rank === 1 && (
                    <img src="/images/Rank-medal-1.png" style={{ width: '2rem', height: '2rem' }} alt="1등 메달" />
                  )}
                  {item.rank === 2 && (
                    <img src="/images/Rank-medal-2.png" style={{ width: '2rem', height: '2rem' }} alt="2등 메달" />
                  )}
                  {item.rank === 3 && (
                    <img src="/images/Rank-medal-3.png" style={{ width: '2rem', height: '2rem' }} alt="3등 메달" />
                  )}
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
        <div className="pagination justify-content-center">
          <Pagination
            activePage={rank.pageno}
            itemsCountPerPage={20}
            totalItemsCount={rank.total}
            pageRangeDisplayed={5}
            prevPageText={'‹'}
            nextPageText={'›'}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
            hideFirstLastPages
          />
        </div>
      </div>
    </div>
  );
}

export default RankBody;
