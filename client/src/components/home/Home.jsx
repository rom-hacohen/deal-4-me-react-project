import React, { useEffect, useState } from "react";
import Header from "../header/Header"

const Home = () => {
  const [deals, setdeals] = useState([]);
  const URL = "http://localhost:3009";

  useEffect(async () => {
    await fetch(`${URL}/deals`)
      .then((response) => response.json())
      .then((json) => setdeals(json))
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  // const loadData = async () => {
  //   await fetch(`${URL}/deals`)
  //     .then((response) => response.json())
  //     .then((json) => setdeals(json))
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //     });
  // };
  console.log(deals);
  return (
    <div>
      <Header />
      <div id="featured-hotel" className="fh5co-bg-color">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h2>Featured Hotels</h2>
              </div>
            </div>
          </div>

          <div className="row">
            {deals.length > 0 && (
              <div className="feature-full-1col">
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(images/deals/${deals[0].img_src})`,
                  }}
                >
                  <div className="descrip text-center">
                    <p>
                      <small>per night</small>
                      <span>${deals[0].price}</span>
                    </p>
                  </div>
                </div>
                <div className="desc">
                  <h3>{deals[0].Title}</h3>
                  <p>{deals[0].Description}</p>
                  <p>
                    <a href="#" className="btn btn-primary btn-luxe-primary">
                      Book Now <i className="ti-angle-right"></i>
                    </a>
                  </p>
                </div>
              </div>
            )}

            <div className="feature-full-2col">
              <div className="f-hotel">
                <div
                  className="image"
                  style={{ backgroundImage: "url(images/hotel_feture_2.jpg)" }}
                >
                  <div className="descrip text-center">
                    <p>
                      <small>For as low as</small>
                      <span>$99/night</span>
                    </p>
                  </div>
                </div>

                <div className="desc">
                  <h3>Hotel Bora</h3>
                  <p>
                    Pellentesque habitant morbi tristique senectus et netus ett
                    mauada fames ac turpis egestas. Etiam euismod tempor leo, in
                    suscipit urna condimentum sed.{" "}
                  </p>
                  <p>
                    <a href="#" className="btn btn-primary btn-luxe-primary">
                      Book Now <i className="ti-angle-right"></i>
                    </a>
                  </p>
                </div>
              </div>

              <div className="f-hotel">
                <div
                  className="image"
                  style={{ backgroundImage: "url(images/hotel_feture_3.jpg)" }}
                >
                  <div className="descrip text-center">
                    <p>
                      <small>For as low as</small>
                      <span>$99/night</span>
                    </p>
                  </div>
                </div>

                <div className="desc">
                  <h3>DMorvie</h3>
                  <p>
                    Pellentesque habitant morbi tristique senectus et netus ett
                    mauada fames ac turpis egestas. Etiam euismod tempor leo, in
                    suscipit urna condimentum sed.{" "}
                  </p>
                  <p>
                    <a href="#" className="btn btn-primary btn-luxe-primary">
                      Book Now <i className="ti-angle-right"></i>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//src={require(`../../images/${deals.img_src}`)}
export default Home;
