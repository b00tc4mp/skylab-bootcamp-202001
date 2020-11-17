import React, { useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import './Charts.sass';
import CountUp from 'react-countup';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faKeyboard } from '@fortawesome/free-solid-svg-icons'

export default function ({ mySession, homePadding }) {

    const {
        lowTempP,
        hightTempP,
        batteryP,
        heightP,
        speedP,
        atmosPressureP,
        date,
        time,
        control
    } = mySession

    let style
    if (homePadding) style = { width: `75%` }

    const consumedBat = batteryP[0] - batteryP[batteryP.length - 2]
    let speedAdd = 0
    speedP.forEach(element => {
        speedAdd += element
    })
    const speedAve = Math.floor(speedAdd / speedP.length)
    speedAdd = 0

    const temperatureData = {
        labels: lowTempP,
        datasets: [
            {
                label: 'Low Temp',
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(0,204,227, 0.8)',
                borderColor: 'rgba(0,204,227, 0.8)',
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
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(255,28,70, 0.6)',
                borderColor: 'rgba(255,28,70, 0.8)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(255,28,70, 1)',
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
                lineTension: 0.4,
                backgroundColor: 'rgba(70,85,230, 0.1)',
                borderColor: '#E27B46',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#E27B46',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(83,102,207, 0.9)',
                pointHoverBorderColor: 'rgba(83,102,207, 1)',
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
                backgroundColor: 'rgba(83,102,207, 0.1)',
                borderColor: '#334E5C',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#334E5C',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'gba(83,102,207, 0.9)',
                pointHoverBorderColor: 'rgba(83,102,207, 1)',
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
                fill: true,
                lineTension: 0.4,
                backgroundColor: 'rgba(130,130,130, 0.2)',
                borderColor: '#47B29E',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#fff',
                pointBackgroundColor: '#47B29E',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#47B29E',
                pointHoverBorderColor: 'rgb(229,255,0)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: atmosPressureP
            }
        ]
    }
    const opt = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                ticks: {
                    display: false
                }
            }]
        }
    }

    return <section className="charts" style={style}>

        <div className="chart-estadistics">
            <div>
                <p>Control</p>
                <br />
                {control === 'gp' && <FontAwesomeIcon className="lnav_svg" icon={faGamepad} size="2x" />}
                {control === 'kb' && <FontAwesomeIcon className="lnav_svg" icon={faKeyboard} size="2x" />}
            </div>
            <div>
                <p>Baterry consumed</p>
                <br />
                <p className="est-num"><CountUp delay={1} end={consumedBat} />%</p>
            </div>
            <div>
                <p>Time</p>
                <br />
                <p className="est-num"><CountUp delay={1} end={time} /></p>
            </div>
            <div>
                <CircularProgressbar value={speedAve} circleRatio={0.75}
                    styles={buildStyles({
                        rotation: 1 / 2 + 1 / 8,
                        strokeLinecap: "butt",
                        trailColor: "#e6e6e6",
                        pathColor: "rgb(51,186,210)",
                        textColor: "#373737",
                    })}
                    className="circle"
                    text={`${speedAve} m/s`} />
            </div>
        </div>

        <div className="charts-wrapper">
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
                <Line data={speedData} options={opt} />
            </div>
        </div>

    </section>
}