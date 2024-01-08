import React, { useState } from 'react';

function FooterModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-link text-decoration-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={openModal}>
        개인 정보 처리 방침
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                개인 정보 처리 방침
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>개인 정보의 처리 목적</strong>
              </p>
              <p>
                Heallenges는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
                용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를
                받는 등 필요한 조치를 이행할 예정입니다.
              </p>{' '}
              <p>
                1. 회원 가입 및 관리 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리,
                서비스 부정이용 방지, 만 14세 미만 아동의 개인정보 처리 시 법정대리인의 동의여부 확인, 각종 고지·통지,
                고충처리 목적으로 개인정보를 처리합니다.
              </p>
              <p>
                2. 재화 또는 서비스 제공 물품배송, 서비스 제공, 계약서·청구서 발송, 콘텐츠 제공, 맞춤서비스 제공,
                본인인증, 연령인증, 요금 결제·정산, 채권추심의 목적으로 개인정보를 처리합니다.{' '}
              </p>
              <p>
                <strong>개인정보의 처리 및 보유기간</strong>
              </p>
              <p>
                1. Heallenges는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은
                개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.{' '}
              </p>
              <p>
                2. 재화 또는 서비스 제공 : 재화·서비스 공급완료 및 요금결제·정산 완료시까지 다만, 다음의 사유에 해당하는
                경우에는 해당 기간 종료 시까지 1) 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 표시·광고,
                계약내용 및 이행 등 거래에 관한 기록 - 표시·광고에 관한 기록 : 6개월 - 계약 또는 청약철회, 대금결제,
                재화 등의 공급기록 : 5년 - 소비자 불만 또는 분쟁처리에 관한 기록 : 3년 2) 「통신비밀보호법」에 따른
                통신사실확인자료 보관 - 가입자 전기통신일시, 개시·종료시간, 상대방 가입자번호, 사용도수, 발신기지국
                위치추적자료 : 1년 - 컴퓨터통신, 인터넷 로그기록자료, 접속지 추적자료 : 3개월
              </p>
              <p>
                <strong>처리하는 개인정보 항목</strong>
              </p>
              <p>Heallenges는 다음의 개인정보 항목을 처리하고 있습니다. </p>
              <p>
                1. 회원 가입 및 관리 • 필수항목 : 성명, 생년월일, 주소, 전화번호, 이메일주소 • 선택항목 : 결혼여부,
                관심분야{' '}
              </p>
              <p>
                재화 또는 서비스 제공 • 필수항목 : 성명, 생년월일, 주소, 전화번호, 이메일주소, 신용카드번호, 은행
                계좌정보 • 선택항목 : 관심분야, 과거 구매내역
              </p>
              <p>
                <strong>만 14세 미만 아동의 개인정보 처리에 관한 사항</strong>
              </p>
              <p>
                ① Heallenges는 만 14세 미만 아동에 대해 개인정보를 수집할 때 법정대리인의 동의를 얻어 해당 서비스 수행에
                필요한 최소한의 개인정보를 수집합니다. • 필수항목 : 법정 대리인의 성명, 관계, 연락처
              </p>
              <p>
                ② 또한, Heallenges의 처리목적 관련 홍보를 위해 아동의 개인정보를 수집할 경우에는 법정대리인으로부터
                별도의 동의를 얻습니다.
              </p>
              <p>
                ③ Heallenges는 만 14세 미만 아동의 개인정보를 수집할 때에는 아동에게 법정대리인의 성명, 연락처와 같이
                최소한의 정보를 요구할 수 있으며, 다음 중 하나의 방법으로 적법한 법정대리인이 동의하였는지를 확인합니다.
                • 동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 개인정보처리자가 그 동의
                표시를 확인했음을 법정대리인의 휴대전화 문자 메시지로 알리는 방법 • 동의 내용을 게재한 인터넷 사이트에
                법정대리인이 동의 여부를 표시하도록 하고 법정대리인의 신용카드·직불카드 등의 카드정보를 제공받는 방법 •
                동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 법정대리인의 휴대전화
                본인인증 등을 통해 본인 여부를 확인하는 방법 • 동의 내용이 적힌 서면을 법정대리인에게 직접 발급하거나,
                우편 또는 팩스를 통하여 전달하고 법정대리인이 동의 내용에 대하여 서명날인 후 제출하도록 하는 방법 • 동의
                내용이 적힌 전자우편을 발송하여 법정대리인으로부터 동의의 의사표시가 적힌 전자우편을 전송받는 방법 •
                전화를 통하여 동의 내용을 법정대리인에게 알리고 동의를 얻거나 인터넷주소 등 동의 내용을 확인할 수 있는
                방법을 안내하고 재차 전화 통화를 통하여 동의를 얻는 방법 • 그 밖에 위와 준하는 방법으로 법정대리인에게
                동의 내용을 알리고 동의의 의사표시를 확인하는 방법
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-link text-decoration-none"
        data-bs-toggle="modal"
        data-bs-target="#spam"
        onClick={openModal}>
        스팸메일 방지 정책
      </button>
      <div className="modal fade" id="spam" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                스팸메일 방지 정책
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>1. Heallenges 스팸메일 방지정책</strong>
              </p>
              <p>
                스팸메일이란 수신자의 의사와 상관없이 일방적으로 전송되는 불필요한 광고성 메일을 말합니다. * 스팸 :
                정보통신망을 통해 이용자가 원하지 않는데도 불구하고 일방적으로 전송 또는 게시되는 영리목적의 광고성 정보
                Heallenges는 스팸메일로 인한 폐해로부터 고객님을 보호하고 올바른 인터넷문화를 선도하기 위하여 본
                스팸메일 방지정책을 수립하여 적용하고 있습니다. 이는 깨끗한 메일 커뮤니케이션 세상을 만들고자 함이오니
                많은 협조 부탁 드립니다.
              </p>
              <p>
                <strong>2. Heallenges 스팸메일 기준</strong>
              </p>
              <p>
                네이버는 개인 간의 커뮤니케이션을 위한 메일, 수신 동의 후 받은 메일, 기업의 영업활동을 위한 합법적인
                커뮤니케이션 메일 이외의 아래와 같은 메일을 스팸메일로 판단합니다. 스팸메일로 판단되는 경우 해당 메일을
                차단하고, 스팸메일 발송자에 대해서는 메일 서비스 이용을 제한합니다.
              </p>
              <p>
                - 정보통신망 이용촉진 및 정보보호에 관한 법률 등 관계법령 및 한국인터넷진흥원의 스팸메일 방지
                가이드라인을 준수하지 않은 메일
              </p>
              <p>
                관계법령 및 스팸메일 방지 가이드라인에서 광고성 메일에 밝히도록 규정하고 있는 전송정보의 유형 및
                주요내용, 전송자의 명칭 및 연락처 정보 (업체명 또는 성명과 연락처, 이메일주소), 전자우편주소를 수집한
                출처를 기재하지 않는 경우에는 스팸메일로 판단합니다. 또한 영리목적의 광고성 메일을 전송하는 경우
                제목란과 본문란에 반드시 ‘광고’를 기재해야 하고, 메일의 본문에는 수신자가 수신거부를 할 수 있는 방법을
                명시해야 하며, 이를 준수하지 않은 경우 스팸메일로 판단합니다.
              </p>
              <p>
                <strong>3. Heallenges 스팸메일 차단 방안</strong>
              </p>
              <p>(1) 메일서버등록제(SPF) 실시 </p>
              <p>
                메일서버등록제(SPF : Sender Policy Framework)는 발송자 정보를 위/변조하는 스팸메일을 차단하기 위한
                기술로 방송통신위원회 산하 한국인터넷진흥원과 국내 포탈업체가 함께 추진하고 있습니다. 네이버에서는
                2005년 11월 22일부터 도입하여 적용하고 있습니다. 메일서버등록제를 도입하게 되면 메일을 발송할 때
                발송서버 정보가 특정한 형태(SPF 레코드)로 메일에 포함되어 함께 전송되는데, 이를 통해 수신측에서는 해당
                메일이 발송자 정보가 위/변조되지 않았음을 확인할 수 있게 됩니다. 즉, 메일을 보낼 때 해당 메일이 어떤
                서버에서 발송되는 메일인지 이름표를 붙여서 보내면 받는 쪽에서 그 이름표를 보고 발송 서버의 정보를
                확인하는 형태입니다. 메일서버등록제가 시행되면 발송자 정보를 위/변조하는 불법 스팸메일과 피싱메일 등이
                사전에 차단되어 스팸메일이 줄어듭니다.
              </p>
              <p>
                재화 또는 서비스 제공 • 필수항목 : 성명, 생년월일, 주소, 전화번호, 이메일주소, 신용카드번호, 은행
                계좌정보 • 선택항목 : 관심분야, 과거 구매내역
              </p>
              <p>
                <strong>만 14세 미만 아동의 개인정보 처리에 관한 사항</strong>
              </p>
              <p>
                ① Heallenges는 만 14세 미만 아동에 대해 개인정보를 수집할 때 법정대리인의 동의를 얻어 해당 서비스 수행에
                필요한 최소한의 개인정보를 수집합니다. • 필수항목 : 법정 대리인의 성명, 관계, 연락처
              </p>
              <p>
                ② 또한, Heallenges의 처리목적 관련 홍보를 위해 아동의 개인정보를 수집할 경우에는 법정대리인으로부터
                별도의 동의를 얻습니다.
              </p>
              <p>
                ③ Heallenges는 만 14세 미만 아동의 개인정보를 수집할 때에는 아동에게 법정대리인의 성명, 연락처와 같이
                최소한의 정보를 요구할 수 있으며, 다음 중 하나의 방법으로 적법한 법정대리인이 동의하였는지를 확인합니다.
                • 동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 개인정보처리자가 그 동의
                표시를 확인했음을 법정대리인의 휴대전화 문자 메시지로 알리는 방법 • 동의 내용을 게재한 인터넷 사이트에
                법정대리인이 동의 여부를 표시하도록 하고 법정대리인의 신용카드·직불카드 등의 카드정보를 제공받는 방법 •
                동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 법정대리인의 휴대전화
                본인인증 등을 통해 본인 여부를 확인하는 방법 • 동의 내용이 적힌 서면을 법정대리인에게 직접 발급하거나,
                우편 또는 팩스를 통하여 전달하고 법정대리인이 동의 내용에 대하여 서명날인 후 제출하도록 하는 방법 • 동의
                내용이 적힌 전자우편을 발송하여 법정대리인으로부터 동의의 의사표시가 적힌 전자우편을 전송받는 방법 •
                전화를 통하여 동의 내용을 법정대리인에게 알리고 동의를 얻거나 인터넷주소 등 동의 내용을 확인할 수 있는
                방법을 안내하고 재차 전화 통화를 통하여 동의를 얻는 방법 • 그 밖에 위와 준하는 방법으로 법정대리인에게
                동의 내용을 알리고 동의의 의사표시를 확인하는 방법
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-link text-decoration-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={openModal}>
        정보보호 인증
      </button>
      <button
        type="button"
        className="btn btn-link text-decoration-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={openModal}>
        검색결과 수집에 대한 정책
      </button>
    </>
  );
}

export default FooterModal;
