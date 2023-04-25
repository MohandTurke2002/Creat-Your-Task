import React, { useEffect, useState } from "react";
import "./Home-Page.scss";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import HomeHeader from "../../Components/Main-Home-Headers/Home-Header";
import { auth, db } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import MainHeader from "../../Components/Main-Home-Headers/Main-Header";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Loading from "../../Components/Loading/Loading";

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  const [inp, setInp] = useState();

  let query = collection(db, `user/${user?.uid}/Tasks`);

  useEffect(() => {
    let getTasks = async () => {
      const data = await getDocs(query);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTasks();
  });

  let checked = async (id, checked, e) => {
    let taskDoc = doc(db, `user/${user?.uid}/Tasks/${id}`);
    await updateDoc(taskDoc, { checked: !checked });
    let taskChecked = e.target.closest(".task");
    taskChecked.classList.toggle("checked");
    window.location.reload();
  };

  let deleted = async (id) => {
    let taskDoc = doc(db, `user/${user?.uid}/Tasks/${id}`);
    await deleteDoc(taskDoc);
  };

  let handleEdite = async (id, title) => {
    let taskDoc = doc(db, `user/${user?.uid}/Tasks/${id}`);
    await updateDoc(taskDoc, { title: title });
    let updateBar = document.getElementById(`${id}`);
    updateBar.style.width = "0px";
  };

  let updating = (id) => {
    let updateBar = document.getElementById(`${id}`);
    updateBar.style.width = "245px";
    console.log(updateBar);
  };

  if (loading) {
    return <Loading />;
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
          <div className="home">
            {tasks?.length > 0 ? (
              <div className="wraptasks">
                <div className="tasks">
                  {tasks.map((data) => (
                    <div
                      className={data.checked ? "task checked" : "task"}
                      key={data.id}
                    >
                      <p className="taskpara">{data.title}</p>
                      <div className="buttonstask">
                        <div className="wrapbutton">
                          <button
                            className="edite"
                            onClick={() => updating(data.id)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            className="check"
                            onClick={(e) => checked(data.id, data.checked, e)}
                          >
                            <i className="fa-solid fa-check-double"></i>
                          </button>
                          <button
                            className="del"
                            onClick={() => deleted(data.id)}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                        <div className="wraptitle" id={data.id}>
                          <input
                            placeholder={data.title}
                            type="text"
                            onChange={(e) => setInp(e.target.value)}
                          />
                          <button
                            className="update"
                            onClick={(e) => handleEdite(data.id, inp)}
                          >
                            <i className="fa-solid fa-check"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="no-task">
                <h1 className="please">
                  there is <span>no</span> tasks{" "}
                </h1>
                <h3 className="please">creat ur task noooow</h3>
              </div>
            )}
            <div className="wrapadd">
              <div className="addtask">
                <Link to="/CreatTask" className="link">
                  <button className="buttonadd">
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </Link>
              </div>
            </div>
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

export default Home;
