import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

import { Disk_Chart_colors } from "../Constants";

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

    const response0 = await fetch("http://192.168.10.151:9090/api/v1/query", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        query: 'node_filesystem_avail_bytes{mountpoint="/",fstype!="rootfs"}',
      }),
    });
    let json0 = await response0.json();

    const response1 = await fetch("http://192.168.10.151:9090/api/v1/query", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        query: 'node_filesystem_size_bytes{mountpoint="/",fstype!="rootfs"}',
      }),
    });
    let json1 = await response1.json();

    if (response0.status === 200 && json0.status === "success" && response1.status === 200 && json1.status === "success") {
      labelsTemp.push("Free");
      dataTemp.push(json0.data.result[0].value[1] / 1000000000);

      labelsTemp.push("Utilisé");
      dataTemp.push(json1.data.result[0].value[1] / 1000000000 - dataTemp[0]);

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
              backgroundColor: Disk_Chart_colors,
              borderColor: Disk_Chart_colors,
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
              text: "Disque",
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
