import React, { useEffect, useState }  from "react";
import Header from "../header/Header";
import { Pro } from "../prodacts/Pro";
import AllProdacts from "../prodacts/AllProdacts";

const Home = ({socket}) => {
  const [isLoding, setIsLoding] = useState(false)
  useEffect(() => {
    setIsLoding(true)
  }, [isLoding])
  
  return (
    <>
    {isLoding &&(
    <div>
      <Header />
      <Pro socket={socket}/>
      <AllProdacts socket={socket}/>
      </div>
      )}
      </>
  );
};
export default Home;
