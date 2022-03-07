import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../helper/UserContext";
import { useNavigate } from "react-router-dom";
import useFecthUser from "../../helper/facthUser";
import {
  getItemFromLocalStorage,
  deleteFromLocalStorage,
  setItemToLocalStorage,
} from "../../helper/localStorageManage";
const TemNavBAr = () => {
  const navigate = useNavigate();
  const { User, setUser } = useContext(UserContext);
  const AuthUser = useFecthUser();
  const auth = getItemFromLocalStorage("isAuth");

  const Logout = () => {
    deleteFromLocalStorage("auth-token");
    setItemToLocalStorage("isAuth", false);
    deleteFromLocalStorage("User");
    setUser("");
  };

  const CheckAuth = () => {
    if (auth === true && AuthUser !== null) {
      setUser(AuthUser);
    }
  };

  useEffect(() => {
    CheckAuth();
  });
  console.log(User);
  console.log(AuthUser);
  return (
    <>
      <div id="fh5co-header">
        <header id="fh5co-header-section">
          <div className="container">
            <div className="nav-header">
              <a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle">
                <i></i>
              </a>
              <h1 id="fh5co-logo">
                <Link to="/"><a>DEAL-4-ME</a></Link>
              </h1>
              <nav id="fh5co-menu-wrap" role="navigation">
                <ul className="sf-menu" id="fh5co-primary-menu">
                  {User !== null ? (
                    <li className="active">
                      {User.admin == 0 ?(<a> {User.first_name}- admin</a>):(<a> {User.first_name}</a>)}
                      
                      <ul className="fh5co-sub-menu">
                      <li>
                        <a href="/" onClick={() => Logout()}>LogOut</a>
                      </li>
                      <li>
                        <Link to="/MyFollows">Deals in follow</Link>
                      </li>
                      {User.admin == 0 &&( 
                      <li>
                        <Link to="/AdminChart">Deals chart</Link>
                        <Link to="/AdminDeals">Deals management</Link>
                      </li>)}
                      </ul>
                    </li>
                  ) : (
                    <li>
                      <Link to="/AuthForm" className="btn-luxe-primary active">
                        Register
                      </Link>
                    </li>
                  )}
                  <li>
                  <Link to="/About">About</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default TemNavBAr;
