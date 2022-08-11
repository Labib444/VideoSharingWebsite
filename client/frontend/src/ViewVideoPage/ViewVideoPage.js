
import React, {useState, useEffect} from 'react';
import './ViewVideoPage.css';
import { useNavigate, useParams } from "react-router-dom";
import { GET, POST, PUT, useFetch } from '../DbApi/useFetch';

function ViewVideoPage(){
    let navigate = useNavigate();
    let { id } = useParams();
    const [data, setData] = useState({});

    const getIdFromUrl = (link) => {
        var video_id = link.split('v=')[1];
        var ampersandPosition = video_id.indexOf('&');
        if(ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    }

    useEffect(() => {
        const response = GET("https://localhost:7037/api/Video/"+id);
        response.then( function(r){
            const status = r.status;
            if( status == 200 ){
                setData(r.data);
                const link = "https://www.youtube.com/embed/"+getIdFromUrl(r.data.link)
                r.data.link = link;
                console.log(r.data);
            }
        } )
        PUT("https://localhost:7037/api/Video/UpdateViewById/"+id);
    },[id]);

    const SeeDetails = (e) => {
        e.preventDefault();
        navigate("/ViewDetailsPage/"+id);
    }

    return(
        <React.StrictMode>
            <div class="container detailContainer">
                <div class="row videoRow">
                    <div class="col-md-12">
                        <iframe width="560" height="315" 
                            //src={"https://www.youtube.com/embed/"+getIdFromUrl(data.link)} 
                            src={data.link}
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; 
                            clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                        </iframe>
                    </div>
                </div>
                <div class="row inputRow">
                    <div class="col-md-12 inputRowContainer">
                        <div class="inputButton"><button onClick={SeeDetails} >Details</button></div>
                        <div class="inputButton"><button>Like</button><span> 100</span></div>
                        <div class="inputButton"><button>DisLike</button><span> 10</span></div>
                        <div class="inputButton"><button>Views</button><span>{data.views}</span></div>
                    </div>
                </div>
            </div>
        </React.StrictMode>
    );
}

export default ViewVideoPage;