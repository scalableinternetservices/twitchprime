import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Summoner extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  // @CreateDateColumn()
  // timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  summonerId: string

  @Column({
    length: 100,
    nullable: true
  })
  accountId: string

  @Column({
    length: 20,
  })
  summonerName: string

  @Column({
    nullable: true
  })
  profileIconId: number

  @Column({
    nullable: true
  })
  summonerLevel: number

  @Column({
    nullable: true
  })
  leaguePoints: number

  @Column({
    length: 3,
    nullable: true
  })
  rank: string

  @Column({
    nullable: true
  })
  wins: number

  @Column({
    nullable: true
  })
  losses: number

  @Column({
    nullable: true
  })
  veteran: boolean

  @Column({
    nullable: true
  })
  inactive: boolean

  @Column({
    nullable: true
  })
  freshBlood: boolean

  @Column({
    nullable: true
  })
  hotStreak: boolean

}
