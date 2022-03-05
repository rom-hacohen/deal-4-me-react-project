import React from "react";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <>
      <div id="fh5co-wrapper">
        <div id="fh5co-page">
          <div
            className="fh5co-parallax"
            style={{ backgroundImage: "url(/images/slider1.jpg)"}}
            data-stellar-background-ratio="0.5"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                  <div className="fh5co-intro fh5co-table-cell">
                    <h1 className="text-center">Contact Me</h1>
                    <p>
                      Made with love by the fine devloper  &nbsp;
                      <a href="https://www.linkedin.com/in/rom-hacohen">
                        Rom Hacohen
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div id="fh5co-contact-section">
              <div className="row">
                <div className="col-md-6">
                  <div id="map" className="fh5co-map"><img src="https://res.cloudinary.com/romhacohen/image/upload/v1646489506/profile_mbpbgi.jpg" style={{width:400,height:400, borderRadius:100, marginLeft:"10em"}} /></div>
                </div>
                <div className="col-md-6">
                  <div className="col-md-12">
                    <h3>About me</h3>
                    <p>
                      Hello. My name is Rom. I am looking for job as a full
                      stack developer. I have knowledge in software languages as
                      react.js , JavaScript, angular, node.js and more. I'm a good team
                      player with a lot of motivation, and I have passion for
                      development. I look forward to receving your reply.
                      Regards, Rom Hacohen.
                    </p>
                    <ul className="contact-info">
                      <li>
                        <i className="ti-mobile"></i>0545424808
                      </li>
                      <li>
                        <i className="ti-envelope"></i>romshnaper@gmail.com
                      </li>
                      <li>
                        <i className="ti-home"></i>
                        <a href="https://github.com/rom-hacohen">my GitHub</a>
                      </li>
                      <li>
                        <i className="ti-home"></i>
                        <a href="https://www.linkedin.com/in/rom-hacohen/">
                          my Linkedin
                        </a>
                      </li>
                      <li>
                        <i className="ti-envelope"></i>
                        <Link
                          to="public\assets\Rom Hacohen -CV (2).pdf"
                          download
                        >
                          My Resume
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
