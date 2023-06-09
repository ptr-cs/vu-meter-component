import { useEffect } from "react"
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';


export default function VuMeter({ analyser, audioInitialized, gainNode, init, toggleMute, isMuted, isInitialized }) {
    
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
            visualize(); 
      }, [audioInitialized]);

    const meterWidth = 512;
    const meterHeight = 512;
    const gaugeHeight = meterHeight * .66;
    const sp = 8; // unit of spacing
    const meterMargin = sp * 2;
    const borderSize = sp * 2;
    const smallBorderSize = sp;
    const borderColor = "#555";
    const borderShadowColor = "black";
    const borderShadowGradient = [0, borderShadowColor, 1, "#00000000"];

    const smallBorderColor = "#666";
    const smallBorderShadowColor = "#00000088";
    const smallBorderShadowGradient = [0, "#00000000", 1, smallBorderShadowColor];

    const glassBorderGradient = [1, "transparent", 0, smallBorderShadowColor];

    const glassOutlineRectMargin = sp;
    
    return (
        <>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Rect
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
                        fill="goldenrod" />
                </Layer>
                <Layer>
                    <Rect
                        x={meterMargin}
                        y={meterMargin}
                        width={borderSize}
                        height={meterHeight}
                        fill={borderColor} />
                    <Rect
                        x={meterWidth + meterMargin - borderSize}
                        y={meterMargin}
                        width={borderSize}
                        height={meterHeight}
                        fill={borderColor} />
                    <Rect
                        x={meterMargin}
                        y={meterMargin}
                        width={meterWidth}
                        height={borderSize}
                        fill={borderColor}/>
                    <Rect
                        x={meterMargin}
                        y={meterHeight + meterMargin - borderSize}
                        width={meterWidth}
                        height={borderSize}
                        fill={borderColor} />

                    
                </Layer>
                <Layer>
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
                        strokeWidth="1"
                        />
                </Layer>
                <Layer>
                    <Rect
                        x={meterMargin + borderSize}
                        y={meterMargin + borderSize}
                        width={smallBorderSize}
                        height={smallBorderSize}
                        fillLinearGradientStartPoint={{ x: smallBorderSize / 2, y: smallBorderSize  / 2}}
                        fillLinearGradientEndPoint={{ x: smallBorderSize, y: smallBorderSize }}
                        fillLinearGradientColorStops={smallBorderShadowGradient} />

                    <Rect
                        x={meterWidth + meterMargin - borderSize}
                        y={meterMargin + borderSize}
                        rotation="90"
                        width={smallBorderSize}
                        height={smallBorderSize}
                        fillLinearGradientStartPoint={{ x: smallBorderSize / 2, y: smallBorderSize / 2 }}
                        fillLinearGradientEndPoint={{ x: smallBorderSize, y: smallBorderSize }}
                        fillLinearGradientColorStops={smallBorderShadowGradient} />

                    <Rect
                        x={borderSize + meterMargin}
                        y={meterHeight + meterMargin - borderSize}
                        rotation="-90"
                        width={smallBorderSize}
                        height={smallBorderSize}
                        fillLinearGradientStartPoint={{ x: smallBorderSize / 2, y: smallBorderSize / 2 }}
                        fillLinearGradientEndPoint={{ x: smallBorderSize, y: smallBorderSize }}
                        fillLinearGradientColorStops={smallBorderShadowGradient} />

                    <Rect
                        x={meterWidth + meterMargin - borderSize}
                        y={meterHeight + meterMargin - borderSize}
                        rotation="180"
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
                </Layer>
                <Layer>
                    <Rect
                        x={meterMargin}
                        y={meterMargin}
                        width={borderSize}
                        height={meterHeight}
                        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                        fillLinearGradientEndPoint={{ x: borderSize, y: 0 }}
                        fillLinearGradientColorStops={borderShadowGradient} />
                    <Rect
                        x={meterWidth + meterMargin - borderSize}
                        y={meterMargin}
                        width={borderSize}
                        height={meterHeight}
                        fillLinearGradientStartPoint={{ x: borderSize, y: 0 }}
                        fillLinearGradientEndPoint={{ x: 0, y: 0 }}
                        fillLinearGradientColorStops={borderShadowGradient} />
                    <Rect
                        x={meterMargin}
                        y={meterMargin}
                        width={meterWidth}
                        height={borderSize}
                        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                        fillLinearGradientEndPoint={{ x: 0, y: borderSize }}
                        fillLinearGradientColorStops={borderShadowGradient} />
                    <Rect
                        x={meterMargin}
                        y={meterHeight + meterMargin - borderSize}
                        width={meterWidth}
                        height={borderSize}
                        fillLinearGradientStartPoint={{ x: 0, y: borderSize }}
                        fillLinearGradientEndPoint={{ x: 0, y: 0 }}
                        fillLinearGradientColorStops={borderShadowGradient} />
                </Layer>

                <Layer>
                    <Rect
                        x={meterMargin + borderSize + smallBorderSize}
                        y={gaugeHeight - glassOutlineRectMargin}
                        width={meterWidth - borderSize * 2 - smallBorderSize * 2}
                        height={(meterHeight - gaugeHeight)}
                        stroke="#111"
                        Fill="#333"
                        strokeWidth="1"
                    />

                </Layer>

                <Layer x={glassOutlineRectMargin}
                    y={glassOutlineRectMargin}>
                    <Rect
                        x={meterMargin + borderSize}
                        y={meterMargin + borderSize}
                        rotation="0"
                        width={smallBorderSize}
                        height={smallBorderSize}
                        fillLinearGradientStartPoint={{ x: smallBorderSize / 2, y: smallBorderSize / 2 }}
                        fillLinearGradientEndPoint={{ x: smallBorderSize, y: smallBorderSize }}
                        fillLinearGradientColorStops={glassBorderGradient} />

                    <Rect
                        x={meterWidth + meterMargin - borderSize - glassOutlineRectMargin * 2}
                        y={meterMargin + borderSize}
                        rotation="90"
                        width={smallBorderSize}
                        height={smallBorderSize}
                        fillLinearGradientStartPoint={{ x: smallBorderSize / 2, y: smallBorderSize / 2 }}
                        fillLinearGradientEndPoint={{ x: smallBorderSize, y: smallBorderSize }}
                        fillLinearGradientColorStops={glassBorderGradient} />

                    <Rect
                        x={borderSize + meterMargin}
                        y={gaugeHeight + meterMargin - borderSize - glassOutlineRectMargin * 2}
                        rotation="-90"
                        width={smallBorderSize}
                        height={smallBorderSize}
                        fillLinearGradientStartPoint={{ x: smallBorderSize / 2, y: smallBorderSize / 2 }}
                        fillLinearGradientEndPoint={{ x: smallBorderSize, y: smallBorderSize }}
                        fillLinearGradientColorStops={glassBorderGradient} />

                    <Rect
                        x={meterWidth + meterMargin - borderSize - glassOutlineRectMargin * 2}
                        y={gaugeHeight + meterMargin - borderSize - glassOutlineRectMargin * 2}
                        rotation="180"
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
                        x={meterMargin + borderSize + glassOutlineRectMargin}
                        y={meterMargin + borderSize + glassOutlineRectMargin - 1}
                        width={meterWidth - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2}
                        height={1}
                        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                        fillLinearGradientEndPoint={{ x: meterWidth - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2, y: 0 }}
                        fillLinearGradientColorStops={[0, "transparent", .25, "white", .75, "white", .85, "transparent", .9, "white", 1, "transparent"]} />
                </Layer>
                <Layer>
                    <Rect
                        x={meterMargin + borderSize + smallBorderSize + glassOutlineRectMargin}
                        y={meterMargin + borderSize + smallBorderSize + glassOutlineRectMargin}
                        width={meterWidth - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2}
                        height={gaugeHeight - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2}
                        strokeLinearGradientStartPoint={{ x: 0, y: 0 }}
                        strokeLinearGradientEndPoint={{ x: meterWidth - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2, y: gaugeHeight - borderSize * 2 - smallBorderSize * 2 - glassOutlineRectMargin * 2 }}
                        strokeLinearGradientColorStops={[1, "#00000066", 0, "#00000088"]}
                        strokeWidth="1"
                    />
                </Layer>
            </Stage>
        </>
      )
}