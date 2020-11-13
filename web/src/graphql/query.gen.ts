/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMatchDetail
// ====================================================

export interface getMatchDetail_matchDetail_participants {
  __typename: "Participant";
  gameId: string | null;
  participantId: number | null;
  participantName: string | null;
  championId: number | null;
  teamId: number | null;
  spell1Id: number | null;
  spell2Id: number | null;
  item0: number | null;
  item1: number | null;
  item2: number | null;
  item3: number | null;
  item4: number | null;
  item5: number | null;
  item6: number | null;
  goldEarned: number | null;
  goldSpent: number | null;
  totalDamageTaken: number | null;
  totalHeal: number | null;
  totalPlayerScore: number | null;
  champLevel: number | null;
  totalDamageDealt: number | null;
  kills: number | null;
  deaths: number | null;
  assist: number | null;
  damageSelfMitigated: number | null;
  totalMinionsKilled: number | null;
}

export interface getMatchDetail_matchDetail {
  __typename: "MatchDetail";
  gameId: string | null;
  queueId: string | null;
  gameType: string | null;
  gameDuration: string | null;
  platformId: string | null;
  gameCreation: string | null;
  seasonId: string | null;
  gameVersion: string | null;
  mapId: string | null;
  gameMode: string | null;
  blueTowerKills: number | null;
  blueRiftHeraldKills: number | null;
  blueFirstBlood: boolean | null;
  blueInhibitorKills: number | null;
  blueFirstBaron: boolean | null;
  blueFirstDragon: boolean | null;
  blueDominionVictoryScore: number | null;
  blueDragonKills: number | null;
  blueBaronKills: number | null;
  blueFirstInhibitor: boolean | null;
  blueFirstTower: boolean | null;
  blueVilemawKills: number | null;
  blueFirstRiftHerald: boolean | null;
  blueWin: string | null;
  redTowerKills: number | null;
  redRiftHeraldKills: number | null;
  redFirstBlood: boolean | null;
  redInhibitorKills: number | null;
  redFirstBaron: boolean | null;
  redFirstDragon: boolean | null;
  redDominionVictoryScore: number | null;
  redDragonKills: number | null;
  redBaronKills: number | null;
  redFirstInhibitor: boolean | null;
  redFirstTower: boolean | null;
  redVilemawKills: number | null;
  redFirstRiftHerald: boolean | null;
  redWin: string | null;
  participants: getMatchDetail_matchDetail_participants[] | null;
}

export interface getMatchDetail {
  matchDetail: getMatchDetail_matchDetail;
}

export interface getMatchDetailVariables {
  gameId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPlayerDetail
// ====================================================

export interface getPlayerDetail_playerDetail_recentMatches {
  __typename: "RecentMatch";
  accountId: string | null;
  summonerName: string | null;
  platformId: string | null;
  gameId: string | null;
  champion: number | null;
  queue: string | null;
  season: number | null;
  timestamp: string | null;
  role: string | null;
  lane: string | null;
}

export interface getPlayerDetail_playerDetail {
  __typename: "PlayerDetail";
  accountId: string | null;
  profileIconId: number | null;
  winRate: number | null;
  summonerLevel: number | null;
  leaguePoints: number | null;
  rank: string | null;
  wins: number | null;
  losses: number | null;
  recentMatches: getPlayerDetail_playerDetail_recentMatches[] | null;
}

export interface getPlayerDetail {
  playerDetail: getPlayerDetail_playerDetail;
}

export interface getPlayerDetailVariables {
  playerName: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
