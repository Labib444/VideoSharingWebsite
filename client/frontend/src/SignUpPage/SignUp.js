
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import '../reset.css';
import './SignUp.css';
import { useCookies } from 'react-cookie';
import { useRef } from 'react';
import {POST, GET} from '../DbApi/useFetch';
import {useNavigate, useParams} from 'react-router-dom';

function SignUp(){

    let navigate = useNavigate();
    
    const [cookies, setCookie, removeCookie] = useCookies(['TOKEN']);
    const [cookies2, setCookie2, removeCookie2] = useCookies(['USER_ID']);

    const emailRef = useRef(null);
    const emailRefMessage = useRef(null);

    const passwordRef = useRef(null);
    const passwordRefMessage = useRef(null);

    const submitButtonRefMessage = useRef(null);

    const emptyError = (reference, referenceMessage) => {
        if( reference.current.value == "" ){
            referenceMessage.current.innerHTML = "Cannot be Empty!";
            return false;
        }
        return true;
    }

    const invalidEmailCheck = () => {
        if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value)) ){
            emailRefMessage.current.innerHTML = "Invalid Email!";
            return false;
        }
        return true;
    }

    const clearAllError = () => {
        emailRefMessage.current.innerHTML = "";
        passwordRefMessage.current.innerHTML = "";
        submitButtonRefMessage.current.innerHTML = "";
    }

    const submit = (event) => {
        event.preventDefault();
        
        clearAllError();
        const a = emptyError(emailRef, emailRefMessage);
        const b = emptyError(passwordRef, passwordRefMessage);
        const c = invalidEmailCheck();
        
        if( a && b && c ){
            var userData = {
                uId: 0, 
                email: emailRef.current.value, 
                password: passwordRef.current.value
            };
            
            const r = POST("https://localhost:7037/api/Auth/login", userData);
            console.log( r.data );
            r.then( function(r){
                setCookie("TOKEN", r, { path: '/' });
            } );
            const id = GET("https://localhost:7037/GetByEmail/"+ emailRef.current.value);
            id.then( function(r){
                setCookie2("USER_ID", r.data.uId, { path: '/' });
                navigate("/");
            } );
        }
    }

    return(
        <React.StrictMode>
            <div class="container top_container"></div>
            <div class="container main">
                <div class="row header">
                    <div class="col-lg-12">
                        <h2>User Login</h2>
                    </div>
                </div>
                <div class="row section">
                    <div class="col-lg-12">
                        
                        <form action="#" enctype="multipart/form-data" method="post" >
                            <fieldset>
                                <label>Email:</label>
                                <input ref={emailRef} type="email" name="productName" placeholder="Enter Your Email" />
                                <span ref={emailRefMessage} class="messageSpan"></span>
                            </fieldset>
                            <fieldset>
                                <label>Password:</label>
                                <input ref={passwordRef} type="password" name="ProductQuantity" placeholder="Enter Password" />
                                <span ref={passwordRefMessage} class="messageSpan" ></span>
                            </fieldset>
                            <fieldset>
                                <input onClick={submit} type="submit" class="submitButton" />
                                <span ref={submitButtonRefMessage} class="messageSpan" ></span>
                            </fieldset>
                            <fieldset class="messageSpanSignUpFieldSet">
                                <p class="messageSpanSignUp" >Don't have an account? <a href="/Login">Sign Up</a></p>
                            </fieldset>
                        </form>
                    
                    </div>
                </div>
            </div>
            <div class="container bottom_container"></div>
        </React.StrictMode>
    );
}
export default SignUp;