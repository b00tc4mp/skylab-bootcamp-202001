import React from 'react'
import './Login.sass'

export default () => {

    return <section className="login">
    <h1 className="login__title">Login:</h1>
    <form action="" method="" className="login__form">
        <input type="text" placeholder="username" className="login__input" />
        <input type="password" placeholder="password" className="login__input" />
        <button className="login__submit">Login</button>
    </form>
</section>
}