import { GraphQLResolveInfo } from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface Query {
  __typename?: 'Query'
  self?: Maybe<User>
  surveys: Array<Survey>
  survey?: Maybe<Survey>
  playerDetail: PlayerDetail
  matchDetail: MatchDetail
  saveAPI: Api
}

export interface QuerySurveyArgs {
  surveyId: Scalars['Int']
}

export interface QueryPlayerDetailArgs {
  playerName: Scalars['String']
}

export interface QueryMatchDetailArgs {
  gameId: Scalars['String']
}

export interface QuerySaveApiArgs {
  apiKey: Scalars['String']
}

export interface Mutation {
  __typename?: 'Mutation'
  answerSurvey: Scalars['Boolean']
  nextSurveyQuestion?: Maybe<Survey>
}

export interface MutationAnswerSurveyArgs {
  input: SurveyInput
}

export interface MutationNextSurveyQuestionArgs {
  surveyId: Scalars['Int']
}

export interface Api {
  __typename?: 'API'
  key?: Maybe<Scalars['String']>
}

export interface PlayerDetail {
  __typename?: 'PlayerDetail'
  timeStamp?: Maybe<Scalars['Int']>
  summonerId?: Maybe<Scalars['String']>
  accountId?: Maybe<Scalars['String']>
  summonerName?: Maybe<Scalars['String']>
  profileIconId?: Maybe<Scalars['Int']>
  summonerLevel?: Maybe<Scalars['Int']>
  leaguePoints?: Maybe<Scalars['Int']>
  tier?: Maybe<Scalars['String']>
  rank?: Maybe<Scalars['String']>
  wins?: Maybe<Scalars['Int']>
  losses?: Maybe<Scalars['Int']>
  winRate?: Maybe<Scalars['Float']>
  veteran?: Maybe<Scalars['Boolean']>
  inactive?: Maybe<Scalars['Boolean']>
  hotStreak?: Maybe<Scalars['Boolean']>
  recentMatches?: Maybe<Array<RecentMatch>>
}

export interface RecentMatch {
  __typename?: 'RecentMatch'
  accountId?: Maybe<Scalars['String']>
  summonerName?: Maybe<Scalars['String']>
  platformId?: Maybe<Scalars['String']>
  gameId?: Maybe<Scalars['String']>
  champion?: Maybe<Scalars['Int']>
  queue?: Maybe<Scalars['String']>
  season?: Maybe<Scalars['Int']>
  timestamp?: Maybe<Scalars['String']>
  role?: Maybe<Scalars['String']>
  lane?: Maybe<Scalars['String']>
}

export interface MatchDetail {
  __typename?: 'MatchDetail'
  gameId?: Maybe<Scalars['String']>
  queueId?: Maybe<Scalars['String']>
  gameType?: Maybe<Scalars['String']>
  gameDuration?: Maybe<Scalars['String']>
  platformId?: Maybe<Scalars['String']>
  gameCreation?: Maybe<Scalars['String']>
  seasonId?: Maybe<Scalars['String']>
  gameVersion?: Maybe<Scalars['String']>
  mapId?: Maybe<Scalars['String']>
  gameMode?: Maybe<Scalars['String']>
  blueTowerKills?: Maybe<Scalars['Int']>
  blueRiftHeraldKills?: Maybe<Scalars['Int']>
  blueFirstBlood?: Maybe<Scalars['Boolean']>
  blueInhibitorKills?: Maybe<Scalars['Int']>
  blueFirstBaron?: Maybe<Scalars['Boolean']>
  blueFirstDragon?: Maybe<Scalars['Boolean']>
  blueDominionVictoryScore?: Maybe<Scalars['Int']>
  blueDragonKills?: Maybe<Scalars['Int']>
  blueBaronKills?: Maybe<Scalars['Int']>
  blueFirstInhibitor?: Maybe<Scalars['Boolean']>
  blueFirstTower?: Maybe<Scalars['Boolean']>
  blueVilemawKills?: Maybe<Scalars['Int']>
  blueFirstRiftHerald?: Maybe<Scalars['Boolean']>
  blueWin?: Maybe<Scalars['String']>
  redTowerKills?: Maybe<Scalars['Int']>
  redRiftHeraldKills?: Maybe<Scalars['Int']>
  redFirstBlood?: Maybe<Scalars['Boolean']>
  redInhibitorKills?: Maybe<Scalars['Int']>
  redFirstBaron?: Maybe<Scalars['Boolean']>
  redFirstDragon?: Maybe<Scalars['Boolean']>
  redDominionVictoryScore?: Maybe<Scalars['Int']>
  redDragonKills?: Maybe<Scalars['Int']>
  redBaronKills?: Maybe<Scalars['Int']>
  redFirstInhibitor?: Maybe<Scalars['Boolean']>
  redFirstTower?: Maybe<Scalars['Boolean']>
  redVilemawKills?: Maybe<Scalars['Int']>
  redFirstRiftHerald?: Maybe<Scalars['Boolean']>
  redWin?: Maybe<Scalars['String']>
  participants?: Maybe<Array<Participant>>
}

