
//NOTES:
//Duplication of addFollower and removeFollowerFromDeal ,can be simplified to one function with path as parameter
//same for fetch  function - you can simplify it to one function and call it
//its better to use await and not ".then"
//
const URL = "https://deal-4-me.herokuapp.com";

const async myFetch(url,dealID){
 fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "Access-Control-Allow-Origin",
        
      },
      body: JSON.stringify(dealID),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}

export const addOrRemoveFollower = (dealID,action) => {
 //action can be string : "addFollower" or  "removeFollower"
 const url=`${URL}/deals/${action}/${dealID}`
 myFetch(url,dealId)
};


 export const addFollower = (dealID) => {
  const URL = "https://deal-4-me.herokuapp.com";
    fetch(`${URL}/deals/addFollower/${dealID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Access-Control-Allow-Origin",
        
      },
      body: JSON.stringify(dealID),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
};

export const removeFollowerFromDeal = (dealID) => {
  const URL = "https://deal-4-me.herokuapp.com";
    fetch(`${URL}/deals/removeFollower/${dealID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Access-Control-Allow-Origin",
        
      },
      body: JSON.stringify(dealID),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
};

  
  

export const deleteFollowr = (id)=>{
  const URL = "https://deal-4-me.herokuapp.com";
  fetch(`${URL}/followDeals/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };


