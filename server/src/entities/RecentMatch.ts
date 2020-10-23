import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class RecentMatch extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
  })
  accountId: string

  @Column({
    length: 20,
    nullable: true
  })
  summonerName: string

  @Column()
  platformId: string

  @Column()
  gameId: string

  @Column()
  champion: number

  @Column()
  queue: number

  @Column()
  season: number

  @Column()
  timestamp: string

  @Column()
  role: string

  @Column()
  lane: string
}
