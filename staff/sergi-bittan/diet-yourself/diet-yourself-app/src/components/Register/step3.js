import React from 'react'
//import './Step3.sass'

const Step3 = ({ onSaveData, data }) => {
    console.log(data)
    const { genre, age, city } = data

    return (
        <div className="step3">
            <div className="genre">
                <button type="button" className={`genre__m ${genre === 'women' ? 'genre_selected' : ''}`} onClick={() => onSaveData(2, { genre: 'female' })}>WOMEN</button>
                <button type="button" className={`genre__m ${genre === 'men' ? 'genre_selected' : ''}`} onClick={() => onSaveData(2, { genre: 'male' })}>MEN</button>
            </div>
            <h4>Age</h4>
            <input type="text" className="age-antrop__age" name="age" placeholder="age" autoFocus="autofocus" onBlur={event => onSaveData(2, { age: event.target.value})}/>
            <h4>City</h4>
            <input type="text" className="age-antrop__city" name="city" placeholder="city" onBlur={event => onSaveData(2, { city: event.target.value})}/>
        </div>
    )
}

export default Step3