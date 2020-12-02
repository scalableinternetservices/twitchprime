import { gql, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import { blue } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import {
  createMuiTheme, ThemeProvider
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { RouteComponentProps, useNavigate, useParams } from '@reach/router';
import * as React from 'react';
import championInfo from '../../../../public/assets/championFull.json';
import { AppRouteParams } from '../nav/route';
import Error from './Error';
import Loading from './Loading';
import NotFound from './NotFound';

interface HomePageProps extends RouteComponentProps, AppRouteParams { }

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

interface RecentMatch {
  accountId?: string
  summonerName?: string
  platformId?: string
  gameId?: string
  champion: Number
  queue?: string
  season?: Number
  timestamp?: string
  role?: string
  lane?: string
}

// GraphQL query def to fetch PlayerDetail
const fetchPlayerDetail = gql`
  query getPlayerDetail($playerName: String!) {
    playerDetail(playerName: $playerName) {
      accountId
      profileIconId
      winRate
      summonerLevel
      leaguePoints
      tier
      rank
      wins
      losses
      recentMatches {
        accountId
        summonerName
        platformId
        gameId
        champion
        queue
        season
        timestamp
        role
        lane
      }
    }
  }
`;

export function PlayerDetailPage(props: HomePageProps) {
  const navigate = useNavigate();
  const params = useParams();
  const playerName = params.playerName;
  const { loading, error, data } = useQuery(fetchPlayerDetail, {
    variables: { playerName },
  });

  function getDate(timestamp: string) {
    let [month, date, year] = new Date(+timestamp).toLocaleDateString("en-US").split("/")
    return month + "/" + date + "/" + year;
  }

  const goToMatchDetailPage = (matchID: string) => {
    navigate(`/app/match-detail/${matchID}`)
  }

  if (loading) return <ThemeProvider theme={theme}><Loading /></ThemeProvider>;
  if (error) return <Error />;
  if (!data || (data.playerDetail.accountId === "null" && data.playerDetail.profileIconId === -1)) return <NotFound />;
  // if (data) { console.log(data) }

  let sortedRecentMatches = data.playerDetail.recentMatches.slice().sort((a: RecentMatch, b: RecentMatch) => {
    if (!a.timestamp || !b.timestamp) {
      return 0;
    }
    return a.timestamp > b.timestamp ? -1 : 1;
  })

  let winsRender = "WINS: " + data.playerDetail.wins
  let lossesRender = "LOSSES: " + data.playerDetail.losses
  let winRateRender = "WIN RATE: " + data.playerDetail.winRate + "%"
  let levelRender = "SUMMONER LEVEL: " + data.playerDetail.summonerLevel

  interface IDictionary {
    [index: string]: string;
  }

  var championIdNameDict = championInfo.keys as IDictionary;

  var queueIdNameDict = {} as IDictionary;
  queueIdNameDict = {
    "400": "Summoner's Rift Draft Pick",
    "420": "Summoner's Rift Ranked Solo",
    "430": "Summoner's Rift Blink Pick",
    "440": "Summoner's Rift Ranked Flex",
    "450": "Howling Abyss ARAM",
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <title>Player Overview</title>
        <div style={{ fontSize: 30, fontWeight: 700, fontStyle: "italic", marginBottom: 10 }}><img src={`/app/assets/profileicon/${data.playerDetail.profileIconId}.png`} style={{ width: '10%' }}></img> {params.playerName}</div>
        <div style={{ fontSize: 30, fontWeight: 700, fontStyle: "italic", marginBottom: 10 }}><img src={`/app/assets/ranked-emblems/Emblem_${data.playerDetail.tier}.png`} style={{ width: '10%' }}></img>{data.playerDetail.tier} {data.playerDetail.rank} {data.playerDetail.leaguePoints} LP</div>
        <div style={{ marginBottom: 20, fontSize: 20, fontWeight: 700 }}>
          <Button style={{ pointerEvents: "none", marginRight: 6, fontWeight: 700 }} variant="outlined" size="small" color="primary">{winsRender}</Button>
          <Button style={{ pointerEvents: "none", marginRight: 6, fontWeight: 700 }} variant="outlined" size="small" color="primary">{lossesRender}</Button>
          <Button style={{ pointerEvents: "none", marginRight: 6, fontWeight: 700 }} variant="outlined" size="small" color="primary">{winRateRender}</Button>
          <Button style={{ pointerEvents: "none", marginRight: 6, fontWeight: 700 }} variant="outlined" size="small" color="primary">{levelRender}</Button>
        </div>
        <Paper style={{ boxShadow: "0px 0px 8px 3px #e0e0e0, 0px 0px 8px 3px #ffffff", marginBottom: 100 }}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell style={{ fontWeight: 700 }}>GAME MODE</TableCell>
                  <TableCell style={{ fontWeight: 700 }}>GAME DATE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRecentMatches.map((match: RecentMatch) => (
                  <TableRow key={match.gameId}>
                    <TableCell>
                      <ButtonBase onClick={() => { goToMatchDetailPage(match.gameId!); }}><img src={`/app/assets/champion_small/${championIdNameDict[match.champion.toString()]}.png`} style={{ width: '50%' }}></img></ButtonBase>
                    </TableCell>
                    <TableCell component="th" scope="row">{queueIdNameDict[match.queue!]}</TableCell>
                    <TableCell component="th" scope="row">{getDate(match.timestamp!)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </ThemeProvider>
    </div>
  );
}
