import { float } from 'aws-sdk/clients/lightsail'
import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { RiotAPI } from '../riotAPI'
import { MatchDetail, Participant, PlayerDetail, RecentMatch, Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  request: Request
  response: Response
  pubsub: PubSub
}

/* create an RecentMatch obj */
function createRecentMatch(config: RecentMatch): {
  accountId: string, summonerName: string, platformId: string,
  gameId: string, champion: number, queue: string, season: number, timestamp: string, role: string, lane: string
} {
  let newRecentMatch = {
    accountId: "null", summonerName: "null", platformId: "null", gameId: "null", champion: -1, queue: "null", season: -1,
    timestamp: "null", role: "null", lane: "null"
  };
  if (config.accountId) { newRecentMatch.accountId = config.accountId }
  if (config.summonerName) { newRecentMatch.summonerName = config.summonerName }
  if (config.platformId) { newRecentMatch.platformId = config.platformId }
  if (config.gameId) { newRecentMatch.gameId = config.gameId }
  if (config.champion) { newRecentMatch.champion = config.champion }
  if (config.queue) { newRecentMatch.queue = config.queue }
  if (config.season) { newRecentMatch.season = config.season }
  if (config.timestamp) { newRecentMatch.timestamp = config.timestamp }
  if (config.role) { newRecentMatch.role = config.role }
  if (config.lane) { newRecentMatch.lane = config.lane }
  return newRecentMatch;
}

/* create an playerDetail obj */
function createPlayerDetail(config: PlayerDetail): {
  timeStamp: number, summonerId: string,
  accountId: string, summonerName: string, profileIconId: number, summonerLevel: number,
  leaguePoints: number, rank: string, wins: number, losses: number, winRate: float,
  veteran: boolean, inactive: boolean, hotStreak: boolean, recentMatches: Array<RecentMatch>
} {

  // create an default RecentMatch obj & RecentMatch array
  let defaultRecentMatch = createRecentMatch({
    accountId: "null", summonerName: "null", platformId: "null", gameId: "null", champion: -1, queue: "null", season: -1,
    timestamp: "null", role: "null", lane: "null"
  });
  let defaultRecentMatches: Array<RecentMatch> = [defaultRecentMatch, defaultRecentMatch, defaultRecentMatch, defaultRecentMatch,
    defaultRecentMatch, defaultRecentMatch, defaultRecentMatch, defaultRecentMatch, defaultRecentMatch, defaultRecentMatch];

  let newPlayerDetail = {
    timeStamp: -1, summonerId: "null",
    accountId: "null", summonerName: "null", profileIconId: -1, summonerLevel: -1,
    leaguePoints: -1, rank: "", wins: -1, losses: -1, winRate: -1,
    veteran: false, inactive: false, hotStreak: false, recentMatches: defaultRecentMatches
  };

  if (config.timeStamp) { newPlayerDetail.timeStamp = config.timeStamp; }
  if (config.summonerId) { newPlayerDetail.summonerId = config.summonerId; }
  if (config.accountId) { newPlayerDetail.accountId = config.accountId; }
  if (config.summonerName) { newPlayerDetail.summonerName = config.summonerName; }
  if (config.profileIconId) { newPlayerDetail.profileIconId = config.profileIconId; }
  if (config.summonerLevel) { newPlayerDetail.summonerLevel = config.summonerLevel; }
  if (config.leaguePoints) { newPlayerDetail.leaguePoints = config.leaguePoints; }
  if (config.rank) { newPlayerDetail.rank = config.rank; }
  if (config.wins) { newPlayerDetail.wins = config.wins; }
  if (config.losses) { newPlayerDetail.losses = config.losses; }
  if (config.winRate) { newPlayerDetail.winRate = config.winRate; }
  if (config.veteran) { newPlayerDetail.veteran = config.veteran }
  if (config.inactive) { newPlayerDetail.inactive = config.inactive; }
  if (config.hotStreak) { newPlayerDetail.hotStreak = config.hotStreak; }
  if (config.recentMatches) { newPlayerDetail.recentMatches = config.recentMatches }

  return newPlayerDetail;
}

