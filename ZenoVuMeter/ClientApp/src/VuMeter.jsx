import { useEffect } from "react"

export default function VuMeter({analyser, audioInitialized, gainNode}) {
    
    const meterNeedle = document.getElementById("vu-meter-needle");
    
    function visualize() {

        // const bufferLength = analyser.fftSize;
        // console.log(bufferLength);
        // // We can use Float32Array instead of Uint8Array if we want higher precision
        // // const dataArray = new Float32Array(bufferLength);
        // const dataArray = new Uint8Array(bufferLength);
        const sampleBuffer = new Float32Array(analyser.fftSize);

    
        function loop() {
            //gainNode.gain.value = 0.5 * (1 + Math.sin(Date.now() / 4e2));
        
            analyser.getFloatTimeDomainData(sampleBuffer);
        
            let sumOfSquares = 0;
            for (let i = 0; i < sampleBuffer.length; i++) {
              sumOfSquares += sampleBuffer[i] ** 2;
            }
            const avgPowerDecibels = (10 * Math.log10(sumOfSquares / sampleBuffer.length));
    
            meterNeedle.style.transform = "rotate(" + Math.max(0 +  (0 + avgPowerDecibels), -60) + "deg)";
        
            requestAnimationFrame(loop);
          }
          loop();
      }
      
      useEffect(() => {
        if (audioInitialized === true)
            visualize(); //children function of interest
      }, [audioInitialized]);
    
    return (
        <>
        <div className="vu-meter">
            
            <div className="vu-meter-border vu-meter-border1"></div>
            <div className="vu-meter-border vu-meter-border2"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="vu-meter-border vu-meter-border3">
                <filter id="coolEffect">
                    <feTurbulence baseFrequency="0.1 1"/>
                    <feColorMatrix values="0 0 0 .07 .01
                                   0 0 0 .09 .01
                                   0 0 0 .08 .01
                                   0 0 0 0 1"/>
                </filter>
                <rect width="100%" height="100%" filter="url(#coolEffect)"/>
            </svg>
            <div className="vu-meter-border vu-meter-border4"></div>
            <div className="vu-meter-border vu-meter-border5"></div>
            <div className="vu-meter-border vu-meter-border6"></div>
            <div className="vu-meter-border vu-meter-border7"></div>
            
            <div className="vu-meter-border vu-meter-border8"></div>
            <div className="vu-meter-border vu-meter-border9"></div>
            <div className="vu-meter-border vu-meter-border10"></div>
            <div className="vu-meter-border vu-meter-border11"></div>
            <div className="vu-meter-border vu-meter-border12"></div>
            
            <div className="vu-meter-background"></div>
            <div className="vu-meter-background-overlay"></div>
            <div className="vu-meter-background-shadow"></div>
            <div className="vu-meter-background-shadow-up"></div>
            <div className="vu-meter-background-glass-down"></div>
            <div className="vu-meter-background-glass-up"></div>
            <div className="vu-meter-background-glass-left"></div>
            <div className="vu-meter-background-glass-right"></div>
            <div className="vu-meter-background-glass-border"></div>
            <div className="vu-meter-light-1"></div>
            <div className="vu-meter-light-2"></div>
            <div className="vu-meter-bar"></div>
            
            <svg xmlns="http://www.w3.org/2000/svg" className="vu-meter-bar-texture">
              <filter id="coolEffect2">
              <feTurbulence baseFrequency="0.1" type="fractalNoise" numOctaves="3"/>
              <feColorMatrix values="0 0 0 .11 .1
                                   0 0 0 .09 .1
                                   0 0 0 .08 .1
                                   0 0 0 0 1"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#coolEffect2)"/>
            </svg>
            
            <div className="vu-meter-bar-shadow"></div>
            
            <h5 className="vu-label vu-label-min">VU</h5>
            <h5 className="vu-label vu-label-max">VU</h5>
            
            <h5 className="vu-label vu-label-info vu-label-brand">DIVIDE BY ZENO</h5>
            <h5 className="vu-label vu-label-info vu-label-version">v.1.0.0</h5>
            
             <h5 className="vu-value vu-value-major-n20">-20</h5>
            <h5 className="vu-value vu-value-major-n10">-10</h5>
            <h5 className="vu-value vu-value-major-n7">-7</h5>
            <h5 className="vu-value vu-value-major-n5">-5</h5>
            <h5 className="vu-value vu-value-major-n3">-3</h5>
            <h5 className="vu-value vu-value-major-n1">-1</h5>
            <h5 className="vu-value vu-value-major-0">0</h5>
            <h5 className="vu-value vu-value-major-1">+1</h5>
            <h5 className="vu-value vu-value-major-2">+2</h5>
            <h5 className="vu-value vu-value-major-3">+3</h5>
            
            <h5 className="vu-value-minor vu-value-minor-0">0</h5>
            <h5 className="vu-value-minor vu-value-minor-20">20</h5>
            <h5 className="vu-value-minor vu-value-minor-40">40</h5>
            <h5 className="vu-value-minor vu-value-minor-60">60</h5>
            <h5 className="vu-value-minor vu-value-minor-80">80</h5>
            <h5 className="vu-value-minor vu-value-minor-100">100</h5>
    
            <div className="vu-meter-needle" id="vu-meter-needle"></div>
    
            <svg
            className="vu-meter-guide"
              viewBox="0 0 210 297"
              version="1.1"
              id="svg27294">
              <defs
                id="defs27291" />
              <g
                id="layer1">
                <path
                  style={{strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round"}}
                  className="vu-meter-guide-over"
                  d="m 154.56279,160.63123 6.01103,-3.65073 c -0.0838,-0.14708 -6.31273,-10.68773 -14.99883,-17.87659 -8.42047,-6.96902 -19.21363,-10.50039 -19.29692,-10.64162 l -2.39816,6.42943 c 0.0873,0.14804 9.8688,3.76503 17.73035,10.32181 7.38146,6.15637 12.87297,15.27716 12.95253,15.4177 z m 0,0 7.77007,-4.48396 c -0.16498,-0.28967 -0.3336,-0.57711 -0.50281,-0.86403 l -7.76542,4.48086 c 0.1692,0.28703 0.33386,0.57691 0.49816,0.86713 z m -7.83466,-10.71717 6.51174,-6.14071 c -0.22692,-0.24401 -0.45366,-0.48808 -0.68419,-0.72864 l -6.51692,6.14588 c 0.23073,0.24024 0.46284,0.47922 0.68937,0.72347 z m -10.09034,-8.62893 4.92114,-7.47965 c -0.27698,-0.18575 -0.55621,-0.3687 -0.83612,-0.55035 l -4.92838,7.48998 c 0.28041,0.181 0.56636,0.35427 0.84336,0.54002 z m -5.73609,-3.36466 4.03128,-8.02328 c -0.29622,-0.15214 -0.59573,-0.2987 -0.89452,-0.44648 l -4.02714,8.0145 c 0.29957,0.14709 0.5938,0.30311 0.89038,0.45526 z m 24.86412,22.01675 17.24339,-9.9503 c -0.16549,-0.28938 -0.33532,-0.57591 -0.50436,-0.863 l -17.23926,9.94772 c 0.16886,0.28721 0.33616,0.57522 0.50023,0.86558 z m -8.02535,-10.97763 14.45855,-13.63586 c -0.22716,-0.24365 -0.45246,-0.48891 -0.68265,-0.72967 l -14.4601,13.6369 c 0.23073,0.24038 0.45758,0.48432 0.6842,0.72863 z m -10.34304,-8.82891 10.9337,-16.61759 c -0.2773,-0.1857 -0.55636,-0.36863 -0.83613,-0.55087 l -10.93473,16.61862 c 0.28074,0.18097 0.55978,0.3642 0.83716,0.54984 z" />
                <path
                style={{color: "#000000", fill: "#000000", strokeWidth: "1", strokeLinecap: "round", strokeLinejoin: "round"}}
                  id="path21632"
                  d="m 104.29609,122.63665 -0.001,8.99997 c 0.16912,-0.002 0.33747,-0.006 0.50695,-0.006 0.16481,0 0.32851,0.005 0.49299,0.006 l 0.001,-8.99997 c -0.16487,-0.001 -0.32888,-0.006 -0.49403,-0.006 -0.16912,0 -0.33708,0.005 -0.50591,0.006 z m -5.64048,9.32191 -1.04335,-8.9364 c -0.33187,0.036 -0.66334,0.0733 -0.99374,0.1142 l 1.04283,8.93538 c 0.33041,-0.041 0.66211,-0.0778 0.99426,-0.11318 z m -6.55619,1.09968 -2.07532,-8.76277 c -0.32541,0.0745 -0.64847,0.15479 -0.97204,0.23409 l 2.07326,8.75295 c 0.32305,-0.079 0.6489,-0.15073 0.9741,-0.22427 z m -6.388758,1.83813 -3.072162,-8.44393 c -0.314105,0.11199 -0.62757,0.22551 -0.93948,0.3421 l 3.070614,8.43979 c 0.31196,-0.1164 0.626499,-0.22687 0.941028,-0.33796 z m -6.131407,2.57607 -4.024561,-8.01605 c -0.298751,0.14784 -0.598331,0.29428 -0.894519,0.44649 l 4.028694,8.02483 c 0.296524,-0.15223 0.590865,-0.3081 0.890386,-0.45527 z m -5.783627,3.28145 -4.925798,-7.49101 c -0.279617,0.18155 -0.558396,0.36419 -0.835091,0.54983 l 4.918564,7.48069 c 0.276611,-0.18561 0.562303,-0.35864 0.842325,-0.53951 z m -10.240719,8.44858 -6.515365,-6.14794 c -0.230394,0.24052 -0.456893,0.48467 -0.683678,0.72863 l 6.509163,6.14278 c 0.226557,-0.24443 0.459121,-0.48305 0.68988,-0.72347 z m -8.022765,10.57714 -7.763867,-4.48397 c -0.169301,0.28723 -0.337746,0.57509 -0.502811,0.86506 l 7.768516,4.48603 c 0.1642,-0.29028 0.329059,-0.58004 0.498162,-0.86712 z m 69.290346,-24.55044 3.07268,-8.43825 c -0.31229,-0.11667 -0.62602,-0.23004 -0.94051,-0.3421 l -3.07475,8.4429 c 0.31492,0.11114 0.63024,0.22098 0.94258,0.33745 z m -6.35776,-1.94975 2.07585,-8.75296 c -0.32334,-0.0792 -0.64635,-0.15867 -0.97152,-0.23306 l -2.07791,8.76174 c 0.32501,0.0734 0.65072,0.14536 0.97358,0.22428 z m -6.53706,-1.20924 1.04541,-8.93485 c -0.33007,-0.0408 -0.66115,-0.0783 -0.9927,-0.1142 l -1.04593,8.93588 c 0.33183,0.0352 0.66312,0.0723 0.99322,0.11317 z m -13.43019,-1.45417 -2.31821,-19.8577 c -0.33173,0.0365 -0.66323,0.0735 -0.99373,0.1142 l 2.3182,19.85616 c 0.33028,-0.0407 0.66174,-0.0774 0.99374,-0.11266 z m -13.257589,2.99051 -6.820773,-18.74769 c -0.313769,0.11254 -0.627033,0.2262 -0.938961,0.34262 l 6.819223,18.74407 c 0.312081,-0.11596 0.625898,-0.22821 0.940511,-0.339 z m -12.211142,5.98362 -10.929564,-16.62173 c -0.279297,0.182 -0.557734,0.36493 -0.834576,0.55036 l 10.928533,16.62069 c 0.276892,-0.18541 0.555366,-0.36855 0.835607,-0.54932 z m -10.492899,8.6527 -14.455449,-13.64103 c -0.230161,0.24079 -0.455517,0.48599 -0.682644,0.72968 l 14.454415,13.63999 c 0.226462,-0.24429 0.453099,-0.48828 0.683678,-0.72864 z m -8.206218,10.84378 -17.236157,-9.95391 c -0.169159,0.28736 -0.33877,0.57436 -0.504362,0.86403 l 17.240808,9.95598 c 0.164013,-0.29046 0.330904,-0.57878 0.499711,-0.8661 z m 70.961558,-25.14627 6.82491,-18.742 c -0.31239,-0.11656 -0.62628,-0.22995 -0.94051,-0.34262 l -6.82646,18.74563 c 0.3151,0.11086 0.6295,0.22294 0.94206,0.33899 z m -13.20746,-3.21324 2.32389,-19.85563 c -0.33018,-0.0406 -0.6613,-0.0778 -0.9927,-0.11421 l -2.32441,19.85719 c 0.33185,0.0351 0.66309,0.0721 0.99322,0.11265 z" />
                <path
                style={{fill:"none", stroke: "#000000", strokeWidth: "2", strokeLinecap: "butt", strokeLinejoin: "miter", strokeOpacity:"1", strokeMiterlimit:"4", strokeDasharray: "none"}}
                d="m 55.033981,160.64673 c 21.911734,-35.7142 73.080059,-41.16092 99.0,-0.0"
                id="path31745"
                  className="vu-meter-curve" />
                <path
                  id="path34476-3-7-6-0-0"
                  style={{stroke: "#000000", fill: "#000000", strokeLinecap: "round", stopColor: "#000000"}}
                  d="m 122.85506,139.33447 a 0.27774313,0.27774313 0 0 1 -0.27774,0.27775 0.27774313,0.27774313 0 0 1 -0.27775,-0.27775 0.27774313,0.27774313 0 0 1 0.27775,-0.27774 0.27774313,0.27774313 0 0 1 0.27774,0.27774 z m -11.57265,-2.59225 a 0.27774313,0.27774313 0 0 1 -0.27774,0.27774 0.27774313,0.27774313 0 0 1 -0.27774,-0.27774 0.27774313,0.27774313 0 0 1 0.27774,-0.27775 0.27774313,0.27774313 0 0 1 0.27774,0.27775 z m -11.942945,0 a 0.27774313,0.27774313 0 0 1 -0.277743,0.27774 0.27774313,0.27774313 0 0 1 -0.277743,-0.27774 0.27774313,0.27774313 0 0 1 0.277743,-0.27775 0.27774313,0.27774313 0 0 1 0.277743,0.27775 z m -5.740021,1.01837 a 0.27774313,0.27774313 0 0 1 -0.277743,0.27774 0.27774313,0.27774313 0 0 1 -0.277743,-0.27774 0.27774313,0.27774313 0 0 1 0.277743,-0.27774 0.27774313,0.27774313 0 0 1 0.277743,0.27774 z m -6.202934,1.94421 a 0.27774313,0.27774313 0 0 1 -0.277743,0.27775 0.27774313,0.27774313 0 0 1 -0.277743,-0.27775 0.27774313,0.27774313 0 0 1 0.277743,-0.27774 0.27774313,0.27774313 0 0 1 0.277743,0.27774 z m -5.925186,2.77742 a 0.27774313,0.27774313 0 0 1 -0.277743,0.27775 0.27774313,0.27774313 0 0 1 -0.277744,-0.27775 0.27774313,0.27774313 0 0 1 0.277744,-0.27774 0.27774313,0.27774313 0 0 1 0.277743,0.27774 z m -7.730515,4.81423 a 0.27774313,0.27774313 0 0 1 -0.277743,0.27774 0.27774313,0.27774313 0 0 1 -0.277743,-0.27774 0.27774313,0.27774313 0 0 1 0.277743,-0.27775 0.27774313,0.27774313 0 0 1 0.277743,0.27775 z m -6.52697,5.74002 a 0.27774313,0.27774313 0 0 1 -0.277743,0.27774 0.27774313,0.27774313 0 0 1 -0.277743,-0.27774 0.27774313,0.27774313 0 0 1 0.277743,-0.27774 0.27774313,0.27774313 0 0 1 0.277743,0.27774 z m -4.027271,4.67535 a 0.27774313,0.27774313 0 0 1 -0.277743,0.27775 0.27774313,0.27774313 0 0 1 -0.277743,-0.27775 0.27774313,0.27774313 0 0 1 0.277743,-0.27774 0.27774313,0.27774313 0 0 1 0.277743,0.27774 z m -3.33292,4.11986 a 0.27774313,0.27774313 0 0 1 -0.277743,0.27774 0.27774313,0.27774313 0 0 1 -0.277743,-0.27774 0.27774313,0.27774313 0 0 1 0.277743,-0.27774 0.27774313,0.27774313 0 0 1 0.277743,0.27774 z" />
              </g>
            </svg>
    
            <div className="vu-meter-screw"></div>
            
            <div className="vu-meter-screw-notch"></div>
            
            <div className="vu-meter-screw vu-meter-screw-spectral"></div>
        </div>
        </>
      )
}