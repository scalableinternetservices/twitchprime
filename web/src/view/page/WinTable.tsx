import { Box, TableHead, TableRow } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useNavigate } from '@reach/router';
import * as React from 'react';
import championInfo from '../../../../public/assets/championFull.json';

export default function WinTable(props: any) {

  const navigate = useNavigate();

  const goToPlayerDetailPage = (playerName: string) => {
    navigate(`/app/player-detail/${playerName}`)
  }

  interface intDictionary {
    [index: number]: any;
  }

  interface stringDictionary {
    [index: string]: any;
  }

  var championIdNameDict = championInfo.keys as stringDictionary;
  var summonerSpellIdNameDict = {} as intDictionary;
  summonerSpellIdNameDict = {
    21: "SummonerBarrier",
    1: "SummonerBoost",
    14: "SummonerDot",
    3: "SummonerExhaust",
    4: "SummonerFlash",
    6: "SummonerHaste",
    7: "SummonerHeal",
    13: "SummonerMana",
    30: "SummonerPoroRecall",
    31: "SummonerPoroThrow",
    11: "SummonerSmite",
    39: "SummonerSnowURFSnowball_Mark",
    32: "SummonerSnowball",
    12: "SummonerTeleport",
  }
  var perkStyleIdFileNameDict = {} as intDictionary;
  perkStyleIdFileNameDict = {
    8000: "7201_Precision",
    8100: "7200_Domination",
    8200: "7202_Sorcery",
    8300: "7203_Whimsy",
    8400: "7204_Resolve",
  }
  var perkPrimaryIdNameDict = {} as intDictionary;
  perkPrimaryIdNameDict = {
    8000: "Precision",
    8100: "Domination",
    8200: "Sorcery",
    8300: "Inspiration",
    8400: "Resolve",
  }
  var perkIdFileNameDict = {} as intDictionary;
  perkIdFileNameDict = {
    8112: "Electrocute",
    8124: "Predator",
    8128: "DarkHarvest",
    9923: "HailOfBlades",
    8351: "GlacialAugment",
    8360: "UnsealedSpellbook",
    8358: "MasterKey",
    8005: "PressTheAttack",
    8008: "LethalTempo",
    8021: "FleetFootwork",
    8010: "Conqueror",
    8437: "GraspOfTheUndying",
    8439: "VeteranAftershock",
    8465: "Guardian",
    8214: "SummonAery",
    8229: "ArcaneComet",
    8230: "PhaseRush",
    9101: "Overheal",
    9111: "Triumph",
    8009: "PresenceOfMind",
    9104: "LegendAlacrity",
    9105: "LegendTenacity",
    9103: "LegendBloodline",
    8014: "CoupDeGrace",
    8017: "CutDown",
    8299: "LastStand",
    8126: "CheapShot",
    8139: "TasteOfBlood",
    8143: "SuddenImpact",
    8120: "GhostPoro",
    8136: "ZombieWard",
    8138: "EyeballCollection",
    8135: "RavenousHunter",
    8134: "IngeniousHunter",
    8105: "RelentlessHunter",
    8106: "UltimateHunter",
    8224: "NullifyingOrb",
    8226: "ManaflowBand",
    8275: "NimbusCloak",
    8210: "Transcendence",
    8234: "Celerity",
    8233: "AbsoluteFocus",
    8237: "Scorch",
    8232: "Waterwalking",
    8236: "GatheringStorm",
    8446: "Demolish",
    8463: "FontOfLife",
    8401: "MirrorShell",
    8429: "Conditioning",
    8444: "SecondWind",
    8473: "BonePlating",
    8451: "Overgrowth",
    8453: "Revitalize",
    8242: "Unflinching",
    8306: "HextechFlashtraption",
    8304: "MagicalFootwear",
    8313: "PerfectTiming",
    8321: "FuturesMarket",
    8316: "MinionDematerializer",
    8345: "BiscuitDelivery",
    8347: "CosmicInsight",
    8410: "ApproachVelocity",
    8352: "TimeWarpTonic",
    5005: "StatModsAttackSpeedIcon",
    5008: "StatModsAdaptiveForceIcon",
    5002: "StatModsArmorIcon",
    5007: "StatModsCDRScalingIcon",
    5001: "StatModsHealthScalingIcon",
    5003: "StatModsMagicResIcon",
  }

  function Row(props: { participant: any }) {
    const { participant } = props;
    const [open, setOpen] = React.useState(false);
    return (
      <React.Fragment>
        <TableRow key={participant.participantId}>
          <TableCell align="center">
            <Box justifyContent="flex-center" alignItems="center" alignContent="flex-start"><img src={`/app/assets/champion_small/${championIdNameDict[participant.championId.toString()]}.png`} style={{ width: '5vw' }}></img></Box>
          </TableCell>
          <TableCell align="center">
            <Box display="flex" flexWrap="wrap" css={{ maxWidth: 50 }}>
              <Box justifyContent="flex-center" alignItems="center" alignContent="flex-end" flexDirection="row-reverse"><img src={`/app/assets/spell/${summonerSpellIdNameDict[participant.spell1Id]}.png`} style={{ width: '2vw' }}></img></Box>
              <Box justifyContent="flex-center" alignItems="center" alignContent="flex-end" flexDirection="row-reverse"><img src={`/app/assets/spell/${summonerSpellIdNameDict[participant.spell2Id]}.png`} style={{ width: '2vw' }}></img></Box>
            </Box>
          </TableCell>
          <TableCell align="center">
            <Box display="flex" flexDirection="row" alignItems="flex-start">
              <Box alignItems="center"><img src={`/app/assets/perk-images/Styles/${perkPrimaryIdNameDict[participant.perkPrimaryStyle]}/${perkIdFileNameDict[participant.perk0]}/${perkIdFileNameDict[participant.perk0]}.png`} style={{ width: '4vw' }}></img></Box>
              <Box alignSelf="flex-end"><img src={`/app/assets/perk-images/Styles/${perkStyleIdFileNameDict[participant.perkSubStyle]}.png`} style={{ width: '1.5vw' }}></img></Box>
            </Box>
          </TableCell>
          <TableCell component="th" scope="row"><Button onClick={() => { goToPlayerDetailPage(participant.participantName!); }}>{participant.participantName}</Button></TableCell>
          <TableCell align="center">
            <Box display="flex" flexDirection="row" alignItems="flex-start">
              <Box alignItems="center"><img src={`/app/assets/item/${participant.item0}.png`} style={{ width: '3vw' }}></img></Box>
              <Box alignItems="center"><img src={`/app/assets/item/${participant.item1}.png`} style={{ width: '3vw' }}></img></Box>
              <Box alignItems="center"><img src={`/app/assets/item/${participant.item2}.png`} style={{ width: '3vw' }}></img></Box>
              <Box alignItems="center"><img src={`/app/assets/item/${participant.item3}.png`} style={{ width: '3vw' }}></img></Box>
              <Box alignItems="center"><img src={`/app/assets/item/${participant.item4}.png`} style={{ width: '3vw' }}></img></Box>
              <Box alignItems="center"><img src={`/app/assets/item/${participant.item5}.png`} style={{ width: '3vw' }}></img></Box>
              <Box alignItems="center"><img src={`/app/assets/item/${participant.item6}.png`} style={{ width: '3vw' }}></img></Box>
            </Box>
          </TableCell>
          <TableCell align="center">{participant.champLevel}</TableCell>
          <TableCell align="center">{participant.kills}/{participant.deaths}/{participant.assist}</TableCell>
          <TableCell align="center">{participant.totalDamageDealtToChampions}</TableCell>
          <TableCell align="center">{participant.totalMinionsKilled}</TableCell>
          <TableCell align="center">{participant.goldEarned}</TableCell>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1} display="flex" flexDirection="row" alignItems="flex-end" justifyContent="center">
                <Box margin={1} display="flex" flexDirection="row" alignItems="flex-end">
                  <Box><img src={`/app/assets/perk-images/Styles/${perkPrimaryIdNameDict[participant.perkPrimaryStyle]}/${perkIdFileNameDict[participant.perk0]}/${perkIdFileNameDict[participant.perk0]}.png`} style={{ width: '4vw' }}></img></Box>
                  <Box><img src={`/app/assets/perk-images/Styles/${perkPrimaryIdNameDict[participant.perkPrimaryStyle]}/${perkIdFileNameDict[participant.perk1]}/${perkIdFileNameDict[participant.perk1]}.png`} style={{ width: '2.5vw' }}></img></Box>
                  <Box><img src={`/app/assets/perk-images/Styles/${perkPrimaryIdNameDict[participant.perkPrimaryStyle]}/${perkIdFileNameDict[participant.perk2]}/${perkIdFileNameDict[participant.perk2]}.png`} style={{ width: '2.5vw' }}></img></Box>
                  <Box><img src={`/app/assets/perk-images/Styles/${perkPrimaryIdNameDict[participant.perkPrimaryStyle]}/${perkIdFileNameDict[participant.perk3]}/${perkIdFileNameDict[participant.perk3]}.png`} style={{ width: '2.5vw' }}></img></Box>
                </Box>
                <Box margin={1} display="flex" flexDirection="row" alignItems="flex-end">
                  <Box><img src={`/app/assets/perk-images/Styles/${perkPrimaryIdNameDict[participant.perkSubStyle]}/${perkIdFileNameDict[participant.perk4]}/${perkIdFileNameDict[participant.perk4]}.png`} style={{ width: '2.5vw' }}></img></Box>
                  <Box><img src={`/app/assets/perk-images/Styles/${perkPrimaryIdNameDict[participant.perkSubStyle]}/${perkIdFileNameDict[participant.perk5]}/${perkIdFileNameDict[participant.perk5]}.png`} style={{ width: '2.5vw' }}></img></Box>
                </Box>
                <Box margin={1} display="flex" flexDirection="row" alignItems="flex-end">
                  <Box><img src={`/app/assets/perk-images/StatMods/${perkIdFileNameDict[participant.statPerk0]}.png`} style={{ width: '2.5vw' }}></img></Box>
                  <Box><img src={`/app/assets/perk-images/StatMods/${perkIdFileNameDict[participant.statPerk1]}.png`} style={{ width: '2.5vw' }}></img></Box>
                  <Box><img src={`/app/assets/perk-images/StatMods/${perkIdFileNameDict[participant.statPerk2]}.png`} style={{ width: '2.5vw' }}></img></Box>
                </Box>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
  }

  return (
    <div>
      <div style={{ marginTop: 8, marginBottom: 10, fontSize: 30, fontWeight: 700 }}>
        {props.attributes.map((attribute: any) => (
          <Button style={{ pointerEvents: "none", marginBottom: 4, marginRight: 6, fontWeight: 700 }} variant="outlined" size="small" color="primary">{attribute}</Button>
        ))}
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 800 }}></TableCell>
              <TableCell style={{ fontWeight: 800 }}></TableCell>
              <TableCell style={{ fontWeight: 800 }}></TableCell>
              <TableCell style={{ fontWeight: 800 }}></TableCell>
              <TableCell style={{ fontWeight: 800 }}></TableCell>
              <TableCell style={{ fontWeight: 800 }}>Level</TableCell>
              <TableCell style={{ fontWeight: 800 }}>K/D/A</TableCell>
              <TableCell style={{ fontWeight: 800 }}>Damage</TableCell>
              <TableCell style={{ fontWeight: 800 }}>CS</TableCell>
              <TableCell style={{ fontWeight: 800 }}>Gold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.participants.map((participant: any) => (
              <Row participant={participant} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}