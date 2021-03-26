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
      if (!payload) return;
      const data = payload.data;
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
    },

  },
  actions: {
    createChart(context, payload) {
      context.commit('createChart', payload);
    },

    async drawCharts(context) {
      const chartTypes = ["ALL_COMPLETED_PROJECTS", "NUMBER_OF_PROJECTS_MONTHS", "ALL_EMPLOYEES_OFFICES", "ALL_EMPLOYEES_DEPARTMENTS"];

      const chartsConfig = {
        ALL_COMPLETED_PROJECTS: {
          type: "line",
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
              label: "All completed projects",
              data: [10, 10, 20, 10, 30, 23, 19, 29, 29, 19, 49, 20],
              backgroundColor: '#ffa000',
            }]
          },
        },
        NUMBER_OF_PROJECTS_MONTHS: {
          type: "bar",
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
              label: "Number of projects / month",
              data: [10, 10, 20, 10, 30, 23, 19, 29, 29, 19, 49, 20],
              backgroundColor: '#03a8f4',
            }]
          },
        },
        ALL_EMPLOYEES_OFFICES: {
          type: "pie",
          data: {
            labels: ["London", "Prague", "Bucharest", "Los Angeles"],
            datasets: [{
              label: "Number of employees / office",
              data: [10, 10, 20, 10],
              backgroundColor: [
                "#009688",
                "#CDDC39",
                "#795548",
                "#3F51B5"
              ],
            }]
          },
        },
        ALL_EMPLOYEES_DEPARTMENTS: {
          type: "pie",
          data: {
            labels: ["IT", "HR", "MKT"],
            datasets: [{
              label: "Number of employees / department",
              data: [10, 10, 20],
              backgroundColor: [
                "#F44336",
                "#9C27B0",
                "#00BCD4"
              ],
            }]
          },
        },
      };

      for (const chart of chartTypes) {
        const ctx = document.querySelector(`.${chart}`);
        const chartConfig = chartsConfig[chart];

        new Chart(ctx, {
          // Shared config
          responsive: true,
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          },
          // Custom config for chart
          ...chartConfig
        });
      }

    },

  },
  getters: {
  },
};