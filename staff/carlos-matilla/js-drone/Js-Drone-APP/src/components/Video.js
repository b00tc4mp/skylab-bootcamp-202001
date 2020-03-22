import React, { useEffect, useState } from 'react'
import JMuxer from 'jmuxer';
import './Video.sass'
import socket from '../socket';







export default function () {
    const [status, updateStatus] = useState('DISCONNECTED');
    const [battery, setBattery] = useState()
    const [height, setHeight] = useState('-')

    socket.on('dronestate', data => {
        if (data !== undefined) {
            setBattery(data.bat)
            setHeight(data.tof)
        }
    })


    let batStyle = { width: `${battery}%` }

    useEffect(() => {




        var socketURL = 'ws://localhost:8080';
        var jmuxer = new JMuxer({
            node: 'player',
            mode: 'video',
            flushingTime: 1,
            fps: 30
        })

        var ws = new WebSocket(socketURL);
        ws.binaryType = 'arraybuffer'
        ws.addEventListener('message', function (event) {
            jmuxer.feed({
                video: new Uint8Array(event.data)
            })
        })

        ws.addEventListener('error', function (e) {
            console.log('Socket Error');
        })

        socket.on('status', data => updateStatus(data))



    }, []);

    return <>
        <section className="video-wrapper">
            <div className="aspect-ratio--16x9">
                <div className="aspect-ratio__inner-wrapper">
                    <div className="drone-status">
                        <div className="status">{status}</div>
                        <div className="drone-height"><p>{`${height} cm`}</p></div>
                        <div className="drone-battery">
                            <div className="battery">
                                <div style={batStyle}></div>
                            </div>
                            <div className="battery-2"></div>
                        </div>
                    </div>
                    <video className="video" id='player' autoPlay muted />
                </div>
            </div>
        </section>
    </>

}