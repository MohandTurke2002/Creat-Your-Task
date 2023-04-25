import React from "react";
import Footer from "../../Components/Footer/Footer";
import MainHeader from "../../Components/Main-Home-Headers/Main-Header";
import "./Welcome.scss";

const WelcomPage = () => {
  return (
    <>
      <MainHeader />
      <div className="textwelcome">
        <h1 className="welcome">
          welcome in my project{" "}
          <span>
            <i className="fa-solid fa-heart"></i>
          </span>
        </h1>
        <p className="welcomepara">creat your task now..!</p>
      </div>
      <Footer />
    </>
  );
};

export default WelcomPage;
