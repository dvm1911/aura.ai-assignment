import {Link, useNavigate } from 'react-router-dom';
import { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
const clientId = "453687433752-p0jqss0kno5dliieoh98bl1gvfp8euea.apps.googleusercontent.com"


const Login = () => {

  const navigateLogIn = useNavigate();

  useEffect(() => {
    function start() {
       gapi.client.init(
           {
               clientId: clientId,
               scope: ""
           }
       )
    };
   
    gapi.load('client:auth2', start)
   })

    const [ error, seterror ] = useState(false);
        
    const initialreqFields = {
        userEmail: "",
        userPassword: "",
    }

    const setreqFields = (state, action) => {
        switch (action.type) {
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
        
            default:
                return state
        }
    }

    const [ reqFields, reqFieldsDispatch ] = useReducer( setreqFields, initialreqFields );

    const onSuccess = async (res) => {
      const profileObj = {
          userEmail: res.profileObj.email,
          userPassword:res.profileObj.googleId
      }

      try {
          const res = await axios.post('https://assignment-aura-ai.onrender.com/api/auth/login', profileObj)

          const result = await res;
            
          if(result.data.message._id) {
            localStorage.setItem('token', result.data.token );
            seterror(false);
            navigateLogIn("/home");
          }
          
        } catch (error) {
          console.log(error);
          seterror(true);
        }
   
  }
  
  const onFailure = (res) => {
      console.log("Login FAILED!")
  }

    const onClickPost = async (event) => {
        event.preventDefault();
        try {
          const res = await axios.post('https://assignment-aura-ai.onrender.com/api/auth/login', reqFields)

          const result = await res;
            
          if(result.data.message._id) {
            localStorage.setItem('token', result.data.token );
            seterror(false);
            navigateLogIn("/home");
          }
          
        } catch (error) {
          console.log(error);
          seterror(true);
        }
      };

    return (
        <div className='login inputField'>
        <h2 className='statliche'>Login</h2>
        <div className="logIntxt poppins">
                Fill your credentials
        </div>
    
        <label htmlFor="email">Email Id#</label>
        <input onChange={(e) => {reqFieldsDispatch({ type: "userEmailInp", payload: e.target.value})}} id="email" type="text"/>
    
        <label htmlFor="password">Password#</label>
        <input onChange={(e) => {reqFieldsDispatch({ type: "userPasswordInp", payload: e.target.value})}}  type="password"/>

        { error && <p className="err poppins">err: Invalid Email or password</p>}
    
        <button onClick={onClickPost} className='loginSubmit statliche'>
          Login
        </button>

        <div id="googleSignin">
        <GoogleLogin
        className="googlestyle"
        clientId={clientId}
        buttonText="Log in" 
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />
      </div>

        <span className='newSignup outfit'>
          <p>new? sign up</p>
          <Link to={'/signup'}>
          <p className='newSignupLink'>here</p>
          </Link>
        </span>
        </div>
    );
}

export default Login;