/* create a MatchDetail obj */
function createMatchDetail(config: MatchDetail): {
  gameId: string,
  queueId: string,
  gameType: string,
  gameDuration: string,
  platformId: string,
  gameCreation: string,
  seasonId: string,
  gameVersion: string,
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
  blueVilemawKills: number,
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
  redVilemawKills: number,
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
    gameDuration: "null", platformId: "null", gameCreation: "null", seasonId: "null",
    gameVersion: "null", mapId: "null", gameMode: "null",
    blueTowerKills: -1, blueRiftHeraldKills: -1,
    blueFirstBlood: false, blueInhibitorKills: -1, blueFirstBaron: false, blueFirstDragon: false,
    blueDominionVictoryScore: -1, blueDragonKills: -1, blueBaronKills: 1,
    blueFirstInhibitor: false, blueFirstTower: false, blueVilemawKills: 0,
    blueFirstRiftHerald: false, blueWin: "null",
    redTowerKills: -1, redRiftHeraldKills: -1,
    redFirstBlood: false, redInhibitorKills: -1, redFirstBaron: false, redFirstDragon: false,
    redDominionVictoryScore: -1, redDragonKills: -1, redBaronKills: 1,
    redFirstInhibitor: false, redFirstTower: false, redVilemawKills: 0,
    redFirstRiftHerald: false, redWin: "null", participants: defaultParticipants
  };
  if (config.gameId) { newMatchDetail.gameId = config.gameId }
  if (config.queueId) { newMatchDetail.queueId = config.queueId }
  if (config.gameType) { newMatchDetail.gameType = config.gameType }
  if (config.gameDuration) { newMatchDetail.gameDuration = config.gameDuration }
  if (config.platformId) { newMatchDetail.platformId = config.platformId }
  if (config.gameCreation) { newMatchDetail.gameCreation = config.gameCreation }
  if (config.seasonId) { newMatchDetail.seasonId = config.seasonId }
  if (config.gameVersion) { newMatchDetail.gameVersion = config.gameVersion }
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
  if (config.blueVilemawKills) { newMatchDetail.blueVilemawKills = config.blueVilemawKills }
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
  if (config.redVilemawKills) { newMatchDetail.redVilemawKills = config.redVilemawKills }
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
  perkPrimaryStyle: number,
  perkSubStyle: number,
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
    perkPrimaryStyle: -1,
    perkSubStyle: -1,
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
  if (config.perkPrimaryStyle) { newParticipant.perkPrimaryStyle = config.perkPrimaryStyle }
  if (config.perkSubStyle) { newParticipant.perkSubStyle = config.perkSubStyle }
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

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    /* received graphQL call to fetch playerDetail */
    matchDetail: async (_, { gameId }) => {
      console.log("Received gameId: " + gameId);
      var riotAPI = new RiotAPI("")
      var jsonObj: any
      await riotAPI.updateRecentMatchDetail(gameId)
      jsonObj = await riotAPI.getMatchDetail(gameId)
      console.log(JSON.parse(JSON.stringify(jsonObj)))
      console.log("got details")
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
          perkPrimaryStyle: returnMatchDetail[i].perkPrimaryStyle,
          perkSubStyle: returnMatchDetail[i].perkSubStyle,
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

      //console.log(returnMatchDetail[0].blueWin)

      let MatchDetail = createMatchDetail({
        gameId: returnMatchDetail[0].gameId,
        queueId: returnMatchDetail[0].queueId,
        gameType: returnMatchDetail[0].gameType,
        gameDuration: returnMatchDetail[0].gameDuration,
        platformId: returnMatchDetail[0].platformId,
        gameCreation: returnMatchDetail[0].gameCreation,
        seasonId: returnMatchDetail[0].seasonId,
        gameVersion: returnMatchDetail[0].gameVersion,
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
        blueVilemawKills: returnMatchDetail[0].blueVilemawKills,
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
        redVilemawKills: returnMatchDetail[0].redVilemawKills,
        redFirstRiftHerald: returnMatchDetail[0].redFirstRiftHerald,
        redWin: returnMatchDetail[0].redWin,
        participants: returnParticipants
      })

      //console.log(MatchDetail)
      return MatchDetail
    },

    /* received graphQL call to fetch playerDetail */
    playerDetail: async (_, { playerName }) => {
      console.log("Received PlayerName: " + playerName)
      var riotAPI = new RiotAPI("")
      var jsonObj: any
      jsonObj = await riotAPI.getSummonerByName(playerName)
      if (!jsonObj) {//failed to search for summoner
        let returnPlayerDetail = createPlayerDetail({
          timeStamp: null, summonerId: null,
          accountId: null, summonerName: null, profileIconId: null,
          summonerLevel: null, leaguePoints: null, rank: null,
          wins: null, losses: null, winRate: null, veteran: null,
          inactive: null, hotStreak: null
        });
        return returnPlayerDetail
      }

      // create an RecentMatch obj & RecentMatch array
      var returnRecentMatch: any
      let returnRrecentMatches: RecentMatch[] = [];
      var recentMatchesObj: any
      recentMatchesObj = await riotAPI.getRecentMatches(playerName)
      if (!recentMatchesObj) {
        returnRecentMatch = createRecentMatch({
          accountId: null, summonerName: null, platformId: null, gameId: null, champion: -1, queue: null, season: -1,
          timestamp: null, role: null, lane: null
        });
        for (let i = 0; i < 10; i++) {
          returnRrecentMatches.push(returnRecentMatch)
        }
      } else {
        var recentMatches = JSON.parse(JSON.stringify(recentMatchesObj))
        for (let i = 0; i < 10; i++) {
          returnRecentMatch = createRecentMatch({
            accountId: recentMatches[i].accountId, summonerName: recentMatches[i].summonerName,
            platformId: recentMatches[i].platformId, gameId: recentMatches[i].gameId, champion: recentMatches[i].champion,
            queue: recentMatches[i].queue, season: recentMatches[i].season, timestamp: recentMatches[i].timestamp,
            role: recentMatches[i].role, lane: recentMatches[i].lane
          })
          returnRrecentMatches.push(returnRecentMatch)
        }
      }

      // create an playerDetail obj
      var playerDetail = JSON.parse(JSON.stringify(jsonObj))
      let returnPlayerDetail = createPlayerDetail({
        timeStamp: playerDetail.timestamp, summonerId: playerDetail.summonerId,
        accountId: playerDetail.accountid, summonerName: playerDetail.summonername, profileIconId: playerDetail.profileiconid,
        summonerLevel: playerDetail.summonerlevel, leaguePoints: playerDetail.leaguepoints, rank: playerDetail.rank,
        wins: playerDetail.wins, losses: playerDetail.losses, winRate: playerDetail.winrate, veteran: playerDetail.veteran,
        inactive: playerDetail.inactive, hotStreak: playerDetail.hotstreak, recentMatches: returnRrecentMatches
      });
      console.log("playerDetail: " + playerDetail)

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
