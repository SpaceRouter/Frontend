import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class CPUChart extends Component {
  state = {
    labels: [],
    data: [],
  };

  convertDate(timestamp) {
    let date = new Date(timestamp * 1000);
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }

  getDatas = async () => {
    let labelsTemp = [];
    let dataTemp = [];
    const dateEnd = new Date();
    const dateStart = new Date(dateEnd - 5 * 60000);
    const response = await fetch(
      `http://192.168.10.151:9090/api/v1/query_range?query=100 - (avg by (instance) (irate(node_cpu_seconds_total{job="nodeexporter",mode="idle"}[5m])) * 100)&start=${dateStart.toISOString()}&end=${dateEnd.toISOString()}&step=1m`
    );
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
        width={this.props.width}
        height={this.props.height}
        data={{
          labels: this.state.labels,
          datasets: [{ label: "CPU", data: this.state.data, backgroundColor: 'rgba(103, 158, 203, 0.7)', borderColor: 'rgba(103, 158, 203, 0.7)'}],
        }}
        options={{
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
