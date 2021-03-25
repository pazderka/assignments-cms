import Chart from 'chart.js';
import axios from "axios";

export default {
  namespaced: true,
  state: {
    drawer: false,
  },
  mutations: {
    createChart(_, payload) {
      const selector = payload.selector;
      const data = payload.data;
      console.log(this.$MONTHS);
      const ctx = document.querySelector(selector);
      new Chart(ctx, {
        responsive: true,
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            label: "Projects",
            data,
            backgroundColor: '#ffa000',
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  },
  actions: {
    createChart(context, payload) {
      context.commit('createChart', payload);
    }
  },
  getters: {
  },
};