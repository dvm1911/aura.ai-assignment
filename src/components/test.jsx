import { useState, useEffect } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

const Test = () => {

    const [test, setTest] = useState(false);

    useEffect(() => {
        try {
          axios.get("https://assignment-aura-ai.onrender.com/api/auth/user/66fd1a0a7c11d1bd6eac7dd6")
          .then(setTest(true))
        } catch (error) {
          console.log(error)
        }
      }, [test])


    return (
       <div className="test">
        <p className="poppins">Checking Backend Services</p>
        {
            test ? (
                <div>
                    <p className="ce statliche">Connection Established</p>
                    <p className="outfit sce">backend services is up and live</p>
                    <Link to='/home'>
                    <button className="statliche">
                        Home
                    </button>
                    </Link>
                </div>
            ):(
                <>
                <p className="ce statliche">Connection request sent</p>
                <p className="outfit sce">waiting for response from backend server</p>
                <div className="loading-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <p className="outfit sce">It may take few minute</p>
                </>
                
            )
        }
       </div>
    )
}

export default Test;