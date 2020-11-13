import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class MatchParticipant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  gameId: String

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
  goldSpent: number

  @Column({
    default: 0
  })
  totalDamageTaken: number

  @Column({
    default: 0
  })
  totalHeal: number

  @Column({
    default: 0
  })
  totalPlayerScore: number

  @Column({
    default: 0
  })
  champLevel: number

  @Column({
    default: 0
  })
  totalDamageDealt: number

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
  damageSelfMitigated: number

  @Column({
    default: 0
  })
  totalMinionsKilled: number

}