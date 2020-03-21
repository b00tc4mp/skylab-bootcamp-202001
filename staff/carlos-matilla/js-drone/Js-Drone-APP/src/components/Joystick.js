import React from 'react'


export default function ({ joy }) {
    
    // console.log(joy)
    return <>
        
        <section id="roller">
            <section id="stick" style={joy[0]}>
                <section class="inner"></section>
            </section>
        </section>  
        <section id="roller2">
            <section id="stick" style={joy[1]}>
                <section class="inner"></section>
            </section>
        </section>    
        
    </>
}