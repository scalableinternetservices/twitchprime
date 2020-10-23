import axios, { AxiosInstance } from 'axios' // import axios for http requests
import { RecentMatch } from './entities/RecentMatch'
import { Summoner } from './entities/Summoner'

export class RiotAPI {
  riotToken: String
  instance: AxiosInstance

  constructor(riotToken: String){
    this.riotToken = riotToken
    // create axios instance with customized baseURL
    this.instance = axios.create({
      baseURL: 'https://na1.api.riotgames.com/lol/'
    })
  }

  updateChallengerData(){
    this.instance({
      method: 'get',
      url: '/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5',
      headers:
      {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,it-IT;q=0.5,it;q=0.4",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
        "X-Riot-Token": this.riotToken
      }
    }).then(async function (response) {
      console.log("Parsing and Saving challengerData")
      const jsonObj = JSON.parse(JSON.stringify(response.data))
      const entries = jsonObj.entries
      entries.forEach(async (element: any) => {
        //console.log(element.summonerName)

        //check whether the summoner is exist in the database
        var summoner = await(Summoner.findOne({ where: { summonerId : element.summonerId}}))
        if (!summoner){ //if not create a new one
          summoner = new Summoner()
          summoner.summonerId = element.summonerId
        }
        summoner.summonerName = element.summonerName
        summoner.leaguePoints = element.leaguePoints
        summoner.rank = element.rank
        summoner.wins = element.wins
        summoner.losses = element.losses
        summoner.veteran = element.veteran
        summoner.inactive = element.inactive
        summoner.freshBlood = element.freshBlood
        summoner.hotStreak = element.hotStreak

        Summoner.save(summoner)//.then(s => console.log('saved summoner: ' + s.summonerName))
      });
      console.log("ChallengerData is saved")
    });
  }

  //update summoner AccountID, return summoner obj
  async updateSummonerByName(searchName: String){
    var summoner : any

    //update account info
    await this.instance({
      method: 'get',
      url: '/summoner/v4/summoners/by-name/' + searchName, // can be any player name, i.e. /summoner/v4/summoners/by-name/{playerName}
      headers:
      {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,it-IT;q=0.5,it;q=0.4",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
        "X-Riot-Token": this.riotToken
      }
    }).then(async function (response) {
      console.log("Account info Update for summoner " + searchName)
      const summonerByName = JSON.parse(JSON.stringify(response.data))
      summoner = await(Summoner.findOne({ where: { summonerId : summonerByName.id}}))
      if (!summoner){
        summoner = new Summoner()
        summoner.summonerId = summonerByName.id
      }
      summoner.accountId = summonerByName.accountId
      summoner.summonerName = summonerByName.name
      summoner.profileIconId = summonerByName.profileIconId
      summoner.summonerLevel = summonerByName.summonerLevel
      Summoner.save(summoner)
    })

    //update game stat
    await this.instance({
      method: 'get',
      url: '/league/v4/entries/by-summoner/' + summoner.summonerId, // can be any player name, i.e. /summoner/v4/summoners/by-name/{playerName}
      headers:
      {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
        "X-Riot-Token": this.riotToken
    }
    }).then(function (response) {
      console.log("Game stat Update for summoner " + searchName)
      const summonerAllGameStat = JSON.parse(JSON.stringify(response.data))
      if (summonerAllGameStat.length != 0){
        const summonerGameStat = summonerAllGameStat[summonerAllGameStat.length - 1] //the last entry is the  stat of Ranked_solo_5x5
        summoner.leaguePoints = summonerGameStat.leaguePoints
        summoner.rank = summonerGameStat.rank
        summoner.wins = summonerGameStat.wins
        summoner.losses = summonerGameStat.losses
        summoner.veteran = summonerGameStat.veteran
        summoner.inactive = summonerGameStat.inactive
        summoner.freshBlood = summonerGameStat.freshBlood
        summoner.hotStreak = summonerGameStat.hotStreak
      }
    });
    Summoner.save(summoner)
    return summoner
  }

  // For individual player search, first find accountId by summonerName
  updateRecentMatchForSummoner(summoner: Summoner){
    const playerAccountID = summoner.accountId
    const playerName = summoner.summonerName
    this.instance({
      method: 'get',
      url: '/match/v4/matchlists/by-account/' + playerAccountID + '?endIndex=10', // can be any accountId, i.e. /match/v4/matchlists/by-account/{accountId}
      headers:
      {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,it-IT;q=0.5,it;q=0.4",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
        "X-Riot-Token": this.riotToken
      }
    })
    .then(function (response) {
      console.log("Saving player: \""  + "\" recent 10 matches")
      const parsed = JSON.parse(JSON.stringify(response.data))
      const recentMatches = parsed.matches
      recentMatches.forEach(async (element : any) => {
        var recentMatch = await(RecentMatch.findOne({ where: { accountId : playerAccountID, gameId : element.gameId}}))
        if (!recentMatch){
          recentMatch = new RecentMatch()
          recentMatch.accountId = playerAccountID
          recentMatch.summonerName = playerName
          recentMatch.platformId = element.platformId
          recentMatch.gameId = element.gameId
          recentMatch.champion = element.champion
          recentMatch.queue = element.queue
          recentMatch.season = element.season
          recentMatch.timestamp = element.timestamp
          recentMatch.role = element.role
          recentMatch.lane = element.lane
          RecentMatch.save(recentMatch)
        }
      });
      console.log("Recent 10 matches of player: \"" + playerName + "\" are saved")
    });
  }
}




