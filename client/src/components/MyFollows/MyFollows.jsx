import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../helper/UserContext";
import {deleteFollowr , removeFollowerFromDeal } from "../../helper/Followers";
const MyFollows = () => {
  const [FollowDeals, setisFollowd] = useState([]);
  const [render, setrender] = useState(false)
  const { User, setUser } = useContext(UserContext);
  const URL = "http://localhost:3009";

  useEffect(async () => {
    if (User.userID !== undefined) {
      await fetch(`${URL}/followDeals/deals/${User.userID}`)
        .then((response) => response.json())
        .then((json) => setisFollowd(json))
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [render]);

    useEffect(() => {
      setrender(false)
    }, [FollowDeals])
    
  console.log(FollowDeals);


    const deleteFromData =(id,dealID)=>{
      deleteFollowr(id)
      removeFollowerFromDeal(dealID)
      setrender(true)
      console.log(FollowDeals); 
  } 

  return (
    <div style={{ marginBottom: "70px" }}>
      <div id="hotel-facilities">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                {FollowDeals.length <= 0 ? (
                  <h2>
                    <strong>follow list is empty</strong>
                  </h2>
                ) : (
                  <h2>
                    <strong>DEALS IN FOLLOW</strong>
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="feature-full-2col">
            <div className="row">
              {FollowDeals.map((x, ind) => (
                <div
                  className="f-hotel"
                  key={ind}
                  style={{ marginBottom: "20px" }}
                >
                  <div
                    className="image"
                    style={{
                      backgroundImage: `url(${x.img_src})`,
                    }}
                  >
                    <div className="descrip text-center">
                      <p>
                        <small>per person</small>
                        <span>{"$" + x.price}</span>
                      </p>
                    </div>
                  </div>
                  <div className="desc" style={{ background: "#e6e6e6" }}>
                    <h1>{x.Title}</h1>
                    <br />
                    <h3>{x.hotelName}</h3>
                    <br />
                    <p>{x.Description}</p>
                    <h4> Dates: {x.dates}</h4>
                    <p>
                      <button onClick={()=>deleteFromData(x.followID,x.dealID)} className="btn btn-danger btn-luxe-primary">
                        UnFollow deal <i className="ti-angle-right"></i>
                      </button>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFollows;
