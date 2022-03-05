import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../helper/UserContext";
import { useNavigate } from "react-router-dom";
import {addFollower} from "../../helper/Followers";

const AllProdacts = ({socket}) => {
    const [deals, setdeals] = useState([]);
    const { User, setUser } = useContext(UserContext);
    const [isFollowd, setisFollowd] = useState([]);
    const navigate = useNavigate();
    const URL = "http://localhost:3009";
    const [socketMsg, setSocketMsg] = useState(false)
    const [render, setrender] = useState(false)
     
    useEffect(() =>{
      console.log(socket.on('getUpdate',msg=>{
       console.log(msg);
       setSocketMsg(true)
        setrender(true)
       console.log('renser'); 
      }));
     }, [socket]) 
    
      
  console.log(socketMsg);
  
  
    useEffect(async() => {
      if(User !== undefined){
      await fetch(`${URL}/followDeals/user/${User.userID}`)
        .then((response) => response.json())
        .then((json) => setisFollowd(json))
        .catch((error) => {
          console.error("There was an error!", error);
        })}
        }, [User])
  
    useEffect(async () => {
      await fetch(`${URL}/deals`)
        .then((response) => response.json())
        .then((json) => setdeals(json), setrender(prev=> prev=false))
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }, [render]);
  

    const orderByLowerPrice = async() =>{
        await fetch(`${URL}/deals/orderByLowerPrice`)
        .then((response) => response.json())
        .then((json) => setdeals(json))
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }

    const orderByHigherPrice = async() =>{
        await fetch(`${URL}/deals/orderByHigherPrice`)
        .then((response) => response.json())
        .then((json) => setdeals(json))
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }


    const followDeal = async (dealID) => {
      if (User !== null ) {
        const data = {
          userID: User.userID,
          dealID: dealID,
          followers: +1,
          user_follow: 1,
        };
        console.log(data);
        if (data.userID !== null && data.dealID !== null) {
          addFollower(dealID);
          setisFollowd([...isFollowd, data]);
          fetch(`${URL}/followDeals`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then(async (response) => {
              if (response.ok) {
                const json = await response.json();
                console.log(json);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      } else navigate("/AuthForm");
    };
  
  
      const checkDeal = (id)=>{
      const exsist = isFollowd.find(obj => obj.dealID === id)
      if (exsist && User !== null) {
        console.log(exsist);
       return (
          <button className="btn btn-dark btn-luxe-primary">
            Followed!  <i className="ti-angle-right"></i>
          </button>
        )
      }
   
      else{ return(<button
        onClick={() => followDeal(id)}
        className="btn btn-primary btn-luxe-primary"
      >
        Follow deal <i className="ti-angle-right"></i>
      </button>)}
    };
  
  
    return (
      <div id="hotel-facilities">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h2>all deals</h2>
              </div>
            </div>
          </div>
          <div id="tabs">
                <nav className="tabs-nav">
                <a onClick={()=>orderByLowerPrice()} style={{marginLeft:100}}>
                  <i className="bi bi-star-fill fs-1 "></i>
                  <span>order by lower pirce</span>
                </a>
                <a onClick={()=>orderByHigherPrice()} style={{marginLeft:150}}>
                  <i className="bi bi-star-fill fs-1 "></i>
                  <span>order by Higher pirce</span>
                </a>
            </nav>
          </div>
        </div>
  
        <div className="container">
          <div className="feature-full-2col">
            <div className="row">
              {deals.map((x, ind) => (
                <div className="f-hotel" key={ind} style={{marginBottom:15}}>
                  <div
                    className="image"
                    style={{ backgroundImage: `url(${x.img_src})` }}
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
                    <h2><strong style={{textTransform:"uppercase"}}>{x.state}</strong></h2><br/>
                    <h3>{x.hotelName}</h3>
                    <br />
                    <p>{x.Description}</p>
                    <h4> Dates: {x.dates}</h4>
                        <p>
                          {User ?
                          (
                       <>
                        {checkDeal(x.dealID)}
                        </>
                        ):(
                          <button className="btn btn-primary btn-luxe-primary" >
                          <a href="/AuthForm" style={{color:"white"}}>signin to follow deal</a>
                          </button>)}
                        </p>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
      </div>
    );
}

export default AllProdacts