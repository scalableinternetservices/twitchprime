import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class FetchTime extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  summonerName: string

  @Column()
  timeFetched: string
}