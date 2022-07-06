
import React, { useEffect } from "react";
 
import {useState} from "react";
import YouTube from 'react-youtube';

/*const youtubeVideos = [
      {
        "title": "React JS - React Tutorial for Beginners",
        "author_name": "Programming with Mosh",
        "viewCount": 4968678,
        "id" : "Ke90Tje7VS0",
        "poster" : "https://f.hubspotusercontent20.net/hubfs/165225/Imported_Blog_Media/blog_thumbnail-3.png"
      },
      {
        "title": "Learn React In 30 Minutes",
        "author_name": "Web Dev Simplified",
        "viewCount": 790751,
        "id" : "hQAHSlTtcmY",
        "poster" : "https://i.ytimg.com/vi/tnz_yuK9qoM/maxresdefault.jpg"
      },
      {
        "title": "React Crash Course for Beginners 2021 - Learn ReactJS from Scratch in this 100% Free Tutorial!",
        "author_name": "Academind",
        "viewCount": 1003620 ,
        "id" : "Dorf8i6lCuk",
        "poster" : "https://i.ytimg.com/vi/J_CPQ9otMm0/maxresdefault.jpg"
      }
    ];*/
  
export default function MediaComponent(){

    
    let [selectedId, setSelectedId] = useState(null);
    let [videos, setVideos] = useState([]);
   
    useEffect(() => {
        const getData = (async () => {
            const res = await fetch('./videodetails.json');
            const data = await res.json();
            console.log('ddddddd',data);
            setVideos(data.videos);
            setSelectedId(data.videos[0].id)
        })
        getData();

    },[])

    const opts = {
        height: '400',
        width: '600',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
      };

    const playVideo = (id) => {
        setSelectedId(id); 
    }

    return (
        <>
        <div>
           Id: {selectedId}
        </div>
            {selectedId && (
                <div>   
                <YouTube videoId={selectedId} opts={opts}   />
                </div>
            )}
            
           {(videos.length>0)?videos.map((item, i) => {
               

               if(item.id!=selectedId){
                   
                    return (<div>
                    <a onClick={() => playVideo(item.id)}  >
                                        <img src={item.poster} width="300" height="200"></img>
                                    </a></div>);
               }
            
          }):<p>loading..</p>}

          </>
    );
};
