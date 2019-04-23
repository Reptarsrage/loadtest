<template>
  <div class="small">
    <line-chart :chart-data="errorChartData" :options="options" :darkTheme="darkTheme"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.js';
import { mapGetters } from 'vuex';

export default {
  name: 'ErrorChart',
  components: {
    LineChart,
  },
  methods: {
    isDark() {
      return this.darkTheme;
    },
  },
  computed: {
    ...mapGetters(['errorChartData', 'darkTheme']),
    options() {
      const fontColor = this.isDark() ? 'white' : 'black';
      const color = this.isDark() ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
      return {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 8,
            right: 8,
          },
        },
        legend: {
          position: 'top',
          labels: {
            fontColor,
          },
        },
        title: {
          display: true,
          text: 'Errors',
          fontColor,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor, // labels such as 10, 20, etc
                showLabelBackdrop: false, // hide square behind text
              },
              pointLabels: {
                fontColor, // labels around the edge like 'Running'
              },
              gridLines: {
                color,
              },
              angleLines: {
                color, // lines radiating from the center
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor, // labels such as 10, 20, etc
                showLabelBackdrop: false, // hide square behind text
              },
              pointLabels: {
                fontColor, // labels around the edge like 'Running'
              },
              gridLines: {
                color,
              },
              angleLines: {
                color, // lines radiating from the center
              },
            },
          ],
        },
      };
    },
  },
};
</script>

<style>
.small > div {
  height: 200px;
  position: relative;
}
</style>
