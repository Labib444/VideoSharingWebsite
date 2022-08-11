
import React from 'react';
import {useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../reset.css';
import './AddVideoPage.css';
import { POST } from '../DbApi/useFetch';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function AddVideoPage(){

    let navigate = useNavigate();
    const [cookies2, setCookie2, removeCookie2] = useCookies(['USER_ID']);
    
    const videoLinkRef = useRef(null);
    const videoLinkMessageRef = useRef(null);

    const submitButtonMessageRef = useRef(null);

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const clearAllError = () => {
        videoLinkMessageRef.current.innerHTML = "";
        submitButtonMessageRef.current.innerHTML = "";
    }

    const emptyError = (reference, referenceMessage) => {
        if( reference.current.value == "" ){
            referenceMessage.current.innerHTML = "Cannot be Empty!";
            return false;
        }
        return true;
    }

    const invalidEmailCheck = () => {
        if( !(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/.test(videoLinkRef.current.value)) ){
            videoLinkMessageRef.current.innerHTML = "Invalid Youtube Video Link!";
            return false;
        }
        return true;
    }

    const submit = async (e) => {
        e.preventDefault();
        clearAllError();
        const a = emptyError(videoLinkRef, videoLinkMessageRef);
        const b = invalidEmailCheck();
        if( a && b ){
            const url = "https://localhost:7037/api/Video";
            const data = {
                "vId": 0,
                "uId": cookies2.USER_ID,
                "user": {
                "uId": 0,
                "email": "user@example.com",
                "password": "string"
                },
                "link": videoLinkRef.current.value,
                "views": 0
            }
            POST(url, data);
            await delay(1000);
            navigate("/");
        }
    }

    return(
        <React.StrictMode>
            <div class="container top_container"></div>
            <div class="container main">
                <div class="row header">
                    <div class="col-lg-12">
                        <h2>Share New Video</h2>
                    </div>
                </div>
                <div class="row section">
                    <div class="col-lg-12">
                        
                        <form action="#" enctype="multipart/form-data" method="post" >
                            <fieldset>
                                <label>Video Link:</label>
                                <input ref={videoLinkRef} type="text" name="productName" placeholder="Enter Video Link" />
                                <span ref={videoLinkMessageRef} class="messageSpan"></span>
                            </fieldset>
                            <fieldset>
                                <input onClick={submit} type="submit" class="submitButton" />
                                <span ref={submitButtonMessageRef} class="messageSpan" ></span>
                            </fieldset>
                        </form>
                    
                    </div>
                </div>
            </div>
            <div class="container bottom_container"></div>
        </React.StrictMode>
    );
}
export default AddVideoPage;