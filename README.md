# React-Project-Heallenges
리액트 + 건강관리를 위한 목표달성 사이트


## 🖥️ 프로젝트 소개
점차 확장하는 Digital Healthcare 시장을 배경으로 하여 기획 및 개발한 건강관리를 위한 목표 달성 사이트 입니다.
<br>

## 🕰️ 개발 기간
* 23.11.24일 - 24.01.19일

### 🧑‍🤝‍🧑 맴버구성
 - 팀장  : 이준호 - 회원가입 및 로그인, 도전 별 커뮤니티 Front, Back 개발, 도전 Recoil 설정, Back express 기초 설정, DB관리, 배포 및 Github 관리, Read Me 작성, 전체 프로젝트 관리, PPT제작 및 발표
 - 팀원1 : 김태호 - 도전 메인, 상세페이지, 랭킹 Front, Back 개발, ChatGPT API 기반 챗봇 구현 
 - 팀원2 : 송형기 - 커뮤니티 Front, Back 개발
 - 팀원3 : 이호성 - 도전 생성, 도전 수정 및 삭제 Front, Back 개발


### ⚙️ 개발 환경
- **IDE** : VSCODE
- **Framework** : React(18.2)
- **Server** : express(4.18.2)
- **Database** : MySQL(5.1.61)
- **Deploy** : cafe24

## 📌 주요 기능
#### 로그인 
- DB값 검증
- 로그인 시 Recoil Persist를 활용한 로컬 스토리지 생성
  
#### 회원가입
- 주소 API 연동
- ID 중복 체크
  
#### 마이 페이지
- 주소 API 연동
- 회원정보 변경
- 비밀번호 변경 모달 활용

#### 도전
- 도전 선택
- 도전 생성(기간 설정, 제목, 내용, 규칙, 참여인원, 메인 썸네일 이미지)
- 도전 참여 및 참여 취소
- 도전별 커뮤니티
- 
#### 메인 페이지 
- Swiper 활용 Slide 화면 구현
- 메인 포스터(영화) 이미지 슬라이드(CSS)
- 
#### 문의하기 - 
- emailjs + Bootstrap Modal 활용한 문의사항 접수

#### 커뮤니티
- 카테고리별 커뮤니티(CRUD)

#### 랭킹
- 포인트별 순위 나열
