import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { MatchDetail } from './MatchDetail'

@Entity()
export class MatchParticipant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(()=> MatchDetail, matchDetail => matchDetail.matchParticipants, {onDelete: 'CASCADE'})
  @JoinColumn()
  matchDetail: MatchDetail

  @Column()
  participantId: number

  @Column()
  participantName: String

  @Column()
  championId: number

  @Column()
  teamId: number

  @Column({
    default: 0
  })
  spell1Id: number

  @Column({
    default: 0
  })
  spell2Id: number

  @Column({
    default: 0
  })
  perk0: number

  @Column({
    default: 0
  })
  perk1: number

  @Column({
    default: 0
  })
  perk2: number

  @Column({
    default: 0
  })
  perk3: number

  @Column({
    default: 0
  })
  perk4: number

  @Column({
    default: 0
  })
  perk5: number

  @Column({
    default: 0
  })
  perkPrimaryStyle: number

  @Column({
    default: 0
  })
  perkSubStyle: number

  @Column({
    default: 0
  })
  statPerk0: number

  @Column({
    default: 0
  })
  statPerk1: number

  @Column({
    default: 0
  })
  statPerk2: number

  @Column({
    default: 0
  })
  item0: number

  @Column({
    default: 0
  })
  item1: number

  @Column({
    default: 0
  })
  item2: number

  @Column({
    default: 0
  })
  item3: number

  @Column({
    default: 0
  })
  item4: number

  @Column({
    default: 0
  })
  item5: number

  @Column({
    default: 0
  })
  item6: number

  @Column({
    default: 0
  })
  goldEarned: number

  @Column({
    default: 0
  })
  champLevel: number

  @Column({
    default: 0
  })
  totalDamageDealtToChampions: number

  @Column({
    default: 0
  })
  kills: number

  @Column({
    default: 0
  })
  deaths: number

  @Column({
    default: 0
  })
  assist: number

  @Column({
    default: 0
  })
  totalMinionsKilled: number

}