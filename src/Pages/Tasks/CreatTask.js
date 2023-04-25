import React, { useRef, useState } from "react";
import "./Creat-Task.scss";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import HomeHeader from "../../Components/Main-Home-Headers/Home-Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase";
import MainHeader from "../../Components/Main-Home-Headers/Main-Header";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

const CreatTask = () => {
  const [user, loading] = useAuthState(auth);
  const [title, setTitle] = useState();

  let titleRef = useRef();

  let handleTitle = () => {
    setTitle(titleRef.current.value);
  };

  let sendTaskData = (ti) => {
    let query = collection(db, `user/${user?.uid}/Tasks`);
    addDoc(query, {
      title: ti,
      checked: false,
    });
  };

  let handleAdd = async () => {
    try {
      await sendTaskData(titleRef.current.value);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>loading</p>;
  }

  if (!user) {
    return (
      <>
        <MainHeader />
        <h1 className="please">Please Sign In</h1>
        <Footer />
      </>
    );
  }

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <HomeHeader />
          <div className="crshtask">
            <form className="wrapcreattask">
              <div className="wraptitle">
                <label>
                  <input
                    value={title}
                    type="text"
                    ref={titleRef}
                    onChange={() => handleTitle()}
                  />
                  <span>title task</span>
                </label>
              </div>
              <div className="wrapbuttons">
                <Link to="/Home">
                  <button className="cancel">cancel</button>
                </Link>
                <Link to="/Home">
                  <input
                    type="submit"
                    value="Add"
                    className="button-sign"
                    onClick={() => handleAdd()}
                  />
                </Link>
              </div>
            </form>
          </div>
          <Footer />
        </>
      );
    }
  }

  if (!user.emailVerified) {
    return (
      <>
        <MainHeader />
        <div className="verifitext">
          <h1 className="verifi">verifi your account</h1>
          <p className="verifipara">GO to your Email Account and Verifi it</p>
        </div>
        <Footer />
      </>
    );
  }
};

export default CreatTask;
