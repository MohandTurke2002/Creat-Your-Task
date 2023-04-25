import React from "react";
import "./Verifi-page.scss";
import Footer from "../../Components/Footer/Footer";
import MainHeader from "../../Components/Main-Home-Headers/Main-Header";
const Verifi = () => {
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
};

export default Verifi;
