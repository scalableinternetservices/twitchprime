import { String } from 'aws-sdk/clients/cloudhsm'
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { MatchParticipant } from './MatchParticipant'
import { RecentMatch } from './RecentMatch'

@Entity()
export class MatchDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => RecentMatch, recentMatch => recentMatch.matchDetail, {onDelete: 'CASCADE', eager: false})
  @JoinColumn()
  recentMatch : RecentMatch

  @OneToMany(() => MatchParticipant, matchParticipant => matchParticipant.matchDetail, {eager: true})
  matchParticipants: MatchParticipant[]

  @Column()
  gameId: String

  @Column()
  queueId: String

  @Column()
  gameType: String

  @Column()
  gameDuration: String

  @Column()
  platformId: String

  @Column()
  gameCreation: String

  @Column()
  seasonId: String

  @Column()
  gameVersion: string

  @Column()
  mapId: String

  @Column()
  gameMode: string

  @Column({
    default: 0
  })
  blueTowerKills: number

  @Column({
    default: 0
  })
  blueRiftHeraldKills: number

  @Column({
    default: false
  })
  blueFirstBlood: boolean

  @Column({
    default: 0
  })
  blueInhibitorKills: number

  @Column({
    default: false
  })
  blueFirstBaron: boolean

  @Column({
    default: false
  })
  blueFirstDragon: boolean

  @Column({
    default: 0
  })
  blueDominionVictoryScore: number

  @Column({
    default: 0
  })
  blueDragonKills: number

  @Column({
    default: 0
  })
  blueBaronKills: number

  @Column({
    default: false
  })
  blueFirstInhibitor: boolean

  @Column({
    default: false
  })
  blueFirstTower: boolean

  @Column({
    default: 0
  })
  blueVilemawKills: number

  @Column({
    default: false
  })
  blueFirstRiftHerald: boolean

  @Column({
    default: false
  })
  blueWin: string

  @Column({
    default: 0
  })
  redTowerKills: number

  @Column({
    default: 0
  })
  redRiftHeraldKills: number

  @Column({
    default: false
  })
  redFirstBlood: boolean

  @Column({
    default: 0
  })
  redInhibitorKills: number

  @Column({
    default: false
  })
  redFirstBaron: boolean

  @Column({
    default: false
  })
  redFirstDragon: boolean

  @Column({
    default: 0
  })
  redDominionVictoryScore: number

  @Column({
    default: 0
  })
  redDragonKills: number

  @Column({
    default: 0
  })
  redBaronKills: number

  @Column({
    default: false
  })
  redFirstInhibitor: boolean

  @Column({
    default: false
  })
  redFirstTower: boolean

  @Column({
    default: 0
  })
  redVilemawKills: number

  @Column({
    default: false
  })
  redFirstRiftHerald: boolean

  @Column({
    default: false
  })
  redWin: string
}
