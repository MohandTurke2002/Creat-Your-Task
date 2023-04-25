import React from "react";
import "./Profile-Page.scss";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import HomeHeader from "../../Components/Main-Home-Headers/Home-Header";
import { auth, db } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import MainHeader from "../../Components/Main-Home-Headers/Main-Header";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { userNameCh, userPassword } from "../../Redux/UserSlice";

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  let name = useSelector((state) => state.signup.username);
  let pass = useSelector((state) => state.signup.password);
  let dispatch = useDispatch();

  let query = collection(db, `user/${user?.uid}/profInfo`);
  const [docs] = useCollectionData(query);
  docs?.map((data) => dispatch(userPassword(data.pass)));
  docs?.map((data) => dispatch(userNameCh(data.userName)));

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

  let logOutReq = () => {
    signOut(auth);
  };
  let handleLogOut = async () => {
    try {
      await logOutReq();
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <HomeHeader />
          <div className="profile">
            <form className="wrapprofile">
              <div className="wrapusername">
                <label>
                  <input type="text" placeholder={name} disabled />
                  <span>user name</span>
                </label>
              </div>
              <div className="wrapemail">
                <label>
                  <input type="email" placeholder={user.email} disabled />
                  <span>email</span>
                </label>
              </div>
              <div className="wrappassowrd">
                <label>
                  <input type="password" placeholder={pass} disabled />
                  <span>password</span>
                </label>
              </div>
              <div className="wrapbuttons">
                <Link to="/">
                  <button onClick={() => handleLogOut()}>
                    <span>
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </span>{" "}
                    log out?
                  </button>
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

export default Profile;
