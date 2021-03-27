import Chart from 'chart.js';
import axios from "axios";
import moment from "moment-timezone";

export default {
  namespaced: true,
  state: {
    drawer: false,
    allCompletedProjects: null
  },
  mutations: {
    createChart(_, payload) {
      if (!payload) return;

      const selector = payload.selector;
      const ctx = document.querySelector(selector);
      if (!ctx) return;

      const data = payload.data;
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

    async drawCharts(context, payload) {
      const { data } = await axios.get("/api/statistic/");
      const { months, offices, departments } = payload;

      console.log(departments);

      const allCompletedProjects = months.map((month) => {
        return data.allProjects.map((project) => {
          const shouldCount = month === moment(project.deadline).format("MMMM") && project.status === "Completed";

          if (shouldCount) {
            return true;
          }

          return false;
        });
      }).map((arr) => arr.filter(Boolean).length);

      const numberOfProjectsMonths = months.map((month) => {
        return data.allProjects.map((project) => {
          const shouldCount = month === moment(project.deadline).format("MMMM");

          if (shouldCount) {
            return true;
          }

          return false;
        });
      }).map((arr) => arr.filter(Boolean).length);

      const allEmployeesOffices = offices.map((office) => {
        return data.allProfiles.map((user) => {
          const shouldCount = office === user.office;

          if (shouldCount) {
            return true;
          }

          return false;
        });
      }).map((arr) => arr.filter(Boolean).length);

      const allEmployeesDepartments = departments.map((department) => {
        return data.allProfiles.map((user) => {
          const shouldCount = department === user.department;

          if (shouldCount) {
            return true;
          }

          return false;
        });
      }).map((arr) => arr.filter(Boolean).length);

      const chartTypes = ["ALL_COMPLETED_PROJECTS", "NUMBER_OF_PROJECTS_MONTHS", "ALL_EMPLOYEES_OFFICES", "ALL_EMPLOYEES_DEPARTMENTS"];

      const chartsConfig = {
        ALL_COMPLETED_PROJECTS: {
          type: "line",
          data: {
            labels: months,
            datasets: [{
              label: "Projects / Month / Completed",
              data: allCompletedProjects,
              backgroundColor: '#ffa000',
            }]
          },
        },
        NUMBER_OF_PROJECTS_MONTHS: {
          type: "bar",
          data: {
            labels: months,
            datasets: [{
              label: "Projects / Month / All",
              data: numberOfProjectsMonths,
              backgroundColor: '#03a8f4',
            }]
          },
        },
        ALL_EMPLOYEES_OFFICES: {
          type: "pie",
          data: {
            labels: offices,
            datasets: [{
              label: "Number of employees / office",
              data: allEmployeesOffices,
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
            labels: departments,
            datasets: [{
              label: "Number of employees / department",
              data: allEmployeesDepartments,
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