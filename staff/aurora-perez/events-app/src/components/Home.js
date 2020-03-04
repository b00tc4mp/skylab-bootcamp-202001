import React from 'react'

export default ({onSubmit}) => {
    return (
        <form onSubmit = { (event) =>{
            event.preventDefault()

            onSubmit()
        }}>
            <button>Last Events</button>
            
        </form>
        
    )
}