import { Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
  import { Article } from './article.entity';
  import { User } from './user.entity';
  
  @Entity()
  export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('text')
    content: string;
  
    @Column('text')
    signature: string;

    @Column('text', { nullable: true })
    url: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: number;

    @ManyToOne(type => Article, article => article.id, { onDelete: 'CASCADE'})
    @JoinColumn()
    article: Article;
  
  }