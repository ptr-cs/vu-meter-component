import { useEffect, useRef, useState } from "react"
import { Stage, Layer, Group, Rect, Arc, Label, Text, Circle, Line } from 'react-konva';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faPowerOff, faVolumeHigh, faVolumeXmark, faGaugeSimple } from '@fortawesome/free-solid-svg-icons'


export default function VuMeter({ analyser, audioInitialized, gainNode, init, toggleMute, isMuted, isInitialized }) {
    
    const meterNeedle = document.getElementById("vu-meter-needle");
    var shapeRef = useRef(null);
    var [isSettingsView, setIsSettingsView] = useState(false);
    var [isAudioLogPaused, setIsAudioLogPaused] = useState(false);
    var [audioLog, setAudioLog] = useState("");
    
    function visualize() {

        // const bufferLength = analyser.fftSize;
        // console.log(bufferLength);
        // // We can use Float32Array instead of Uint8Array if we want higher precision
        // // const dataArray = new Float32Array(bufferLength);
        // const dataArray = new Uint8Array(bufferLength);
        const sampleBuffer = new Float32Array(analyser.fftSize);

        // https://stackoverflow.com/questions/44360301/web-audio-api-creating-a-peak-meter-with-analysernode
        function loop() {
            var oldVal = shapeRef;

            analyser.getFloatTimeDomainData(sampleBuffer);

            let sumOfSquares = 0;
            for (let i = 0; i < sampleBuffer.length; i++) {
                sumOfSquares += sampleBuffer[i] ** 2;
            }
            const avgPowerDecibels = (10 * Math.log10(sumOfSquares / sampleBuffer.length));
            console.log("PAUSED: " + isAudioLogPaused)
            if (isAudioLogPaused === false) {
                
                var currentdate = new Date();
                var datetime =
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds() + "."
                    + currentdate.getMilliseconds()
                setAudioLog(audioLog += "\n" + datetime + "\t" + avgPowerDecibels)
                var textarea = document.getElementById('audioReadout');
                if (textarea != null)
                    textarea.scrollTop = textarea.scrollHeight;
            }
            
            var val = Math.max(0 + (avgPowerDecibels + 90), 0) * 1.5 + 105 //Math.max((360 - (avgPowerDecibels * -1)) + 60, 0) + 105; // test

            if (shapeRef != null)
                shapeRef.to({
                    rotation: val
                });
            else
                shapeRef = oldVal

            requestAnimationFrame(loop);
          }
          loop();
    }

      useEffect(() => {
        if (audioInitialized === true)
              visualize(); 
          
      }, [audioInitialized]);

    useEffect(() => {
        if (isMuted === false)
            visualize();

    }, [isMuted]);

    const toggleSettingsView = () => {
        setIsSettingsView(!isSettingsView);
    }

    const toggleAudioLogPause = () => {
        console.log(isAudioLogPaused)
        setIsAudioLogPaused(!isAudioLogPaused);
    }

    const meterWidth = 512;
    const meterHeight = 320;
    const gaugeHeight = meterHeight * .8;
    const sp = 8; // unit of spacing
    const meterMargin = sp * 2;
    const borderSize = sp * 2;
    const smallBorderSize = sp;
    const glassOutlineRectMargin = sp;


    const borderColor = "#555";
    const borderShadowColor = "black";
    const buttonAreaShadowColor = "#111";
    const borderShadowGradient = [0, borderShadowColor, 1, "#00000000"];

    const smallBorderColor = "#666";
    const smallBorderShadowColor = "#00000088";
    const smallBorderShadowGradient = [0, "#00000000", 1, smallBorderShadowColor];

    const glassBorderGradient = [1, "transparent", 0, smallBorderShadowColor];

    const buttonAreaShadowGradient = [0, buttonAreaShadowColor, .5, "#00000000", 1, buttonAreaShadowColor];

    const meterBackgroundGradient = [0, "darkgoldenrod", .5, "goldenrod", 1, "darkgoldenrod"];

    const arrVals = ["-10", "-20", "-30", "-40", "-50", "-60", "-70"]
    
    return (
        <>
            <div className="vu-meter-v2">
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    
                    <Layer visible={!isSettingsView}>
                        <Group>
                            <Rect
                                cornerRadius={8}
                                x={meterMargin}
                                y={meterMargin}
                                width={meterWidth}
                                height={meterHeight}
                                fill="#111" />
                            <Rect
                                x={meterMargin + borderSize}
                                y={meterMargin + borderSize}
                                width={meterWidth - borderSize * 2}
                                height={meterHeight - borderSize * 2}
                                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                fillLinearGradientEndPoint={{ x: meterWidth - borderSize * 2, y: smallBorderSize }}
                                fillLinearGradientColorStops={meterBackgroundGradient} />

                            <Text
                                text="dB (avg)"
                                x={meterMargin + borderSize + smallBorderSize + glassOutlineRectMargin + 8}
                                y={meterMargin + borderSize + smallBorderSize + glassOutlineRectMargin + 8}
                                fontFamily={'Squada One'}
                                fontSize={32} />

                            <Text
                                text="DIVIDE BY ZENO"
                                x={meterWidth - borderSize - smallBorderSize - glassOutlineRectMargin - 72}
                                y={meterMargin + borderSize + smallBorderSize + glassOutlineRectMargin + 8}
                                fontFamily={'Squada One'}
                                fontSize={16} />

                            <Text
                                text="-Inf"
                                x={meterMargin + borderSize + smallBorderSize + glassOutlineRectMargin + 8}
                                y={gaugeHeight - borderSize - smallBorderSize - glassOutlineRectMargin - 32}
                                fontFamily={'Squada One'}
                                fontSize={32} />

                            <Text
                                text="0"
                                x={meterWidth - borderSize - smallBorderSize - glassOutlineRectMargin - 64}
                                y={gaugeHeight - borderSize - smallBorderSize - glassOutlineRectMargin - 32}
                                fontFamily={'Squada One'}
                                fill={"darkred"}
                                fontSize={32} /> 

                            {arrVals.map(function (arrVal, i) {
                                return <Text
                                    key={i}
                                    text={arrVal}
                                    x={meterWidth /2 - meterMargin - borderSize / 2 + Math.cos(i/arrVal.length * Math.PI / 2) * 156}
                                    y={gaugeHeight - borderSize - smallBorderSize - glassOutlineRectMargin - 32 + Math.sin(i / arrVal.length * Math.PI / -2) * 80 - 32}
                                    fontFamily={'Squada One'}
                                    fontSize={32} />
                            })}
                        </Group>
                        {
                            // lights
                        }
                        <Group>
                            <Circle
                                x={meterWidth / 3}
                                y={gaugeHeight - 32}
                                radius={120}
                                fillRadialGradientStartPoint={[0, 0]}
                                fillRadialGradientStartRadius={0}
                                fillRadialGradientEndPoint={[0, 0]}
                                fillRadialGradientEndRadius={120}
                                fillRadialGradientColorStops={[0, '#ffffff88', 0.5, '#ffffff44', 1, 'transparent']} />
                            <Circle
                                x={(meterWidth / 3) * 2}
                                y={gaugeHeight - 32}
                                radius={120}
                                fillRadialGradientStartPoint={[0, 0]}
                                fillRadialGradientStartRadius={0}
                                fillRadialGradientEndPoint={[0, 0]}
                                fillRadialGradientEndRadius={120}
                                fillRadialGradientColorStops={[0, '#ffffff88', 0.5, '#ffffff44', 1, 'transparent']} />
                        </Group>
                        
                        
                        <Group>
                            <Arc
                                x={meterWidth / 2}
                                y={gaugeHeight}
                                innerRadius={gaugeHeight / 2}
                                outerRadius={gaugeHeight / 2}
                                angle={-210}
                                rotation={195}
                                fill='yellow'
                                stroke='black'
                                strokeWidth={4} />
                            <Arc
                                x={meterWidth / 2}
                                y={gaugeHeight}
                                innerRadius={gaugeHeight / 2}
                                outerRadius={gaugeHeight / 2}
                                angle={-335}
                                rotation={320}
                                fill='yellow'
                                stroke='darkred'
                                strokeWidth={4} />

                            <Arc
                                x={meterWidth / 2}
                                y={gaugeHeight}
                                innerRadius={gaugeHeight / 1.8}
                                outerRadius={gaugeHeight / 1.8}
                                angle={-232}
                                rotation={195}
                                fill='transparent'
                                stroke='black'
                                dash={[10, 10]}
                                strokeWidth={4} />
                            <Arc
                                x={meterWidth / 2}
                                y={gaugeHeight}
                                innerRadius={gaugeHeight / 1.8}
                                outerRadius={gaugeHeight / 1.8}
                                angle={-335}
                                rotation={320}
                                fill='transparent'
                                stroke='darkred'
                                dash={[10, 10]}
                                strokeWidth={4} />
                            <Rect
                                x={meterWidth / 2}
                                y={gaugeHeight}
                                width={2}
                                height={gaugeHeight - borderSize * 4}
                                stroke="#111"
                                strokeWidth={2}
                                rotation={105}
                                shadowColor={'black'}
                                shadowBlur={8}
                                shadowOffset={[64, 0]}
                                shadowOpacity={0.5}
                                ref={(node) => {
                                    if (node != null)
                                        shapeRef = node;
                                }}
                            />
                        </Group>
                    </Layer>
                    <Layer visible={isSettingsView}>
                        <Group>
                            <Rect
                                x={meterMargin + borderSize}
                                y={meterMargin + borderSize}
                                width={meterWidth - borderSize * 2}
                                height={meterHeight - borderSize * 2}
                                fill={'#111'} />
                        </Group>
                    </Layer>
                    {
                        // meter bevel
                    }
                    <Layer>
                        <Group>
                            <Rect
                                cornerRadius={8}
                                x={meterMargin}
                                y={meterMargin}
                                width={borderSize}
                                height={meterHeight}
                                fill={borderColor} />
                            <Rect
                                cornerRadius={8}
                                x={meterWidth + meterMargin - borderSize}
                                y={meterMargin}
                                width={borderSize}
                                height={meterHeight}
                                fill={borderColor} />
                            <Rect
                                cornerRadius={8}
                                x={meterMargin}
                                y={meterMargin}
                                width={meterWidth}
                                height={borderSize}
                                fill={borderColor} />
                            <Rect
                                cornerRadius={8}
                                x={meterMargin}
                                y={meterHeight + meterMargin - borderSize}
                                width={meterWidth}
                                height={borderSize}
                                fill={borderColor} />


                        </Group>
                        <Group>
                            <Rect
                                x={meterMargin + borderSize}
                                y={meterMargin + borderSize}
                                width={smallBorderSize}
                                height={meterHeight - borderSize * 2}
                                fill={smallBorderColor} />
                            <Rect
                                x={meterWidth + meterMargin - borderSize - smallBorderSize}
                                y={meterMargin + borderSize}
                                width={smallBorderSize}
                                height={meterHeight - borderSize * 2}
                                fill={smallBorderColor} />
                            <Rect
                                x={borderSize + meterMargin}
                                y={meterMargin + borderSize}
                                width={meterWidth - borderSize * 2}
                                height={smallBorderSize}
                                fill={smallBorderColor} />
                            <Rect
                                x={borderSize + meterMargin}
                                y={meterHeight + meterMargin - borderSize - smallBorderSize}
                                width={meterWidth - borderSize * 2}
                                height={smallBorderSize}
                                fill={smallBorderColor} />

                            <Rect
                                x={meterMargin + borderSize}
                                y={meterMargin + borderSize}
                                width={meterWidth - borderSize * 2}
                                height={meterHeight - borderSize * 2}
                                stroke="#444"
                                strokeWidth={1}
                            />
                        </Group>
                        <Group>
                            <Rect
                                x={meterMargin + borderSize}
                                y={meterMargin + borderSize}
                                width={smallBorderSize}
                                height={smallBorderSize}
                                fillLinearGradientStartPoint={{ x: smallBorderSize / 2, y: smallBorderSize / 2 }}
                                fillLinearGradientEndPoint={{ x: smallBorderSize, y: smallBorderSize }}
                                fillLinearGradientColorStops={smallBorderShadowGradient} />

                            <Rect
                                x={meterWidth + meterMargin - borderSize}
                                y={meterMargin + borderSize}
                                rotation={90}
                                width={smallBorderSize}
                                height={smallBorderSize}
                                fillLinearGradientStartPoint={{ x: smallBorderSize / 2, y: smallBorderSize / 2 }}
                                fillLinearGradientEndPoint={{ x: smallBorderSize, y: smallBorderSize }}
                                fillLinearGradientColorStops={smallBorderShadowGradient} />

                            <Rect
                                x={borderSize + meterMargin}
                                y={meterHeight + meterMargin - borderSize}
                                rotation={-90}
                                width={smallBorderSize}
                                height={smallBorderSize}
                                fillLinearGradientStartPoint={{ x: smallBorderSize / 2, y: smallBorderSize / 2 }}
                                fillLinearGradientEndPoint={{ x: smallBorderSize, y: smallBorderSize }}
                                fillLinearGradientColorStops={smallBorderShadowGradient} />

                            <Rect
                                x={meterWidth + meterMargin - borderSize}
                                y={meterHeight + meterMargin - borderSize}
                                rotation={180}
                                width={smallBorderSize}
                                height={smallBorderSize}
                                fillLinearGradientStartPoint={{ x: smallBorderSize / 2, y: smallBorderSize / 2 }}
                                fillLinearGradientEndPoint={{ x: smallBorderSize, y: smallBorderSize }}
                                fillLinearGradientColorStops={smallBorderShadowGradient} />





                            <Rect
                                x={meterMargin + borderSize}
                                y={meterMargin + borderSize + smallBorderSize}
                                width={smallBorderSize}
                                height={meterHeight - borderSize * 2 - smallBorderSize * 2}
                                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                fillLinearGradientEndPoint={{ x: smallBorderSize, y: 0 }}
                                fillLinearGradientColorStops={smallBorderShadowGradient} />
                            <Rect
                                x={meterWidth + meterMargin - borderSize - smallBorderSize}
                                y={meterMargin + borderSize + smallBorderSize}
                                width={smallBorderSize}
                                height={meterHeight - borderSize * 2 - smallBorderSize * 2}
                                fillLinearGradientStartPoint={{ x: smallBorderSize, y: 0 }}
                                fillLinearGradientEndPoint={{ x: 0, y: 0 }}
                                fillLinearGradientColorStops={smallBorderShadowGradient} />
                            <Rect
                                x={borderSize + meterMargin + smallBorderSize}
                                y={meterMargin + borderSize}
                                width={meterWidth - borderSize * 2 - smallBorderSize * 2}
                                height={smallBorderSize}
                                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                fillLinearGradientEndPoint={{ x: 0, y: smallBorderSize }}
                                fillLinearGradientColorStops={smallBorderShadowGradient} />
                            <Rect
                                x={borderSize + meterMargin + smallBorderSize}
                                y={meterHeight + meterMargin - borderSize - smallBorderSize}
                                width={meterWidth - borderSize * 2 - smallBorderSize * 2}
                                height={smallBorderSize}
                                fillLinearGradientStartPoint={{ x: 0, y: smallBorderSize }}
                                fillLinearGradientEndPoint={{ x: 0, y: 0 }}
                                fillLinearGradientColorStops={smallBorderShadowGradient} />
                        </Group>
                        <Group visible={true}>
                            <Rect

                                cornerRadius={8}
                                x={meterMargin}
                                y={meterMargin}
                                width={borderSize}
                                height={meterHeight}
                                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                fillLinearGradientEndPoint={{ x: borderSize, y: 0 }}
                                fillLinearGradientColorStops={borderShadowGradient} />
                            <Rect
                                cornerRadius={8}
                                x={meterWidth + meterMargin - borderSize}
                                y={meterMargin}
                                width={borderSize}
                                height={meterHeight}
                                fillLinearGradientStartPoint={{ x: borderSize, y: 0 }}
                                fillLinearGradientEndPoint={{ x: 0, y: 0 }}
                                fillLinearGradientColorStops={borderShadowGradient} />
                            <Rect
                                cornerRadius={8}
                                x={meterMargin}
                                y={meterMargin}
                                width={meterWidth}
                                height={borderSize}
                                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                fillLinearGradientEndPoint={{ x: 0, y: borderSize }}
                                fillLinearGradientColorStops={borderShadowGradient} />
                            <Rect
                                cornerRadius={8}
                                x={meterMargin}
                                y={meterHeight + meterMargin - borderSize}
                                width={meterWidth}
                                height={borderSize}
                                fillLinearGradientStartPoint={{ x: 0, y: borderSize }}
                                fillLinearGradientEndPoint={{ x: 0, y: 0 }}
                                fillLinearGradientColorStops={borderShadowGradient} />
                        </Group>
                        
                        {
                            // buttons background
                        }
                        <Group visible={true}>
                            <Rect
                                x={meterMargin + borderSize + smallBorderSize}
                                y={gaugeHeight - glassOutlineRectMargin}
                                width={meterWidth - borderSize * 2 - smallBorderSize * 2}
                                height={(meterHeight - gaugeHeight)}
                                stroke="#111"
                                Fill="#333"
                                strokeWidth={1}
                            />
                            <Rect
                                x={meterMargin + borderSize + smallBorderSize}
                                y={gaugeHeight - glassOutlineRectMargin}
                                width={meterWidth - borderSize * 2 - smallBorderSize * 2}
                                height={(meterHeight - gaugeHeight)}
                                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                fillLinearGradientEndPoint={{ x: meterWidth - borderSize * 2 - smallBorderSize * 2, y: 0 }}
                                fillLinearGradientColorStops={buttonAreaShadowGradient}
                            />
                        </Group>
                        
                        {
                            // glass spectral highlight and shadows:
                        }
                        <Group x={glassOutlineRectMargin}
                            y={glassOutlineRectMargin} visible={true}>
                            <Rect
                                x={meterMargin + borderSize}
                                y={meterMargin + borderSize}
                                rotation={0}
                                width={smallBorderSize}
                                height={smallBorderSize}
                                fillLinearGradientStartPoint={{ x: smallBorderSize / 2, y: smallBorderSize / 2 }}
                                fillLinearGradientEndPoint={{ x: smallBorderSize, y: smallBorderSize }}
                                fillLinearGradientColorStops={glassBorderGradient} />

                            <Rect
                                x={meterWidth + meterMargin - borderSize - glassOutlineRectMargin * 2}
                                y={meterMargin + borderSize}
                                rotation={90}
                                width={smallBorderSize}
                                height={smallBorderSize}
                                fillLinearGradientStartPoint={{ x: smallBorderSize / 2, y: smallBorderSize / 2 }}
                                fillLinearGradientEndPoint={{ x: smallBorderSize, y: smallBorderSize }}
                                fillLinearGradientColorStops={glassBorderGradient} />

                            <Rect
                                x={borderSize + meterMargin}
                                y={gaugeHeight + meterMargin - borderSize - glassOutlineRectMargin * 2}
                                rotation={-90}
                                width={smallBorderSize}
                                height={smallBorderSize}
                                fillLinearGradientStartPoint={{ x: smallBorderSize / 2, y: smallBorderSize / 2 }}
                                fillLinearGradientEndPoint={{ x: smallBorderSize, y: smallBorderSize }}
                                fillLinearGradientColorStops={glassBorderGradient} />

                            <Rect
                                x={meterWidth + meterMargin - borderSize - glassOutlineRectMargin * 2}
                                y={gaugeHeight + meterMargin - borderSize - glassOutlineRectMargin * 2}
                                rotation={180}
                                width={smallBorderSize}
                                height={smallBorderSize}
                                fillLinearGradientStartPoint={{ x: smallBorderSize / 2, y: smallBorderSize / 2 }}
                                fillLinearGradientEndPoint={{ x: smallBorderSize, y: smallBorderSize }}
                                fillLinearGradientColorStops={glassBorderGradient} />

                            <Rect
                                x={meterMargin + borderSize}
                                y={meterMargin + borderSize + smallBorderSize}
                                width={smallBorderSize}
                                height={gaugeHeight - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2}
                                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                fillLinearGradientEndPoint={{ x: smallBorderSize, y: 0 }}
                                fillLinearGradientColorStops={glassBorderGradient} />
                            <Rect
                                x={meterWidth + meterMargin - borderSize - smallBorderSize - glassOutlineRectMargin * 2}
                                y={meterMargin + borderSize + smallBorderSize}
                                width={smallBorderSize}
                                height={gaugeHeight - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2}
                                fillLinearGradientStartPoint={{ x: smallBorderSize, y: 0 }}
                                fillLinearGradientEndPoint={{ x: 0, y: 0 }}
                                fillLinearGradientColorStops={glassBorderGradient} />
                            <Rect
                                x={borderSize + meterMargin + smallBorderSize}
                                y={meterMargin + borderSize}
                                width={meterWidth - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2}
                                height={smallBorderSize}
                                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                fillLinearGradientEndPoint={{ x: 0, y: smallBorderSize }}
                                fillLinearGradientColorStops={glassBorderGradient} />
                            <Rect
                                x={borderSize + meterMargin + smallBorderSize}
                                y={gaugeHeight + meterMargin - borderSize - smallBorderSize - glassOutlineRectMargin * 2}
                                width={meterWidth - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2}
                                height={smallBorderSize}
                                fillLinearGradientStartPoint={{ x: 0, y: smallBorderSize }}
                                fillLinearGradientEndPoint={{ x: 0, y: 0 }}
                                fillLinearGradientColorStops={glassBorderGradient}
                            />

                            <Rect
                                x={borderSize + meterMargin}
                                y={meterMargin + borderSize}
                                width={meterWidth - borderSize * 2 - glassOutlineRectMargin * 2}
                                height={smallBorderSize * 4}
                                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                fillLinearGradientEndPoint={{ x: 0, y: smallBorderSize * 4 }}
                                fillLinearGradientColorStops={glassBorderGradient} />

                            <Rect
                                x={borderSize + meterMargin}
                                y={gaugeHeight - borderSize - borderSize / 2 - smallBorderSize - glassOutlineRectMargin * 2}
                                width={meterWidth - borderSize - smallBorderSize * 2 - glassOutlineRectMargin * 2}
                                height={smallBorderSize * 4}
                                fillLinearGradientStartPoint={{ x: 0, y: smallBorderSize * 4 }}
                                fillLinearGradientEndPoint={{ x: 0, y: 0 }}
                                fillLinearGradientColorStops={glassBorderGradient} />

                            <Rect
                                x={meterMargin + borderSize + glassOutlineRectMargin}
                                y={meterMargin + borderSize + glassOutlineRectMargin - 1}
                                width={meterWidth - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2}
                                height={1}
                                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                fillLinearGradientEndPoint={{ x: meterWidth - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2, y: 0 }}
                                fillLinearGradientColorStops={[0, "transparent", .25, "white", .75, "white", .85, "transparent", .9, "white", 1, "transparent"]} />


                        </Group>
                        {
                            // glass faceplate perimeter:
                        }
                        <Group visible={true}>
                            <Rect
                                x={meterMargin + borderSize + smallBorderSize + glassOutlineRectMargin}
                                y={meterMargin + borderSize + smallBorderSize + glassOutlineRectMargin}
                                width={meterWidth - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2}
                                height={gaugeHeight - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2}
                                strokeLinearGradientStartPoint={{ x: 0, y: 0 }}
                                strokeLinearGradientEndPoint={{ x: meterWidth - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2, y: gaugeHeight - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2 }}
                                strokeLinearGradientColorStops={[1, "#00000066", 0, "#00000088"]}
                                strokeWidth={1}
                            />
                        </Group>
                    </Layer>
                </Stage>
                {isSettingsView ? 
                    <>
                        <div className="buttons" id="audioLogButtons">
                            <button onClick={() => toggleAudioLogPause()}>PAUSE</button>
                            <button>COPY</button>
                        </div>
                        <textarea id="audioReadout" readOnly value={audioLog} rows="64"></textarea>
                    </> : <></>   
                }
                <div className="buttons">
                    <button className={`initAudio ${isInitialized ? 'initialized' : ''}`} onClick={() => init()}>
                        <FontAwesomeIcon icon={faPowerOff} />
                        <span>INIT</span>
                    </button>
                    <button className='settings' onClick={() => toggleSettingsView()}>
                        {!isSettingsView ? <FontAwesomeIcon icon={faGear} /> : <FontAwesomeIcon icon={faGaugeSimple} /> }
                    </button>
                    <button className={`muteAudio ${isMuted ? 'isMuted' : ''}`} onClick={() => toggleMute()} disabled={!isInitialized}>
                        {isMuted ? <FontAwesomeIcon icon={faVolumeXmark} /> : <FontAwesomeIcon icon={faVolumeHigh} />  }
                        <span>{isMuted ? "UNMUTE" : "MUTE" }</span>
                    </button>
                </div>
            </div>
        </>
      )
}