import React , {useState ,useEffect} from 'react'
import BarChart from "../admin/BarChart";

const DealsChart = () => {
  const URL = "https://deal-4-me.herokuapp.com";
  const [deals, setdeals] = useState([])
  const [render, setrender] = useState(false)

  const [userData, setUserData] = useState({});
   
  const updateDeal ={ 
    labels: deals.map((data) => data.Title),
    datasets: [
      {
        label: 'deals followers',
        data: deals.map((data) => data.followers),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  }

  useEffect( () => {
    fetch(`${URL}/deals`)
    .then(async (response) => {
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setdeals(json)
        setrender(true)
      }})
      .catch((error) =>{
        console.error("There was an error!", error);
      });
      }, []);

useEffect(() => {
  setUserData(updateDeal)
}, [render])


  return (    
    <>   
    {render == true &&
    <div className="App">
    <div style={{ width: 700 , marginTop:170}}>
      <BarChart chartData={userData} />
    </div>
  </div>
}
    </>
);
}

export default DealsChart