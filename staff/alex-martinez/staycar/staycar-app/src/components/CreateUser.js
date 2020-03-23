import React from 'react'
import './style/CreateUser.sass'

import {Feedback} from '.'

export default ({onSubmit, error}) => {


    const handleSubmit = (event) => {

        event.preventDefault()
        const { target: {
            name: { value: name },
            surname: { value: surname },
            username: { value: username},
            password: {value: password}
        } } = event

        onSubmit(name, surname, username, password)
    }
   
    return <section className="create-user">
    <div className="create-user__head">
        <h1 className="create-user__title">Create User:</h1>
    </div>
    <form className="create-user__form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="name" className="create-user__input" />
        <input type="text" name="surname" placeholder="surname" className="create-user__input" />
        <input type="text" name="username" placeholder="username" className="create-user__input" />
        <input type="password" name="password" placeholder="password" className="create-user__input" />
        <button className="create-user__submit">Create</button>
    </form>
    
    {error && <Feedback message={error} level="error" />}
    </section>
}

