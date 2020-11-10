import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Summoner } from './Summoner'

@Entity()
export class RecentMatch extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Summoner, summoner => summoner.recentMatches)
  @JoinColumn()
  summoner: Summoner

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
