import React, { Component } from "react";
import {Line} from 'react-chartjs-2';
import cryptoHistory from "../../logic/crypto-history";
import moment from 'moment'
import './chart.sass'

// Chart.defaults.line.spanGaps = true;

class CryptoChart extends Component {
  state = { crypto: null, error: null, data: null };
  // const {  }
  // console.log(props.match.params.crypto , 888888)

  componentDidMount() {
    const {cryptoQuery} = this.props

    cryptoHistory(cryptoQuery).then(
      function(crypto) {
        if (crypto) {
          const labels = []
          const prices = []

            crypto.forEach((_cryptoInfo, i) => {
            // var x = new Date(_cryptoInfo.time);
            // var measuredTime = new Date(null); 
            // measuredTime.setSeconds(_cryptoInfo.time); 
            // var tempTime = moment.duration(_cryptoInfo.time); 
            // var y = tempTime.hours() + tempTime.minutes();
          
            // if(i % 15) {
              // const a = moment.duration(_cryptoInfo.time).format("h:mm")
              const time = moment.unix(_cryptoInfo.time/1000).format("DD MMM")

              labels.push(time)
              prices.push(Number(_cryptoInfo.priceUsd))
            // }
          });  
          

          const data = {
            labels, 
            datasets: [
              {
                label: cryptoQuery,
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
                data: prices,
                // options: { scales: { xAxes: [{ type: 'time', time: { unit: 'millisecond' } }] } }
              }
            ]
          };
          this.setState({data})

          console.log(data);
        } else {
          this.setState({ error: "crypto not found" });

          setTimeout(() => {
            this.props.history.push("/home");
          }, 3000);
        }
      }.bind(this)
    );
  }

  render() {
    const {
      state: {data, error }
    } = this;
    
    return (
      <div className="chart">
        {/* <canvas id="myChart" width="400" height="400"></canvas> */}
        {/* <p>hola soy graphica de bitcoin</p> */}
        {/* <canvas className="myChart"></canvas> */}
        {data && <Line data={data} />}
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default CryptoChart;
