import React, { useContext } from "react";
import { UserContext } from "../../helper/UserContext";

const Header = () => {

	const { User, setUser } = useContext(UserContext);

  return (
    <li style={{ backgroundImage: "url(/images/slider1.jpg)", height: 600 }}>
      <div className="overlay-gradient">
        <div className="container">
          <div className=" col-md-offset-0 text-center slider-text">
            <div className="slider-text-inner js-fullheight">
              <div className="desc">

                {User ? (<>
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
                      <a href="AuthForm" className="btn btn-primary btn-lg">
                        Sign up
                      </a>
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
