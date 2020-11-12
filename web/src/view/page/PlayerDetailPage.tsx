import { gql, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
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
import AssessmentIcon from '@material-ui/icons/Assessment';
import { RouteComponentProps, useNavigate, useParams } from '@reach/router';
import * as React from 'react';
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
  champion?: Number
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
  if (data) { console.log(data) }

  let sortedRecentMatches = data.playerDetail.recentMatches.slice().sort((a: RecentMatch, b: RecentMatch) => {
    if (!a.timestamp || !b.timestamp) {
      return 0;
    }
    return a.timestamp > b.timestamp ? -1 : 1;
  })

  let winsRender = "WINS: " + data.playerDetail.wins
  let lossesRender = "LOSSES: " + data.playerDetail.losses
  let winRateRender = "WIN RATE: " + data.playerDetail.winRate + "%"
  let rankRender = "RANK: " + data.playerDetail.rank
  let levelRender = "LEVEL: " + data.playerDetail.summonerLevel

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div style={{ fontSize: 30, fontWeight: 700, fontStyle: "italic", marginBottom: 10 }}>{params.playerName}</div>
        <div style={{ marginBottom: 20, fontSize: 20, fontWeight: 700 }}>
          <Button style={{ pointerEvents: "none", marginRight: 10, fontWeight: 700 }} variant="outlined" size="small" color="primary">{winsRender}</Button>
          <Button style={{ pointerEvents: "none", marginRight: 10, fontWeight: 700 }} variant="outlined" size="small" color="primary">{lossesRender}</Button>
          <Button style={{ pointerEvents: "none", marginRight: 10, fontWeight: 700 }} variant="outlined" size="small" color="primary">{winRateRender}</Button>
          <Button style={{ pointerEvents: "none", marginRight: 10, fontWeight: 700 }} variant="outlined" size="small" color="primary">{rankRender}</Button>
          <Button style={{ pointerEvents: "none", marginRight: 10, fontWeight: 700 }} variant="outlined" size="small" color="primary">{levelRender}</Button>
        </div>
        <Paper style={{ boxShadow: "3px 3px 6px #e0e0e0, -3px -3px 6px #ffffff", marginBottom: 100 }}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell style={{ fontWeight: 700 }}>GAME DATE</TableCell>
                  <TableCell style={{ fontWeight: 700 }} align="right">CHAMPION</TableCell>
                  <TableCell style={{ fontWeight: 700 }} align="right">LANE</TableCell>
                  <TableCell style={{ fontWeight: 700 }} align="right">ROLE</TableCell>
                  <TableCell style={{ fontWeight: 700 }} align="right">SEASON</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRecentMatches.map((match: RecentMatch) => (
                  <TableRow key={match.gameId}>
                    <TableCell>
                      <IconButton color="primary" size="small" onClick={() => { goToMatchDetailPage(match.gameId!); }}>
                        <AssessmentIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">{getDate(match.timestamp!)}</TableCell>
                    <TableCell align="right">{match.champion}</TableCell>
                    <TableCell align="right">{match.lane}</TableCell>
                    <TableCell align="right">{match.role}</TableCell>
                    <TableCell align="right">{match.season}</TableCell>
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
