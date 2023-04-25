import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./StyleHeaders.scss";

const HomeHeader = () => {
  let clickedClass = "clicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;
  if (localStorage) {
    theme = localStorage.getItem("theme");
  }
  useEffect(() => {
    if (theme === darkTheme) {
      body.classList.add(theme);
      let circle = document.querySelector(".circle");
      circle.style.cssText = "left: 40px;";
    } else {
      body.classList.add(lightTheme);
      let circle = document.querySelector(".circle");
      circle.style.cssText = "left: 0px;";
    }
  });
  let darkMode = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
      let circle = document.querySelector(".circle");
      circle.style.cssText = "left: 0px;";
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem("theme", "dark");
      theme = darkTheme;
      let circle = document.querySelector(".circle");
      circle.style.cssText = "left: 40px;";
    }
  };

  let navBarDown = () => {
    let nav = document.querySelector(".navbar");
    nav.classList.toggle("down");
  };

  return (
    <div className="mainheader">
      <div className="logo">
        <h1>creat a task</h1>
      </div>
      <div className="bars">
        <button onClick={() => navBarDown()}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      <div className="navbar">
        <NavLink to="/Home" className="link">
          home
        </NavLink>
        <NavLink to="/Profile" className="link">
          profile
        </NavLink>
        <div className="togglebutton">
          <span>
            <i className="fa-regular fa-sun"></i>
          </span>
          <div className="wrapbutton">
            <span className="circle"></span>
            <input
              type="checkbox"
              className="buttontoggle"
              onClick={(e) => darkMode(e)}
            />
          </div>
          <span>
            <i className="fa-solid fa-moon moon"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
