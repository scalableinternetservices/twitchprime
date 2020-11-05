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