export interface Participant {
  __typename?: 'Participant'
  gameId?: Maybe<Scalars['String']>
  participantId?: Maybe<Scalars['Int']>
  participantName?: Maybe<Scalars['String']>
  championId?: Maybe<Scalars['Int']>
  teamId?: Maybe<Scalars['Int']>
  spell1Id?: Maybe<Scalars['Int']>
  spell2Id?: Maybe<Scalars['Int']>
  perk0?: Maybe<Scalars['Int']>
  perk1?: Maybe<Scalars['Int']>
  perk2?: Maybe<Scalars['Int']>
  perk3?: Maybe<Scalars['Int']>
  perk4?: Maybe<Scalars['Int']>
  perk5?: Maybe<Scalars['Int']>
  perkPrimaryStyle?: Maybe<Scalars['Int']>
  perkSubStyle?: Maybe<Scalars['Int']>
  statPerk0?: Maybe<Scalars['Int']>
  statPerk1?: Maybe<Scalars['Int']>
  statPerk2?: Maybe<Scalars['Int']>
  item0?: Maybe<Scalars['Int']>
  item1?: Maybe<Scalars['Int']>
  item2?: Maybe<Scalars['Int']>
  item3?: Maybe<Scalars['Int']>
  item4?: Maybe<Scalars['Int']>
  item5?: Maybe<Scalars['Int']>
  item6?: Maybe<Scalars['Int']>
  goldEarned?: Maybe<Scalars['Int']>
  totalDamageTaken?: Maybe<Scalars['Int']>
  totalHeal?: Maybe<Scalars['Int']>
  totalPlayerScore?: Maybe<Scalars['Int']>
  champLevel?: Maybe<Scalars['Int']>
  totalDamageDealtToChampions?: Maybe<Scalars['Int']>
  kills?: Maybe<Scalars['Int']>
  deaths?: Maybe<Scalars['Int']>
  assist?: Maybe<Scalars['Int']>
  damageSelfMitigated?: Maybe<Scalars['Int']>
  totalMinionsKilled?: Maybe<Scalars['Int']>
}

export interface Subscription {
  __typename?: 'Subscription'
  surveyUpdates?: Maybe<Survey>
}

export interface SubscriptionSurveyUpdatesArgs {
  surveyId: Scalars['Int']
}

export interface User {
  __typename?: 'User'
  id: Scalars['Int']
  userType: UserType
  email: Scalars['String']
  name: Scalars['String']
}

export enum UserType {
  Admin = 'ADMIN',
  User = 'USER',
}

export interface Survey {
  __typename?: 'Survey'
  id: Scalars['Int']
  name: Scalars['String']
  isStarted: Scalars['Boolean']
  isCompleted: Scalars['Boolean']
  currentQuestion?: Maybe<SurveyQuestion>
  questions: Array<Maybe<SurveyQuestion>>
}

export interface SurveyQuestion {
  __typename?: 'SurveyQuestion'
  id: Scalars['Int']
  prompt: Scalars['String']
  choices?: Maybe<Array<Scalars['String']>>
  answers: Array<SurveyAnswer>
  survey: Survey
}

export interface SurveyAnswer {
  __typename?: 'SurveyAnswer'
  id: Scalars['Int']
  answer: Scalars['String']
  question: SurveyQuestion
}

export interface SurveyInput {
  questionId: Scalars['Int']
  answer: Scalars['String']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  String: ResolverTypeWrapper<Scalars['String']>
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  API: ResolverTypeWrapper<Api>
  PlayerDetail: ResolverTypeWrapper<PlayerDetail>
  Float: ResolverTypeWrapper<Scalars['Float']>
  RecentMatch: ResolverTypeWrapper<RecentMatch>
  MatchDetail: ResolverTypeWrapper<MatchDetail>
  Participant: ResolverTypeWrapper<Participant>
  Subscription: ResolverTypeWrapper<{}>
  User: ResolverTypeWrapper<User>
  UserType: UserType
  Survey: ResolverTypeWrapper<Survey>
  SurveyQuestion: ResolverTypeWrapper<SurveyQuestion>
  SurveyAnswer: ResolverTypeWrapper<SurveyAnswer>
  SurveyInput: SurveyInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Int: Scalars['Int']
  String: Scalars['String']
  Mutation: {}
  Boolean: Scalars['Boolean']
  API: Api
  PlayerDetail: PlayerDetail
  Float: Scalars['Float']
  RecentMatch: RecentMatch
  MatchDetail: MatchDetail
  Participant: Participant
  Subscription: {}
  User: User
  Survey: Survey
  SurveyQuestion: SurveyQuestion
  SurveyAnswer: SurveyAnswer
  SurveyInput: SurveyInput
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  self?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  surveys?: Resolver<Array<ResolversTypes['Survey']>, ParentType, ContextType>
  survey?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<QuerySurveyArgs, 'surveyId'>
  >
  playerDetail?: Resolver<
    ResolversTypes['PlayerDetail'],
    ParentType,
    ContextType,
    RequireFields<QueryPlayerDetailArgs, 'playerName'>
  >
  matchDetail?: Resolver<
    ResolversTypes['MatchDetail'],
    ParentType,
    ContextType,
    RequireFields<QueryMatchDetailArgs, 'gameId'>
  >
  saveAPI?: Resolver<ResolversTypes['API'], ParentType, ContextType, RequireFields<QuerySaveApiArgs, 'apiKey'>>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  answerSurvey?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationAnswerSurveyArgs, 'input'>
  >
  nextSurveyQuestion?: Resolver<
    Maybe<ResolversTypes['Survey']>,
    ParentType,
    ContextType,
    RequireFields<MutationNextSurveyQuestionArgs, 'surveyId'>
  >
}

