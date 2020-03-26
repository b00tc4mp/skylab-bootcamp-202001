import React from 'react'
import { Line } from 'react-chartjs-2'
import './Charts.sass';
import CountUp from 'react-countup';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faKeyboard } from '@fortawesome/free-solid-svg-icons'

export default function ({ mySession }) {

    console.log(mySession)

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

    function dateParser(date) {
        const fullDate = date.split("T")[0]
        const day = fullDate.split("-")[2]
        const month = fullDate.split("-")[1]
        const year2 = fullDate.split("-")[0]
        const hour = (date.split("T")[1]).split(".")[0]
        return `${hour}  ${day}-${month}-${year2}`
    }

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



    return <section className="charts">

        <div className="chart-title">
            <h1>{dateParser(date)}</h1>
        </div>

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
                <p>Speed Average</p>
                <br />
                <CircularProgressbar value={speedAve} circleRatio={0.75}
                    styles={buildStyles({
                        rotation: 1 / 2 + 1 / 8,
                        strokeLinecap: "butt",
                        trailColor: "#eee"
                    })} text={`${speedAve} m/s`} />
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