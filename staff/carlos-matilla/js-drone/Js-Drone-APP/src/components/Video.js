import React, { useEffect, useState, useRef } from 'react'
import JMuxer from 'jmuxer'
import './Video.sass'
import { socket } from '../socket'
import { startDrone } from './../logic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faSpinner } from '@fortawesome/free-solid-svg-icons'


export default function () {
    const [status, updateStatus] = useState(' - ');
    const [battery, setBattery] = useState()
    const [height, setHeight] = useState('-')
    const [loading, setLoading] = useState()
    const [videoOn, setVideoOn] = useState(false)

    function handleStartDrone() {

        try {
            startDrone()
            setVideoOn(true)
            setTimeout(() => {
                var socketURL = `ws://localhost:2212`
                const ws = new WebSocket(socketURL)
                const jmuxer = new JMuxer({
                    node: 'player',
                    mode: 'video',
                    flushingTime: 1,
                    fps: 30
                })
                ws.binaryType = 'arraybuffer'
                ws.addEventListener('message', function (event) {
                    jmuxer.feed({
                        video: new Uint8Array(event.data)
                    })
                })

                ws.addEventListener('error', function (e) {
                    console.log('Socket Error');
                })
            }, 1000);

        } catch (error) {
            console.log(error)
        }
    }

    socket.on('status', data => updateStatus(data))
    socket.on('dronestate', data => {
        if (data !== undefined) {
            setBattery(data.bat)
            setHeight(data.tof)
        }
    })

    let batStyle = { width: `${battery}%` }


    function handleStopDrone() {
        socket.emit('stop')
        setBattery()
        setLoading(false)
        setVideoOn(false)
    }

    function handleLoading() {
        setLoading(true)
    }

    const animation = useRef({})
    useEffect(() => {
        animation.current = {
            animationName: `fadeInDown`,
            animationDuration: `4s`,
            animationDelay: `0s`,
            animationIterationCount: `1`
        }
        return () => animation.current = {};
    }, [])


    return <>
        <div className="video-wrapper" style={animation.current}>

            <div className="aspect-ratio--16x9">
                <div className="aspect-ratio__inner-wrapper">

                    <div className="start_button_wrapper" >
                        {battery === undefined && <button className="start-button" onClick={() => {
                            handleStartDrone()
                            handleLoading()
                        }}>{!loading ? `Connect to Tello` : <FontAwesomeIcon icon={faSpinner} spin size="2x" />}</button>}
                    </div>

                    <div className="drone-status">
                        <div className="status"><p>{`TELLO: ${status}`}</p></div>
                        <div className="drone-height"><p>{height} cm</p></div>
                        <div className="power-off">
                            <FontAwesomeIcon icon={faPowerOff} onClick={handleStopDrone} size="1x" />
                        </div>

                        <div className="drone-battery">
                            <div className="battery">
                                <div style={batStyle}></div>
                            </div>
                            <div className="battery-2"></div>
                        </div>
                    </div>
                    {videoOn && <video className="video" id='player' autoPlay muted />}
                </div>
            </div>
        </div>
    </>

}