import { float } from 'aws-sdk/clients/lightsail'
import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { RiotAPI } from '../riotAPI'
import { PlayerDetail, RecentMatch, Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: User | null
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

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),

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
    }
  },
  Mutation: {
    answerSurvey: async (_, { input }, ctx) => {
      const { answer, questionId } = input
      const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

      const surveyAnswer = new SurveyAnswer()
      surveyAnswer.question = question
      surveyAnswer.answer = answer
      await surveyAnswer.save()

      question.survey.currentQuestion?.answers.push(surveyAnswer)
      ctx.pubsub.publish('SURVEY_UPDATE_' + question.survey.id, question.survey)

      return true
    },
    nextSurveyQuestion: async (_, { surveyId }, ctx) => {
      // check(ctx.user?.userType === UserType.Admin)
      const survey = check(await Survey.findOne({ where: { id: surveyId } }))
      survey.currQuestion = survey.currQuestion == null ? 0 : survey.currQuestion + 1
      await survey.save()
      ctx.pubsub.publish('SURVEY_UPDATE_' + surveyId, survey)
      return survey
    },
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
  },
}
