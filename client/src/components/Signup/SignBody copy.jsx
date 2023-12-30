import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SignBody() {
  const [data, setData] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    aboutme: "",
    blog: "",
    postcode: "",
    address: "",
  });

  const [zipCode, setZipcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [file, setFile] = useState();

  const navigate = useNavigate();
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const changeData = useCallback((evt) => {
    setData((data) => ({ ...data, [evt.target.name]: evt.target.value }));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const daum = useDaumPostcodePopup(postcodeScriptUrl);
  const handleComplete = (info) => {
    let address = "";
    let extraAddress = "";

    if (data.userSelectedType === "R") address = data.roadAddress;
    else address = data.jibunAddress;

    if (data.userSelectedType === "R") {
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname))
        extraAddress += data.bname;
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraAddress +=
          extraAddress !== "" ? ", " + data.buildingName : data.buildingName;
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraAddress !== "") extraAddress = " (" + extraAddress + ")";

      // 전송 버튼이 활성화되기 위해서는 다음 주소가 할당한 필드가 기본적으로 validate(검증), 필드에 커서가 위치한 적이 있는가(touch),
      // 마지막으로 필드가 수정된 적이 있는가(dirty)를 모두 true로 설정하여 검증완료 및 수정이 된 상태로 변경해서 submit 버튼이 실행된다
      // 커서를 상세주소 필드로 이동한다.

      setData((data) => ({ ...data, [data.postcode]: info.zonecode }));
      setData((data) => ({ ...data, [data.address]: info.roadAddress }));
      setZipcode(info.zonecode);
      setRoadAddress(info.roadAddress);
    }
  };
  const getAddress = () => {
    daum({ onComplete: handleComplete });
  };

  useEffect(() => {
    console.log(data);
  }, []);

  const submitEvent = useCallback(
    async (data) => {
      try {
        // 파일 업로드로 인해 formdata 사용
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        const files = document.querySelector('input[name="profile"]').files;
        console.log(formData);
        const resp = await axios({
          method: "POST",
          url: "http://localhost:8001/signup",
          headers: { "Content-type": "multipart/form-data" },
          data: formData,
        });
        console.log(resp);
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    },
    [navigate]
  );

  return (
    <>
      <section className="vh-200">
        <div className="mask d-flex align-items-center gradient-custom-3">
          <div className="container h-150">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px;" }}>
                  <div className="card-body p-5">
                    <form>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="name">
                          이름
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-control form-control-lg"
                          name="name"
                          value={data?.name}
                          onChange={changeData}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="nickname">
                          닉네임
                        </label>
                        <input
                          type="text"
                          id="nickname"
                          className="form-control form-control-lg"
                          name="nickname"
                          value={data?.nickname}
                          onChange={changeData}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">
                          이메일
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          name="email"
                          value={data.email}
                          onChange={changeData}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">
                          비밀번호
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          name="password"
                          value={data.password}
                          onChange={changeData}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="aboutme">
                          자기소개
                        </label>
                        <input
                          type="text"
                          id="aboutme"
                          className="form-control form-control-lg"
                          name="aboutme"
                          value={data?.aboutme}
                          onChange={changeData}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="blog">
                          블로그
                        </label>
                        <input
                          type="text"
                          id="blog"
                          className="form-control form-control-lg"
                          name="blog"
                          value={data?.blog}
                          onChange={changeData}
                        />
                      </div>
                      <div className="col-sm-12 form-group mb-3">
                        <div className="row">
                          <label htmlhtmlFor="address" className="form-label">
                            주소:{" "}
                          </label>
                          <div className="col-sm-4 mb-1">
                            <input
                              type="text"
                              className="form-control"
                              id="postcode"
                              name="postcode"
                              readOnly
                              value={data.postcode}
                              onChange={changeData}
                            />
                          </div>
                          <div className="col-sm-10 input-group mb-2">
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              name="address"
                              readOnly
                              value={data.address}
                              onChange={changeData}
                            />
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={getAddress}
                            >
                              주소찾기
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="container mb-4">
                        <input
                          type="file"
                          onChange={handleFile}
                          name="profile"
                        ></input>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                          onClick={submitEvent}
                        >
                          회원가입
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        이미 계정이 있으시다면?{" "}
                        <a href="#!" className="fw-bold text-body">
                          <u>로그인 하러가기</u>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignBody;
