import { useRef } from "react";
import FormLogin from "../../components/FormLogin";

import "./index.scss";

const initLogin = {
  email: "",
  password: "",
};

const LoginPage = ({ setUserLoged }) => {
  const btnRef = useRef();
  const loginClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const makeLogin = async (values) => {
    console.log("values", values);
    setUserLoged(values);
  };

  return (
    <>
      <div className="wrapper-login">
        <FormLogin
          login={initLogin}
          makeLogin={makeLogin}
          btnRef={loginClick}
        />
        <div>
          <button onClick={loginClick}>Logar</button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
