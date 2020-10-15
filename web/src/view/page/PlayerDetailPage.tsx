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
import { useEffect } from 'react';
import { AppRouteParams } from '../nav/route';


interface HomePageProps extends RouteComponentProps, AppRouteParams { }

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

export function PlayerDetailPage(props: HomePageProps) {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    // TODO: send request to backend to get player detail data
    console.log(params.playerName);
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

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div style={{ fontSize: 30, fontWeight: 700, fontStyle: "italic", marginBottom: 10 }}>{params.playerName}</div>
        <Paper>
          <TableContainer component={Paper}>
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
