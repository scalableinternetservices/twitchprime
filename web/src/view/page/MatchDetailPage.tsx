import { gql, useQuery } from '@apollo/client';
import { blue, red } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { RouteComponentProps, useParams } from '@reach/router';
import * as React from 'react';
import { AppRouteParams } from '../nav/route';
import Error from './Error';
import FailTable from './FailTable';
import Loading from './Loading';
import NotFound from './NotFound';
import WinTable from './WinTable';

interface HomePageProps extends RouteComponentProps, AppRouteParams { }

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
});

export function MatchDetailPage(props: HomePageProps) {
  const params = useParams();

  const fetchMatchDetail = gql`
    query getMatchDetail($gameId: String!) {
      matchDetail(gameId: $gameId) {
        gameId
        queueId
        gameType
        gameDuration
        platformId
        gameCreation
        seasonId
        gameVersion
        mapId
        gameMode
        blueTowerKills
        blueRiftHeraldKills
        blueFirstBlood
        blueInhibitorKills
        blueFirstBaron
        blueFirstDragon
        blueDominionVictoryScore
        blueDragonKills
        blueBaronKills
        blueFirstInhibitor
        blueFirstTower
        blueVilemawKills
        blueFirstRiftHerald
        blueWin
        redTowerKills
        redRiftHeraldKills
        redFirstBlood
        redInhibitorKills
        redFirstBaron
        redFirstDragon
        redDominionVictoryScore
        redDragonKills
        redBaronKills
        redFirstInhibitor
        redFirstTower
        redVilemawKills
        redFirstRiftHerald
        redWin
        participants{
          gameId
          participantId
          participantName
          championId
          teamId
          spell1Id
          spell2Id
          perk0
          perk1
          perk2
          perk3
          perk4
          perk5
          perkPrimaryStyle
          perkSubStyle
          statPerk0
          statPerk1
          statPerk2
          item0
          item1
          item2
          item3
          item4
          item5
          item6
          goldEarned
          goldSpent
          totalDamageTaken
          totalHeal
          totalPlayerScore
          champLevel
          totalDamageDealtToChampions
          kills
          deaths
          assist
          damageSelfMitigated
          totalMinionsKilled
        }
      }
    }
  `;

  const gameId = params.matchID;
  const { loading, error, data } = useQuery(fetchMatchDetail, {
    variables: { gameId },
  })

  if (loading) return <ThemeProvider theme={theme}><Loading /></ThemeProvider>;
  if (error) return <Error />;
  if (!data) return <NotFound />;
  if (data) { console.log(data) }

  // let blueTowerKillsRender = "Tower Kills: " + (data.matchDetail.blueTowerKills == -1 ? 0 : data.matchDetail.blueTowerKills)
  // let blueRiftHeraldKillsRender = "RiftHerald Kills: " + (data.matchDetail.blueRiftHeraldKills == -1 ? 0 : data.matchDetail.blueRiftHeraldKills)
  // let blueInhibitorKillsRender = "Inhibitor Kills: " + (data.matchDetail.blueInhibitorKills == -1 ? 0 : data.matchDetail.blueInhibitorKills)
  // let blueDragonKillsRender = "Dragon Kills: " + (data.matchDetail.blueDragonKills == -1 ? 0 : data.matchDetail.blueDragonKills)
  // let blueBaronKillsRender = "Baron Kills: " + (data.matchDetail.blueBaronKills == - 1 ? 0 : data.matchDetail.blueBaronKills)
  // let blueVilemawKillsRender = "Vilema Kills: " + (data.matchDetail.blueVilemawKills == -1 ? 0 : data.matchDetail.blueVilemawKills)
  //let blue_attributes: string[] = [blueTowerKillsRender, blueRiftHeraldKillsRender, blueInhibitorKillsRender, blueDragonKillsRender, blueBaronKillsRender, blueVilemawKillsRender];
  // if (data.matchDetail.blueFirstBlood === true) { blue_attributes.push("FIRST BLOOD") }
  // if (data.matchDetail.blueFirstBaron === true) { blue_attributes.push("FIRST BARON") }
  // if (data.matchDetail.blueFirstDragon === true) { blue_attributes.push("FIRST DRAGON") }
  // if (data.matchDetail.blueFirstInhibitor === true) { blue_attributes.push("FIRST INHIBITOR") }
  // if (data.matchDetail.blueFirstTower === true) { blue_attributes.push("FIRST TOWER") }
  // if (data.matchDetail.blueFirstRiftHerald === true) { blue_attributes.push("FIRST RIFT HERALD") }
  let blue_attributes: string[] = [];
  let blueParticipants: any[] = [];
  for (let i = 0; i <= 4; i++) {
    blueParticipants.push(data.matchDetail.participants[i])
  }

  // let redTowerKillsRender = "Tower Kills: " + (data.matchDetail.redTowerKills == -1 ? 0 : data.matchDetail.redTowerKills)
  // let redRiftHeraldKillsRender = "RiftHerald Kills: " + (data.matchDetail.redRiftHeraldKills == -1 ? 0 : data.matchDetail.redRiftHeraldKills)
  // let redInhibitorKillsRender = "Inhibitor Kills: " + (data.matchDetail.redInhibitorKills == -1 ? 0 : data.matchDetail.redInhibitorKills)
  // let redDragonKillsRender = "Dragon Kills: " + (data.matchDetail.redDragonKills == -1 ? 0 : data.matchDetail.redDragonKills)
  // let redBaronKillsRender = "Baron Kills: " + (data.matchDetail.redBaronKills == - 1 ? 0 : data.matchDetail.redBaronKills)
  // let redVilemawKillsRender = "Vilema Kills: " + (data.matchDetail.redVilemawKills == -1 ? 0 : data.matchDetail.redVilemawKills)
  // let red_attributes: string[] = [redTowerKillsRender, redRiftHeraldKillsRender, redInhibitorKillsRender, redDragonKillsRender, redBaronKillsRender, redVilemawKillsRender];
  // if (data.matchDetail.redFirstBlood === true) { red_attributes.push("FIRST BLOOD") }
  // if (data.matchDetail.redFirstBaron === true) { red_attributes.push("FIRST BARON") }
  // if (data.matchDetail.redFirstDragon === true) { red_attributes.push("FIRST DRAGON") }
  // if (data.matchDetail.redFirstInhibitor === true) { red_attributes.push("FIRST INHIBITOR") }
  // if (data.matchDetail.redFirstTower === true) { red_attributes.push("FIRST TOWER") }
  // if (data.matchDetail.redFirstRiftHerald === true) { red_attributes.push("FIRST RIFT HERALD") }
  let red_attributes: string[] = [];
  let redParticipants: any[] = [];
  for (let i = 5; i <= 9; i++) {
    redParticipants.push(data.matchDetail.participants[i])
  }

  let winAttributes: any
  let winParticipants: any
  let failAttributes: any
  let failParticipants: any
  let winTeamName: any
  let failTeamName: any
  if (data.matchDetail.blueWin === "Win") {
    winAttributes = blue_attributes;
    winParticipants = blueParticipants;
    failAttributes = red_attributes;
    failParticipants = redParticipants;
    winTeamName = "Blue Team";
    failTeamName = "Red Team";
  } else {
    winAttributes = red_attributes;
    winParticipants = redParticipants;
    failAttributes = blue_attributes;
    failParticipants = blueParticipants;
    winTeamName = "Red Team";
    failTeamName = "Blue Team";
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <title>Match Overview</title>
        <div style={{ marginTop: -110, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 20, fontWeight: 700, fontStyle: "italic", color: "1e88e5" }}>VICTORY ({winTeamName})</div>
          <WinTable attributes={winAttributes} participants={winParticipants}></WinTable>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 20, marginBottom: 30 }}>
          <div style={{ fontSize: 20, fontWeight: 700, fontStyle: "italic", color: "#e53935" }}>DEFEAT ({failTeamName})</div>
          <FailTable attributes={failAttributes} participants={failParticipants}></FailTable>
        </div>
      </ThemeProvider>
    </div>
  );
}
