import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  price: number

  @Column({default: false})
  is_approve: boolean

  @Column()
  model: string

  @Column()
  brand: string

  @Column()
  year: number

  @Column()
  mileage: number

  @Column()
  lng: string

  @Column()
  lat: string

  @ManyToOne(() => User, (user: User) => user.reports)
  user: User;
}