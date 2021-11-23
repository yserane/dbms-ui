import React, { Component } from "react";
import Chart from "react-apexcharts";

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: this.props.categories
        }
      },
      series: [
        {
          name: "Frequenices",
          data: this.props.data
        }
      ]
    };
  }

  render() {
    return (
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
    );
  }
}

export default BarChart;