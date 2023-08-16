import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {unique: true})
  email: string

  @Column('varchar')
  password: string

  @Column('varchar', {nullable: true})
  hashed_refresh_token: string

  @Column('timestamp')
  @CreateDateColumn()
  created_at: Date

  @Column('timestamp')
  @UpdateDateColumn()
  updated_at: Date

  // @OneToMany(() => Report, (report) => report.user )
  // reports: Report[]

  @BeforeInsert()
  logBeforeInsert(){
    const email = this.email
    // this.email = this.email + '_updated'
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