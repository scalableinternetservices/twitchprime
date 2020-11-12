import { gql, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { blue, red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
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
    secondary: red,
  },
});

export function MatchDetailPage(props: HomePageProps) {
  const navigate = useNavigate();
  const params = useParams();

  const fetchMatchDetail = gql`
    query getMatchDetail($gameId: String!) {
      matchDetail(gameId: $gameId) {
        gameId
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

  function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('player1', 159, 6.0, 24, 4.0),
    createData('player2', 237, 9.0, 37, 4.3),
    createData('player3', 262, 16.0, 24, 6.0),
    createData('player4', 305, 3.7, 67, 4.3),
    createData('player5', 356, 16.0, 49, 3.9),
  ];

  const goToPlayerDetailPage = (playerName: string) => {
    navigate(`/app/player-detail/${playerName}`)
  }

  const goToSearchPage = () => {
    navigate(`/app/index/`)
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button style={{ marginBottom: 6 }} variant="contained" size="small" color="primary" onClick={goToSearchPage}><SearchRoundedIcon /></Button>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flexDirection: "column", marginRight: 16 }}>
            <div style={{ fontSize: 30, fontWeight: 700, fontStyle: "italic", color: "#1e88e5" }}>VICTORY</div>
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
                          <IconButton color="primary" size="small" onClick={() => { goToPlayerDetailPage(row.name); }}>
                            <AccountBoxIcon />
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
            </Paper>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginLeft: 16 }}>
            <div style={{ fontSize: 30, fontWeight: 700, fontStyle: "italic", color: "#e53935" }}>DEFEAT</div>
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
                          <IconButton color="secondary" size="small" onClick={() => { goToPlayerDetailPage(row.name); }}>
                            <AccountBoxIcon />
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
            </Paper>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
