import React, { useRef, useState } from "react";


function App() {
  const videoRef = useRef();
  const [downloadUrl, setDownloadurl] = useState('');

  const recordHandler = async () => {
    let stream = await navigator.mediaDevices.getDisplayMedia({
      video: true
    });
    const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp8")
      ? "video/webm; codecs=vp8"
      : "video/webm"
    let mediaRecorder = new MediaRecorder(stream, {
      mimeType: mime
    })

    let chunks = []
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = (e) => uploadHandler(new Blob(chunks, { type: 'video/mp4' }));


    //we have to start the recorder manually
    mediaRecorder.start();
  }

  const uploadHandler = async (blob) => {
    const videourl = URL.createObjectURL( blob );
    setDownloadurl(videourl);
    videoRef.current.src = videourl;
  }
  return (
    <div>
      <h1 className='elegantshadow'>Screen  Recorder</h1>
      <video ref={videoRef} className="video" width="600px" autoPlay></video> : <></><br />
      <button onClick={recordHandler} className="record-btn">record</button>
      {downloadUrl? <a href={downloadUrl} download="video">Download</a> : <></>}
    </div>
  )
} export default App;