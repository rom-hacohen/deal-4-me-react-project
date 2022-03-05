import React from 'react'
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
    <footer id="footer" className="fh5co-bg-color">
    <div className="container">
        <div className="row">
            <div className="col-md-3">
                <div className="copyright">
                    <p><small>&copy; 2016 Free HTML5 Template. <br/> All Rights Reserved. <br/>
                    Designed by <a href="http://freehtml5.co" target="_blank">FreeHTML5.co</a> <br/> Demo Images: <a href="http://unsplash.com/" target="_blank">Unsplash</a></small></p>
                </div>
            </div>
            <div className="col-md-6">
                <div className="row">
                    <div className="col-md-3">
                        <h3>Contact</h3>
                        <ul className="link">
                            <Link to="/About">About me</Link>
                            <li><a href="https://github.com/rom-hacohen">my GitHub</a></li>
                            <li><a href="https://www.linkedin.com/in/rom-hacohen/">my Linkedin</a></li>
                            <li><i className="ti-envelope"></i>romshnaper@gmail.com</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h3>Subscribe</h3>
                        <p>Sed cursus ut nibh in semper. Mauris varius et magna in fermentum. </p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <ul className="social-icons">
                    <li>
                        <a><i className="icon-twitter-with-circle"></i></a>
                        <a><i className="icon-facebook-with-circle"></i></a>
                        <a><i className="icon-instagram-with-circle"></i></a>
                        <a><i className="icon-linkedin-with-circle"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </footer>
    </div>
  )
}

export default Footer