export type ApiResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['API'] = ResolversParentTypes['API']
> = {
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type PlayerDetailResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlayerDetail'] = ResolversParentTypes['PlayerDetail']
> = {
  timeStamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  summonerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  accountId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  summonerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  profileIconId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  summonerLevel?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  leaguePoints?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  tier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  rank?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  wins?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  losses?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  winRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  veteran?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  inactive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  hotStreak?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  recentMatches?: Resolver<Maybe<Array<ResolversTypes['RecentMatch']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type RecentMatchResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RecentMatch'] = ResolversParentTypes['RecentMatch']
> = {
  accountId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  summonerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  platformId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  gameId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  champion?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  queue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  season?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  timestamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lane?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type MatchDetailResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MatchDetail'] = ResolversParentTypes['MatchDetail']
> = {
  gameId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  queueId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  gameType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  gameDuration?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  platformId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  gameCreation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  seasonId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  gameVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  mapId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  gameMode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  blueTowerKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  blueRiftHeraldKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  blueFirstBlood?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  blueInhibitorKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  blueFirstBaron?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  blueFirstDragon?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  blueDominionVictoryScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  blueDragonKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  blueBaronKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  blueFirstInhibitor?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  blueFirstTower?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  blueVilemawKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  blueFirstRiftHerald?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  blueWin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  redTowerKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  redRiftHeraldKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  redFirstBlood?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  redInhibitorKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  redFirstBaron?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  redFirstDragon?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  redDominionVictoryScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  redDragonKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  redBaronKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  redFirstInhibitor?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  redFirstTower?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  redVilemawKills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  redFirstRiftHerald?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  redWin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  participants?: Resolver<Maybe<Array<ResolversTypes['Participant']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type ParticipantResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Participant'] = ResolversParentTypes['Participant']
> = {
  gameId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  participantId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  participantName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  championId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  teamId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  spell1Id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  spell2Id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  perk0?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  perk1?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  perk2?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  perk3?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  perk4?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  perk5?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  perkPrimaryStyle?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  perkSubStyle?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  statPerk0?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  statPerk1?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  statPerk2?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  item0?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  item1?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  item2?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  item3?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  item4?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  item5?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  item6?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  goldEarned?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  totalDamageTaken?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  totalHeal?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  totalPlayerScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  champLevel?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  totalDamageDealtToChampions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  kills?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  deaths?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  assist?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  damageSelfMitigated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  totalMinionsKilled?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  surveyUpdates?: SubscriptionResolver<
    Maybe<ResolversTypes['Survey']>,
    'surveyUpdates',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSurveyUpdatesArgs, 'surveyId'>
  >
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  userType?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Survey'] = ResolversParentTypes['Survey']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isStarted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  currentQuestion?: Resolver<Maybe<ResolversTypes['SurveyQuestion']>, ParentType, ContextType>
  questions?: Resolver<Array<Maybe<ResolversTypes['SurveyQuestion']>>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyQuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyQuestion'] = ResolversParentTypes['SurveyQuestion']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  prompt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  choices?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>
  answers?: Resolver<Array<ResolversTypes['SurveyAnswer']>, ParentType, ContextType>
  survey?: Resolver<ResolversTypes['Survey'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SurveyAnswerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SurveyAnswer'] = ResolversParentTypes['SurveyAnswer']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  question?: Resolver<ResolversTypes['SurveyQuestion'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  API?: ApiResolvers<ContextType>
  PlayerDetail?: PlayerDetailResolvers<ContextType>
  RecentMatch?: RecentMatchResolvers<ContextType>
  MatchDetail?: MatchDetailResolvers<ContextType>
  Participant?: ParticipantResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Survey?: SurveyResolvers<ContextType>
  SurveyQuestion?: SurveyQuestionResolvers<ContextType>
  SurveyAnswer?: SurveyAnswerResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
