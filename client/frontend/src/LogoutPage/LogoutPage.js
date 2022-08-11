

import React, {useEffect, useLayoutEffect} from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function LogoutPage(){
    let navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(['TOKEN']);

    useLayoutEffect(()=>{
        removeCookie("TOKEN");
        navigate("/");
    },[cookies])

}

export default LogoutPage;