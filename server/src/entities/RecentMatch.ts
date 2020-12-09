import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { MatchDetail } from './MatchDetail'
import { Summoner } from './Summoner'

@Entity()
export class RecentMatch extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Summoner, summoner => summoner.recentMatches, {onDelete: 'CASCADE'})
  @JoinColumn()
  summoner: Summoner

  @OneToOne(() => MatchDetail, matchDetail => matchDetail.recentMatch, {eager: false})
  matchDetail: MatchDetail

  @Column()
  platformId: string

  @Column()
  gameId: string

  @Column()
  champion: number

  @Column()
  queue: string

  @Column()
  season: number

  @Column()
  timestamp: String

  @Column()
  role: string

  @Column()
  lane: string
}
