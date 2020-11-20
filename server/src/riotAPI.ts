import axios, { AxiosInstance } from 'axios' // import axios for http requests
import { check } from '../../common/src/util'
import { FetchTime } from './entities/FetchTime'
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
      console.log("Parsing and Saving challengerData")
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
  async updateSummonerByName(searchName: String) {
    var summoner: any
    var notFound: boolean
    notFound = false

    //update account info
    try {
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
        summoner = await (Summoner.findOne({ where: { summonerId: summonerByName.id } }))
        const now = new Date()
        const secondsSinceEpoch = Math.round(now.getTime() / 1000)

        var need_update = false
        if(summoner){
          if (secondsSinceEpoch - summoner.timestamp < 600) {//No need to update summoner with in 10 mins
            console.log("The Summoner data just updated within 10 mins")
          }else{
            need_update = true
          }
        }

        if (!summoner) {
          summoner = new Summoner()
          summoner.summonerId = summonerByName.id
          need_update = true;
        }
        if(need_update){
          summoner.timestamp = secondsSinceEpoch
          summoner.accountId = summonerByName.accountId
          summoner.summonerName = summonerByName.name
          summoner.profileIconId = summonerByName.profileIconId
          summoner.summonerLevel = summonerByName.summonerLevel
          Summoner.save(summoner)
        }

      })
    }
    catch (e) {
      console.log("Summoner not found by riot API")
      console.log(e)
      notFound = true
    }

    //update game stat
    if (!notFound) {
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
        if (summonerAllGameStat.length != 0) {
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
    }
    if (notFound) {
      return null
    }
    Summoner.save(summoner)
    return summoner
  }

  // For individual player search, first find accountId by summonerName
  async updateRecentMatchForSummoner(summonerId: String) {
    var summoner = check(await Summoner.findOne({ where: { summonerId: summonerId }, relations: ['recentMatches'] }))
    const playerAccountID = summoner.accountId
    const playerName = summoner.summonerName
    var update: boolean = true

    const now = new Date()
    const secondsSinceEpoch = Math.round(now.getTime() / 1000)
    //check last time the user's match info was fetched. Will not make a new request if within one day.
    var lastTimeFetched: any
    lastTimeFetched = await FetchTime.findOne({ where: { summonerName: playerName } })
    if (lastTimeFetched) {
      if (secondsSinceEpoch - parseInt(lastTimeFetched.timeFetched) < 86400) {
        update = false
      }
    }

    if (update) {
      if (lastTimeFetched) {
        await FetchTime.remove(lastTimeFetched)
      }

      var timeFetched = new FetchTime()
      timeFetched.summonerName = playerName;
      timeFetched.timeFetched = secondsSinceEpoch.toString();
      await FetchTime.save(timeFetched)

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
        .then(function (response) {
          const parsed = JSON.parse(JSON.stringify(response.data))
          const recentMatches = parsed.matches
          var updateRecentMatchPromise = new Promise(async (resolve) => {
            console.log("Removing old matches for player: " + playerName)
            RecentMatch.remove(summoner.recentMatches).then(() => {
              //add new recent match
              console.log("Saving player: \"" + playerName + "\" recent 10 matches")
              var index = 0
              recentMatches.forEach(async (element: any) => {
                await RecentMatch.findOne({ where: { summoner: summoner, gameId: element.gameId } }).then(async (result) => {
                  var recentMatch = result
                  if (!recentMatch) {
                    recentMatch = new RecentMatch()
                    recentMatch.summoner = summoner
                    recentMatch.platformId = element.platformId
                    recentMatch.gameId = element.gameId
                    recentMatch.champion = element.champion
                    recentMatch.queue = element.queue
                    recentMatch.season = element.season
                    recentMatch.timestamp = element.timestamp
                    recentMatch.role = element.role
                    recentMatch.lane = element.lane
                    await recentMatch.save()
                    summoner.recentMatches.push(recentMatch)
                  }
                })
                if (index === recentMatches.length - 1) {
                  console.log("Recent 10 matches of player: \"" + playerName + "\" are saved")
                  resolve();
                }
                index += 1;
              });
            })


          })
          return updateRecentMatchPromise
        });
    }
  }

  async updateRecentMatchDetail(matchId: String) {
    console.log("updating details")
    var recentMatch = check(await RecentMatch.findOne({where: {gameId : matchId}, relations: ['matchDetail']}))
    const matchFromDB = recentMatch.matchDetail
    if (matchFromDB == null) {
      //MatchDetail.remove(matchFromDB)
      console.log("detail not found in db")
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
        .then(function (response) {
          const matchDetail = JSON.parse(JSON.stringify(response.data))

          var updateMatchDetailPromise = new Promise(async (resolve) => {
            var newMatchDetail = new MatchDetail()
            newMatchDetail.gameId = matchDetail.gameId.toString()
            newMatchDetail.queueId = matchDetail.queueId.toString()
            newMatchDetail.gameType = matchDetail.gameType
            newMatchDetail.gameDuration = matchDetail.gameDuration.toString()
            newMatchDetail.gameCreation = matchDetail.gameCreation.toString()
            newMatchDetail.platformId = matchDetail.platformId
            newMatchDetail.seasonId = matchDetail.seasonId.toString()
            newMatchDetail.gameVersion = matchDetail.gameVersion
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
                newMatchDetail.blueDominionVictoryScore = matchDetail.teams[i].dominionVictoryScore
                newMatchDetail.blueDragonKills = matchDetail.teams[i].dragonKills
                newMatchDetail.blueBaronKills = matchDetail.teams[i].baronKills
                newMatchDetail.blueFirstInhibitor = matchDetail.teams[i].firstInhibitor
                newMatchDetail.blueVilemawKills = matchDetail.teams[i].vilemawKills
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
                newMatchDetail.redDominionVictoryScore = matchDetail.teams[i].dominionVictoryScore
                newMatchDetail.redDragonKills = matchDetail.teams[i].dragonKills
                newMatchDetail.redBaronKills = matchDetail.teams[i].baronKills
                newMatchDetail.redFirstInhibitor = matchDetail.teams[i].firstInhibitor
                newMatchDetail.redVilemawKills = matchDetail.teams[i].vilemawKills
                newMatchDetail.redFirstRiftHerald = matchDetail.teams[i].firstRiftHerald
                newMatchDetail.redFirstTower = matchDetail.teams[i].firstTower
                newMatchDetail.redWin = matchDetail.teams[i].win
              }
            }
            //console.log(newMatchDetail.blueTowerKills)
            //console.log(newMatchDetail.redTowerKills)
            await newMatchDetail.save()
            recentMatch.matchDetail = newMatchDetail
            await recentMatch.save()
            console.log("matchDetail is saved")

            // const toRemove = await MatchParticipant.find()
            // MatchParticipant.remove(toRemove)

            var matchDetailFromDB = check(await MatchDetail.findOne({ where: { gameId: matchId }, relations: ['matchParticipants'] }))
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
              newParticipant.goldEarned = matchDetail.participants[i].stats.goldEarned
              newParticipant.goldSpent = matchDetail.participants[i].stats.goldSpent
              newParticipant.totalDamageTaken = matchDetail.participants[i].stats.totalDamageTaken
              newParticipant.totalHeal = matchDetail.participants[i].stats.totalHeal
              newParticipant.totalPlayerScore = matchDetail.participants[i].stats.totalPlayerScore
              newParticipant.champLevel = matchDetail.participants[i].stats.champLevel
              newParticipant.totalDamageDealtToChampions = matchDetail.participants[i].stats.totalDamageDealtToChampions
              newParticipant.kills = matchDetail.participants[i].stats.kills
              newParticipant.deaths = matchDetail.participants[i].stats.deaths
              newParticipant.assist = matchDetail.participants[i].stats.assists
              newParticipant.damageSelfMitigated = matchDetail.participants[i].stats.damageSelfMitigated
              newParticipant.totalMinionsKilled = matchDetail.participants[i].stats.totalMinionsKilled
              await newParticipant.save()
              matchDetailFromDB.matchParticipants.push(newParticipant)
              //console.log("participant saved")
            }
            await matchDetailFromDB.save()


            console.log("resolving")
            resolve()
          })
          return updateMatchDetailPromise
        });
    }
  }

  async getSummonerByName(searchName: String) {
    var summoner: any
    summoner = await Summoner.findOne({ where: { summonerName: searchName } })//search in db first
    if (!summoner) {//if not found, make a new request
      console.log("summoner not found in db, fetching summer data from riot api")
      summoner = await this.updateSummonerByName(searchName)
      if (!summoner) {//cannot find summoner with API
        return null
      }
    }
    const now = new Date()
    const secondsSinceEpoch = Math.round(now.getTime() / 1000)
    if (secondsSinceEpoch - summoner.timestamp > 86400) {//864000 seconds in a day, update if the data is from more than a day ago
      console.log("updating data")
      summoner = await this.updateSummonerByName(searchName)
    }

    //winrate is expressed as XX.XX%  ex.50.21%
    var winRate: any
    if (summoner.wins == null || summoner.losses == null) {
      winRate = null
    }
    else {
      winRate = (Math.round((summoner.wins / (summoner.wins + summoner.losses) * 100) * 100) / 100).toFixed(2)
    }
    var ResStr = '{"winrate":' + winRate + ',"timestamp":' + summoner.timestamp + ',"summonerid":"' + summoner.summonerId +
      '","accountid":"' + summoner.accountId + '","profileiconid":' + summoner.profileIconId + ',"summonername":"' + summoner.summonerName +
      '","summonerlevel":' + summoner.summonerLevel + ',"leaguepoints":' + summoner.leaguePoints + ',"rank":"' + summoner.rank +
      '","wins":' + summoner.wins + ',"losses":' + summoner.losses + ',"veteran":' + summoner.veteran + ',"inactive":' + summoner.inactive +
      ',"freshblood":' + summoner.freshBlood + ',"hotstreak":' + summoner.hotStreak + '}'
    //console.log(ResStr)
    var jsonObj = JSON.parse(ResStr)
    //console.log(JSON.stringify(jsonObj))
    return jsonObj
  }

  async getRecentMatches(searchName: string) {
    var summoner: Summoner
    var returnStr: string
    var jsonObj: any
    returnStr = ""

    summoner = check(await Summoner.findOne({ where: { summonerName: searchName } }))//search in db first
    if (!summoner) {//if not found, make a new request
      console.log("summoner not found in db, fetching summer data from riot api")
      summoner = await this.updateSummonerByName(searchName)
      if (!summoner) {//cannot find summoner with API
        return null
      }
    }
    const now = new Date()
    const secondsSinceEpoch = Math.round(now.getTime() / 1000)
    if (secondsSinceEpoch - summoner.timestamp > 86400) {//864000 seconds in a day, update if the data is from more than a day ago
      console.log("updating data")
      summoner = await this.updateSummonerByName(searchName)
    }

    var jsonObjPromise = new Promise(async (resolve, reject) => {
      await this.updateRecentMatchForSummoner(summoner.summonerId).then(async () => {
        Summoner.findOne({ where: { summonerId: summoner.summonerId }, relations: ['recentMatches'] }).then((result) => {
          if (result == null) {
            reject()
          } else {
            const updatedSummoner = result;
            var getRecentMatchFromDataBase = new Promise(async function (resolve) {
              var notFirst = false
              var index = 0;
              updatedSummoner.recentMatches.forEach((element: any) => {
                if (notFirst) {
                  returnStr += ','
                }
                returnStr += '{"accountId":"' + summoner.accountId + '","summonerName":"' + summoner.summonerName
                  + '","platformId":"' + element.platformId + '","gameId":"' + element.gameId + '","champion":' + element.champion
                  + ',"queue":"' + element.queue + '","season":' + element.season + ',"timestamp":"' + element.timestamp
                  + '","role":"' + element.role + '","lane":"' + element.lane + '"}'
                notFirst = true
                if (index === updatedSummoner.recentMatches.length - 1) resolve()
                index += 1
              });
            });

            getRecentMatchFromDataBase.then()
            returnStr = '[' + returnStr + ']'
            //console.log(returnStr)
            jsonObj = JSON.parse(returnStr)
            resolve(jsonObj)
          }
        })
      })
    })
    return jsonObjPromise
  }

  async getMatchDetail(matchId: string) {
    console.log("getting details")
    var returnStr: string
    var jsonObjPromise = new Promise(async (resolve, reject) => {
      MatchDetail.findOne({ where: { gameId: matchId }, relations: ['matchParticipants'] }).then((result) => {
        const matchDetail = result

        if(matchDetail != null){
          returnStr = '['
          returnStr += '{"queueId":"' + matchDetail.queueId
            + '","gameType":"' + matchDetail.gameType + '","gameId":"' + matchDetail.gameId
            + '","gameDuration":"' + matchDetail.gameDuration + '","platformId":"' + matchDetail.platformId
            + '","gameCreation":"' + matchDetail.gameCreation + '","seasonId":' + matchDetail.seasonId
            + ',"gameVersion":"' + matchDetail.gameVersion + '","mapId":' + matchDetail.mapId
            + ',"gameMode":"' + matchDetail.gameMode + '","blueTowerKills":' + matchDetail.blueTowerKills
            + ',"blueRiftHeraldKills":' + matchDetail.blueRiftHeraldKills
            + ',"blueFirstBlood":' + matchDetail.blueFirstBlood
            + ',"blueInhibitorKills":' + matchDetail.blueInhibitorKills
            + ',"blueFirstBaron":' + matchDetail.blueFirstBaron
            + ',"blueFirstDragon":' + matchDetail.blueFirstDragon
            + ',"blueDominationVictoryScore":' + matchDetail.blueDominionVictoryScore
            + ',"blueDragonKills":' + matchDetail.blueDragonKills
            + ',"blueBaronKills":' + matchDetail.blueBaronKills
            + ',"blueFirstInhibitor":' + matchDetail.blueFirstInhibitor
            + ',"blueFirstTower":' + matchDetail.blueFirstTower
            + ',"blueVilemawKills":' + matchDetail.blueVilemawKills
            + ',"blueFirstRiftHerald":' + matchDetail.blueFirstRiftHerald
            + ',"blueWin":"' + matchDetail.blueWin
            + '","redTowerKills":' + matchDetail.redTowerKills
            + ',"redRiftHeraldKills":' + matchDetail.redRiftHeraldKills
            + ',"redFirstBlood":' + matchDetail.redFirstBlood
            + ',"redInhibitorKills":' + matchDetail.redInhibitorKills
            + ',"redFirstBaron":' + matchDetail.redFirstBaron
            + ',"redFirstDragon":' + matchDetail.redFirstDragon
            + ',"redDominationVictoryScore":' + matchDetail.redDominionVictoryScore
            + ',"redDragonKills":' + matchDetail.redDragonKills
            + ',"redBaronKills":' + matchDetail.redBaronKills
            + ',"redFirstInhibitor":' + matchDetail.redFirstInhibitor
            + ',"redFirstTower":' + matchDetail.redFirstTower
            + ',"redVilemawKills":' + matchDetail.redVilemawKills
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
              + ',"goldSpent":' + element.goldSpent
              + ',"totalDamageTaken":' + element.totalDamageTaken
              + ',"totalHeal":' + element.totalHeal
              + ',"totalPlayerScore":' + element.totalPlayerScore
              + ',"champLevel":' + element.champLevel
              + ',"totalDamageDealtToChampions":' + element.totalDamageDealtToChampions
              + ',"kills":' + element.kills
              + ',"deaths":' + element.deaths
              + ',"assist":' + element.assist
              + ',"damageSelfMitigated":' + element.damageSelfMitigated
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
