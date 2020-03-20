import React from 'react'

export default function ({ name, code,  play }) {
    
    function handleplay(event) {
        event.preventDefault()

        play(code)
    }
    return <div className="menubody__program">
        <h3 class="menubody__name">{name}</h3>
        <button class="menubody__go" onClick={handleplay}><i class="fas fa-play-circle"></i></button>
        <button class="menubody__delete" ><i class="fas fa-times-circle"></i></button>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
    integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous"/>
    </div>
}