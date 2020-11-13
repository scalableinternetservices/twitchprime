import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { useNavigate } from '@reach/router';
import * as React from 'react';

export default function WinTable(props: any) {

  const navigate = useNavigate();

  const goToPlayerDetailPage = (playerName: string) => {
    navigate(`/app/player-detail/${playerName}`)
  }

  return (
    <div>
      <div style={{ marginTop: 8, marginBottom: 10, fontSize: 20, fontWeight: 700 }}>
        {props.attributes.map((attribute: any) => (
          <Button style={{ pointerEvents: "none", marginBottom: 4, marginRight: 6, fontWeight: 700 }} variant="outlined" size="small" color="secondary">{attribute}</Button>
        ))}
      </div>
      <Paper style={{ boxShadow: "0px 0px 8px 3px #e0e0e0, 0px 0px 8px 3px #ffffff" }}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 700 }}></TableCell>
                <TableCell style={{ fontWeight: 700 }}>PLAYER</TableCell>
                <TableCell style={{ fontWeight: 700 }}>GOLD EARNED</TableCell>
                <TableCell style={{ fontWeight: 700 }}>GOLD SPENT</TableCell>
                <TableCell style={{ fontWeight: 700 }}>TOTAL DAMAGE TAKEN</TableCell>
                <TableCell style={{ fontWeight: 700 }}>TOTAL HEAL</TableCell>
                <TableCell style={{ fontWeight: 700 }}>CHAMP LEVEL</TableCell>
                <TableCell style={{ fontWeight: 700 }}>TOTAL DAMAGE DEALT</TableCell>
                <TableCell style={{ fontWeight: 700 }}>K/D/A</TableCell>
                <TableCell style={{ fontWeight: 700 }}>DAMAGE SELF MITIGATED</TableCell>
                <TableCell style={{ fontWeight: 700 }}>TOTAL MINION KILLED</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.participants.map((participant: any) => (
                <TableRow key={participant.participantId}>
                  <TableCell>
                    <IconButton color="secondary" size="small" onClick={() => { goToPlayerDetailPage(participant.participantName); }}>
                      <AccountBoxIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">{participant.participantName}</TableCell>
                  <TableCell align="right">{participant.goldEarned}</TableCell>
                  <TableCell align="right">{participant.goldSpent}</TableCell>
                  <TableCell align="right">{participant.totalDamageTaken}</TableCell>
                  <TableCell align="right">{participant.totalHeal}</TableCell>
                  <TableCell align="right">{participant.champLevel}</TableCell>
                  <TableCell align="right">{participant.totalDamageDealt}</TableCell>
                  <TableCell align="right">{participant.kills}/{participant.deaths}/{participant.assist}</TableCell>
                  <TableCell align="right">{participant.damageSelfMitigated}</TableCell>
                  <TableCell align="right">{participant.totalMinionsKilled}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}