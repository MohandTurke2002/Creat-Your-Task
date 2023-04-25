/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./Pages/Home-Page/Home";
import Profile from "./Pages/Profile-Page/Profile";
import SignIn from "./Pages/Sign/SignIn";
import SignUp from "./Pages/Sign/SignUp";
import CreatTask from "./Pages/Tasks/CreatTask";
import Verifi from "./Pages/Verifi-Page/Verifi";
import WelcomPage from "./Pages/Welcom-Page/Welcom-Page";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomPage />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Verifi" element={<Verifi />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/CreatTask" element={<CreatTask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
