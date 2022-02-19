import React, { useState , useContext} from "react";
import "../Auth/Auth.css"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../helper/UserContext";
import { setItemToLocalStorage} from "../../helper/localStorageManage"
const AuthForm = () => {
  
  const {User, setUser} = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFname] = useState("");
  const [last_name, setLname] = useState("");
  const [state, setState] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [token, settoken] = useState(null);
  const navigate = useNavigate();
  const emailEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const URL = "http://localhost:3009";

  const signIn = async () => {
    const Logindata = { email: email, password: password };
    if (email !== "" && password !== "") {
      await fetch(`${URL}/login/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Logindata),
      })
        .then(async (response) => {
          if (response.ok) {
           const json = await response.json();
          await setUser(json.data[0]);
           settoken(json.Token);
          }
          else {
            setErrorMessage('email or password are incorrect')
            throw new Error('email or password are incorrect');
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        }); 
     
    }
    else {
      setErrorMessage("please type your email and password to proceed")
      throw errorMessage;
    }
  };


  const signUp = async () => {
    const SignUpData = {first_name:first_name,last_name: last_name, email: email, password: password ,state:state};
    if (email !== "" && password !== "" && first_name !=="" && last_name !=="") {
      await fetch(`${URL}/login/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SignUpData),
    })
    .then(async(response) => {
      if (response.ok) {
       const json = await response.json();
       console.log(json);
       await setUser(json.data);
      settoken(json.Token);
      }
      else {
        setErrorMessage('email or password are incorrect')
        throw new Error('email or password are incorrect');
      }
    }).catch((error) => {
      console.log(error);
    });
  } 
  else {
    setErrorMessage("somthing went wrong try again")
    throw errorMessage;
  }
  }
  if (token !== null && User !== null) {
    console.log(token);
    setItemToLocalStorage('token',token)
    setItemToLocalStorage('User',{
      UserId:User.userID,
      Email:User.email, 
    })
    setItemToLocalStorage('isAuth',true)
    if (User.admin === 1 ) {
      navigate('/')
    }
    else if(User.admin === 0 ) navigate('/Admin')

    else navigate('/')
  }
  // else if(token === undefined){
  //   localStorage.clear()
  // }

console.log(User);
console.log(token);
  return (
    <div className="Formbody">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form onSubmit={handleSubmit}>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input value={first_name} onChange={(e) => setFname(e.target.value)}  name="First Name" placeholder="First name" required />
            <input value={last_name} onChange={(e) => setLname(e.target.value)}  name="txt" placeholder="Last name" required />
            <input  value={email} ref={emailEx} onChange={(e) => setEmail(e.target.value)} type='email' id='email' placeholder="Email" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' id='password' placeholder="Password" autoComplete="on" required />
            <select value={state} onChange={(e) => setState(e.target.value)} name="staet" form="carform">
              <option >select your state</option>
              <option value="israel">Israel</option>
              <option value="france">France</option>
              <option value="italy">Italy</option>
              <option value="Japan">Japan</option>
              <option value="Germany">Germany</option>
              <option value="California">California</option>
              <option value="New-York">New-York</option>
              <option value="Other">Other</option>
            </select> 
            <button type="submit" className="REbutton" onClick={()=>signUp()}>Sign up</button>
          </form>
        </div>
        <div className="login">
          <form onSubmit={handleSubmit}>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input value={email} ref={emailEx} onChange={(e) => setEmail(e.target.value)} type='email' id='LoginEmail' placeholder="Email" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' id='LoginPassword' placeholder="Password" autoComplete="on" required />
            <button className="REbutton" type="submit" onClick={() => signIn()}>login</button>
            {errorMessage && (
              <p className="alert alert-danger">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>

  );
};
export default AuthForm;



