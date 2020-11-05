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
