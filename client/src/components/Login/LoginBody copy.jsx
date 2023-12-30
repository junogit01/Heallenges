import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos";
import { useEffect } from "react";
function LoginBody() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="container">
      <form className="mb-10">
        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email">
            이메일
          </label>
          <input type="email" id="id" className="form-control" />
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="paswwrod">
            비밀번호
          </label>
          <input type="password" id="password" className="form-control" />
        </div>

        {/* <!-- 2 column grid layout for inline styling --> */}
        <div className="row mb-4">
          <div className="col">
            {/* <!-- Simple link --> */}
            <a href="#!">비밀번호를 잊으셨나요?</a>
          </div>
        </div>

        {/* <!-- Submit button --> */}
        <button type="button" className="btn btn-primary btn-block mb-4">
          로그인
        </button>

        {/* <!-- Register buttons --> */}
        <div className="text-center">
          <p>
            아직 회원이 아니신가요? <a href="/signup">회원가입</a>
          </p>
          <p>SNS 회원가입:</p>
          <Link to="" className="google">
            <i className="bi bi-google"></i>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginBody;
