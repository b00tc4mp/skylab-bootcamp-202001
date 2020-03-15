import React, { useState, useEffect, useContext } from 'react'

import './Home.sass';
import { gamepadConnect, gamepadDisconnect } from "../logic/gamepad";
import {keyDown, keyUp} from '../logic/keyboard'
import JMuxer from 'jmuxer';
import {logout, isLoggedIn, retrieveUser} from './../logic'
import {Telemetry, Charts, NavbarLeft, NavbarRight} from './';

import { Context } from './ContextProvider'
import { withRouter } from 'react-router-dom'




export default withRouter(function ({ history }) {

    const [, setState] = useContext(Context)
    const [name, setName] = useState()
    

    useEffect(() => {
      if (isLoggedIn())
            (async () => {
                try {
                    const { name, sessions } = await retrieveUser()

                    setName(name)
                    console.log(sessions)
                    setState({ page: 'home' })
                } catch ({ message }) {
                    setState({ error: message, page: 'login' })
                }
            })()
        else setState({ page: 'login' })

        window.addEventListener("gamepadconnected", gamepadConnect);
        window.addEventListener("gamepaddisconnected", gamepadDisconnect);
    
        window.onload = function() {
          var socketURL = 'ws://localhost:8080';
          var jmuxer = new JMuxer({
              node: 'player',
              mode: 'video',
              flushingTime: 1,
              fps: 30
            });
      
            var ws = new WebSocket(socketURL);
            ws.binaryType = 'arraybuffer';
            ws.addEventListener('message',function(event) {
                jmuxer.feed({
                  video: new Uint8Array(event.data)
                });
            });
      
            ws.addEventListener('error', function(e) {
              console.log('Socket Error');
            });
        }
        
        
      }, []);
    

      function onFly(){

      }
      
     
      function handleLogout() {
        console.log('apagao')
        logout()

        setState({ page: 'login' })

        history.push('/login')
    }
   async function toggleKeyboard(){
        
        await gamepadDisconnect()
        
       handleKeyboard()
   }

   function toggleGamepad(){
        document.removeEventListener('keydown', keyDown);
        document.removeEventListener('keyup', keyUp);
        gamepadConnect()
       

   }

   
            
            
            
            
   

    function handleKeyboard(){
        
            document.addEventListener('keydown', keyDown);
            document.addEventListener('keyup', keyUp);
        
    }
      return <> 
      <NavbarLeft toggleKeyboard={toggleKeyboard} toggleGamepad={toggleGamepad}/>
      <div className="home">
        
        <header className="Home-header">
            
        <Telemetry />
            
            
        </header>
        
        {/* <section className="video-container">
            
            

        </section> */}
        <div className="aspect-ratio--16x9">
            <div className="aspect-ratio__inner-wrapper">
                <video className="video" id='player' playsInline autoPlay muted/>
            </div>
        </div>
        
        <Charts />
            
       
        </div>
        <NavbarRight  handleLogout={handleLogout}/>
        
        </>
})