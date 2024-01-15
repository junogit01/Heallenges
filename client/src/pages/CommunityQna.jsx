// // CommunityQna.jsx
// import React, { useEffect } from 'react';
// import { useRecoilState } from 'recoil';
// import CommunityHeader from '../components/Community/CommunityHeader';
// import CommunitySidebar from '../components/Community/CommunitySidebar';
// import CommunityBoard from '../components/Community/CommunityBoard';
// import { communityListState } from './../recoils/Community';
// import { loginState } from '@recoils/login';
// import { useNavigate } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';

// const CommunityQna = () => {
//   // 로그인이 안되면 로그인페이지로 이동
//   const navigate = useNavigate();
//   const loginUser = useRecoilValue(loginState);
//   if (loginUser?.id === '' && loginUser?.email === '') navigate('/login');

//   const [allPosts, setAllPosts] = useRecoilState(communityListState);

//   useEffect(() => {
//     const fetchAllPosts = async () => {
//       try {
//         const response = await fetch('http://localhost:8001/community/3');
//         const data = await response.json();
//         // console.log(data); // 서버 응답 구조 확인
//         setAllPosts(data.data || []); // Recoil 상태 업데이트
//       } catch (error) {
//         console.error('데이터 가져오기 오류:', error);
//       }
//     };

//     fetchAllPosts();
//   }, [setAllPosts]); // setAllPosts를 의존성으로 추가

//   return (
//     <>
//       <main id="main">
//         {/* Breadcrumbs 부분 */}
//         <CommunityHeader />

//         {/* Blog Section 부분 */}
//         <section id="blog" className="blog" style={{ marginTop: '30px' }}>
//           <div className="container" data-aos="fade-up">
//             <div className="row g-5">
//               <div className="col-lg-9" data-aos="fade-up" data-aos-delay={200}>
//                 <div className="row gy-5 posts-list">
//                   {/* CommunityBoard에 전체게시판의 글 데이터 전달 */}
//                   <CommunityBoard posts={allPosts} />
//                 </div>
//               </div>
//               {/* Sidebar 부분 */}
//               <CommunitySidebar />
//             </div>
//           </div>
//         </section>
//         {/* End Blog Section */}
//       </main>
//     </>
//   );
// };

// export default CommunityQna;
