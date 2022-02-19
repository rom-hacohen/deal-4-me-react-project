import React, { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../helper/UserContext";
import { useNavigate } from "react-router-dom";
import useFecthUser from "../../helper/facthUser";
import { getItemFromLocalStorage } from "../../helper/localStorageManage";
const TemNavBAr = () => {
  const navigate = useNavigate();
  const { User, setUser } = useContext(UserContext);
  const AuthUser = useFecthUser()
  const auth = getItemFromLocalStorage("isAuth")

  const Logout = () => {
    localStorage.clear();
    setUser("");
    navigate("/");
  };

  const CheckAuth = () =>{
  if (auth === true) {
  setUser(AuthUser)
  }}

  useEffect(() => {
    CheckAuth()
    console.log('render');
    console.log(AuthUser);
    console.log(User);
  },)
  



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
                <a href="/">DEAL-4-ME</a>
              </h1>
              <nav id="fh5co-menu-wrap" role="navigation">
                <ul className="sf-menu" id="fh5co-primary-menu">
                  <li>
                    <a className="fh5co-sub-ddown">Hotel</a>
                    {/* <ul className="fh5co-sub-menu">
               <li><a href="#">DEAL-4-ME Hotel</a></li>
               <li><a href="#">Deluxe Hotel</a></li>
              <li><a href="#">Five Star Hotel</a></li> 
            </ul> */}
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  {User ? (
                    <li className="active"><a> {User.first_name}</a></li>) : ("")}
                  {User ? (
                    <button className="btn-luxe-primary active" onClick={() => Logout()}>LogOut</button>)
                    :(
                    <li>
                      <Link to="/AuthForm" className="btn-luxe-primary active">
                        Register
                      </Link>
                    </li>
                  )}
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
