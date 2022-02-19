import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import AuthForm from "./components/Auth/AuthForm";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TemNavBAr from "./components/navbar/TemNavBAr";
import Admin from "./components/admin/Admin";
import { UserContext } from "./helper/UserContext";
function App() {
  const [User, setUser] = useState(null);
  return (
    <div> 
      <UserContext.Provider value={{User, setUser}}>
      <TemNavBAr/>
      <Routes>
        <Route path="Admin" element={<Admin/>} />
        <Route path="/" element={<Home/>} />
        <Route path="AuthForm" element={<AuthForm />} />
      </Routes> 
      </UserContext.Provider>
    </div>
  );
}

export default App;
