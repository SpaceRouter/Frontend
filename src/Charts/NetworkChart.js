import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import { domainName } from "../Constants";

export default class NetworkChart extends Component {
  state = {
    labels: [],
    dataIN: [],
    dataOUT: [],
  };

  convertDate(timestamp) {
    let date = new Date(timestamp * 1000);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return hours + ":" + minutes + ":" + seconds;
  }

  getDatas = async () => {
    let labelsTemp = [];
    let dataTempIN = [];
    let dataTempOUT = [];
    const dateEnd = new Date();
    const dateStart = new Date(dateEnd - 5 * 60000);

    const responseIN = await fetch(`${domainName}/api/v1/query_range`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        query: 'rate(node_network_receive_bytes_total{device="eth0"}[1m]) * 8',
        start: dateStart.toISOString(),
        end: dateEnd.toISOString(),
        step: "1m",
      }),
    });
    const responseOUT = await fetch(`${domainName}/api/v1/query_range`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        query: 'rate(node_network_transmit_bytes_total{device="eth0"}[1m]) * 8',
        start: dateStart.toISOString(),
        end: dateEnd.toISOString(),
        step: "1m",
      }),
    });
    let jsonIN = await responseIN.json();
    let jsonOUT = await responseOUT.json();

    if (responseIN.status === 200 && jsonIN.status === "success" && responseOUT.status === 200 && jsonOUT.status === "success") {
      for (let i = 0; i < jsonIN.data.result[0].values.length; i++) {
        labelsTemp.push(this.convertDate(jsonIN.data.result[0].values[i][0]));
        dataTempIN.push(jsonIN.data.result[0].values[i][1] / 1000000);
        dataTempOUT.push(jsonOUT.data.result[0].values[i][1] / 1000000);
      }
      this.setState({ labels: labelsTemp, dataIN: dataTempIN, dataOUT: dataTempOUT });
    }
  };

  componentDidMount() {
    this.getDatas();
  }

  render() {
    return (
      <Line
        style={{ margin: 15, marginTop: 5 }}
        data={{
          labels: this.state.labels,
          datasets: [
            {
              label: "IN",
              data: this.state.dataIN,
              tension: 0.3,
              backgroundColor: "rgba(103, 158, 203, 0.7)",
              borderColor: "rgba(103, 158, 203, 0.7)",
            },
            {
              label: "OUT",
              data: this.state.dataOUT,
              tension: 0.3,
              backgroundColor: "rgba(255, 159, 64, 0.7)",
              borderColor: "rgba(255, 159, 64, 0.7)",
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          animation: {
            duration: 0,
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              font: { size: 25, weight: "lighter" },
              text: "Network",
            },
            legend: {
              position: "left",
            },
          },
        }}
      />
    );
  }
}
