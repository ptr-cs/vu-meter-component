import {useState} from 'react'
import VuMeter from './VuMeter'
import './App.css'

function App() {

const [audioInitialized, setAudioInitialized] = useState(false);
var [analyser, setAnalyser] = useState(null);
var [gainNode, setGainNode] = useState(null);
    var [isMuted, setIsMuted] = useState(null);
    var [isInitialized, setIsInitialized] = useState(null);
  
function init() {

  // Older browsers might not implement mediaDevices at all, so we set an empty object first
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }

  // Some browsers partially implement mediaDevices. We can't assign an object
  // with getUserMedia as it would overwrite existing properties.
  // Add the getUserMedia property if it's missing.
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      // First get ahold of the legacy getUserMedia, if present
      const getUserMedia =
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      // Some browsers just don't implement it - return a rejected promise with an error
      // to keep a consistent interface
      if (!getUserMedia) {
        return Promise.reject(
          new Error("getUserMedia is not implemented in this browser")
        );
      }

      // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }

  // Set up forked web audio context, for multiple browsers
  // window. is needed otherwise Safari explodes
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let source;

  // Grab the mute button to use below
  const mute = document.querySelector(".mute");
  
  // Set up the different audio nodes we will use for the app
  analyser = audioCtx.createAnalyser();
  analyser.minDecibels = -90;
  analyser.maxDecibels = 0;
  analyser.smoothingTimeConstant = 0.85;
  analyser.fftSize = 2048; //2048;

  gainNode = audioCtx.createGain();


  // Main block for doing the audio recording
  if (navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
    const constraints = { audio: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(gainNode);
        //biquadFilter.connect(gainNode);
        gainNode.connect(analyser);
        //echoDelay.placeBetween(gainNode, analyser);
        //analyser.connect(audioCtx.destination);
        setAnalyser(analyser);
        setGainNode(gainNode);
        setAudioInitialized(true);
        setIsInitialized(true);
      })
      .catch(function (err) {
          console.log("The following gUM error occured: " + err);
          setIsInitialized(false);
      });
  } else {
      console.log("getUserMedia not supported on your browser!");
      setIsInitialized(false);
  }

  //mute.onclick = voiceMute;

    
}

    function toggleMute() {
        console.log("voiceMute")
        if (!isMuted) {
            gainNode.gain.value = 0;
            setIsMuted(true);
        } else {
            gainNode.gain.value = 1;
            setIsMuted(false);
        }
    }
  
  return (
    <>
      <VuMeter 
        analyser={analyser}
        audioInitialized={audioInitialized}
        gainNode={gainNode}
        init={init}
        toggleMute={toggleMute}
        isMuted={isMuted}
        isInitialized={isInitialized}></VuMeter>
        
      
      </>
    //<div className="audio-controls-wrapper">
      //  <button type="button" title="initialize audio" className="initAudio" onClick={(evt) => clickHandler(evt)}>Init Audio</button>
      //  <button type="button" title="toggle audio mute" className="mute">Mute</button>
      //  <a title="github" href="https://github.com/DivideByZeno/vu-meter-component" className="github">Github</a>
      //</div>
  )
}

export default App
