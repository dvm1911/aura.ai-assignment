import { Link, useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";
import axios from "axios";
const Signup = () => {

  const [ err, setErr ] = useState(false);

  const navigateSignUp = useNavigate();

  const initialreqFields = {
    userName: "",
    userEmail: "",
    userPassword: "",
    userPfp: ""
}

const setreqFields = (state, action) => {
    switch (action.type) {
        case "userNameInp":
            return {
                ...state,
                userName: action.payload
            }
        
        case "userEmailInp":
            return {
                ...state,
                userEmail: action.payload
            }
        
        case "userPasswordInp":
            return {
                ...state,
                userPassword: action.payload
            }
        
        case "userSuccess":
            return {
                ...state,
                userName: "",
                userOwnerName: "",
                userEmail: "",
                userPassword: ""
            }
    
        default:
            return state
    }
}

const [ reqFields, reqFieldsDispatch ] = useReducer( setreqFields, initialreqFields );

const onClickPost = async (e) => {
  e.preventDefault();
  
  try{
    await axios.post("https://assignment-aura-ai.onrender.com/api/auth/signup", reqFields)
    
    reqFieldsDispatch({ type: "userSuccess" })
    alert("user created! Login with your credentials")
    navigateSignUp("/login")
    }
    catch(err)
    {   
        setErr(true)
        console.log(`Couldn't make new user ${err}`);
    }
     
}

    return (
        <div className='signup inputField'>
        <h2 className='statliche'>Sign up</h2>
        <div className="logIntxt poppins">
            Create a new Account
        </div>

      <label htmlFor="name">Name#</label>
      <input onChange={(e) => {reqFieldsDispatch({ type: "userNameInp", payload: e.target.value})}} id="name" type="text"/>

      <label htmlFor="email">Email Id#</label>
      <input onChange={(e) => {reqFieldsDispatch({ type: "userEmailInp", payload: e.target.value})}} id="email" type="text"/>
  
      <label htmlFor="password">Password#</label>
      <input onChange={(e) => {reqFieldsDispatch({ type: "userPasswordInp", payload: e.target.value})}} type="password"/>

      <button onClick={onClickPost} className='loginSubmit statliche'>
        Sign Up
      </button>

      { err && <p className="err poppins">Couldn't make a new user <br /> err: email already in use</p>}

      <span className='newSignup outfit'>
        <p>Already have an account?</p>
        <Link to={'/login'}><p className='newSignupLink'>Log In.</p></Link>
      </span>
      </div>
    )
}

export default Signup; 