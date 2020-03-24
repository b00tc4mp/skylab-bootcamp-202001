import React, { useState } from 'react'
import './Controls.sass'
import { Joystick } from './'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faKeyboard } from '@fortawesome/free-solid-svg-icons'


export default function ({ toggleKeyboard, toggleGamepad }) {

    const [active, setActive] = useState('g')
    const [key, setKey] = useState()

    function handleKeyDown(event) {
        console.log(event.key)
        if (event.key === 'w') setKey('w')
        if (event.key === 'a') setKey('a')
        if (event.key === 's') setKey('s')
        if (event.key === 'd') setKey('d')
        if (event.key === 'ArrowUp') setKey('ArrowUp')
        if (event.key === 'ArrowLeft') setKey('ArrowLeft')
        if (event.key === 'ArrowRight') setKey('ArrowRight')
        if (event.key === 'ArrowDown') setKey('ArrowDown')
    }

    function handleKeyUp(event) {
        if (event.key === 'w') setKey('')
        if (event.key === 'a') setKey('')
        if (event.key === 's') setKey('')
        if (event.key === 'd') setKey('')
        if (event.key === 'ArrowUp') setKey('')
        if (event.key === 'ArrowLeft') setKey('')
        if (event.key === 'ArrowRight') setKey('')
        if (event.key === 'ArrowDown') setKey('')
    }
    return <>

        <div className="controls-wrapper" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>

            <nav className="controls-menu">

                <li className={active === "g" ? "control-icon active" : "control-icon"}>
                    <a href="#" className="" onClick={event => {
                        event.preventDefault()
                        toggleGamepad()
                        setActive('g')
                    }}>
                        <FontAwesomeIcon className="" icon={faGamepad} size="2x" />
                    </a>
                </li>

                <li className={active === "k" ? "control-icon active" : "control-icon"}>
                    <a href="#" className="" onClick={event => {
                        event.preventDefault()
                        toggleKeyboard()
                        setActive("k")
                    }}>
                        <FontAwesomeIcon icon={faKeyboard} size="2x" />
                    </a>
                </li>

            </nav>


            {active === 'k' && <div><div className="letter-keys">
                <div className="w">
                    <li><a href="#" className={key === 'w' ? "key key-active" : "key"} ><span>w</span></a></li>
                </div>
                <div className="asd">
                    <li><a href="#" className={key === 'a' ? "key key-active" : "key"}><span>a</span></a></li>
                    <li><a href="#" className={key === 's' ? "key key-active" : "key"}><span>s</span></a></li>
                    <li><a href="#" className={key === 'd' ? "key key-active" : "key"}><span>d</span></a></li>
                </div>

            </div>

                <div className="arrow-keys">
                    <div className="w">
                        <li><a href="#" className={key === 'ArrowUp' ? "key key-active" : "key"}><span>t</span></a></li>
                    </div>
                    <div className="asd">
                        <li><a href="#" className={key === 'ArrowRight' ? "key key-active" : "key"}><span>r</span></a></li>
                        <li><a href="#" className={key === 'ArrowDown' ? "key key-active" : "key"}><span>d</span></a></li>
                        <li><a href="#" className={key === 'ArrowLeft' ? "key key-active" : "key"}><span>l</span></a></li>
                    </div>
                </div> </div>
            }

            {active === 'g' && <Joystick />}
        </div>

    </>
}