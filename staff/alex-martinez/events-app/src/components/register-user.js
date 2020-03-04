import React from 'react';

function RegisterUser () {


    return(
        <section className="register">
            <form action="/users" method="post">
            <input type="text" placeholder="name" name="name" />
            <input type="text" placeholder="surname" name="surname" />
            <input type="text" placeholder="email" name="email" />
            <input type="text" placeholder="password" name="password" />
            <button type="submit">Register</button>
            </form>
        </section>
    )
}

export default RegisterUser