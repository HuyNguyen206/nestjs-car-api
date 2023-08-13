import {AfterInsert, AfterRemove, AfterUpdate, BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @BeforeInsert()
  logBeforeInsert(){
    const email = this.email
    this.email = this.email + '_updated'
    console.log(`insert user with change email from ${email} to ${this.email}`);
  }

  @AfterInsert()
  logInsert(){
    console.log('insert user with id ' + this.id);
  }

  @AfterRemove()
  logRemove(){
    console.log('remove user with id  ' + this.id);
  }

  @AfterUpdate()
  logUpdate(){
    console.log('update user with id  ' + this.id);
  }
}