import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

import { Four_Chart_colors } from "../Constants";

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
        query: '{__name__=~"node_memory_MemFree_bytes|node_memory_Cached_bytes|node_memory_Buffers_bytes|node_memory_MemTotal_bytes"}',
      }),
    });
    let json = await response.json();
    if (response.status === 200 && json.status === "success") {
      labelsTemp.push("Buffer");
      dataTemp.push(json.data.result[0].value[1] / 1000000000);

      labelsTemp.push("Cache");
      dataTemp.push(json.data.result[1].value[1] / 1000000000);

      labelsTemp.push("Free");
      dataTemp.push(json.data.result[2].value[1] / 1000000000);

      labelsTemp.push("Services");
      dataTemp.push(json.data.result[3].value[1] / 1000000000 - dataTemp[0] - dataTemp[1] - dataTemp[2]);

      this.setState({ labels: labelsTemp, data: dataTemp });
    }
  };

  componentDidMount() {
    this.getDatas();
  }

  render() {
    return (
      <Doughnut
        style={{ margin: 15, marginTop: 5 }}
        data={{
          labels: this.state.labels,
          datasets: [
            {
              data: this.state.data,
              backgroundColor: Four_Chart_colors,
              borderColor: Four_Chart_colors,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          animation: {
            duration: 0,
          },
          scales: {
            grid: { display: false },
          },
          plugins: {
            title: {
              display: true,
              font: { size: 25, weight: "lighter" },
              text: "RAM",
            },
            legend: {
              display: true,
              position: "left",
            },
          },
        }}
      />
    );
  }
}
