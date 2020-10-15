import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
import {
  createMuiTheme, ThemeProvider
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import { RouteComponentProps, useNavigate } from '@reach/router';
import * as React from 'react';
import { AppRouteParams } from '../nav/route';

interface HomePageProps extends RouteComponentProps, AppRouteParams { }

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

export function SearchPage(props: HomePageProps) {
  const navigate = useNavigate()

  const [playerName, setPlayerName] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const searchPlayerName = () => {
    console.log(playerName);
    navigate(`/app/player-detail/${playerName}`)
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <TextField style={{ marginRight: 4 }}
          id="outlined-basic" label="Player Name" variant="outlined"
          InputLabelProps={{ shrink: true, }}
          value={playerName}
          onChange={handleChange}
        >
        </TextField>
        <Button style={{ marginLeft: 4 }} variant="contained" color="primary"
          onClick={searchPlayerName}>
          <NavigateNextRoundedIcon />
        </Button>
      </ThemeProvider>
    </div>
  );
}
