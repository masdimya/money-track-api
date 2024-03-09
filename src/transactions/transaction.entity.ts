import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, DeleteDateColumn, BaseEntity} from 'typeorm';

@Entity()
export class Transaction extends BaseEntity{
  @PrimaryGeneratedColumn()
	id: number;

	@Column()
	trans_name: string;

	@Column({ type: 'numeric', precision: 15, scale: 2 })
	trans_amount: number;

	@Column({type: 'date'})
	trans_date: Date;

	@Column({type: 'smallint', default:1})
	active: number;

  @CreateDateColumn()
	created_at: Date;

	@DeleteDateColumn()
	deleted_at: Date;


  
}