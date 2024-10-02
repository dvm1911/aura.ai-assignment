import defImg from '../assets/Default_pfp.png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import docImg from '../assets/google-docs.png'
import axios from 'axios';

const Home = () => {

  const token = localStorage.getItem("token");

  const navigateHeader = useNavigate();

  const initialreqFields = {
    userData: null
}

const setreqFields = (state, action) => {
    switch (action.type) {
        case "setUserData":
            return {
                ...state,
                userData: action.payload
            }

        default:
            return state
    }
}

const [ reqFields, reqFieldsDispatch ] = useReducer( setreqFields, initialreqFields );

useEffect(() => {
  const userDetails = async () => {
      try {
          const res = await fetch("https://assignment-aura-ai.onrender.com/api/auth/getUser", {
              headers: {
                  "Authorization": `Bearer ${token}`
              }
          })
          const data = await res.json();
          reqFieldsDispatch({type:"setUserData", payload: data})
          
      } catch (error) {
          console.log(error)
      }     
  }

  if(token){
      userDetails();
  }
}, [token]);


const logOutHandler = () => {
  localStorage.removeItem("token");
  navigateHeader("/home")
}


    return (
      <>
       { token ? (
         <div className='profile'>
         <div className='id statliche'>ID#</div>
         <div className='pfp'>
          { reqFields.userData ? (
            <img src={reqFields.userData.userPfp} />
          ) : (
            <img src={defImg} />
          )}

         </div>
         <Link className='center' to={reqFields.userData && `/addimg/${reqFields.userData._id}`}>
          {
            reqFields.userData?.userPfp ? (
              <button className='statliche'>
              Change
              </button>
            ) : (
              <button className='statliche'>
              ADD IMG
              </button>
            )
          }
         </Link>
         
         <div className='displayName'>
           <p className='outfit'>Name : </p>
           <p className='statliche'>{reqFields.userData && reqFields.userData.userName}</p>
         </div>
         <div className='documents'>
         <p className='outfit'>Docs : </p>
         {
          reqFields.userData?.userDocuments.map(
            (i, j) => {
              return <div className='allDocs poppins' key={j}>
                {
                  i.type.startsWith("image")  ? (<p>Img</p>) : i.type.startsWith("app") ? (<p>pdf</p>) : (<p>video</p>) 
                }
                <p className='fname'>{i.fname}</p>
                <a href={i.fileURL}><img src={docImg} /></a>
              </div>
            }
          )
         }
         <Link className='center' to={reqFields.userData && `/addDocs/${reqFields.userData._id}`}>
         <button className='statliche'>ADD DOCS</button>
         </Link>
         </div>
         <button onClick={logOutHandler} className='statliche'>Log out</button>
       </div>

        ) : (

        <div className='noToken'>
          <div className='mainPg statliche'>Lets get you started!</div>
          <div className="logIntxt poppins">
           Already have an account ?
        </div>
        <Link to={"/login"}>
        <button className='noTokenbtn statliche'>
          Login
        </button>
        </Link>
        
        <div className="logIntxt poppins">
           New here?
        </div>
        <Link to={"/signup"}>
        <button className='noTokenbtn statliche'>
        sign up
        </button>
        </Link>
        </div>
 
      )}
      </>
    )
}


export default Home;
