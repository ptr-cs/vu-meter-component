﻿import { useEffect, useRef } from "react"
import { Stage, Layer, Group, Rect, Arc, Text, Circle, Line } from 'react-konva';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faPowerOff, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'


export default function VuMeter({ analyser, audioInitialized, gainNode, init, toggleMute, isMuted, isInitialized }) {
    
    const meterNeedle = document.getElementById("vu-meter-needle");
    var shapeRef = useRef(null);
    
    
    function visualize() {

        // const bufferLength = analyser.fftSize;
        // console.log(bufferLength);
        // // We can use Float32Array instead of Uint8Array if we want higher precision
        // // const dataArray = new Float32Array(bufferLength);
        // const dataArray = new Uint8Array(bufferLength);
        const sampleBuffer = new Float32Array(analyser.fftSize);

    
        function loop() {
            var oldVal = shapeRef;
            //gainNode.gain.value = 0.5 * (1 + Math.sin(Date.now() / 4e2));
        
            analyser.getFloatTimeDomainData(sampleBuffer);
        
            let sumOfSquares = 0;
            for (let i = 0; i < sampleBuffer.length; i++) {
              sumOfSquares += sampleBuffer[i] ** 2;
            }
            const avgPowerDecibels = (10 * Math.log10(sumOfSquares / sampleBuffer.length));
    
            /*            meterNeedle.style.transform = "rotate(" + Math.max(0 +  (0 + avgPowerDecibels), -60) + "deg)";*/
            console.log(avgPowerDecibels)
            var val = Math.max(0 + (avgPowerDecibels + 90), 0) * 2 + 105
            console.log(val)
            console.log(shapeRef)
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

          var button = document.getElementById("initButton");
          
      }, [audioInitialized]);

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
    
    return (
        <>
            <div className="vu-meter-v2">
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
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
                            fillLinearGradientStartPoint={{ x: 0, y: 0}}
                            fillLinearGradientEndPoint={{ x: meterWidth - borderSize * 2, y: smallBorderSize }}
                            fillLinearGradientColorStops={meterBackgroundGradient} />
                    </Layer>
                    <Layer>
                        <Group >
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
                    </Layer>
                    <Layer>
                        <Arc
                            x={meterWidth /2}
                            y={gaugeHeight }
                            innerRadius={gaugeHeight / 2}
                            outerRadius={gaugeHeight / 2}
                            angle={-210}
                            rotation={195 }
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
                            stroke='red'
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
                            stroke='red'
                            dash={[10, 10]}
                            strokeWidth={4} />
                        <Rect
                            x={meterWidth / 2}
                            y={gaugeHeight}
                            width={2}
                            height={gaugeHeight - borderSize * 4}
                            stroke="#111"
                            strokeWidth={2}
                            rotation={105 }
                            ref={(node) => {
                                if (node != null)
                                    shapeRef = node;
                            }}
                        />
                    </Layer>
                    {
                        // meter bevel
                    }
                    <Layer>
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
                <div className="buttons">
                    <button className={`initAudio ${isInitialized ? 'initialized' : ''}`} onClick={() => init()}>
                        <FontAwesomeIcon icon={faPowerOff} />
                        <span>INIT</span>
                    </button>
                    <button className='settings'>
                        <FontAwesomeIcon icon={faGear} />
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