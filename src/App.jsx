import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="vu-meter">
        <div className="vu-meter-border1"></div>
        <div className="vu-meter-border2"></div>
        <div className="vu-meter-background"></div>
        <div className="vu-meter-background-overlay"></div>
        <div className="vu-meter-background-shadow"></div>
        <div className="vu-meter-background-shadow-up"></div>
        <div className="vu-meter-light-1"></div>
        <div className="vu-meter-light-2"></div>
        <div className="vu-meter-bar"></div>
        
        <h5 className="vu-label vu-label-min">VU</h5>
        <h5 className="vu-label vu-label-max">VU</h5>
        
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
        
        <div className="vu-meter-needle"></div>

        <svg viewBox="0 0 210 297">
        <path
       id="rect7555-9-4-4-5-4-3-6-1-9"
       d="m 132.55966,119.83689 c 0.0215,0.003 0.0429,0.006 0.0644,0.009 l -0.009,0.0654 c -0.0215,-0.003 -0.0429,-0.006 -0.0644,-0.009 z m -12.34779,-1.46804 c 0.0215,0.002 0.043,0.004 0.0645,0.006 l -0.006,0.0657 c -0.0215,-0.002 -0.043,-0.004 -0.0645,-0.006 z m -12.37009,-0.86864 c 0.0215,9.6e-4 0.043,0.002 0.0645,0.003 l -0.003,0.066 c -0.0215,-9.7e-4 -0.043,-0.002 -0.0645,-0.003 z m -12.367377,-0.2307 c 0.02147,-1.7e-4 0.04295,-3.3e-4 0.06442,-5e-4 l 4.86e-4,0.0661 c -0.02147,1.6e-4 -0.04293,3.3e-4 -0.0644,5e-4 z M 83.13518,117.7088 c 0.02142,-0.001 0.04285,-0.003 0.06427,-0.004 l 0.0042,0.066 c -0.02142,0.001 -0.04283,0.003 -0.06425,0.004 z m -12.287474,1.12672 c 0.02129,-0.003 0.04259,-0.005 0.06388,-0.008 l 0.0079,0.0656 c -0.02129,0.003 -0.04257,0.005 -0.06386,0.008 z m -12.190613,1.82107 c 0.02109,-0.004 0.04217,-0.008 0.06326,-0.0113 l 0.01164,0.0651 c -0.02108,0.004 -0.04216,0.008 -0.06324,0.0113 z m -12.048642,2.52235 c 0.0208,-0.005 0.0416,-0.01 0.0624,-0.015 l 0.01543,0.0643 c -0.02079,0.005 -0.04159,0.01 -0.06238,0.015 z m -11.861562,3.23055 c 0.02044,-0.006 0.04087,-0.0125 0.06131,-0.0187 l 0.01926,0.0632 c -0.02043,0.006 -0.04086,0.0125 -0.06129,0.0187 z m -11.629361,3.94566 c 0.01999,-0.007 0.03998,-0.015 0.05997,-0.0225 l 0.02312,0.0619 c -0.01998,0.007 -0.03997,0.0149 -0.05995,0.0224 z m 117.908242,-14.69438 1.52169,-8.99555 m -17.50634,6.61296 1.00707,-9.06049 m -19.47045,7.79626 0.35797,-9.11062 m -18.044749,9.07811 -0.332085,-9.11953 m -17.309692,10.32263 -1.047608,-9.06425 m 111.864804,21.14589 c 1.47338,-4.70887 2.94856,-9.4171 4.42554,-14.1247 m -19.64561,10.02192 3.75867,-14.72401 m -21.03632,10.79531 2.95947,-14.8992 m -18.10944,5.90969 c 16.73286,2.38234 33.26817,6.22207 49.4338,11.10634 l -1.78611,5.91465 c -15.95787,-4.76473 -32.23078,-8.49974 -48.64224,-10.79089 0.33074,-2.0768 0.66226,-4.15351 0.99455,-6.2301 z m -0.99455,6.2301 2.13479,-15.026338 m -20.72566,13.024388 1.09151,-15.130384 M 98.037479,111.83141 98.094558,96.647364 M 80.215393,112.46435 79.079574,97.319489 M 62.41366,114.5193 60.062201,99.520093 M 44.037097,118.21725 40.395131,103.48478 M 20.988125,125.35225 15.65649,111.13588 m 5.1619,14.13883 c 25.135878,-9.44783 52.076657,-13.72858 78.818067,-13.38884 27.698873,0.34115 55.405443,5.47874 82.429923,13.38031" />

        </svg>


    </div>
    </>
  )
}

export default App
