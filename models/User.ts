import { Table, Column, Model, DataType } from 'sequelize-typescript';

export enum Role {
  Admin = 'ADMIN',
  Mentor = 'MENTOR',
  Student = 'STUDENT',
  Unknown = 'UNKNOWN'
}

export enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

@Table({
  tableName: 'users',
  timestamps: true
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    primaryKey: true
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  role: Role;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  status: Status;
}

export default User;
