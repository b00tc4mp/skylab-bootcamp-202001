import React from 'react'

export default function ({ name, code,  play }) {
    
    function handleplay(event) {
        event.preventDefault()

        play(code)
    }
    return <>
        <h3 class="menubody__name">{name}</h3>
        <button class="menubody__go" onClick={handleplay}><i class="fas fa-play-circle"></i></button>
    </>
}