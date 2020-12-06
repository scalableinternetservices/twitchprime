import { float } from 'aws-sdk/clients/lightsail'
import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { RiotAPI } from '../riotAPI'
import { MatchDetail, Participant, PlayerDetail, RecentMatch, Resolvers } from './schema.types'

export const pubsub = new PubSub()
const Redis = require("ioredis");
const redis = new Redis();

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  request: Request
  response: Response
  pubsub: PubSub
}

let playerNameCntMap = new Map();
let playerNameTimestampMap = new Map();
let matchDetailCntMap = new Map();
let matchDetailTimestampMap = new Map();

/* create an RecentMatch obj */
function createRecentMatch(config: RecentMatch): {
  accountId: string, summonerName: string,
  gameId: string, champion: number, queue: string, season: number, timestamp: string
} {
  let newRecentMatch = {
    accountId: "null", summonerName: "null", gameId: "null", champion: -1, queue: "null", season: -1,
    timestamp: "null"
  };
  if (config.accountId) { newRecentMatch.accountId = config.accountId }
  if (config.summonerName) { newRecentMatch.summonerName = config.summonerName }
  if (config.gameId) { newRecentMatch.gameId = config.gameId }
  if (config.champion) { newRecentMatch.champion = config.champion }
  if (config.queue) { newRecentMatch.queue = config.queue }
  if (config.season) { newRecentMatch.season = config.season }
  if (config.timestamp) { newRecentMatch.timestamp = config.timestamp }
  return newRecentMatch;
}

/* create an playerDetail obj */
function createPlayerDetail(config: PlayerDetail): {
  timeStamp: number, summonerId: string,
  accountId: string, summonerName: string, profileIconId: number, summonerLevel: number,
  leaguePoints: number, tier: string, rank: string, wins: number, losses: number, winRate: float,
  recentMatches: Array<RecentMatch>
} {

  // create an default RecentMatch obj & RecentMatch array
  let defaultRecentMatch = createRecentMatch({
    accountId: "null", summonerName: "null", gameId: "null", champion: -1, queue: "null", season: -1,
    timestamp: "null"
  });
  let defaultRecentMatches: Array<RecentMatch> = [defaultRecentMatch, defaultRecentMatch, defaultRecentMatch, defaultRecentMatch,
    defaultRecentMatch, defaultRecentMatch, defaultRecentMatch, defaultRecentMatch, defaultRecentMatch, defaultRecentMatch];

  let newPlayerDetail = {
    timeStamp: -1, summonerId: "null",
    accountId: "null", summonerName: "null", profileIconId: -1, summonerLevel: -1,
    leaguePoints: -1, tier: "", rank: "", wins: -1, losses: -1, winRate: -1,
    recentMatches: defaultRecentMatches
  };

  if (config.timeStamp) { newPlayerDetail.timeStamp = config.timeStamp; }
  if (config.summonerId) { newPlayerDetail.summonerId = config.summonerId; }
  if (config.accountId) { newPlayerDetail.accountId = config.accountId; }
  if (config.summonerName) { newPlayerDetail.summonerName = config.summonerName; }
  if (config.profileIconId) { newPlayerDetail.profileIconId = config.profileIconId; }
  if (config.summonerLevel) { newPlayerDetail.summonerLevel = config.summonerLevel; }
  if (config.leaguePoints) { newPlayerDetail.leaguePoints = config.leaguePoints; }
  if (config.tier) { newPlayerDetail.tier = config.tier; }
  if (config.rank) { newPlayerDetail.rank = config.rank; }
  if (config.wins) { newPlayerDetail.wins = config.wins; }
  if (config.losses) { newPlayerDetail.losses = config.losses; }
  if (config.winRate) { newPlayerDetail.winRate = config.winRate; }
  if (config.recentMatches) { newPlayerDetail.recentMatches = config.recentMatches }

  return newPlayerDetail;
}

