import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class CPUChart extends Component {
  state = {
    labels: [],
    data: [],
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
    let dataTemp = [];
    const dateEnd = new Date();
    const dateStart = new Date(dateEnd - 5 * 60000);

    const response = await fetch("http://192.168.10.151:9090/api/v1/query_range", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        query: '100 - (avg by (instance) (irate(node_cpu_seconds_total{job="nodeexporter",mode="idle"}[5m])) * 100)',
        start: dateStart.toISOString(),
        end: dateEnd.toISOString(),
        step: "1m",
      }),
    });
    let json = await response.json();
    if (response.status === 200 && json.status === "success") {
      for (let i = 0; i < json.data.result[0].values.length; i++) {
        labelsTemp.push(this.convertDate(json.data.result[0].values[i][0]));
        dataTemp.push(json.data.result[0].values[i][1]);
      }
      this.setState({ labels: labelsTemp, data: dataTemp });
    }
  };

  componentDidMount() {
    this.getDatas();
  }

  render() {
    return (
      <Line
        data={{
          labels: this.state.labels,
          datasets: [
            {
              label: "CPU",
              data: this.state.data,
              tension: 0.3,
              backgroundColor: "rgba(103, 158, 203, 0.7)",
              borderColor: "rgba(103, 158, 203, 0.7)",
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
        }}
      />
    );
  }
}
