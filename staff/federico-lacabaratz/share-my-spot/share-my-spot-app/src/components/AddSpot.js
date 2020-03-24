import React, { useState, useEffect, useContext } from 'react'
import { isLoggedIn, addSpot } from '../logic'
import { Context } from './ContextProvider'
import './AddSpot.sass'
import Feedback from './Feedback'
import './Feedback.sass'
import { withRouter } from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL

export default withRouter(function ({ history, onAddSpot, error }) {

    const [state, setState] = useContext(Context)
    const [name, setName] = useState()

    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    const currentUser = await retrieveUser()

                    const { name } = currentUser

                    setName(name)

                    history.push('/add-a-spot')
                } catch (error) {
                    setState({ ...state, error: error.message })
                    history.push('/search')
                }
            })()
        else history.push('/search')
    }, [])

    function handleOnAddSpot(event) {
        event.preventDefault()

        const { file: { files : [image]}, title: { value: title }, price: { value: price }, 
                description: { value: description } } = event.target

        onAddSpot(image, title, price, description)
}

    return  <> <div className="addSpot">
    <main>
        <form className="addSpot__container" onSubmit={handleOnAddSpot} >
            <h3 className="addSpot__h3">TITLE:</h3>
            <div className="addSpot__div" >
                <input className="addSpot__infoToComplete" type="text" placeholder="Title" />                
            </div>
            <h3 className="addSpot__h3">FULL ADDRESS:</h3>
            <div className="addSpot__div" >
                <input className="addSpot__infoToComplete" type="text" placeholder="City, Suburb" />
                <input className="addSpot__infoToComplete" type="text" placeholder="Street & Number" />
                <input className="addSpot__infoToComplete" type="text" placeholder="Other" />
            </div>
            <h3 className="addSpot__h3">PARKING FEATURES:</h3>
            <div className="addSpot__div" >
                <input className="addSpot__infoToComplete" type="text" placeholder="Length" />
                <input className="addSpot__infoToComplete" type="text" placeholder="Width" />
                <input className="addSpot__infoToComplete" type="text" placeholder="Height" />
                <input className="addSpot__infoToComplete" type="text" placeholder="Area" />
                <input className="addSpot__infoToComplete" type="text" placeholder="General Description" />
            </div>
            <h3 className="addSpot__h3">PRICE:</h3>
            <div className="addSpot__div" >
                <input className="addSpot__infoToComplete" type="text" placeholder="State your price" />
                <input className="addSpot__infoToComplete-upButton" type="file" name="imgUploads" /><br></br>
                <label for="imgUploads"> Your Photos Here!</label><br></br>
            </div>
            <h3 className="addSpot__h3">EXTRA FEATURES:</h3>
            <div className="addSpot__div2" >
                <input className="addSpot__checkBox" type="checkbox" name="surveillance" value="Surveillance" />
                <label for="surveillance"> Surveillance</label><br></br>
                <input className="addSpot__checkBox" type="checkbox" name="acceptsBarker" value="BarkerExchange" />
                <label for="acceptsBarker"> Accepts barker exchange</label><br></br>
                <input className="addSpot__checkBox" type="checkbox" name="isCovered" value="CoveredParking" />
                <label for="isCovered"> Covered Parking</label><br></br>
            </div>
            <h3 className="addSpot__h3">TIME SCHEDULE:</h3>            
            <div className="addSpot__div" >
                <p>Hour Starts: <input type="time" name="hourStarts" /></p>  
                <p>Hour Ends: <input type="time" name="hourEnds" /></p> 
            </div> 
            <h3 className="addSpot__h3">AVAILABILITY:</h3>
            <div className="addSpot__div2" >
                <input className="addSpot__checkBox" type="checkbox" name="mon" value="mon" />
                <label for="mon"> Monday</label><br></br>
                <input className="addSpot__checkBox" type="checkbox" name="tue" value="tue" />
                <label for="tue"> Tuesday</label><br></br>
                <input className="addSpot__checkBox" type="checkbox" name="wed" value="wed" />
                <label for="wed"> Wednesday</label><br></br>
                <input className="addSpot__checkBox" type="checkbox" name="thu" value="thu" />
                <label for="thu"> Thursday</label><br></br>
                <input className="addSpot__checkBox" type="checkbox" name="fri" value="fri" />
                <label for="fri"> Friday</label><br></br>
                <input className="addSpot__checkBox" type="checkbox" name="sat" value="sat" />
                <label for="sat"> Saturday</label><br></br>
                <input className="addSpot__checkBox" type="checkbox" name="sun" value="sun" />
                <label for="sun"> Sunday</label><br></br>
            </div>
            <button className="addSpot__submit" href="#">Add your Spot</button>
        </form>
    </main>
</div>
</>
    <section className='newAd'>
        <h2 className="newAd__title">New AD</h2>
        <form className="newAd__form" onSubmit={}>
            <label>Title</label>
            <input type="text" className="newAd__titlead" name="title" placeholder="New Title"/>
            <label>Price</label>
            <input type="number" className="newAd__price" name="price" placeholder="New Price"/>
            <label>Description</label>
            <textarea name="description" className="newAd__field" cols="28" rows="15"
                placeholder="New Description"></textarea>
            <h2 className="newAd__title2">Add Image</h2>
            <input className="modifyAd__upImage" type="file" name="file" accept="image/*"/>
            <button className="newAd__button">Submit</button>
        </form>
    </section>
}