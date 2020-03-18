import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import './Charts.sass';

export default function ({mySession}) {
    console.log(mySession)
   const {
    lowTempP,
    hightTempP,
    batteryP,
    heightP,
    speedP,
    atmosPressureP,
    date,
    _id,
    time
    } = mySession
    
    console.log(batteryP)

    const consumedBat = batteryP[0] - batteryP[batteryP.length - 3]




const temperatureData = {
    labels: lowTempP,
    datasets: [
        {
            label: 'Low Temp',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: lowTempP
        },
        {
            label: 'High Temp',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(255,0,0,0.4)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: hightTempP
        }
    ]
}



const heightData = {
    labels: heightP,
    datasets: [
        {
            label: 'Height',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: heightP
        }
    ]
}


const speedData = {
    labels: speedP,
    datasets: [
        {
            label: 'Speed',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: speedP
        }
    ]
}


const atmosData = {
    labels: atmosPressureP,
    datasets: [
        {
            label: 'Atmospheric Pressure',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: atmosPressureP
        }
    ]
}
const opt = {
    scales: {
        xAxes: [{
            ticks: {
                display: false
            }
        }]
    }
}

    

    return <section className="charts">
        <div className="chart-title">
            <h1>{date}</h1>
        </div>
        <div className="chart-estadistics">
            <div>
                <p>Baterry consumed</p>
                <br/>
                <p>{consumedBat}%</p>
            </div>
            <div>
                <p>Time</p>
                <br/>
                <p>{time}s</p>
            </div>
            <div>
            <p>Speed Average</p>
            <br/>
            <p>100 m/s</p>
            </div>

        </div>
        
        <div className="chart-wrapper">
            <Line data={heightData} options={opt} />
        </div>
        <div className="chart-wrapper">
            <Line data={temperatureData} options={opt} />
        </div>
        <div className="chart-wrapper">
            <Line data={atmosData} options={opt} />
        </div>
        <div className="chart-wrapper">
            <Line data={speedData} options={opt}/>
        </div>
    </section>
}