/* create a MatchDetail obj */
function createMatchDetail(config: MatchDetail): {
  gameId: string,
  queueId: string,
  gameType: string,
  gameDuration: string,
  mapId: string,
  gameMode: string,
  blueTowerKills: number,
  blueRiftHeraldKills: number,
  blueFirstBlood: boolean,
  blueInhibitorKills: number,
  blueFirstBaron: boolean,
  blueFirstDragon: boolean,
  blueDominionVictoryScore: number,
  blueDragonKills: number,
  blueBaronKills: number,
  blueFirstInhibitor: boolean,
  blueFirstTower: boolean,
  blueFirstRiftHerald: boolean,
  blueWin: string,
  redTowerKills: number,
  redRiftHeraldKills: number,
  redFirstBlood: boolean,
  redInhibitorKills: number,
  redFirstBaron: boolean,
  redFirstDragon: boolean,
  redDominionVictoryScore: number,
  redDragonKills: number,
  redBaronKills: number,
  redFirstInhibitor: boolean,
  redFirstTower: boolean,
  redFirstRiftHerald: boolean,
  redWin: string
  participants: Array<Participant>
} {
  let defaultParticipant = createParticipant({})
  let defaultParticipants: Array<Participant> = [defaultParticipant, defaultParticipant, defaultParticipant,
    defaultParticipant, defaultParticipant, defaultParticipant, defaultParticipant,
    defaultParticipant, defaultParticipant, defaultParticipant]


  let newMatchDetail = {
    gameId: "null", queueId: "null", gameType: "null",
    gameDuration: "null", mapId: "null", gameMode: "null",
    blueTowerKills: -1, blueRiftHeraldKills: -1,
    blueFirstBlood: false, blueInhibitorKills: -1, blueFirstBaron: false, blueFirstDragon: false,
    blueDominionVictoryScore: -1, blueDragonKills: -1, blueBaronKills: 1,
    blueFirstInhibitor: false, blueFirstTower: false,
    blueFirstRiftHerald: false, blueWin: "null",
    redTowerKills: -1, redRiftHeraldKills: -1,
    redFirstBlood: false, redInhibitorKills: -1, redFirstBaron: false, redFirstDragon: false,
    redDominionVictoryScore: -1, redDragonKills: -1, redBaronKills: 1,
    redFirstInhibitor: false, redFirstTower: false,
    redFirstRiftHerald: false, redWin: "null", participants: defaultParticipants
  };
  if (config.gameId) { newMatchDetail.gameId = config.gameId }
  if (config.queueId) { newMatchDetail.queueId = config.queueId }
  if (config.gameType) { newMatchDetail.gameType = config.gameType }
  if (config.gameDuration) { newMatchDetail.gameDuration = config.gameDuration }
  if (config.mapId) { newMatchDetail.mapId = config.mapId }
  if (config.gameMode) { newMatchDetail.gameMode = config.gameMode }
  if (config.blueTowerKills) { newMatchDetail.blueTowerKills = config.blueTowerKills }
  if (config.blueRiftHeraldKills) { newMatchDetail.blueRiftHeraldKills = config.blueRiftHeraldKills }
  if (config.blueFirstBlood) { newMatchDetail.blueFirstBlood = config.blueFirstBlood }
  if (config.blueInhibitorKills) { newMatchDetail.blueInhibitorKills = config.blueInhibitorKills }
  if (config.blueFirstBaron) { newMatchDetail.blueFirstBaron = config.blueFirstBaron }
  if (config.blueFirstDragon) { newMatchDetail.blueFirstDragon = config.blueFirstDragon }
  if (config.blueDominionVictoryScore) { newMatchDetail.blueDominionVictoryScore = config.blueDominionVictoryScore }
  if (config.blueDragonKills) { newMatchDetail.blueDragonKills = config.blueDragonKills }
  if (config.blueBaronKills) { newMatchDetail.blueBaronKills = config.blueBaronKills }
  if (config.blueFirstInhibitor) { newMatchDetail.blueFirstInhibitor = config.blueFirstInhibitor }
  if (config.blueFirstTower) { newMatchDetail.blueFirstTower = config.blueFirstTower }
  if (config.blueFirstRiftHerald) { newMatchDetail.blueFirstRiftHerald = config.blueFirstRiftHerald }
  if (config.blueWin) { newMatchDetail.blueWin = config.blueWin }
  if (config.redTowerKills) { newMatchDetail.redTowerKills = config.redTowerKills }
  if (config.redRiftHeraldKills) { newMatchDetail.redRiftHeraldKills = config.redRiftHeraldKills }
  if (config.redFirstBlood) { newMatchDetail.redFirstBlood = config.redFirstBlood }
  if (config.redInhibitorKills) { newMatchDetail.redInhibitorKills = config.redInhibitorKills }
  if (config.redFirstBaron) { newMatchDetail.redFirstBaron = config.redFirstBaron }
  if (config.redFirstDragon) { newMatchDetail.redFirstDragon = config.redFirstDragon }
  if (config.redDominionVictoryScore) { newMatchDetail.redDominionVictoryScore = config.redDominionVictoryScore }
  if (config.redDragonKills) { newMatchDetail.redDragonKills = config.redDragonKills }
  if (config.redBaronKills) { newMatchDetail.redBaronKills = config.redBaronKills }
  if (config.redFirstInhibitor) { newMatchDetail.redFirstInhibitor = config.redFirstInhibitor }
  if (config.redFirstTower) { newMatchDetail.redFirstTower = config.redFirstTower }
  if (config.redFirstRiftHerald) { newMatchDetail.redFirstRiftHerald = config.redFirstRiftHerald }
  if (config.redWin) { newMatchDetail.redWin = config.redWin }
  if (config.participants) { newMatchDetail.participants = config.participants }
  return newMatchDetail;
}

