import React, { useEffect ,useState } from "react";
import { getItemFromLocalStorage ,deleteFromLocalStorage } from "./localStorageManage";


const useFecthUser = () => {
  const [data, setData] = useState(null);
  const URL = "https://deal-4-me.herokuapp.com";
  const Token = getItemFromLocalStorage("auth-token");
  const ID = getItemFromLocalStorage("User")

  const userFeach = async()=>{
 if (ID !== null) {
      await fetch(`${URL}/users/${ID.UserId}`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.error("There was an error!", error);
        });
      }}
    
      useEffect(() => {
        userFeach()
      }, [])
      
    if (Token) {
      return data
    }
    else deleteFromLocalStorage('auth-token');
    
};
export default useFecthUser;
