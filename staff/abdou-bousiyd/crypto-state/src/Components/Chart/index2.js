import React, { Component } from "react";
import cryptoHistory from "../../logic/crypto-history";
import {Line} from 'react-chartjs-2';



class Chart extends Component {

    state = {data: null}

    componentDidMount() {
        cryptoHistory().then(
          function(cryptoStatus) {
            if (cryptoStatus) {
                console.log(cryptoStatus, 585588)

                const labels = Object.keys(cryptoStatus)
                const prices = Object.values(cryptoStatus)

                const data = {
                    labels,
                    datasets: [
                      {
                        label: 'My First dataset',
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
                        data: prices
                      }
                    ]
                  };
                  this.setState({data})
            //   const data = crypto.map(_cryptoInfo => {
            //     var x = new Date(_cryptoInfo.time);
                
            //     return { x: x.toString(),  y: Number(_cryptoInfo.priceUsd) };
            //   });
    
            //   var ctx = document.getElementById("myChart");
              
    
            //   var aaa = new Chart(ctx, {
            //     type: "bar",
            //     borderWidth: 5,
            //     backgroundColor: "rgba(255, 99, 132, 0.2)",
            //     data: data,
                
            //     // fillColor : "rgba(151,187,205,0.5)", strokeColor : "rgba(151,187,205,1)", pointColor : "rgba(151,187,205,1)", pointStrokeColor : "#fff",
            //     options: {
            //       scales: {
            //         yAxes: [{ticks: { steps: 1000, stepValue: 5, min: 1 }}],
            //         xAxes: [{ type: "time", data: { unit: "hour" } }]
            //       }
            //     }
            //   });
    
            //   console.log(data);
            } else {
            //   this.setState({ error: "crypto not found" });
    
            //   setTimeout(() => {
            //     this.props.history.push("/home");
            //   }, 3000);
            }
          }.bind(this)
        );
      }

  render() {

    const {state: {data}} = this

    return (
      <div>
        <h2>Line Example</h2>
        {data && <Line data={data} />}
      </div>
    );
  }
};

export default Chart;