function createParticipant(config: Participant): {
  gameId: string,
  participantId: number,
  participantName: string,
  championId: number,
  teamId: number,
  spell1Id: number,
  spell2Id: number,
  perk0: number,
  perk1: number,
  perk2: number,
  perk3: number,
  perk4: number,
  perk5: number,
  perkPrimaryStyle: number,
  perkSubStyle: number,
  statPerk0: number,
  statPerk1: number,
  statPerk2: number,
  item0: number,
  item1: number,
  item2: number,
  item3: number,
  item4: number,
  item5: number,
  item6: number,
  goldEarned: number,
  goldSpent: number,
  totalDamageTaken: number,
  totalHeal: number,
  totalPlayerScore: number,
  champLevel: number,
  totalDamageDealtToChampions: number,
  kills: number,
  deaths: number,
  assist: number,
  damageSelfMitigated: number,
  totalMinionsKilled: number,
} {
  let newParticipant = {
    gameId: "null",
    participantId: -1,
    participantName: "null",
    championId: -1,
    teamId: -1,
    spell1Id: -1,
    spell2Id: -1,
    perk0: -1,
    perk1: -1,
    perk2: -1,
    perk3: -1,
    perk4: -1,
    perk5: -1,
    perkPrimaryStyle: -1,
    perkSubStyle: -1,
    statPerk0: -1,
    statPerk1: -1,
    statPerk2: -1,
    item0: -1,
    item1: -1,
    item2: -1,
    item3: -1,
    item4: -1,
    item5: -1,
    item6: -1,
    goldEarned: 0,
    goldSpent: 0,
    totalDamageTaken: 0,
    totalHeal: 0,
    totalPlayerScore: 0,
    champLevel: 0,
    totalDamageDealtToChampions: 0,
    kills: 0,
    deaths: 0,
    assist: 0,
    damageSelfMitigated: 0,
    totalMinionsKilled: 0
  };
  if (config.gameId) { newParticipant.gameId = config.gameId }
  if (config.participantId) { newParticipant.participantId = config.participantId }
  if (config.participantName) { newParticipant.participantName = config.participantName }
  if (config.championId) { newParticipant.championId = config.championId }
  if (config.teamId) { newParticipant.teamId = config.teamId }
  if (config.spell1Id) { newParticipant.spell1Id = config.spell1Id }
  if (config.spell2Id) { newParticipant.spell2Id = config.spell2Id }
  if (config.perk0) { newParticipant.perk0 = config.perk0 }
  if (config.perk1) { newParticipant.perk1 = config.perk1 }
  if (config.perk2) { newParticipant.perk2 = config.perk2 }
  if (config.perk3) { newParticipant.perk3 = config.perk3 }
  if (config.perk4) { newParticipant.perk4 = config.perk4 }
  if (config.perk5) { newParticipant.perk5 = config.perk5 }
  if (config.perkPrimaryStyle) { newParticipant.perkPrimaryStyle = config.perkPrimaryStyle }
  if (config.perkSubStyle) { newParticipant.perkSubStyle = config.perkSubStyle }
  if (config.statPerk0) { newParticipant.statPerk0 = config.statPerk0 }
  if (config.statPerk1) { newParticipant.statPerk1 = config.statPerk1 }
  if (config.statPerk2) { newParticipant.statPerk2 = config.statPerk2 }
  if (config.item0) { newParticipant.item0 = config.item0 }
  if (config.item1) { newParticipant.item1 = config.item1 }
  if (config.item2) { newParticipant.item2 = config.item2 }
  if (config.item3) { newParticipant.item3 = config.item3 }
  if (config.item4) { newParticipant.item4 = config.item4 }
  if (config.item5) { newParticipant.item5 = config.item5 }
  if (config.item6) { newParticipant.item6 = config.item6 }
  if (config.goldEarned) { newParticipant.goldEarned = config.goldEarned }
  if (config.goldSpent) { newParticipant.goldSpent = config.goldSpent }
  if (config.totalDamageTaken) { newParticipant.totalDamageTaken = config.totalDamageTaken }
  if (config.totalHeal) { newParticipant.totalHeal = config.totalHeal }
  if (config.totalPlayerScore) { newParticipant.totalPlayerScore = config.totalPlayerScore }
  if (config.champLevel) { newParticipant.champLevel = config.champLevel }
  if (config.totalDamageDealtToChampions) { newParticipant.totalDamageDealtToChampions = config.totalDamageDealtToChampions }
  if (config.kills) { newParticipant.kills = config.kills }
  if (config.deaths) { newParticipant.deaths = config.deaths }
  if (config.assist) { newParticipant.assist = config.assist }
  if (config.damageSelfMitigated) { newParticipant.damageSelfMitigated = config.damageSelfMitigated }
  if (config.totalMinionsKilled) { newParticipant.totalMinionsKilled = config.totalMinionsKilled }
  return newParticipant
}

