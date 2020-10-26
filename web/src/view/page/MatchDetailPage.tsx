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
import { RouteComponentProps, useNavigate, useParams } from '@reach/router';
import * as React from 'react';
import { useEffect } from 'react';
import { AppRouteParams } from '../nav/route';

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

  useEffect(() => {
    // TODO: send request to backend to get match detail data
    console.log(params.matchID);
  });

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

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div style={{
          fontSize: 30, fontWeight: 700, fontStyle: "italic",
          marginTop: -50, marginBottom: 10, color: "#1e88e5"
        }}>VICTORY</div>
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

        <div style={{
          fontSize: 30, fontWeight: 700, fontStyle: "italic",
          marginTop: 20, marginBottom: 10, color: "#e53935"
        }}>DEFEAT</div>
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
      </ThemeProvider>
    </div>
  );
}
