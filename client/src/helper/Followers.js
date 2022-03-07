
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


