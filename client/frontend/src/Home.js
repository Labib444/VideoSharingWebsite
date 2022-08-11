
import React, { useLayoutEffect } from 'react';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './reset.css';
import useFetch from './DbApi/useFetch';
import {GET} from './YoutubeApi/useFetch';
import { useNavigate } from 'react-router-dom';
import './Home.css';


function Home(){
    let navigate = useNavigate();
    const [youtubeData, setYoutubeData] = useState(null);
    const { data, loading, error, refetch } = useFetch("https://localhost:7037/api/Video");

    const getIdFromUrl = (link) => {
        var video_id = link.split('v=')[1];
        var ampersandPosition = video_id.indexOf('&');
        if(ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    }

    useEffect( () => {
        var API_LINK = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&";
        var API_KEY = "AIzaSyBjDUNaQuS1B8eTeCPu01W0EyMruB6gr_Y";
        if( data != null ){
            var newData = data.map( x => "id="+getIdFromUrl(x.link)+"&" );
            var newDataUserId = data.map( x => x.vId );
            API_LINK += newData.join("");
            API_LINK += "key=" + API_KEY
            console.log(API_LINK);
            
            const response = GET(API_LINK);
            response.then( function(r){
                const status = r.status;
                if( status == 200 ){
                    var resData = r.data.items.map( 
                        //x => [ x.id, x.snippet.title, x.snippet.description, x.snippet.thumbnails.maxres.url ] 
                        // x => <li>{x.snippet.thumbnails.maxres.url}</li>
                        (x, i) =>
                        <div onClick={clickView} class="productCard col-lg-3" id={newDataUserId[i]}>
                            <div  class="row productCardImage"  >
                                <img src={x.snippet.thumbnails.maxres.url} />
                            </div>
                            <div class="row productCardDetails">
                                <p>{x.snippet.title}</p>
                            </div>
                        </div>
                    );
                    setYoutubeData(resData);
                    console.log(youtubeData);
                }
            } )
        }
    },[data]);

    const GetYoutubeData = (e) => {
        //e.preventDefault();
        var API_LINK = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&";
        var API_KEY = "AIzaSyBjDUNaQuS1B8eTeCPu01W0EyMruB6gr_Y";
        if( data != null ){
            var newData = data.map( x => "id="+getIdFromUrl(x.link)+"&" );
            API_LINK += newData.join("");
            API_LINK += "key=" + API_KEY
            console.log(API_LINK);
            
            const response = GET(API_LINK);
            response.then( function(r){
                const status = r.status;
                if( status == 200 ){
                    var resData = r.data.items.map( 
                        //x => [ x.id, x.snippet.title, x.snippet.description, x.snippet.thumbnails.maxres.url ] 
                        x => <li>{x.snippet.thumbnails.maxres.url}</li>
                        // <div class="productCard col-lg-3">
                        //     <div class="row productCardImage">
                        //         <img src={x.snippet.thumbnails.maxres.url} />
                        //     </div>
                        //     <div class="row productCardDetails">
                        //         <p>{x.snippet.title}</p>
                        //     </div>
                        // </div>
                    );
                    setYoutubeData(resData);
                    console.log(youtubeData);
                }
            } )
            return youtubeData;
        }
    }
    //GetYoutubeData();
    
    // var idList = data.map( x => getIdFromUrl(x.link) );
    // console.log(idList);
    
    const temp = 
    (
        <div class="productCard col-lg-3">
            <div class="row productCardImage">
                <img src="https://i.ytimg.com/vi/idYUy3hf3D0/maxresdefault.jpg" />
            </div>
            <div class="row productCardDetails">
                <p>Show YouTube videos on your own website! | YouTube API Tutorial</p>
            </div>
        </div>
    );

    const clickView = (e) => {
        navigate("/ViewVideoPage/"+e.currentTarget.id);
        console.log( e.currentTarget.id );
    }

    return(
        <React.StrictMode>
        <div class="container homeContainer">
            <div class="row section homeSection">
                <div class="right-section col-lg-12">
                    {youtubeData === null ? temp : youtubeData}
                </div>
            </div>
        </div>
      </React.StrictMode>
    );
}


export default Home;














