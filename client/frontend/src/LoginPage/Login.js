
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import '../reset.css';

import './Login.css';

import axios from 'axios';
import { useCookies } from 'react-cookie';
import {POST, GET} from '../DbApi/useFetch';

function Login(){
    
    let navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['TOKEN']); 

    const emailRef = useRef(null);
    const emailRefMessage = useRef(null);

    const passwordRef = useRef(null);
    const passwordRefMessage = useRef(null);

    const confirmPasswordRef = useRef(null);
    const confirmPasswordRefMessage = useRef(null);

    const submitButtonRefMessage = useRef(null);

    const emptyError = (reference, referenceMessage) => {
        if( reference.current.value == "" ){
            referenceMessage.current.innerHTML = "Cannot be Empty!";
            return false;
        }
        return true;
    }

    const confirmPasswordMatch = () => {
        if( passwordRef.current.value != confirmPasswordRef.current.value ){
            confirmPasswordRefMessage.current.innerHTML = "Password didn't Match!";
            return false;
        }
        return true;
    }

    const clearAllError = () => {
        emailRefMessage.current.innerHTML = "";
        passwordRefMessage.current.innerHTML = "";
        confirmPasswordRefMessage.current.innerHTML = "";
        submitButtonRefMessage.current.innerHTML = "";
    }

    const invalidEmailCheck = () => {
        if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRef.current.value)) ){
            emailRefMessage.current.innerHTML = "Invalid Email!";
            return false;
        }
        return true;
    }

    const submit = (event) => {
        event.preventDefault();

        //var {data, loading, error} = GET("https://localhost:7037/api/User");
        
        clearAllError();
        const a = emptyError(emailRef, emailRefMessage);
        const b = emptyError(passwordRef, passwordRefMessage);
        const c = emptyError(confirmPasswordRef, confirmPasswordRefMessage);
        const d = invalidEmailCheck();
        const e = confirmPasswordMatch(passwordRef, confirmPasswordRef, confirmPasswordRefMessage);
        
        const utf8Encode = new TextEncoder();
        const byteArr = utf8Encode.encode("abc");
        
        if( a && b && c && d && e ){
            
            var userData = {
                uId: 0, 
                email: emailRef.current.value, 
                password: passwordRef.current.value
            };

            const response = GET("https://localhost:7037/GetByEmail/"+emailRef.current.value);
            response.then( function(r){
                const status = r.status;
                if( status == 200 ){
                    submitButtonRefMessage.current.innerHTML = "The Account already exists!";
                }else{
                    const r = POST("https://localhost:7037/api/User", userData);
                    r.then( function(r){
                        setCookie("TOKEN", r.data, { path: '/' });
                    } );
                }
            } )
        }
    }

    const linkClick = (e) => {
        e.preventDefault();
        navigate("/SignUp");
    }

    return(
        <React.StrictMode className={Login} >
            <div class="container top_container"></div>
            <div class="container main">
                <div class="row header">
                    <div class="col-lg-12">
                        <h2>User Login</h2>
                    </div>
                </div>
                <div class="row section">
                    <div class="col-lg-12">
                        
                        <form action="#" method="post" >
                            <fieldset>
                                <label>Email:</label>
                                <input ref={emailRef} type="email" name="productName" placeholder="Enter Your Email" />
                                <span  ref={emailRefMessage} class="messageSpan"></span>
                            </fieldset>
                            <fieldset>
                                <label>Password:</label>
                                <input ref={passwordRef} type="password" name="ProductQuantity" placeholder="Enter Password" />
                                <span ref={passwordRefMessage} class="messageSpan" ></span>
                            </fieldset>
                            <fieldset>
                                <label>Confirm Password:</label>
                                <input ref={confirmPasswordRef} type="password" name="ProductQuantity" placeholder="Enter Password" />
                                <span ref={confirmPasswordRefMessage} class="messageSpan" ></span>
                            </fieldset>
                            <fieldset>
                                <input onClick={submit} type="submit" class="submitButton" />
                                <span ref={submitButtonRefMessage} class="messageSpan" ></span>
                            </fieldset>
                            <fieldset class="messageSpanSignUpFieldSet">
                                <p class="messageSpanSignUp">Don't have an account?<a onClick={linkClick} href="#">SignUp</a></p>
                            </fieldset>
                        </form>
                    
                    </div>
                </div>
            </div>
            <div class="container bottom_container"></div>
        </React.StrictMode>
    );
}


export default Login;



//eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsYWJpYjQ0NEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNjYwMjg5MTY4fQ.DqpDi-UZT8ceQi8zT-gtKruzqplvFxYVg6eNu6R5Wvqu0NKdw86ljjKk_OsII0HUe5D26VCmKe4bBh_kUOoyBQ