import {Link, useNavigate } from 'react-router-dom';
import { useReducer } from 'react';
import axios from 'axios';


const Login = () => {

  const navigateLogIn = useNavigate();

    
        
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

    const onClickPost = async (event) => {
        event.preventDefault();
        try {
          const res = await axios.post('https://assignment-aura-ai.onrender.com/api/auth/login', reqFields)

          const result = await res;
            
          if(result.data.message._id) {
            localStorage.setItem('token', result.data.token );
            navigateLogIn("/home");
          }
          
        } catch (error) {
          console.log(error);
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
    
        <button onClick={onClickPost} className='loginSubmit statliche'>
          Login
        </button>

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