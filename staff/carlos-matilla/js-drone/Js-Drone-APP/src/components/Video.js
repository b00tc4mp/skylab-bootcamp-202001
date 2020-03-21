import React, { useEffect } from 'react'
import JMuxer from 'jmuxer';
import './Video.sass'





export default function () {

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
        
    
         
      }, []);
  
    return <>
        <section className="video-wrapper">
            <div className="aspect-ratio--16x9">
                <div className="aspect-ratio__inner-wrapper">
                    <video className="video" id='player' autoPlay muted />
                </div>
            </div>
        </section>
    </>

}