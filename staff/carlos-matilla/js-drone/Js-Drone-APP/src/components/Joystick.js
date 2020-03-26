import React, { useRef, useEffect, useState } from 'react'
import { channelA, channelB, channelC, channelD } from "../logic/gamepad"


export default function () {

    const [joy, setJoy] = useState([])

    function useInterval(callback, delay) {
        const savedCallback = useRef()

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback])

        useEffect(() => {
            function tick() {
                savedCallback.current()
            }
            if (delay !== null) {
                let id = setInterval(tick, delay)
                return () => clearInterval(id)
            }
        }, [delay])
    }


    useInterval(() => {
        const a = (channelA * 0.25) + 20
        const b = ((channelB * -0.25) + 20)
        const c = ((channelC * 0.25) + 20)
        const d = ((channelD * 0.25) + 20)
        setJoy([{ left: a, top: b }, { left: d, top: c }])
    }, 100)

    return <>

        <section className="roller">
            <section className="stick" style={joy[0]}>
                <section className="inner"></section>
            </section>
        </section>
        <section className="roller2">
            <section className="stick" style={joy[1]}>
                <section className="inner"></section>
            </section>
        </section>

    </>
}