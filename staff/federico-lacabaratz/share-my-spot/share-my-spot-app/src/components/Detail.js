import React, { useState } from 'react'
import './Detail.sass'
const API_URL = process.env.REACT_APP_API_URL

export default function ({ spotDetail: { _id, publisherId, title, price, description, hourStarts, hourEnds, length, width, height, area, surveillance, acceptsBarker, isCovered, addressLocation, addressStNumber, addressOther, mon, tue, wed, thu, fri, sat, sun } }) {
    const [phoneB, setPhoneB] = useState(false)
    const [emailB, setEmailB] = useState(false)
    
    return <div className="detail" >
        <form className="detail__container">
            <main>
                <img className="detail__photo" src={`${API_URL}/load/${_id}`} />
                <h4 className="detail__h4">{title}</h4>
                <h2 className="detail__h2">{price}€/per hour</h2><span>(*) See conditions</span>
                <h3 className="detail__h3">DESCRIPTION:</h3>
                <p className="detail__p">{description}</p>
                <h3 className="detail__h3">TIME SCHEDULE:</h3>
                <ul className="detail__ul">
                    <li>Hour Starts: {hourStarts}hr.</li>
                    <li>Hour Ends: {hourEnds}hr.</li>
                </ul>
                <h3 className="detail__h3">PARKING FEATURES:</h3>
                <ul className="detail__ul">
                    <li>Length: {length}mt</li>
                    <li>Width: {width}mt</li>
                    <li>Height: {height}mt</li>
                    <li>Area: {area}mt2</li>
                </ul>
                <h3 className="detail__h3">EXTRA FEATURES:</h3>
                <ul className="detail__ul">
                    <li>Surveillance: {surveillance}</li>
                    <li>Accepts Barker Exchange: {acceptsBarker}</li>
                    <li>Covered Parking: {isCovered}</li>
                </ul>
                <h3 className="detail__h3">FULL ADDRESS:</h3>
                <p className="detail__p">{addressStNumber}<br></br>{addressOther}<br></br>{addressLocation}</p>
                <h3 className="detail__h3">PUBLISHER:</h3>
                <p className="detail__p">{publisherId.name}<br></br>{publisherId.phone}<br></br>{publisherId.email}</p>
                <h3 className="detail__h3">AVAILABILITY:</h3>
                <ul className="detail__ul">
                    <li>Monday: {mon === true ? 'Yes' : 'No'}</li>
                    <li>Tuesday: {tue === true ? 'Yes' : 'No'}</li>
                    <li>Wednesday: {wed === true ? 'Yes' : 'No'}</li>
                    <li>Thursday: {thu === true ? 'Yes' : 'No'}</li>
                    <li>Friday: {fri === true ? 'Yes' : 'No'}</li>
                    <li>Saturday: {sat === true ? 'Yes' : 'No'}</li>
                    <li>Sunday: {sun === true ? 'Yes' : 'No'}</li>
                </ul>
                <button className="detail__mAbook" href="">Place your reservation!</button>
            </main>
        </form>
    </div>
}