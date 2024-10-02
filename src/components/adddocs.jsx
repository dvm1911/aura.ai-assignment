import { useParams, Link } from "react-router-dom";
import { useReducer, useEffect } from "react";
import axios from "axios";
import { docsDb } from "./firebase.config";
import bckIcn from '../assets/left-arrow.png'

const AddDocs = () => {

    const { id }= useParams();
    
    const initialFields = {
        file: '',
        fileType: '',
        displayFile: '',
        userData: '',
        fileURL: '',
        uploadStatus: 0,
    }

    const setFields = (state, action) => {
        switch (action.type) {
            case "file":
                return {
                    ...state,
                    file: action.payload
                }
            
            case "fileType":
                return {
                    ...state,
                    fileType: action.payload
                }
            
            case "displayFile": 
                return {
                    ...state,
                    displayFile: action.payload
                }
            
            case "setuserData":
                return {
                    ...state,
                    userData: action.payload
                }
            
            case "setFileURL":
                return {
                    ...state,
                    fileURL: action.payload
                }
            
            case "setProgress":
                return {
                    ...state,
                    uploadStatus: action.payload
                }
            default:
                return state
        }
    }

    useEffect( () => {
        axios.get('https://assignment-aura-ai.onrender.com/api/auth/user/'+id)
        .then(data => fieldsDispatch({type:"setuserData", payload:data.data}))
        .catch(err => console.log(err))
      }, [id])

    const [ fields, fieldsDispatch ] = useReducer( setFields, initialFields );

    const displayDocs = (e) => {
        e.preventDefault();
        fieldsDispatch({type:"file", payload:e.target.files[0]})
        fieldsDispatch({type:"fileType", payload:e.target.files[0].type})
        fieldsDispatch({type:"displayFile", payload:URL.createObjectURL(e.target.files[0])})
    }

    const upDocs = async (e) => {
        e.preventDefault();
        if(fields.file && fields.userData){
                docsDb.ref(`users/${fields.userData.userEmail}/${fields.file?.name}`)
                .put(fields.file)
                .on("state_changed", (upData) => {
                    if (upData.bytesTransferred && upData.totalBytes) {
                        fieldsDispatch({type:"setProgress", payload:(upData.bytesTransferred / upData.totalBytes) * 100})
                      }
                    docsDb.ref(`users/${fields.userData.userEmail}`).child(`${fields.file.name}`)
                    .getDownloadURL()
                    .then((url) => {fieldsDispatch({type: "setFileURL", payload: url})})
                });
            }};
    
    useEffect( () => {
        if (fields.fileURL) {
            const updateUserDocuments = async () => {
              try {
                const newDoc = {
                  type: fields.fileType,
                  fname: fields.file.name,
                  fileURL: fields.fileURL,
                };
                const response = await axios.put(
                  `https://assignment-aura-ai.onrender.com/api/auth/user/update/${id}`,
                  {
                    $push: { userDocuments: newDoc },
                  }
                );
              } catch (error) {
                console.error(error);
              }
            };
            updateUserDocuments();
          }
        }
       , [fields.fileURL])

return(
    <div className="addDocs">
        <Link className="back" to='/home'>
        <img src={bckIcn} alt="" />
        </Link>
        <h2 className="statliche">Docs:</h2>
        <div className="docsDisplay center">
            {
                fields.fileType.startsWith('image/') ? (
                    <img src={fields.displayFile}></img>
                ) : fields.fileType.startsWith('video/') ? (
                    <video src={fields.displayFile} controls></video>
                ) : fields.fileType.startsWith('application') ? (
                    <embed src={fields.displayFile} type="application/pdf"></embed>
                ) : (
                    <img src="" alt="" />
                )
            }
        </div>
        <input onChange={displayDocs} className="addDocsInp" type="file" accept=".jpg, .jpeg, .png, .gif, .bmp, .mp4, .avi, .mov, .pdf"/>
        <p className="outfit center progress">
            { fields.uploadStatus && `${fields.uploadStatus}% done.`}
        </p>
        <button onClick={upDocs} className="statliche">Add</button>
    </div>
)
}

export default AddDocs;