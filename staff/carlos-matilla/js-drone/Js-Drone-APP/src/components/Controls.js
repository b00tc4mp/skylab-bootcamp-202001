import React, { useState } from 'react'
import './Controls.sass'
import { Joystick } from './'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faKeyboard, faChevronUp, faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'


export default function ({ toggleKeyboard, toggleGamepad, homePadding }) {

    const [active, setActive] = useState('g')
    const [key, setKey] = useState()

    function handleKeyDown(event) {
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

    let paddingLeft, paddingRight
    if (homePadding) {
        paddingLeft = { left: `150px`, top: `50px` }
        paddingRight = { right: `150px`, top: `50px` }

    } else {
        paddingLeft = { left: `50px` }
        paddingRight = { right: `50px` }
    }

    return <>

        <div className="controls-wrapper" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
            <nav className="controls-menu">

                <li className={active === "g" ? "control-icon active-down" : "control-icon"}>
                    <a href="#" className="" onClick={event => {
                        event.preventDefault()
                        toggleGamepad()
                        setActive('g')
                    }}>
                        <FontAwesomeIcon icon={faGamepad} size="2x" />
                    </a>
                </li>

                <li className={active === "k" ? "control-icon active-down" : "control-icon"}>
                    <a href="#" className="" onClick={event => {
                        event.preventDefault()
                        toggleKeyboard()
                        setActive("k")
                    }}>
                        <FontAwesomeIcon icon={faKeyboard} size="2x" />
                    </a>
                </li>

            </nav>

            {active === 'k' && <div><div className="letter-keys" style={paddingLeft}>
                <div className="w">
                    <li><a href="#" className={key === 'w' ? "key key-active" : "key"} ><span>w</span></a></li>
                </div>
                <div className="asd">
                    <li><a href="#" className={key === 'a' ? "key key-active" : "key"}><span>a</span></a></li>
                    <li><a href="#" className={key === 's' ? "key key-active" : "key"}><span>s</span></a></li>
                    <li><a href="#" className={key === 'd' ? "key key-active" : "key"}><span>d</span></a></li>
                </div>

            </div>

                <div className="arrow-keys" style={paddingRight}>
                    <div className="w">
                        <li><a href="#" className={key === 'ArrowUp' ? "key key-active" : "key"}><span><FontAwesomeIcon icon={faChevronUp} size="1x" /></span></a></li>
                    </div>
                    <div className="asd">
                        <li><a href="#" className={key === 'ArrowRight' ? "key key-active" : "key"}><span><FontAwesomeIcon icon={faChevronRight} size="1x" /></span></a></li>
                        <li><a href="#" className={key === 'ArrowDown' ? "key key-active" : "key"}><span><FontAwesomeIcon icon={faChevronDown} size="1x" /></span></a></li>
                        <li><a href="#" className={key === 'ArrowLeft' ? "key key-active" : "key"}><span><FontAwesomeIcon icon={faChevronLeft} size="1x" /></span></a></li>
                    </div>
                </div> </div>
            }

            {active === 'g' && <Joystick homePadding={homePadding} />}
        </div>
    </>
}