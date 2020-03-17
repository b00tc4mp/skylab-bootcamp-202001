import React, { useEffect } from 'react'
import './control.sass'

export default function ({ onUp, onDown, onRight, onLeft, onStop, onMount, onGoToHome }) {
    useEffect(() =>{
        onMount()
    }, [])

    function handleOnUp(event){
        event.preventDefault()

        onUp()
    }

    function handleOnDown(event){
        event.preventDefault()

        onDown()
    }

    function handleOnRight(event){
        event.preventDefault()

        onRight()
    }

    function handleOnLeft(event){
        event.preventDefault()

        onLeft()
    }

    function handleOnStop(event){
        event.preventDefault()

        onStop()
    }

    function handleGoToHome(event){
        event.preventDefault()
        
        onGoToHome()
    }
    return <>
        <div className="control">
            <div className="controlheader">
                <button className="controlheader__home" onClick={handleGoToHome}><i className="fas fa-home"></i></button>
                <button className="controlheader__menu"><i className="fas fa-bars"></i></button>
            </div>
            <div className="controlbody">
                <button className="controlbody__arrowup" onTouchStart={handleOnUp} onTouchEnd={handleOnStop}><i className="fas fa-arrow-alt-circle-up"/></button>
                <button className="controlbody__arrowleft" onTouchStart={handleOnLeft} onTouchEnd={handleOnStop}><i className="fas fa-arrow-alt-circle-left"/></button>
                <button className="controlbody__arrowright" onTouchStart={handleOnRight} onTouchEnd={handleOnStop}><i className="fas fa-arrow-alt-circle-right"/></button>
                <button className="controlbody__arrowdown" onTouchStart={handleOnDown} onTouchEnd={handleOnStop}><i className="fas fa-arrow-alt-circle-down"/></button>
            </div>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
    integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous"/>
        </div>
    </>
}