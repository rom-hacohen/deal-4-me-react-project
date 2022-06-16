import React, { useState} from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import AuthForm from "./components/Auth/AuthForm";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TemNavBAr from "./components/navbar/TemNavBAr";
import { UserContext } from "./helper/UserContext";
import 'bootstrap-icons/font/bootstrap-icons.css';
import MyFollows from "./components/MyFollows/MyFollows";
import AdminDeals from "./components/admin/AdminDeals";
import DealsChart from "./components/admin/DealsChart";
import About from "./components/about/About"
import Footer from "./components/Footer/Footer";
const { io } = require("socket.io-client");

function App() {
  const [User, setUser] = useState(null);
  const URL = "https://deal-4-me.herokuapp.com";
  const socket = io.connect(URL);

  return (
    <div> 
      <UserContext.Provider value={{User, setUser}}>
      <TemNavBAr/>
      <Routes>
        <Route path="AdminDeals" element={<AdminDeals  socket={socket}/>} />
        <Route path="MyFollows" element={<MyFollows/>} />
        <Route path="/" element={<Home socket={socket}/>} />
        <Route path="AuthForm" element={<AuthForm/>} />
        <Route path="AdminChart" element={<DealsChart/>}/>
        <Route path="About" element={<About/>}/>
      </Routes> 
      <Footer/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
