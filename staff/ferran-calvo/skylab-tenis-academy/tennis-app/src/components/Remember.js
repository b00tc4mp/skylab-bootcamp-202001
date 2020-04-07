import React, { useEffect } from 'react'
import './style/Form.sass'
import Feedback from './Feedback'

export default function ({ onSubmit, error, onMount }) {
    useEffect(() => {
        onMount()
    }, [])

    function handleSubmit(event) {
        event.preventDefault()

        const { target: {
            email: { value: email },
        } } = event

        onSubmit(email)
    }

    return <>
        <form className="form" onSubmit={handleSubmit}>
            <h3 type="text" className="form_title">REMEMBER PASSWORD</h3>
            <input type="text" className="form_input" id="email" name="email" placeholder="Email Address"/>
            <button type="submit" className="form_button">SEND</button>
            {error && <Feedback message={error} level="warn" />}
        </form>
    </>
}