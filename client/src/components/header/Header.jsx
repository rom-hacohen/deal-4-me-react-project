import React, { useContext } from "react";
import { UserContext } from "../../helper/UserContext";
import { Link } from "react-router-dom";

const Header = () => {

	const { User, setUser } = useContext(UserContext);
console.log(User);
  return (
    <li style={{ backgroundImage: "url(/images/slider1.jpg)", height: 600 }}>
      <div className="overlay-gradient">
        <div className="container">
          <div className=" col-md-offset-0 text-center slider-text">
            <div className="slider-text-inner js-fullheight">
              <div className="desc">

                {User !==null ? (<>
					<p>
                  <span>WELCOM {User.first_name}</span>
                </p>
                  <h2 style={{marginBottom:"3em"}}>Find your next vasction</h2>
				</>
                ) : (
                  <>
				  <p>
                  <span>WELCOM</span>
                </p>
                    <h2>Find your next vasction</h2>
                    <p>Don't have an account yet?</p>
                    <p>
                    <Link to="/AuthForm"><a className="btn btn-primary btn-lg">
                        Sign up 
                      </a>
                      </Link>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Header;
