import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import Hls from "hls.js";
import  "video.js/dist/video-js.css";
// import { use } from "video.js/dist/types/tech/middleware";
import toast from "react-hot-toast";

function VideoPayer({src}){

    const videoRef = useRef(null)
    const playerRef = useRef(null)

    useEffect(()=>{

        playerRef.current = videojs(videoRef.current, {
            controls: true,
            autoplay: true,
            muted: true,
            preload: "auto",
            download: true,
          });

          if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(src)
            hls.attachMedia(videoRef.current)
            hls.on(Hls.Events.MANIFEST_PARSED,()=>{
              videoRef.current.play();
            });
 
          } else if(videoRef.current.canPlay("application/vnd.apple.mpegurl"))
          {
              videoRef.current.src = src
              videoRef.current.addEventListener('canplay',()=>{
                videoRef.current.play();
              });
          } else{
            console.log("Video Format  not supported");
            toast.error("Video Format  not supported");
            
          }

        },[src]);
       
    return (
        <div>
          <div data-vjs-player>
            <video ref={videoRef}
              style={{
                width:"100%",
                height:"500px",
              }}
              className="video-js vjs-control-bar"
            ></video>
          </div>
        </div>
      );
}

export default VideoPayer;