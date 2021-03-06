import http from 'k6/http'

export const options = {
  scenarios:{
    // constant_vus_scenario: {
    //   executor: 'constant-vus',
    //   vus: 1000,
    //   duration: '120s',
    // },

    // ramping_vus_scenario:{
    //   executor: 'ramping-vus',
    //   startVUS: 0,
    //   stages:[
    //     {duration: '6s', target:1},
    //     {duration:'120s', target: 2000},
    //     {duration:'60s', target: 0},
    //   ],
    //   gracefulRampDown: '30s',
    // },

    ramping_arrival_rate_scenario: {
      // name of the executor to use
      executor: 'ramping-arrival-rate',
      // common scenario configuration
      startRate: '0',
      timeUnit: '1s',
      // executor-specific configuration
      preAllocatedVUs: 50,
      maxVUs: 5000,
      stages: [
        //start only 1 instance at first to avoid multiple instances
        //to fetch the summoner data from riot api and save it to the the db
        // { target: 1, duration: '10s' },
        // { target: 5000, duration: '80s' },
        // { target: 0, duration: '60s' },
        { target: 1, duration: '5s'},
        { target: 1, duration: '10s'},
        { target: 20, duration: '20s' },
        { target: 20, duration: '20s' },
        { target: 30, duration: '10s' },
        { target: 30, duration: '20s' },
        { target: 40, duration: '10s' },
        { target: 40, duration: '20s' },
        { target: 50, duration: '10s' },
        { target: 50, duration: '20s' },
        { target: 0, duration: '30s' },
      ],
    },
  }
}

export default function () {
  http.get('http://localhost:3000/app/player-detail/Yunbee2')
  // sleep(3 * Math.random() * 3)
  // http.get('http://localhost:3000/app/player-detail/yassuo')
  // sleep(3 * Math.random() * 3)
  // http.get('http://localhost:3000/app/player-detail/Revenge')
  //http.get('http://localhost:3000/app/match-detail/3688675482')
  //sleep(3 * Math.random() * 3)

}

// const count200 = new Counter('status_code_2xx')
// const count300 = new Counter('status_code_3xx')
// const count400 = new Counter('status_code_4xx')
// const count500 = new Counter('status_code_5xx')

// const rate200 = new Rate('rate_status_code_2xx')
// const rate300 = new Rate('rate_status_code_3xx')
// const rate400 = new Rate('rate_status_code_4xx')
// const rate500 = new Rate('rate_status_code_5xx')

// function recordRates(res) {
//   if (res.status >= 200 && res.status < 300) {
//     count200.add(1)
//     rate200.add(1)
//   } else if (res.status >= 300 && res.status < 400) {
//     console.log(res.body)
//     count300.add(1)
//     rate300.add(1)
//   } else if (res.status >= 400 && res.status < 500) {
//     count400.add(1)
//     rate400.add(1)
//   } else if (res.status >= 500 && res.status < 600) {
//     count500.add(1)
//     rate500.add(1)
//   }
// }