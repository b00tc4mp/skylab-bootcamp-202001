import React, { useEffect } from 'react'
import './Login.sass'
import Feedback from './Feedback'
import parking from './icons/pk-parking.png'

export default function ({ onSubmit, error, onMount }) {

    useEffect(() => {
        onMount()
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        
        const { target: {
            username: { value: username },
            password: { value: password }
        } } = event

        onSubmit(username, password)
    }

    return <section className="login">
    <div className="login__head">
        <img src={parking} className="login__icon" alt=""/>
        <h1 className="login__title">StayCar Login:</h1>
    </div>
    <form className="login__form" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="username" className="login__input" />
        <input type="password" name="password" placeholder="password" className="login__input" />
        <button className="login__submit">Login</button>
    </form>
    {error && <Feedback message={error} level="warn" />}
</section>
}