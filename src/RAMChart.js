import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

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

    const response = await fetch("http://192.168.10.151:9090/api/v1/query", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        query:
          '100 * (1 - ((avg_over_time(node_memory_MemFree_bytes{job="nodeexporter"}[5m]) + avg_over_time(node_memory_Cached_bytes{job="nodeexporter"}[5m]) + avg_over_time(node_memory_Buffers_bytes{job="nodeexporter"}[5m])) / avg_over_time(node_memory_MemTotal_bytes{job="nodeexporter"}[5m])))',
      }),
    });
    let json = await response.json();
    if (response.status === 200 && json.status === "success") {
      labelsTemp.push("RAM utilisée");
      labelsTemp.push("RAM disponible");
      dataTemp.push((json.data.result[0].value[1] / 100) * 4);
      dataTemp.push(((100 - json.data.result[0].value[1]) / 100) * 4);
      this.setState({ labels: labelsTemp, data: dataTemp });
    }
  };

  componentDidMount() {
    this.getDatas();
  }

  render() {
    return (
      <Doughnut
        data={{
          labels: this.state.labels,
          datasets: [
            {
              label: "CPU",
              data: this.state.data,
              backgroundColor: ["rgba(255, 159, 64, 0.7)", "rgba(103, 158, 203, 0.7)"],
              borderColor: ["rgba(255, 159, 64, 0.7)", "rgba(103, 158, 203, 0.7)"],
            },
          ],
        }}
        options={{
            maintainAspectRatio: false,
          scales: {
            grid: { display: false },
          },
        }}
      />
    );
  }
}
