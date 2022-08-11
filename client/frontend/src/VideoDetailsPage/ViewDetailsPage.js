
import React, {useState, useEffect} from 'react';
import useFetch from '../DbApi/useFetch';
import { useNavigate, useParams } from "react-router-dom";
import { GET, POST, PUT } from '../DbApi/useFetch';

function ViewDetailsPage(){ 
    let { id } = useParams();
    const { data, loading, error } = useFetch();
    const [videoData, setVideoData] = useState({});
    
    useEffect(() => {
        const response = GET("https://localhost:7037/api/Video/"+id);
        response.then( function(r){
            const status = r.status;
            if( status == 200 ){
                setVideoData(r.data);
            }
        } )
    },[id]);

    return(
        <React.StrictMode>
            <ul>
                <li><p>{videoData.title}</p></li>
                <li><p>{videoData.description}</p></li>
                <li><p>{videoData.user.email}</p></li>
            </ul>
        </React.StrictMode>
    );
}

export default ViewDetailsPage;