let API = {key: "null"}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    saveAPI: async(_, { apiKey }) => {
            API.key = apiKey
            return API
          },
    /* received graphQL call to fetch playerDetail */
    matchDetail: async (_, { gameId }) => {
      // console.log("Received gameId: " + gameId);

      // update how many times the gameId has been searched
      let matchDetailCnt = 1;
      let matchDetailThreshold = 5
      let secondsSinceEpoch = Math.round(new Date().getTime() / 1000)
      if (matchDetailTimestampMap.has(gameId) && secondsSinceEpoch - matchDetailTimestampMap.get(gameId) <= 1800 && matchDetailCntMap.has(gameId)) {
        matchDetailCnt = matchDetailCntMap.get(gameId) + 1;
        if (matchDetailCnt > matchDetailThreshold) {
          console.log("Get MatchDetail " + gameId + " from redis!")
          var returnMatchDetail: any
          var returnParticipants: Participant[] = [];

          await redis.get(gameId).then(function (result: any) {
            returnMatchDetail = JSON.parse(result)
          });

          for (let i = 1; i < 11; i++) {
            let returnParticipant = createParticipant({
              gameId: returnMatchDetail[i].gameId,
              participantId: returnMatchDetail[i].participantId,
              participantName: returnMatchDetail[i].participantName,
              championId: returnMatchDetail[i].championId,
              teamId: returnMatchDetail[i].teamId,
              spell1Id: returnMatchDetail[i].spell1Id,
              spell2Id: returnMatchDetail[i].spell2Id,
              perk0: returnMatchDetail[i].perk0,
              perk1: returnMatchDetail[i].perk1,
              perk2: returnMatchDetail[i].perk2,
              perk3: returnMatchDetail[i].perk3,
              perk4: returnMatchDetail[i].perk4,
              perk5: returnMatchDetail[i].perk5,
              perkPrimaryStyle: returnMatchDetail[i].perkPrimaryStyle,
              perkSubStyle: returnMatchDetail[i].perkSubStyle,
              statPerk0: returnMatchDetail[i].statPerk0,
              statPerk1: returnMatchDetail[i].statPerk1,
              statPerk2: returnMatchDetail[i].statPerk2,
              item0: returnMatchDetail[i].item0,
              item1: returnMatchDetail[i].item1,
              item2: returnMatchDetail[i].item2,
              item3: returnMatchDetail[i].item3,
              item4: returnMatchDetail[i].item4,
              item5: returnMatchDetail[i].item5,
              item6: returnMatchDetail[i].item6,
              goldEarned: returnMatchDetail[i].goldEarned,
              goldSpent: returnMatchDetail[i].goldSpent,
              totalDamageTaken: returnMatchDetail[i].totalDamageTaken,
              totalHeal: returnMatchDetail[i].totalHeal,
              totalPlayerScore: returnMatchDetail[i].totalPlayerScore,
              champLevel: returnMatchDetail[i].champLevel,
              totalDamageDealtToChampions: returnMatchDetail[i].totalDamageDealtToChampions,
              kills: returnMatchDetail[i].kills,
              deaths: returnMatchDetail[i].deaths,
              assist: returnMatchDetail[i].assist,
              damageSelfMitigated: returnMatchDetail[i].damageSelfMitigated,
              totalMinionsKilled: returnMatchDetail[i].totalMinionsKilled
            })
            returnParticipants.push(returnParticipant)
          }

          let MatchDetail = createMatchDetail({
            gameId: returnMatchDetail[0].gameId,
            queueId: returnMatchDetail[0].queueId,
            gameType: returnMatchDetail[0].gameType,
            gameDuration: returnMatchDetail[0].gameDuration,
            mapId: returnMatchDetail[0].mapId,
            gameMode: returnMatchDetail[0].gameMode,
            blueTowerKills: returnMatchDetail[0].blueTowerKills,
            blueRiftHeraldKills: returnMatchDetail[0].blueRiftHeraldKills,
            blueFirstBlood: returnMatchDetail[0].blueFirstBlood,
            blueInhibitorKills: returnMatchDetail[0].blueInhibitorKills,
            blueFirstBaron: returnMatchDetail[0].blueFirstBaron,
            blueFirstDragon: returnMatchDetail[0].blueFirstDragon,
            blueDominionVictoryScore: returnMatchDetail[0].blueDominionVictoryScore,
            blueDragonKills: returnMatchDetail[0].blueDragonKills,
            blueBaronKills: returnMatchDetail[0].blueBaronKills,
            blueFirstInhibitor: returnMatchDetail[0].blueFirstInhibitor,
            blueFirstTower: returnMatchDetail[0].blueFirstTower,
            blueFirstRiftHerald: returnMatchDetail[0].blueFirstRiftHerald,
            blueWin: returnMatchDetail[0].blueWin,
            redTowerKills: returnMatchDetail[0].redTowerKills,
            redRiftHeraldKills: returnMatchDetail[0].redRiftHeraldKills,
            redFirstBlood: returnMatchDetail[0].redFirstBlood,
            redInhibitorKills: returnMatchDetail[0].redInhibitorKills,
            redFirstBaron: returnMatchDetail[0].redFirstBaron,
            redFirstDragon: returnMatchDetail[0].redFirstDragon,
            redDominionVictoryScore: returnMatchDetail[0].redDominionVictoryScore,
            redDragonKills: returnMatchDetail[0].redDragonKills,
            redBaronKills: returnMatchDetail[0].redBaronKills,
            redFirstInhibitor: returnMatchDetail[0].redFirstInhibitor,
            redFirstTower: returnMatchDetail[0].redFirstTower,
            redFirstRiftHerald: returnMatchDetail[0].redFirstRiftHerald,
            redWin: returnMatchDetail[0].redWin,
            participants: returnParticipants
          })

          return MatchDetail;
        }
      }
      matchDetailCntMap.set(gameId, matchDetailCnt);
      matchDetailTimestampMap.set(gameId, secondsSinceEpoch)

      var riotAPI = new RiotAPI(API.key)
      var jsonObj: any
      jsonObj = await riotAPI.getMatchDetail(gameId)
      if (!jsonObj) {
        let returnMatchDetail = createMatchDetail({})
        return returnMatchDetail
      }
      var returnMatchDetail: any
      var returnParticipants: Participant[] = [];
      returnMatchDetail = JSON.parse(JSON.stringify(jsonObj))
      for (let i = 1; i < 11; i++) {
        let returnParticipant = createParticipant({
          gameId: returnMatchDetail[i].gameId,
          participantId: returnMatchDetail[i].participantId,
          participantName: returnMatchDetail[i].participantName,
          championId: returnMatchDetail[i].championId,
          teamId: returnMatchDetail[i].teamId,
          spell1Id: returnMatchDetail[i].spell1Id,
          spell2Id: returnMatchDetail[i].spell2Id,
          perk0: returnMatchDetail[i].perk0,
          perk1: returnMatchDetail[i].perk1,
          perk2: returnMatchDetail[i].perk2,
          perk3: returnMatchDetail[i].perk3,
          perk4: returnMatchDetail[i].perk4,
          perk5: returnMatchDetail[i].perk5,
          perkPrimaryStyle: returnMatchDetail[i].perkPrimaryStyle,
          perkSubStyle: returnMatchDetail[i].perkSubStyle,
          statPerk0: returnMatchDetail[i].statPerk0,
          statPerk1: returnMatchDetail[i].statPerk1,
          statPerk2: returnMatchDetail[i].statPerk2,
          item0: returnMatchDetail[i].item0,
          item1: returnMatchDetail[i].item1,
          item2: returnMatchDetail[i].item2,
          item3: returnMatchDetail[i].item3,
          item4: returnMatchDetail[i].item4,
          item5: returnMatchDetail[i].item5,
          item6: returnMatchDetail[i].item6,
          goldEarned: returnMatchDetail[i].goldEarned,
          goldSpent: returnMatchDetail[i].goldSpent,
          totalDamageTaken: returnMatchDetail[i].totalDamageTaken,
          totalHeal: returnMatchDetail[i].totalHeal,
          totalPlayerScore: returnMatchDetail[i].totalPlayerScore,
          champLevel: returnMatchDetail[i].champLevel,
          totalDamageDealtToChampions: returnMatchDetail[i].totalDamageDealtToChampions,
          kills: returnMatchDetail[i].kills,
          deaths: returnMatchDetail[i].deaths,
          assist: returnMatchDetail[i].assist,
          damageSelfMitigated: returnMatchDetail[i].damageSelfMitigated,
          totalMinionsKilled: returnMatchDetail[i].totalMinionsKilled
        })
        returnParticipants.push(returnParticipant)
      }

      let MatchDetail = createMatchDetail({
        gameId: returnMatchDetail[0].gameId,
        queueId: returnMatchDetail[0].queueId,
        gameType: returnMatchDetail[0].gameType,
        gameDuration: returnMatchDetail[0].gameDuration,
        mapId: returnMatchDetail[0].mapId,
        gameMode: returnMatchDetail[0].gameMode,
        blueTowerKills: returnMatchDetail[0].blueTowerKills,
        blueRiftHeraldKills: returnMatchDetail[0].blueRiftHeraldKills,
        blueFirstBlood: returnMatchDetail[0].blueFirstBlood,
        blueInhibitorKills: returnMatchDetail[0].blueInhibitorKills,
        blueFirstBaron: returnMatchDetail[0].blueFirstBaron,
        blueFirstDragon: returnMatchDetail[0].blueFirstDragon,
        blueDominionVictoryScore: returnMatchDetail[0].blueDominionVictoryScore,
        blueDragonKills: returnMatchDetail[0].blueDragonKills,
        blueBaronKills: returnMatchDetail[0].blueBaronKills,
        blueFirstInhibitor: returnMatchDetail[0].blueFirstInhibitor,
        blueFirstTower: returnMatchDetail[0].blueFirstTower,
        blueFirstRiftHerald: returnMatchDetail[0].blueFirstRiftHerald,
        blueWin: returnMatchDetail[0].blueWin,
        redTowerKills: returnMatchDetail[0].redTowerKills,
        redRiftHeraldKills: returnMatchDetail[0].redRiftHeraldKills,
        redFirstBlood: returnMatchDetail[0].redFirstBlood,
        redInhibitorKills: returnMatchDetail[0].redInhibitorKills,
        redFirstBaron: returnMatchDetail[0].redFirstBaron,
        redFirstDragon: returnMatchDetail[0].redFirstDragon,
        redDominionVictoryScore: returnMatchDetail[0].redDominionVictoryScore,
        redDragonKills: returnMatchDetail[0].redDragonKills,
        redBaronKills: returnMatchDetail[0].redBaronKills,
        redFirstInhibitor: returnMatchDetail[0].redFirstInhibitor,
        redFirstTower: returnMatchDetail[0].redFirstTower,
        redFirstRiftHerald: returnMatchDetail[0].redFirstRiftHerald,
        redWin: returnMatchDetail[0].redWin,
        participants: returnParticipants
      })

      if (matchDetailCnt === matchDetailThreshold) {
        console.log("MatchDetail "+ gameId + " has been searched for "+ matchDetailThreshold + " times, save it to redis!")
        await redis.set(gameId, JSON.stringify(jsonObj));
      }

      return MatchDetail
    },

    /* received graphQL call to fetch playerDetail */
    playerDetail: async (_, { playerName }) => {
      // console.log("Received PlayerName: " + playerName)

      // update how many times the player name has been searched
      let playerNameCnt = 1;
      let playerNameThreshold = 10
      let secondsSinceEpoch = Math.round(new Date().getTime() / 1000)
      if (playerNameTimestampMap.has(playerName) && secondsSinceEpoch - playerNameTimestampMap.get(playerName) <= 1800 && playerNameCntMap.has(playerName)) {
        playerNameCnt = playerNameCntMap.get(playerName) + 1;
        // get from redis
        if (playerNameCnt > playerNameThreshold) {
          let playerDetailObjFromRedis: any
          await redis.get(playerName).then(function (result: any) {
            console.log("get " + playerName + "'s PlayerDetail from redis!")
            // console.log("####### " + result)
            playerDetailObjFromRedis = JSON.parse(result);
          });
          // let recentMatchObjFromRedis: any
          let returnRecentMatches: RecentMatch[] = [];
          await redis.get(playerName + "#RM").then(function (result: any) {
            console.log("get " + playerName + "'s RecentMatch from redis!")
            // console.log("####### " + result)
            var recentMatches = JSON.parse(result);
            for (let i = 0; i < 10; i++) {
              returnRecentMatch = createRecentMatch({
                accountId: recentMatches[i].accountId, summonerName: recentMatches[i].summonerName,
                gameId: recentMatches[i].gameId, champion: recentMatches[i].champion,
                queue: recentMatches[i].queue, season: recentMatches[i].season, timestamp: recentMatches[i].timestamp
              })
              returnRecentMatches.push(returnRecentMatch)
            }
          });
          let returnPlayerDetail = createPlayerDetail({
            timeStamp: playerDetailObjFromRedis.timestamp, summonerId: playerDetailObjFromRedis.summonerId,
            accountId: playerDetailObjFromRedis.accountid, summonerName: playerDetailObjFromRedis.summonername, profileIconId: playerDetailObjFromRedis.profileiconid,
            summonerLevel: playerDetailObjFromRedis.summonerlevel, leaguePoints: playerDetailObjFromRedis.leaguepoints, tier: playerDetailObjFromRedis.tier, rank: playerDetailObjFromRedis.rank,
            wins: playerDetailObjFromRedis.wins, losses: playerDetailObjFromRedis.losses, winRate: playerDetailObjFromRedis.winrate, recentMatches: returnRecentMatches
          });
          // console.log(returnPlayerDetail)
          return returnPlayerDetail
        }
      }
      playerNameCntMap.set(playerName, playerNameCnt);
      playerNameTimestampMap.set(playerName, secondsSinceEpoch)

      var riotAPI = new RiotAPI(API.key)
      var jsonObj: any
      var playerDetailAndRecentMatchesJSON : any
      jsonObj = await riotAPI.getSummonerByNameAndRecentMatch(playerName)
      //console.log(JSON.stringify(jsonObj))
      if(jsonObj){
        playerDetailAndRecentMatchesJSON = JSON.parse(JSON.stringify(jsonObj))
      }
      if (!jsonObj) {//failed to search for summoner
        let returnPlayerDetail = createPlayerDetail({
          timeStamp: null, summonerId: null,
          accountId: null, summonerName: null, profileIconId: null,
          summonerLevel: null, leaguePoints: null, tier: null, rank: null,
          wins: null, losses: null, winRate: null
        });
        return returnPlayerDetail
      }


      // create an RecentMatch obj & RecentMatch array
      var returnRecentMatch: any
      let returnRecentMatches: RecentMatch[] = [];
      var recentMatches : any
      if (!jsonObj) {
        returnRecentMatch = createRecentMatch({
          accountId: null, summonerName: null, gameId: null, champion: -1, queue: null, season: -1,
          timestamp: null
        });
        for (let i = 0; i < 10; i++) {
          returnRecentMatches.push(returnRecentMatch)
        }
      } else {
        recentMatches = playerDetailAndRecentMatchesJSON[1]
        for (let i = 0; i < 10; i++) {
          returnRecentMatch = createRecentMatch({
            accountId: recentMatches[i].accountId, summonerName: recentMatches[i].summonerName,
            gameId: recentMatches[i].gameId, champion: recentMatches[i].champion,
            queue: recentMatches[i].queue, season: recentMatches[i].season, timestamp: recentMatches[i].timestamp,
          })
          returnRecentMatches.push(returnRecentMatch)
        }
      }

      // create an playerDetail obj
      var playerDetail = playerDetailAndRecentMatchesJSON[0]
      let returnPlayerDetail = createPlayerDetail({
        timeStamp: playerDetail.timestamp, summonerId: playerDetail.summonerId,
        accountId: playerDetail.accountid, summonerName: playerDetail.summonername, profileIconId: playerDetail.profileiconid,
        summonerLevel: playerDetail.summonerlevel, leaguePoints: playerDetail.leaguepoints, tier: playerDetail.tier, rank: playerDetail.rank,
        wins: playerDetail.wins, losses: playerDetail.losses, winRate: playerDetail.winrate, recentMatches: returnRecentMatches
      });
      //console.log("playerDetail: " + playerDetail)
      // console.log("sending back player's detail and recentMatches")

      // reached threshold, store player name to redis
      if (playerNameCnt === playerNameThreshold) {
        console.log(playerName + " has been searched for "+ playerNameThreshold +" times, save it to redis!")
        await redis.set(playerName, JSON.stringify(playerDetail));
        await redis.set(playerName + "#RM", JSON.stringify(recentMatches))
      }

      return returnPlayerDetail
    },
  },

  Mutation: {
    // answerSurvey: async (_, { input }, ctx) => {
    //   const { answer, questionId } = input
    //   const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

    //   const surveyAnswer = new SurveyAnswer()
    //   surveyAnswer.question = question
    //   surveyAnswer.answer = answer
    //   await surveyAnswer.save()

    //   question.survey.currentQuestion?.answers.push(surveyAnswer)
    //   ctx.pubsub.publish('SURVEY_UPDATE_' + question.survey.id, question.survey)

    //   return true
    // },
    // nextSurveyQuestion: async (_, { surveyId }, ctx) => {
    //   // check(ctx.user?.userType === UserType.Admin)
    //   const survey = check(await Survey.findOne({ where: { id: surveyId } }))
    //   survey.currQuestion = survey.currQuestion == null ? 0 : survey.currQuestion + 1
    //   await survey.save()
    //   ctx.pubsub.publish('SURVEY_UPDATE_' + surveyId, survey)
    //   return survey
    // },
  },
  Subscription: {
    // surveyUpdates: {
    //   subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
    //   resolve: (payload: any) => payload,
    // },
  },
}