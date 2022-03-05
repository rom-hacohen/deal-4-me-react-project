import React  from "react";
import Footer from "../Footer/Footer";
import Header from "../header/Header";
import { Pro } from "../prodacts/Pro";
import AllProdacts from "../prodacts/AllProdacts";

const Home = ({socket}) => {
  return (
    <div>
      <Header />
      <Pro socket={socket}/>
      <AllProdacts socket={socket}/>
      </div>
  );
};
export default Home;
