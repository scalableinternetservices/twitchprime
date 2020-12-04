import { gql, useLazyQuery } from '@apollo/client';
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
import Loading from './Loading';

interface HomePageProps extends RouteComponentProps, AppRouteParams { }

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

export function SearchPage(props: HomePageProps) {
  const navigate = useNavigate()

  const [playerName, setPlayerName] = React.useState('');
  const [API, setAPI] = React.useState('');

  const saveAPIQuery = gql`
    query saveAPI($apiKey: String!) {
      saveAPI(apiKey: $apiKey) {
        key
      }
    }
  `;
  const [apiSave, { loading }] = useLazyQuery(saveAPIQuery, {
    variables: { apiKey: API },
  });

  if (loading) return <ThemeProvider theme={theme}><Loading /></ThemeProvider>;

  const handlePlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const handleAPIChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAPI(event.target.value);
  };

  const searchPlayerName = () => {
    console.log(playerName);
    navigate(`/app/player-detail/${playerName}`)
  }

  function onClickFunction() {
    apiSave();
    searchPlayerName();
  }


  return (
    <div>
      <ThemeProvider theme={theme}>
        <title>Player Search</title>
        <div style={{
          fontSize: 18, fontWeight: 700, fontStyle: "italic",
          marginBottom: 18
        }}>LEAGUE OF LEGENDS STATS TRACKER
        </div>
        <TextField style={{ marginRight: 4 }}
          id="outlined-basic" label="Player Name" variant="outlined"
          InputLabelProps={{ shrink: true, }}
          value={playerName}
          onChange={handlePlayerNameChange}
        >
        </TextField>
        <TextField style={{ marginRight: 4 }}
          id="outlined-basic" label="Riot API Key" variant="outlined" type="password"
          InputLabelProps={{ shrink: true, }}
          value={API}
          onChange={handleAPIChange}
        >
        </TextField>
        <Button style={{ marginLeft: 4 }} variant="contained" color="primary"
          onClick={onClickFunction}>
          <NavigateNextRoundedIcon />
        </Button>
        <div style={{
          fontSize: 14, fontWeight: 700, fontStyle: "italic",
          color: "#bdbdbd", marginTop: 14
        }}>
          <a style={{ textDecoration: "none", color: "#bdbdbd" }} href="https://github.com/scalableinternetservices/twitchprime">
            @twitchprime
          </a>
        </div>
      </ThemeProvider>
    </div>)
}
