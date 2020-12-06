import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RecentMatch } from './RecentMatch'

@Entity()
export class Summoner extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  // @CreateDateColumn()
  // timeCreated: Date

  @Column()
  timestamp: number

  @Column({
    nullable: true
  })
  timeFetchedOfRecentMatch: string

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
    nullable: true
  })
  tier: string

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

  @OneToMany(() => RecentMatch, recentMatch => recentMatch.summoner, {eager: true})
  recentMatches: RecentMatch[]

}
