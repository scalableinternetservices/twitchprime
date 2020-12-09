import http from 'k6/http'

// export const options = {
//   scenarios: {
//     example_scenario: {
//       executor: 'constant-vus',
//       vus: 20,
//       duration: '15s',
//     },
//   },
// }


export const options = {
  scenarios: {
    example_scenario: {
      // name of the executor to use
      executor: 'ramping-arrival-rate',
      // common scenario configuration
      startRate: 0,
      timeUnit: '1s',
      // executor-specific configuration
      preAllocatedVUs: 50,
      maxVUs: 200,
      stages: [
        //start only 1 instance at first to avoid multiple instances
        //to fetch the summoner data from riot api and save it to the the db
        { target: 1, duration: '5s'},
        { target: 1, duration: '20s'},
        { target: 10, duration: '5s' },
        { target: 10, duration: '20s' },
        { target: 12, duration: '5s' },
        { target: 12, duration: '20s' },
        { target: 13, duration: '5s' },
        { target: 13, duration: '20s' },
        { target: 14, duration: '5s' },
        { target: 14, duration: '20s' },
        { target: 15, duration: '5s' },
        { target: 15, duration: '20s' },
        { target: 0, duration: '30s' },
      ],
    },

  },
}

export default function () {
  http.get('http://localhost:3000/app/player-detail/yunbee2')
  //http.get('http://localhost:3000/app/assets/champion_small/Orianna.png')
  //sleep(3)
}