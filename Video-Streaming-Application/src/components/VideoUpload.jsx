
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import VideoLogo from "../assets/video-camera.png";
import {Button ,
  Card,
  Label,
  Progress,
  FileInput,
  TextInput,
  Textarea,
  Alert  } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";


function Videoupload(){

  const[selectedFile,setSelectedFile]=useState(null);
  const[meta,setMeta] = useState({
    title:"",
    description:"",
  });
 
  const[progress,setProgress] = useState(0);
  const[uploading ,setUploading] = useState(false);
  const[ message ,setMessage] = useState("");


 function handleFileChange(event){

  console.log(event.target.files[0]);

  setSelectedFile(event.target.files[0]);

 }

    function formFieldChange(event){
    //  console.log(event.target.name);
    //  console.log(event.target.value);
     
      setMeta({
        ...meta, 
        [event.target.name]:event.target.value
      })
      
    }

    function handleForm(formEvent){
      formEvent.preventDefault();
      if (selectedFile != null) {
        alert("Select file !!")
        return;
      }
     
      saveVideoToServer(selectedFile,meta)
      
    }   



    function resetForm(){
      setMeta({
        title: " ",
        description: " ",
      });

    setSelectedFile(null);
    setUploading(false);
    // set message("");
    }
    
    async function   saveVideoToServer(video,videoMetaData){
      setUploading(true);

      try {
     
            const formData = new FormData();
            formData.append("title",videoMetaData.title);
            formData.append("description",videoMetaData.description);
            formData.append("file",selectedFile);

           

          let  response = await axios.post("http://localhost:8080/api/v1/videos", formData,{
           
             
           
            headers:{
              "Content-Type": "multipart/form-data"
            },
            onUploadProgress:(progressEvent) =>{
            const progress = Math.round(
              (progressEvent.loaded * 100)/progressEvent.total); 

      
          console.log(progress);
          setProgress(progress);

            },
          }
        );

          console.log(response);
          setProgress(0);

          setMessage("File upload" + response.data.videoId);
          setUploading(false);
          toast.success("File Uploaded Succesfully !!");
          resetForm();
        } catch (error) {
           console.log(error);
          setMessage("Error in uploading File");
          setUploading(false); 
          toast.error("File not uploaded !!")

        }

    }
  
    return <div className="text-white">
      <Card className="flex flex-col items-centre justify-center">
      
      <h1>Videoupload</h1>
   

    
    <Card>
    

  <h1>Upload Videos</h1>
    <div>
      
  <form noValidate className =" flex flex-col space-y-3"  
  onSubmit={handleForm}
  >
   

  <div className="mb-2 block">
        <Label value="Video title" />
      </div>
      
     <div className="mb-0 block">
      </div>
      <TextInput
      value={meta.title} 
      onChange={formFieldChange} name ="title"placeholder="Enter Title" />
           
    
      <div className="max-md">
      <div className="mb-2 block">
        <Label htmlFor="comment" value="Video Description" />
      </div>
      <Textarea 
       
      onChange={formFieldChange} 
      // value={meta.description}


      name="descrip"
      id="comment" placeholder="Write Video Description" required rows={4} />
    </div>
     


    <div className="flex items-center space-x-5 justify-center">

  <div className="shrink-0">
    <img className="h-16 w-16 object-cover " src={VideoLogo} 
    alt="Current profile photo" />
  </div>
  <label className="block">
    <span className="sr-only">Choose Video File</span>
    <input 
    
    name="file"
    
    type="file" className="block w-full text-sm text-slate-500
     

     onChange={handleFileChange}
     
     file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
     />
     


    </label>
    </div>

    <div className="">
      {uploading && (
        <Progress progress= {progress}
        textLabel="Uploading.." 
        size="xl" 
        labelProgress labelText
        />
      )}

    </div>

    <div className="">
        {message && (
          // eslint-disable-next-line no-const-assign
          <Alert color={'success'} rounded withBorderAccent  onDismiss = {() => 
            // eslint-disable-next-line no-const-assign
            {setMessage = (" ");

          }}
          >
          <span className="font-medium">Success alert!</span>
          {message}
            
          </Alert>
        )}

    </div>











      <div className="flex justify-center">
        <Button disabled = {uploading} type="submit">Submit</Button>
      </div>

      </form>
    </div>
   
    </Card>
    </Card>
       
     
       </div>

};

export default Videoupload;