import { Box, TableHead, TableRow } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
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
  var perk0IdFileNameDict = {} as intDictionary;
  perk0IdFileNameDict = {
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
  }
  // var runeTree = {} as intDictionary;
  // runeTree = {
  //   8000: [["PressTheAttack", "LethalTempo", "FleetFootwork", "Conqueror"],
  //   ["Overheal", "Triumph", "PresenceOfMind"],
  //   ["LegendAlacrity", "LegendTenacity", "LegendBloodline"],
  //   ["CoupDeGrace", "CutDown", "LastStand"]],
  //   8100: [["Electrocute", "Predator", "DarkHarvest", "HailOfBlades"],
  //   ["Cheapshot", "TasteOfBlood", "SuddenImpact"],
  //   ["ZombieWard", "GhostPoro", "EyeballCollection"],
  //   ["RavenousHunter", "IngeniousHunter", "RelentlessHunter", "UltimateHunter"]],
  //   8200: [["SummonAery", "ArcaneComet", "PhaseRush"],
  //   ["NullifyingOrb", "ManaflowBand", "NimbusCloak"],
  //   ["Transcendence", "Celerity", "AbsoluteFocus"],
  //   ["Scorch", "Waterwalking", "GatheringStorm"]],
  //   8300: [["GlacialAugment", "UnsealedSpellbook", "Masterkey"],
  //   ["HextechFlashtraption", "MagicalFootwear", "PerfectTiming"],
  //   ["FutureMarket", "MinionDematerializer", "BiscuitDelivery"],
  //   ["CosmicInsight", "ApproachVelocity", "TimeWarpTonic"]],
  //   8400: [["GraspOfTheUndying", "Aftershock", "Guardian"],
  //   ["Demolisher", "FontOfLife", "ShieldBash"],
  //   ["Conditioning", "SecondWind", "BonePlating"],
  //   ["Overgrowth", "Revitalize", "Unflinching"]],
  // }

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
                    <Box alignItems="center"><img src={`/app/assets/perk-images/Styles/${perkPrimaryIdNameDict[participant.perkPrimaryStyle]}/${perk0IdFileNameDict[participant.perk0]}/${perk0IdFileNameDict[participant.perk0]}.png`} style={{ width: '4vw' }}></img></Box>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}