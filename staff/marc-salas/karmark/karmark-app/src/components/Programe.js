import React, { useEffect } from 'react'
import './programe.sass'
import Feedback from './Feedback'
import SaveWindows from './SaveWindows'

export default function ({ onUp, onDown, onRight, onLeft, onDelete, onPlay, onMount, onGoToHome, error, onSave, onCancel, save, saveProgram }) {
    
    useEffect(() => {
        onMount()
    }, [])

    function handleOnUp(event) {
        event.preventDefault()

        onUp()
    }

    function handleOnDown(event) {
        event.preventDefault()

        onDown()
    }

    function handleOnRight(event) {
        event.preventDefault()

        onRight()
    }

    function handleOnLeft(event) {
        event.preventDefault()

        onLeft()
    }

    function handleOnPlay(event) {
        event.preventDefault()

        onPlay()
    }

    function handleOnDelete(event) {
        event.preventDefault()

        onDelete()
    }

    function handleGoToHome(event) {
        event.preventDefault()

        onGoToHome()
    }

    function handleOnSave(event) {
        event.preventDefault()
        
        onSave()
    }

    function handleAccept(name){

        saveProgram(name)
    }

    function handleOnCancel(){

        onCancel()
    }
    return <>
        <div className="programe">
            <div className="programeheader">
                <button className="programeheader__home" onClick={handleGoToHome}><i className="fas fa-home"></i></button>
                <button className="programeheader__menu"><i className="fas fa-bars"></i></button>
            </div>
            <div className="programebody">
                <button className="programebody__arrowup" onClick={handleOnUp}><i className="fas fa-arrow-alt-circle-up"></i></button>
                <button className="programebody__arrowleft" onClick={handleOnLeft}><i className="fas fa-arrow-alt-circle-left"></i></button>
                <button className="programebody__go" onClick={handleOnPlay}><i className="fas fa-play-circle"></i></button>
                <button className="programebody__arrowright" onClick={handleOnRight}><i className="fas fa-arrow-alt-circle-right"></i></button>
                <button className="programebody__arrowdown" onClick={handleOnDown}><i className="fas fa-arrow-alt-circle-down"></i></button>
            </div>
            {save && <SaveWindows accept={handleAccept} cancel={handleOnCancel} />}
            {error && <Feedback message={error} level="warn" />}
            <div className="programefooter">
                <button className="programefooter__save" onClick={handleOnSave}><i className="fas fa-save"></i></button>
                <button className="programefooter__stop" onClick={handleOnDelete}><i className="fas fa-stop"></i></button>
            </div>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
    integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous"/>
        </div>
    </>
}