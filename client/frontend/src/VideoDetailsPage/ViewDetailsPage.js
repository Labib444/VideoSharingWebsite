
import React, {useState, useEffect} from 'react';
import useFetch from '../DbApi/useFetch';
import { useNavigate, useParams } from "react-router-dom";
import { GET, POST, PUT } from '../DbApi/useFetch';

function ViewDetailsPage(){ 
    let { id } = useParams();
    //const { data, loading, error } = useFetch();
    const [videoData, setVideoData] = useState(null);
    
    useEffect(() => {
        const response = GET("https://localhost:7037/api/Video/"+id);
        response.then( function(r){
            const status = r.status;
            if( status == 200 ){
                setVideoData(r.data);
                console.log(r.data);
            }
        } )
    },[id]);

    const detail = (
        <div>
            <p>{"Video Link:   "+videoData.link}</p>
            <p>{"Uploaded By:   "+videoData.user.email}</p>
            <p>{"Views:  "+videoData.views}</p>
        </div>
    );

    return(
        <React.StrictMode>
            <div className="container">
                <div className="row" >
                    <div className="col-md-12" >
                        <h1>Details Page</h1>

                        { videoData == null ? <div></div> : detail }

                    </div>
                </div>
            </div>
        </React.StrictMode>
    );
}

export default ViewDetailsPage;







