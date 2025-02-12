import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Videoupload from './components/VideoUpload'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  const [videoId,setVideoId] = useState(
    "ecd82fab-2e7d-4b01-a5e6-0abb1ed8fef6"
  );

  return (
    <>
      <Toaster/>

      <div className='flex flex-col items-center  space-y-9  justify-center py-9'>
        <h1 className='text-3xl font-bold text-gray-200'> Video Streaming App
      </h1>

     <div className="flex mt-14 w-full justify-around">

     <div>
        <h1 className="text-white">Playing Video</h1>

        {/* <video
        style={{
          width:400,
          height:300,
        }}
        > src= {'http://localhost:8080/api/v1/videos/stream/range/${videoId}'}
        controls
        </video> */}


<video
    id="my-video"
    class="video-js"
    controls
    preload="auto"
    width="660"
    // height="300"
   
    data-setup="{}"
  >
    <source src={'http://localhost:8080/api/v1/videos/stream/range/${videoId}'}
     type="video/mp4" />
   
    <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a
      web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank"
        >supports HTML5 video</a
      >
    </p>
  </video>




      </div>




      <Videoupload/>
     </div>

      </div>
    </>
  );
}

export default App
