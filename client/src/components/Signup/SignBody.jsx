import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";

function Signup() {
  const navigate = useNavigate();

  // react-hook-form 설정
  // npm i react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // 기본값은 필드에 있는 id, name 속성이 아니라 { ...register('email', {검증조건})} 에 기술한 email 이 서버로 전송되는 key가 된다
      // 전송은 { email: 'abc@abc.com' } 형태
      email: "",
      nickname: "",
      name: "",
      password: "",
      blog: "",
      aboutme: "",
      postcode: "",
      address: "",
    },
    mode: "onBlur", // 기본값은 onSubmit
  });

  // 다음 주소 찾기 구현
  // npm i react-daum-postcode
  const daum = useDaumPostcodePopup(postcodeScriptUrl);
  const handleComplete = (data) => {
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
      setValue("address.postcode", data.zonecode, {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      });
      setValue("address.main", address, {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      });
      // 커서를 상세주소 필드로 이동한다.
    }
  };
  const getAddress = () => {
    daum({ onComplete: handleComplete });
  };

  // <form className="row" onSubmit={handleSubmit(submitEvent, errorEvent)}>
  // 여기서 handleSubmit에서 지정한 성공시 실행할 메서드. 매개변수 data에 ...register('이름', {제약조건})을 설정한 모든 필드의
  // 값이 담아서 넘어온다 ...register('이름', {제약조건}) 저정 안한 필드는 개별적으로 따로 제어해야 한다
  const submitEvent = useCallback(
    async (data) => {
      try {
        // 저는 파일 업로드를 위해 formData로 변경했습니다
        const formData = new FormData();

        // 파일 업로드를 위한 file 필드는 react-hook-form 이 값을 객체로 가져오기 때문에 업로드 파일 처리를 할 수 없어 따로 추출함
        const files = document.querySelector('input[name="profile"]').files;
        formData.append("data", JSON.stringify(data));
        formData.append("profile", files[0]);

        // 이 값을 서버에 전송한다. 이미지 업로드가 있어서 headers에 { "Content-type": "multipart/form-data" }를 지정
        // 만약 이미지 업로드가 없다면 headers 필요없고 formData로 변환할 필요없이 바로 매개변수로 받은 data를 바로 전송하면 된다
        const resp = await axios({
          method: "POST",
          url: "http://heallenges.cafe24app.com/signup",
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
  const errorEvent = (error) => console.error(error);

  return (
    <main id="main">
      <section className="section-about">
        <div className="container">
          <form
            className="row"
            onSubmit={handleSubmit(submitEvent, errorEvent)}
          >
            <div className="col-sm-12 mb-3">
              <label htmlFor="email" className="form-label">
                이메일 * :{" "}
                <span style={{ color: "orange" }}>{errors.email?.message}</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="사용할 이메일을 입력해주세요"
                {...register("email", {
                  required: {
                    value: true,
                    message: "이메일은 필수 입력 사항입니다",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "이메일 형식이 아닙니다",
                  },
                })}
              />
            </div>

            <div className="col-sm-12 mb-3">
              <label htmlFor="nickname" className="form-label">
                닉네임 * :{" "}
                <span style={{ color: "orange" }}>
                  {errors.nickname?.message}
                </span>
              </label>
              <input
                type="text"
                className="form-control"
                id="nickname"
                placeholder="사용할 닉네임을 입력해주세요"
                {...register("nickname", {
                  required: {
                    value: true,
                    message: "닉네임은 필수 입력 사항입니다",
                  },
                })}
              />
            </div>

            <div className="col-sm-12 mb-3">
              <label htmlFor="password" className="form-label">
                패스워드 * :{" "}
                <span style={{ color: "orange" }}>
                  {errors.password?.message}
                </span>
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="사용할 비밀번호를 입력해주세요"
                {...register("password", {
                  required: {
                    value: true,
                    message: "패스워드는 필수 입력 사항입니다",
                  },
                  // 8글자 이상 25글자 이하
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                    message:
                      "영문, 숫자, 특수문자를 조합하여 8글자 이상 입력해 주세요",
                  },
                })}
              />
            </div>
            <div className="col-sm-12 mb-3">
              <label htmlFor="name" className="form-label">
                이름 * :{" "}
                <span style={{ color: "orange" }}>{errors.name?.message}</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="사용자의 이름을 입력해주세요"
                {...register("name", {
                  required: {
                    value: true,
                    message: "이름은 필수 입력 사항입니다",
                  },
                  pattern: {
                    value: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣].{2,5}/,
                    message: "2~5자 사이의 한글 이름을 입력해주세요",
                  },
                })}
              />
            </div>
            <div className="col-sm-12 mb-3">
              <label htmlFor="about_me" className="form-label">
                자기소개 :{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="about_me"
                {...register("about_me")}
              />
            </div>
            <div className="col-sm-12 mb-3">
              <label htmlFor="blog_url" className="form-label">
                SNS :{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="blog_url"
                {...register("blog_url")}
              />
            </div>

            <div className="col-sm-12 form-group mb-3">
              <div className="row">
                <label htmlFor="address" className="form-label">
                  주소:{" "}
                  <span style={{ color: "orange" }}>
                    {errors.address?.main?.message}
                  </span>
                </label>
                <div className="col-sm-2 mb-1">
                  <input
                    type="text"
                    className="form-control"
                    id="postcode"
                    readOnly
                    {...register("address.postcode")}
                  />
                </div>
                <div className="col-sm-10 input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    readOnly
                    {...register("address.main", {
                      required: {
                        value: true,
                        message: "주소는 필수 입력 사항입니다",
                      },
                    })}
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

            <div className="col-sm-12 mb-3">
              <label htmlFor="profile" className="form-label">
                프로필 이미지
              </label>
              <input
                type="file"
                className="form-control"
                id="profile"
                name="profile"
                accept="image/*"
                {...register("profile")}
              />
            </div>
            <div className="col-sm-12 position-relative form-group">
              <button
                type="submit"
                className="btn btn-danger"
                style={{ paddingTop: "10px" }}
              >
                회원가입
              </button>{" "}
              <button
                type="reset"
                className="btn btn-primary"
                style={{ paddingTop: "10px" }}
              >
                다시하기
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Signup;

Signup.defaultProps = {
  sub: "",
};
