import React, { useState, useEffect } from 'react'
import './style/Form.sass'
import './style/Book.sass'
import Feedback from './Feedback'
import { retrieveUserFriends } from '../logic'

export default function ({onSubmit, searchDay, error, message}) {
    const [players, setPlayers] = useState("2")
    const [friends, setFriends] = useState([])

    useEffect(() => {
        (async () => {
            const [friends , , ]  = await retrieveUserFriends()
            setFriends(friends)
        })()
    }, [])

    function handleChange(event){
        event.preventDefault()

        setPlayers(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        let date

        const { target: {
            hour: { value: hour },
            court: { value: court },
            user2: { value: user2 },
            user3: { value: user3 },
            user4: { value: user4 }
        } } = event

        date =  `${searchDay} ${hour}`
        onSubmit(user2, user3, user4, court, date)
    }

    const courts = [1,2,3,4,5,6,7,8,9,10]

    return <>
            <form className="form" id="book" onSubmit={handleSubmit}>               
                    <select className="form_select" name="hour" id="hour" form="book">
                        <option disabled selected>Hour</option>
                        <option value="08:00">8-9h</option>
                        <option value="09:00">9-10h</option>
                        <option value="10:00">10-11h</option>
                        <option value="11:00">11-12h</option>
                        <option value="12:00">12-13h</option>
                        <option value="13:00">13-14h</option>
                        <option value="14:00">14-15h</option>
                        <option value="15:00">15-16h</option>
                        <option value="16:00">16-17h</option>
                        <option value="17:00">17-18h</option>
                        <option value="18:00">18-19h</option>
                        <option value="19:00">19-20h</option>
                        <option value="20:00">20-21h</option>
                        <option value="21:00">21-22h</option>
                    </select>

                    <select className="form_select" name="court" id="court" form="book">
                    <option disabled selected>Court</option>
                    {courts.map(court => <option value={court}>{court}</option>)}
                    </select>

                    <select  className="form_select" name="players" id="players" form="book" onChange={handleChange}>
                        <option disabled selected>Number of players</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                    </select>
                    
                    <select className="form_select" name="user2" id="user2" form="book">
                    <option disabled selected>Member 2</option>
                    {friends.map(friend => <option value={friend.memberNumber}>{friend.memberNumber} ({friend.name} {friend.surname})</option>)}
                    </select>

                    <select className={players === "2"? 'hidden':'form_select'} name="user3" id="user3" form="book">
                    <option disabled selected>Member 3</option>
                    {friends.map(friend => <option value={friend.memberNumber}>{friend.memberNumber} ({friend.name} {friend.surname})</option>)}
                    </select>
                    
                    <select className={players === "2"? 'hidden':'form_select'} name="user4" id="user4" form="book">
                    <option disabled selected>Member 4</option>
                    {friends.map(friend => <option value={friend.memberNumber}>{friend.memberNumber} ({friend.name} {friend.surname})</option>)}
                    </select>
                    <button className="form_button" type="submit" name="submit" value="submit">BOOK</button>
                    {message && <Feedback message={message} level="info" />}
                    {error && <Feedback message={error} level="warn" />}
            </form>
        </>     

}