import React, { useRef } from "react";
import "./Sign.scss";
import Footer from "../../Components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userEmail, userNameCh, userPassword } from "../../Redux/UserSlice";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import MainHeader from "../../Components/Main-Home-Headers/Main-Header";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  let dispatch = useDispatch();
  let userNameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();
  let rePassowrdRef = useRef();
  let navigate = useNavigate();

  let signUpReq = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser);
      })
      .then(() => {
        const ref = doc(
          db,
          "user",
          auth.currentUser?.uid,
          "profInfo",
          auth.currentUser?.uid
        );
        setDoc(ref, {
          pass: password,
          userName: name,
        });
      });
  };

  let handleSignUp = async () => {
    if (
      !userNameRef.current.value ||
      !emailRef.current.value ||
      !passwordRef.current.value
    ) {
      let emptyMess = document.querySelector(".error");
      emptyMess.style.display = "block";
    }
    if (passwordRef.current.value !== rePassowrdRef.current.value) {
      let emptyMess = document.querySelector(".error");
      emptyMess.style.display = "none";
      let pasMess = document.querySelector(".error-pas");
      pasMess.style.display = "block";
    }
    if (
      userNameRef.current.value &&
      emailRef.current.value &&
      passwordRef.current.value &&
      passwordRef.current.value === rePassowrdRef.current.value
    ) {
      try {
        await signUpReq(
          emailRef.current.value,
          passwordRef.current.value,
          userNameRef.current.value
        );
        dispatch(userNameCh(userNameRef.current.value));
        dispatch(userEmail(emailRef.current.value));
        dispatch(userPassword(passwordRef.current.value));
        navigate("/Verifi");
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
          <h3 className="signtext">sign-up</h3>
          <div className="wrapusername">
            <label>
              <input type="text" ref={userNameRef} />
              <span>user name</span>
            </label>
          </div>
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
            <label>
              <input type="password" ref={rePassowrdRef} />
              <span>re-password</span>
            </label>
          </div>
          <p className="error">empty input</p>
          <p className="error-pas">password not match</p>
          <Link className="link">
            <input
              type="submit"
              value="Sign-Up"
              className="button-sign"
              onClick={() => handleSignUp()}
            />
          </Link>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
