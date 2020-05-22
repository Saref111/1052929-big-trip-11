import AbstractComponent from "./abstract-component.js";
import {render, RenderPosition} from "../utils/render.js";

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const countMoney = (events) => {
  const flyMoney = events.slice().reduce((total, it) => it.type === `flight` ? total + it.price : total, 0);
  const stayMoney = events.slice().reduce((total, it) => it.type === `check-in` ? total + it.price : total, 0);
  const driveMoney = events.slice().reduce((total, it) => it.type === `drive` ? total + it.price : total, 0);
  const lookMoney = events.slice().reduce((total, it) => it.type === `sightseeing` ? total + it.price : total, 0);
  const rideMoney = events.slice().reduce((total, it) => it.type === `taxi` || `bus` || `train` || `transport` ? total + it.price : total, 0);

  return [flyMoney, stayMoney, driveMoney, lookMoney, rideMoney];
};

const createStatisticTemplate = () => {
  return (`<section class="statistics visually-hidden">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money statistic__money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport statistic__transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time statistic__time-spend" width="900"></canvas>
    </div>
  </section>`);
};
export default class Statistic extends AbstractComponent {
  constructor(model) {
    super();

    this._model = model;
    this._container = null;
  }

  getTemplate() {
    return createStatisticTemplate();
  }

  update() {
    const statisticsElement = this.getElement();
    const moneyCtx = statisticsElement.querySelector(`.statistic__money`);
    const transportCtx = statisticsElement.querySelector(`.statistic__transport`);
    const timeSpendCtx = statisticsElement.querySelector(`.statistic__time-spend`);

    const events = this._model.getAllEvents();

    // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 6;
    transportCtx.height = BAR_HEIGHT * 4;
    timeSpendCtx.height = BAR_HEIGHT * 4;

    const moneyChart = new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`FLY`, `STAY`, `DRIVE`, `LOOK`, `RIDE`], // filter by type
        datasets: [{
          data: countMoney(events),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `€ ${val}`
          }
        },
        title: {
          display: true,
          text: `MONEY`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });

    const transportChart = new Chart(transportCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`FLY`, `DRIVE`, `RIDE`],
        datasets: [{
          data: [4, 2, 1],
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}x`
          }
        },
        title: {
          display: true,
          text: `TRANSPORT`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }

  render() {
    this.container = document.querySelector(`.page-main`).querySelector(`.page-body__container`);
    render(this.container, this, RenderPosition.BEFOREEND);
  }
}
