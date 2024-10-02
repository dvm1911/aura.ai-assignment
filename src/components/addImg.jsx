import { useReducer, useEffect } from "react";
import { docsDb } from "./firebase.config";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import defImg from '../assets/Default_pfp.png';
import bckIcn from '../assets/left-arrow.png'

const AddImg = () => {

    const { id }= useParams();

    const initialreqFields = {
        imgFile: '',
        displayImg: '',
        userData: '',
        imgURL: '',
    }
    
    const setreqFields = (state, action) => {
        switch (action.type) {
            case "imgFile":
                return {
                    ...state,
                    imgFile: action.payload
                }
            
            case "displayImg": 
                return {
                    ...state,
                    displayImg: action.payload
                }
            
            case "setuserData":
                return {
                    ...state,
                    userData: action.payload
                }
            
            case "setImgURL":
                return {
                    ...state,
                    imgURL: action.payload
                }
            default:
                return state
        }
    }
    
    const [ reqFields, reqFieldsDispatch ] = useReducer( setreqFields, initialreqFields );

    const displayImg = (e) => {
        e.preventDefault();
        reqFieldsDispatch({type:"imgFile", payload:e.target.files[0]})
        reqFieldsDispatch({type:"displayImg", payload:URL.createObjectURL(e.target.files[0])})
    }

    useEffect( () => {
        axios.get('https://assignment-aura-ai.onrender.com/api/auth/user/'+id)
        .then(data => reqFieldsDispatch({type:"setuserData", payload:data.data}))
        .catch(err => console.log(err))
      }, [id])

    
    const upImg = async (e) => {
        e.preventDefault();
        if(reqFields.imgFile && reqFields.userData){
                docsDb.ref(`users/${reqFields.userData.userEmail}/pfp`)
                .put(reqFields.imgFile)
                .on("state_changed", alert("success"), alert, () => {
                    docsDb.ref(`users/${reqFields.userData.userEmail}`).child(`pfp`)
                    .getDownloadURL()
                    .then((url) => {reqFieldsDispatch({type: "setImgURL", payload: url})})
                });
            }};
        
            console.log(reqFields.imgURL)

    useEffect( () => {
        if(reqFields.imgURL){
            axios.put('https://assignment-aura-ai.onrender.com/api/auth/user/update/'+id, { userPfp: `${reqFields.imgURL}`})
        }
    }, [reqFields.imgURL])

    return (
        <div className="uploadImg">
        <Link className="back" to='/home'>
        <img src={bckIcn} alt="" />
        </Link>
        <div id="displayContainer">
            {
                reqFields.imgFile ? (
                    <img className="uploadedImg" src={reqFields.displayImg} />
                ) : reqFields.userData?.userPfp ? (
                    <img className="defaultimg" src={reqFields.userData.userPfp} alt="" />
                ) : (
                    <img className="defaultimg" src={defImg} alt="" />
                )
            }
        </div>
        <input onChange={displayImg} className="addimg" type="file" accept="Image"/>

        <button onClick={upImg} className="statliche">
            UPLOAD
        </button>
        
        </div>
    )
}

export default AddImg;