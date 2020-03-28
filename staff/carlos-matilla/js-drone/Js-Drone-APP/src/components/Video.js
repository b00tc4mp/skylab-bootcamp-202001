import React, { useEffect, useState } from 'react'
import JMuxer from 'jmuxer'
import './Video.sass'
import { socket } from '../socket'
import { startDrone } from './../logic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'





async function handleStartDrone() {

    let port = Math.floor(1000 + Math.random() * 9000)
    // console.log('http 1 ',httpPort)
    // console.log(socket.io.opts)



    try {
        // port++
        // resetHttpPort()

        // console.log('http 2 ', httpPort)
        // console.log(socket.io.opts)

        startDrone()
        // console.log(port)
        setTimeout(() => {
            var socketURL = `ws://localhost:2212`
            const ws = new WebSocket(socketURL)
            var jmuxer = new JMuxer({
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
        }, 2000);

        
        

    } catch (error) {
        console.log(error)
    }

}



export default function () {
    const [status, updateStatus] = useState(' - ');
    const [battery, setBattery] = useState()
    const [height, setHeight] = useState('-')

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
    }



    return <>
        <section className="video-wrapper">
            <div className="aspect-ratio--16x9">
                <div className="aspect-ratio__inner-wrapper">
                    <div className="drone-status">
                        <div className="status">{`TELLO : ${status}`}</div>
                        <div className="drone-height"><p>{`${height} cm`}</p></div>
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
                    <div className="start_button_wrapper" >
                        <button className="start-button" onClick={handleStartDrone}>Connect to TELLO</button>
                    </div>

                    <video className="video" id='player' autoPlay muted />
                </div>
            </div>
        </section>
    </>

}