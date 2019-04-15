import { Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Category } from 'entities/category.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @Column('text')
  imageUrl: string;

  @ManyToOne(type => Category, category => category.id)
  @JoinColumn()
  category: Category;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(type => Comment, comment => comment.article, { onDelete: 'CASCADE'})
  @JoinColumn() 
  comments: Comment[];

}