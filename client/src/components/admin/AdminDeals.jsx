import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
// const { io } = require("socket.io-client");

const AdminDeals = ({socket}) => { 
  const URL = "http://localhost:3009";
  const [deals, setdeals] = useState([]);
  const [SelectDeal, setSelectDeal] = useState(null);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [Title, setTitle] = useState("");
  const [state, setstate] = useState("");
  const [price, setprice] = useState(null);
  const [hotelName, sethotelName] = useState('');
  const [category, setcategory] = useState(null);
  const [Description, setDescription] = useState('');
  const [city, setcity] = useState('');
  const [dates, setdates] = useState('');
  const [render, setrender] = useState(false);
  const [image, setImage] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };


   const openUpdtateModel = (id)=>{
    const exsist = deals.find(obj => obj.dealID === id)
    if (exsist) {
      setSelectDeal(exsist)
      handleShowUpdate()
    }}
  


    
    const updateDael =  async(id)=>{
     const UpadateData = {Title : Title,state:state,price:price,hotelName:hotelName,categoryID:category,Description:Description,img_src:image,city:city,dates:dates};
      console.log(JSON.stringify(UpadateData));   
      console.log(id);
     fetch(`${URL}/deals_manage/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UpadateData),
      })
      .then(async (response) => {
        if (response.ok) {
            const json = await response.json();
            console.log(json);
            setrender(true)
            socket.emit("sendUpdate",false)
            handleClose()
        }
      })
        .catch((error) => {
          console.error("Error:", error);
        });
        
       } 
       
  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'deal4me')
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/romhacohen/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
   setImage(file.secure_url)
  }

  
  const deleteDeal =(id)=>{
    fetch(`${URL}/deals_manage/${id}`, {
      method: "DELETE",
    })
    .then(async (response) => {
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setrender(true)
        socket.emit("sendUpdate",false)
      }
    })
      .catch((error) => {
        console.error("Error:", error);
      });
     
  }

  const creatDeal = ()=>{
    if (image !=="") {
      const data = {Title:Title,state:state,price:price,hotelName:hotelName,categoryID:category,Description:Description,img_src:image,city:city,dates:dates};
      console.log(data);
    fetch(`${URL}/deals_manage`,{
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
          setrender(true)
          socket.emit("sendUpdate",false)
          handleClose()
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  }

        

  useEffect(async () => {
    await fetch(`${URL}/deals`)
      .then((response) => response.json())
      .then((json) => setdeals(json),setrender(prev=> prev=false))
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [render]);


  return (
    <>
      <div id="hotel-facilities" style={{ marginTop: "50px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h2>all deals</h2>
                <button onClick={handleShow} className="btn btn-success">
                  add deal
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="feature-full-2col">
            <div className="row">
              {deals.map((x, ind) => (
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
                    <h2><strong style={{textTransform:"uppercase"}}>{x.state}</strong></h2><br/>
                    <h3>{x.hotelName}</h3>
                    <br />
                    <p>{x.Description}</p>
                    <h4> Dates: {x.dates}</h4>
                    <p>
                      <button onClick={()=>deleteDeal(x.dealID)} className="btn btn-danger btn-luxe-primary">
                        delete deal <i className="ti-angle-right"></i>
                      </button>
                      <button onClick={()=>openUpdtateModel(x.dealID)} className="btn btn-dark btn-luxe-primary">
                        update deal <i className="ti-angle-right"></i>
                      </button>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*/////////////////////////////////////////////// craet deal model /////////////////////////////////////////////////*/}
      <Modal show={show} onHide={handleClose} animation={false}>
      <form onSubmit={{handleSubmit}}>
        <Modal.Header closeButton>
          <Modal.Title>CREATE NEW DEAL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input name="Title" onChange={(e) =>setTitle(e.target.value)} placeholder="Title" required />
            <input name="state"  onChange={(e) =>setstate(e.target.value)} placeholder="state" required />
            <input type="number"  onChange={(e) =>setprice(e.target.value)} name="price" placeholder="price" required />
            <input name="hotelName"  onChange={(e) =>sethotelName(e.target.value)} placeholder="hotelName" required />
            <select name="category"  onChange={(e) =>setcategory(e.target.value)} form="carform">
              <option >Select category</option>
              <option value={1}>most popular</option>
              <option value={2}>famliy</option>
              <option value={3}>romance</option>
              <option value={4}>near ski resorts</option>
            </select>
            <Form.Control  onChange={(e) =>setDescription(e.target.value)} style={{background:"#e0dede",marginLeft:"9em" , width:"300px"}}
             as="textarea" rows={3} placeholder="Description"/>
               <input  onChange={uploadImage} type="file" name="img_src" placeholder="choose IMG" />
               <input name="city"  onChange={(e) =>setcity(e.target.value)} placeholder="city" required />
               <input value={dates} name="dates"  onChange={(e) =>setdates(e.target.value)}  placeholder="dates" required />
        </Modal.Body> 
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary" >
            Close
          </Button>
          <Button  onClick={()=>creatDeal()} variant="primary" >
          CREATE DEAL
          </Button>
        </Modal.Footer>
        </form>
      </Modal>

      {/*//////////////////////////////// update deal model ////////////////////////////////////////////////*/}
      {SelectDeal !== null &&
      <Modal show={showUpdate} onHide={handleCloseUpdate} animation={false}>
      <form onSubmit={{handleSubmit}}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE DEAL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input  name="Title" onChange={(e) =>setTitle(e.target.value)} placeholder={SelectDeal.Title} required />
            <input  name="state"  onChange={(e) =>setstate(e.target.value)} placeholder={SelectDeal.state} required />
            <input  type="number"  onChange={(e) =>setprice(e.target.value)}  name={SelectDeal.price} placeholder="price" required />
            <input  name="hotelName"  onChange={(e) =>sethotelName(e.target.value)} placeholder={SelectDeal.hotelName} required />
            <select  name="category"  onChange={(e) =>setcategory(e.target.value)} form="carform">
              <option >Select category</option>
              <option value={1}>most popular</option>
              <option value={2}>famliy</option>
              <option value={3}>romance</option>
              <option value={4}>near ski resorts</option>
            </select>
            <Form.Control onChange={(e) =>setDescription(e.target.value)} style={{background:"#e0dede",marginLeft:"9em" , width:"300px"}}
             as="textarea" rows={3} placeholder={SelectDeal.Description} required/>
               <input onChange={uploadImage} type="file" name="image" required />
               <input name="city"  onChange={(e) =>setcity(e.target.value)} placeholder={SelectDeal.city} required />
               <input name="dates"  onChange={(e) =>setdates(e.target.value)}  placeholder={SelectDeal.dates} required />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseUpdate} variant="secondary" >
            Close
          </Button>
          <Button  onClick={()=>updateDael(SelectDeal.dealID)} variant="primary" >
          SET UPDATE
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
}
    </>
  );
};

export default AdminDeals;
