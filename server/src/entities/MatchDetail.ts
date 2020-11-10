import { String } from 'aws-sdk/clients/cloudhsm'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class MatchDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

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
}
