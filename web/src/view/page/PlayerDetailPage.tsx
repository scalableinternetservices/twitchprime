import { gql, useQuery } from '@apollo/client';
import Chip from '@material-ui/core/Chip';
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
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
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
        matchId
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('ttt', 159, 6.0, 24, 4.0),
    createData('sss', 237, 9.0, 37, 4.3),
    createData('ddd', 262, 16.0, 24, 6.0),
    createData('fff', 305, 3.7, 67, 4.3),
    createData('zzz', 356, 16.0, 49, 3.9),
  ];

  const goToMatchDetailPage = (matchID: string) => {
    navigate(`/app/match-detail/${matchID}`)
  }

  if (loading) return <ThemeProvider theme={theme}><Loading /></ThemeProvider>;
  if (error) return <Error />;
  if (!data || (data.playerDetail.accountId === "string" && data.playerDetail.profileIconId === -1)) return <NotFound />;
  if (data) { console.log(data) }

  let winsRender = "WINS: " + data.playerDetail.wins
  let lossesRender = "LOSSES: " + data.playerDetail.losses
  let winRateRender = "WIN RATE: " + data.playerDetail.winRate + "%"
  let rankRender = "RANK: " + data.playerDetail.rank
  let levelRender = "LEVEL: " + data.playerDetail.summonerLevel

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div style={{ fontSize: 30, fontWeight: 700, fontStyle: "italic", marginBottom: 10 }}>{params.playerName}</div>
        <div style={{ marginBottom: 20, fontSize: 20, fontWeight: 600 }}>
          <Chip style={{ marginRight: 10, color: "#1e88e5", background: "#fafafa", boxShadow: "3px 3px 6px #e0e0e0, -3px -3px 6px #ffffff" }} label={winsRender} />
          <Chip style={{ marginRight: 10, color: "#1e88e5", background: "#fafafa", boxShadow: "3px 3px 6px #e0e0e0, -3px -3px 6px #ffffff" }} label={lossesRender} />
          <Chip style={{ marginRight: 10, color: "#1e88e5", background: "#fafafa", boxShadow: "3px 3px 6px #e0e0e0, -3px -3px 6px #ffffff" }} label={winRateRender} />
          <Chip style={{ marginRight: 10, color: "#1e88e5", background: "#fafafa", boxShadow: "3px 3px 6px #e0e0e0, -3px -3px 6px #ffffff" }} label={rankRender} />
          <Chip style={{ marginRight: 10, color: "#1e88e5", background: "#fafafa", boxShadow: "3px 3px 6px #e0e0e0, -3px -3px 6px #ffffff" }} label={levelRender} />
        </div>
        <Paper style={{ boxShadow: "3px 3px 6px #e0e0e0, -3px -3px 6px #ffffff" }}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>XXXXXXXXXXX</TableCell>
                  <TableCell align="right">XXX</TableCell>
                  <TableCell align="right">XXX</TableCell>
                  <TableCell align="right">XXX</TableCell>
                  <TableCell align="right">XXX</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>
                      <IconButton color="primary" size="small" onClick={() => { goToMatchDetailPage(row.name); }}>
                        <AssignmentRoundedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </ThemeProvider>
    </div>
  );
}
