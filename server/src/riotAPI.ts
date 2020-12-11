import axios, { AxiosInstance } from 'axios' // import axios for http requests
import { check } from '../../common/src/util'
import { MatchDetail } from './entities/MatchDetail'
import { MatchParticipant } from './entities/MatchParticipant'
import { RecentMatch } from './entities/RecentMatch'
import { Summoner } from './entities/Summoner'


export class RiotAPI {
  riotToken: String
  instance: AxiosInstance

  constructor(riotToken: String) {
    this.riotToken = riotToken
    // create axios instance with customized baseURL
    this.instance = axios.create({
      baseURL: 'https://na1.api.riotgames.com/lol/'
    })
  }

  updateChallengerData() {
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
      // console.log("Parsing and Saving challengerData")
      const jsonObj = JSON.parse(JSON.stringify(response.data))
      const entries = jsonObj.entries
      entries.forEach(async (element: any) => {
        //console.log(element.summonerName)

        //check whether the summoner is exist in the database
        var summoner = await (Summoner.findOne({ where: { summonerId: element.summonerId } }))
        if (!summoner) { //if not create a new one
          summoner = new Summoner()
          summoner.summonerId = element.summonerId
        }
        summoner.summonerName = element.summonerName
        summoner.leaguePoints = element.leaguePoints
        summoner.tier = element.tier
        summoner.rank = element.rank
        summoner.wins = element.wins
        summoner.losses = element.losses

        Summoner.save(summoner)//.then(s => console.log('saved summoner: ' + s.summonerName))
      });
      // console.log("ChallengerData is saved")
    });
  }

  //update summoner AccountID, return summoner obj
  async updateSummonerByName(searchName: String, summonerIn: Summoner | null) {
    var need_update = true
    var summoner : any
    const now = new Date()
    const secondsSinceEpoch = Math.round(now.getTime() / 1000)

    if (summonerIn != null) {
      summoner = summonerIn
      if (secondsSinceEpoch - summoner.timestamp < 600) {//No need to update summoner with in 10 mins
        console.log("The Summoner data just updated within 10 mins")
        need_update = false
      }
    }else{
      summoner = new Summoner()
      summoner.recentMatches = []
    }

    var updateSummonerPromise = new Promise(async (resolve) => {
      if(need_update){
        try{
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
            // console.log("Called riotAPI /summoners/by-name/")
            const summonerByName = JSON.parse(JSON.stringify(response.data))
            console.log("Account info Update for summoner " + searchName)
            summoner.summonerId = summonerByName.id
            summoner.timestamp = secondsSinceEpoch
            summoner.accountId = summonerByName.accountId
            summoner.summonerName = summonerByName.name
            summoner.profileIconId = summonerByName.profileIconId
            summoner.summonerLevel = summonerByName.summonerLevel
          }).then(async ()=>{
            //update game stat
            await this.instance({
              method: 'get',
              url: '/league/v4/entries/by-summoner/' + summoner.summonerId,
              headers:
              {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com",
                "X-Riot-Token": this.riotToken
              }
            }).then(async function (response) {
              console.log("Game stat Update for summoner " + searchName)
              const summonerAllGameStat = JSON.parse(JSON.stringify(response.data))
              if (summonerAllGameStat.length != 0 && summoner != null) {
                for(let i = 0; i < summonerAllGameStat.length; i++){
                  if(summonerAllGameStat[i].queueType === "RANKED_SOLO_5x5"){
                    const RANKED_SOLO_5x5 = summonerAllGameStat[i]
                    summoner.leaguePoints = RANKED_SOLO_5x5.leaguePoints
                    summoner.tier = RANKED_SOLO_5x5.tier
                    summoner.rank = RANKED_SOLO_5x5.rank
                    summoner.wins = RANKED_SOLO_5x5.wins
                    summoner.losses = RANKED_SOLO_5x5.losses
                  }
                }
              }
              await summoner.save()
              resolve(summoner);
            });
          })
        }catch(e){
          console.log("Summoner not found by riot API")
          //console.log(e)
          resolve(null)
        }
      }else{
        resolve(summoner)
      }
    })

    return updateSummonerPromise

  }

  // For individual player search, first find accountId by summonerName
  async updateRecentMatchForSummoner(summoner: Summoner) {
    const playerAccountID = summoner.accountId
    const playerName = summoner.summonerName

    var updateRecentMatchPromise = new Promise(async (resolve) => {
      await this.instance({
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
        .then(async function (response) {
          //console.log("Called: /matchlists/by-account/playerAccountID")
          const parsed = JSON.parse(JSON.stringify(response.data))
          const recentMatches = parsed.matches
          console.log("Removing old matches(if exist) for player: " + playerName)
          var oldRecentMatches = summoner.recentMatches
          await RecentMatch.remove(oldRecentMatches).then(() => {
            //add new recent match
            console.log("Saving player: \"" + playerName + "\" recent 10 matches")
            var index = 0
            recentMatches.forEach(async (element: any) => {

              var recentMatch = new RecentMatch()
              recentMatch.summoner = summoner
              recentMatch.gameId = element.gameId
              recentMatch.champion = element.champion
              recentMatch.queue = element.queue
              recentMatch.season = element.season
              recentMatch.timestamp = element.timestamp
              await recentMatch.save()


              summoner.recentMatches.push(recentMatch)

              if (index === recentMatches.length - 1) {
                const now = new Date()
                const secondsSinceEpoch = Math.round(now.getTime() / 1000)
                summoner.timeFetchedOfRecentMatch = secondsSinceEpoch.toString();
                await summoner.save()

                console.log("Recent 10 matches of player: \"" + playerName + "\" are saved")
                resolve(summoner);
              }
              index += 1;
            });
          })
        });
    });
    return updateRecentMatchPromise
  }

  //call this func only when the matchDetail is not exist previously
  async updateRecentMatchDetail(matchId: String) {
    console.log("updating details")
    var newMatchDetail: any
    var recentMatch = check(await RecentMatch.findOne({ where: { gameId: matchId }, relations: ['matchDetail', 'matchDetail.matchParticipants'] }))

    newMatchDetail = recentMatch.matchDetail
    var updateMatchDetailPromise = new Promise(async (resolve) => {
      if (newMatchDetail == null) {
        //MatchDetail.remove(matchFromDB)
        //console.log("detail not found in db")
        await this.instance({
          method: 'get',
          url: '/match/v4/matches/' + matchId, // can be any accountId, i.e. /match/v4/matchlists/by-account/{accountId}
          headers:
          {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,it-IT;q=0.5,it;q=0.4",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": this.riotToken
          }
        })
          .then(async function (response) {
            //console.log("Called: /matched/matchId")
            const matchDetail = JSON.parse(JSON.stringify(response.data))

            var newMatchDetail = new MatchDetail()
            newMatchDetail.gameId = matchDetail.gameId.toString()
            newMatchDetail.queueId = matchDetail.queueId.toString()
            newMatchDetail.gameType = matchDetail.gameType
            newMatchDetail.gameDuration = matchDetail.gameDuration.toString()
            newMatchDetail.mapId = matchDetail.mapId.toString()
            newMatchDetail.gameMode = matchDetail.gameMode
            for (let i = 0; i < matchDetail.teams.length; i++) {
              if (matchDetail.teams[i].teamId == 100) {//blue side
                newMatchDetail.blueTowerKills = matchDetail.teams[i].towerKills
                newMatchDetail.blueRiftHeraldKills = matchDetail.teams[i].riftHeraldKills
                newMatchDetail.blueFirstBlood = matchDetail.teams[i].firstBlood
                newMatchDetail.blueInhibitorKills = matchDetail.teams[i].inhibitorKills
                newMatchDetail.blueFirstBaron = matchDetail.teams[i].firstBaron
                newMatchDetail.blueFirstDragon = matchDetail.teams[i].firstDragon
                newMatchDetail.blueDragonKills = matchDetail.teams[i].dragonKills
                newMatchDetail.blueBaronKills = matchDetail.teams[i].baronKills
                newMatchDetail.blueFirstInhibitor = matchDetail.teams[i].firstInhibitor
                newMatchDetail.blueFirstRiftHerald = matchDetail.teams[i].firstRiftHerald
                newMatchDetail.blueFirstTower = matchDetail.teams[i].firstTower
                newMatchDetail.blueWin = matchDetail.teams[i].win
              } else {//red side
                newMatchDetail.redTowerKills = matchDetail.teams[i].towerKills
                newMatchDetail.redRiftHeraldKills = matchDetail.teams[i].riftHeraldKills
                newMatchDetail.redFirstBlood = matchDetail.teams[i].firstBlood
                newMatchDetail.redInhibitorKills = matchDetail.teams[i].inhibitorKills
                newMatchDetail.redFirstBaron = matchDetail.teams[i].firstBaron
                newMatchDetail.redFirstDragon = matchDetail.teams[i].firstDragon
                newMatchDetail.redDragonKills = matchDetail.teams[i].dragonKills
                newMatchDetail.redBaronKills = matchDetail.teams[i].baronKills
                newMatchDetail.redFirstInhibitor = matchDetail.teams[i].firstInhibitor
                newMatchDetail.redFirstRiftHerald = matchDetail.teams[i].firstRiftHerald
                newMatchDetail.redFirstTower = matchDetail.teams[i].firstTower
                newMatchDetail.redWin = matchDetail.teams[i].win
              }
            }
            newMatchDetail.matchParticipants = []
            recentMatch.matchDetail = newMatchDetail
            await recentMatch.save()

            var map = new Map<number, String>()
            for (let i = 0; i < matchDetail.participantIdentities.length; i++) {
              map.set(matchDetail.participantIdentities[i].participantId, matchDetail.participantIdentities[i].player.summonerName)
            }
            for (let i = 0; i < matchDetail.participants.length; i++) {
              var newParticipant = new MatchParticipant()
              newParticipant.participantId = matchDetail.participants[i].participantId
              let name = map.get(newParticipant.participantId)
              if (name != undefined) {
                newParticipant.participantName = name
              }
              else {
                newParticipant.participantName = "Null"
              }
              newParticipant.championId = matchDetail.participants[i].championId
              newParticipant.teamId = matchDetail.participants[i].teamId
              newParticipant.spell1Id = matchDetail.participants[i].spell1Id
              newParticipant.spell2Id = matchDetail.participants[i].spell2Id
              newParticipant.perk0 = matchDetail.participants[i].stats.perk0
              newParticipant.perk1 = matchDetail.participants[i].stats.perk1
              newParticipant.perk2 = matchDetail.participants[i].stats.perk2
              newParticipant.perk3 = matchDetail.participants[i].stats.perk3
              newParticipant.perk4 = matchDetail.participants[i].stats.perk4
              newParticipant.perk5 = matchDetail.participants[i].stats.perk5
              newParticipant.perkPrimaryStyle = matchDetail.participants[i].stats.perkPrimaryStyle
              newParticipant.perkSubStyle = matchDetail.participants[i].stats.perkSubStyle
              newParticipant.statPerk0 = matchDetail.participants[i].stats.statPerk0
              newParticipant.statPerk1 = matchDetail.participants[i].stats.statPerk1
              newParticipant.statPerk2 = matchDetail.participants[i].stats.statPerk2
              newParticipant.item0 = matchDetail.participants[i].stats.item0
              newParticipant.item1 = matchDetail.participants[i].stats.item1
              newParticipant.item2 = matchDetail.participants[i].stats.item2
              newParticipant.item3 = matchDetail.participants[i].stats.item3
              newParticipant.item4 = matchDetail.participants[i].stats.item4
              newParticipant.item5 = matchDetail.participants[i].stats.item5
              newParticipant.item6 = matchDetail.participants[i].stats.item6
              newParticipant.champLevel = matchDetail.participants[i].stats.champLevel
              newParticipant.totalDamageDealtToChampions = matchDetail.participants[i].stats.totalDamageDealtToChampions
              newParticipant.kills = matchDetail.participants[i].stats.kills
              newParticipant.deaths = matchDetail.participants[i].stats.deaths
              newParticipant.assist = matchDetail.participants[i].stats.assists
              newParticipant.goldEarned = matchDetail.participants[i].stats.goldEarned
              newParticipant.totalMinionsKilled = matchDetail.participants[i].stats.totalMinionsKilled
              await newParticipant.save()
              newMatchDetail.matchParticipants.push(newParticipant)
              console.log("participant saved")
            }
            await newMatchDetail.save()
            console.log("matchDetail is saved")
            console.log("resolving")
            resolve(newMatchDetail)
          });
      }
    })

    return updateMatchDetailPromise
  }

  async getSummonerByNameAndRecentMatch(searchName: String) {
    var summoner: any
    var recentMatch_need_update = false
    summoner = await Summoner.findOne({ where: { summonerName: searchName }, relations: ['recentMatches'] })//search in db first
    if (!summoner) {//if not found, make a new request
      console.log("summoner not found in db, fetching summer data from riot api")
      summoner = await this.updateSummonerByName(searchName, null)
      if (!summoner) {//cannot find summoner with API
        console.log("null summoner")
        return null
      }
    }
    const now = new Date()
    const secondsSinceEpoch = Math.round(now.getTime() / 1000)
    if (secondsSinceEpoch - summoner.timestamp > 3600) {//3600 seconds in an hour, update if the data is from more than an hour ago
      console.log("the summoner's data is more than 1 hours ago, updating summoner data")
      summoner = await this.updateSummonerByName(searchName, summoner)
      recentMatch_need_update = true
    }else{
      console.log("the summoner's data was updated with in 1 hours, no update is needed.")
    }

    //winrate is expressed as XX.XX%  ex.50.21%
    var winRate: any
    if (summoner.wins == null || summoner.losses == null) {
      winRate = null
    }
    else {
      winRate = (Math.round((summoner.wins / (summoner.wins + summoner.losses) * 100) * 100) / 100).toFixed(2)
    }
    var summonerResStr = '{"winrate":' + winRate + ',"timestamp":' + summoner.timestamp + ',"summonerid":"' + summoner.summonerId +
      '","accountid":"' + summoner.accountId + '","profileiconid":' + summoner.profileIconId + ',"summonername":"' + summoner.summonerName +
      '","summonerlevel":' + summoner.summonerLevel + ',"leaguepoints":' + summoner.leaguePoints + ',"tier":"' + summoner.tier + '","rank":"' + summoner.rank +
      '","wins":' + summoner.wins + ',"losses":' + summoner.losses  + '}'

    var recentMatchResStr = await this.getRecentMatches(summoner, recentMatch_need_update)

    var resStr = '[' + summonerResStr + ',' + recentMatchResStr + ']'

    var jsonObj = JSON.parse(resStr)
    //console.log(JSON.stringify(jsonObj))
    return jsonObj
  }

  async getRecentMatches(summonerIn: Summoner, summoner_has_update: boolean) {

    var summoner = summonerIn
    var returnStr: string
    returnStr = ""

    const now = new Date()
    const secondsSinceEpoch = Math.round(now.getTime() / 1000)

    var updateRecentMatch = true
    const lastTimeFetchRecentMatch = summoner.timeFetchedOfRecentMatch

    if(summoner_has_update){
      console.log("Update summoner's RecentMatch data as well.")

    }else if (lastTimeFetchRecentMatch != null) {
      if (secondsSinceEpoch - parseInt(lastTimeFetchRecentMatch) < 1800) {
        console.log("The summoner's RecentMatch data are fetched within 30 mins, no update is need")
        updateRecentMatch = false
      } else {
        console.log("The summoner's RecentMatch data are more than 30 mins ago, updating recentMatches")
      }
    } else {
      console.log("The summoner does not have recentMatch data in db yet, fetching recentMatch data")
    }


    var jsonObjPromise = new Promise(async (resolve, reject) => {
      if (updateRecentMatch || summoner_has_update) {
        await this.updateRecentMatchForSummoner(summoner).then(async (result) => {
          summoner = result as Summoner

          var constructRecentMatchStrPromise = new Promise(async function (resolve) {
            var notFirst = false
            var index = 0;

            summoner.recentMatches.forEach((element: any) => {
              if (notFirst) {
                returnStr += ','
              }
              returnStr += '{"accountId":"' + summoner.accountId + '","summonerName":"' + summoner.summonerName
                + '","gameId":"' + element.gameId + '","champion":' + element.champion
                + ',"queue":"' + element.queue + '","season":' + element.season + ',"timestamp":"' + element.timestamp
                + '"}'
              notFirst = true
              if (index === summoner.recentMatches.length - 1) resolve()
              index += 1
            });
          });

          constructRecentMatchStrPromise.then()
          returnStr = '[' + returnStr + ']'
          //console.log(returnStr)
          //jsonObj = JSON.parse(returnStr)
          resolve(returnStr)
        })
      } else {  //no need to updateRecentMatch
        var constructRecentMatchStrPromise = new Promise(async function (resolve) {
          var notFirst = false
          var index = 0;

          summoner.recentMatches.forEach((element: any) => {
            if (notFirst) {
              returnStr += ','
            }
            returnStr += '{"accountId":"' + summoner.accountId + '","summonerName":"' + summoner.summonerName
              + '","gameId":"' + element.gameId + '","champion":' + element.champion
              + ',"queue":"' + element.queue + '","season":' + element.season + ',"timestamp":"' + element.timestamp
              + '"}'
            notFirst = true
            if (index === summoner.recentMatches.length - 1) resolve()
            index += 1
          });
        });

        constructRecentMatchStrPromise.then()
        returnStr = '[' + returnStr + ']'
        //console.log(returnStr)
        //jsonObj = JSON.parse(returnStr)
        resolve(returnStr)
      }
    })
    return jsonObjPromise
  }

  async getMatchDetail(matchId: string) {
    // console.log("getting match details")
    var returnStr: string
    var matchDetail: any
    var jsonObjPromise = new Promise(async (resolve, reject) => {
      MatchDetail.findOne({ where: { gameId: matchId }, relations: ['matchParticipants'] }).then(async (result) => {
        matchDetail = result

        if (matchDetail == null) {
           console.log("the match detail is not found in db, fetching from riot api")
          matchDetail = await this.updateRecentMatchDetail(matchId)
        } else {
           console.log("the match detail is found in db")
        }

        if (matchDetail != null) {
          returnStr = '['
          returnStr += '{"queueId":"' + matchDetail.queueId
            + '","gameType":"' + matchDetail.gameType + '","gameId":"' + matchDetail.gameId
            + '","gameDuration":"' + matchDetail.gameDuration + '","mapId":' + matchDetail.mapId
            + ',"gameMode":"' + matchDetail.gameMode + '","blueTowerKills":' + matchDetail.blueTowerKills
            + ',"blueRiftHeraldKills":' + matchDetail.blueRiftHeraldKills
            + ',"blueFirstBlood":' + matchDetail.blueFirstBlood
            + ',"blueInhibitorKills":' + matchDetail.blueInhibitorKills
            + ',"blueFirstBaron":' + matchDetail.blueFirstBaron
            + ',"blueFirstDragon":' + matchDetail.blueFirstDragon
            + ',"blueDragonKills":' + matchDetail.blueDragonKills
            + ',"blueBaronKills":' + matchDetail.blueBaronKills
            + ',"blueFirstInhibitor":' + matchDetail.blueFirstInhibitor
            + ',"blueFirstTower":' + matchDetail.blueFirstTower
            + ',"blueFirstRiftHerald":' + matchDetail.blueFirstRiftHerald
            + ',"blueWin":"' + matchDetail.blueWin
            + '","redTowerKills":' + matchDetail.redTowerKills
            + ',"redRiftHeraldKills":' + matchDetail.redRiftHeraldKills
            + ',"redFirstBlood":' + matchDetail.redFirstBlood
            + ',"redInhibitorKills":' + matchDetail.redInhibitorKills
            + ',"redFirstBaron":' + matchDetail.redFirstBaron
            + ',"redFirstDragon":' + matchDetail.redFirstDragon
            + ',"redDragonKills":' + matchDetail.redDragonKills
            + ',"redBaronKills":' + matchDetail.redBaronKills
            + ',"redFirstInhibitor":' + matchDetail.redFirstInhibitor
            + ',"redFirstTower":' + matchDetail.redFirstTower
            + ',"redFirstRiftHerald":' + matchDetail.redFirstRiftHerald
            + ',"redWin":"' + matchDetail.redWin
            + '"},'
          var notFirst = false

          //console.log(matchDetail.matchParticipants)
          matchDetail.matchParticipants.forEach((element: any) => {
            if (notFirst) {
              returnStr += ','
            }
            notFirst = true
            returnStr += '{"participantId":' + element.participantId
              + ',"gameId":"' + matchDetail.gameId
              + '","participantName":"' + element.participantName
              + '","championId":' + element.championId
              + ',"teamId":' + element.teamId
              + ',"spell1Id":' + element.spell1Id
              + ',"spell2Id":' + element.spell2Id
              + ',"perk0":' + element.perk0
              + ',"perk1":' + element.perk1
              + ',"perk2":' + element.perk2
              + ',"perk3":' + element.perk3
              + ',"perk4":' + element.perk4
              + ',"perk5":' + element.perk5
              + ',"perkPrimaryStyle":' + element.perkPrimaryStyle
              + ',"perkSubStyle":' + element.perkSubStyle
              + ',"statPerk0":' + element.statPerk0
              + ',"statPerk1":' + element.statPerk1
              + ',"statPerk2":' + element.statPerk2
              + ',"item0":' + element.item0
              + ',"item1":' + element.item1
              + ',"item2":' + element.item2
              + ',"item3":' + element.item3
              + ',"item4":' + element.item4
              + ',"item5":' + element.item5
              + ',"item6":' + element.item6
              + ',"goldEarned":' + element.goldEarned
              + ',"champLevel":' + element.champLevel
              + ',"totalDamageDealtToChampions":' + element.totalDamageDealtToChampions
              + ',"kills":' + element.kills
              + ',"deaths":' + element.deaths
              + ',"assist":' + element.assist
              + ',"goldEarned":' + element.goldEarned
              + ',"totalMinionsKilled":' + element.totalMinionsKilled
              + '}'
          })
          returnStr += ']'
          var jsonObj: any
          //console.log(returnStr)
          jsonObj = JSON.parse(returnStr)
          resolve(jsonObj)
        }
        else {//return empty obj
          console.log("error while getting match detail")
          returnStr = '[]'
          jsonObj = JSON.parse(returnStr)
          reject(jsonObj)
        }
      })

    })
    return jsonObjPromise
  }
}
