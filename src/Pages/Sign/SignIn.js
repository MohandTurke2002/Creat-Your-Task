import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import MainHeader from "../../Components/Main-Home-Headers/Main-Header";
import { auth } from "../../firebase/firebase";
import "./Sign.scss";

const SignIn = () => {
  let emailRef = useRef();
  let passwordRef = useRef();
  let navigate = useNavigate();

  let signInReq = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    });
  };
  let handleSignIn = async () => {
    if (!emailRef.current.value || !passwordRef.current.value) {
      let emptyMess = document.querySelector(".error");
      emptyMess.style.display = "block";
    }
    if (emailRef.current.value && passwordRef.current.value) {
      try {
        await signInReq(emailRef.current.value, passwordRef.current.value);
        navigate("/Home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <MainHeader />
      <div className="sign">
        <form className="wrapsign">
          <h3 className="signtext">sign-in</h3>
          <div className="wrapemail">
            <label>
              <input type="email" ref={emailRef} />
              <span>email</span>
            </label>
          </div>
          <div className="wrappassowrd">
            <label>
              <input type="password" ref={passwordRef} />
              <span>password</span>
            </label>
          </div>
          <p className="error">empty input</p>
          <Link className="link">
            <input
              type="submit"
              value="Log-In"
              className="button-sign"
              onClick={() => handleSignIn()}
            />
          </Link>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
