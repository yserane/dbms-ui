import React, { useEffect, useState, useRef } from 'react';
import Chart from 'react-apexcharts'

      class ApexChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: this.props.numList,
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: this.props.names,
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
          
          
          };
        }

      

        render() {
          return (
            
      <div id="chart">
  <Chart options={this.state.options} series={this.state.series} type="pie" width={this.props.width} />
</div>
    

          );
        }
      }

      export default ApexChart;