import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Report } from 'src/reports/entities/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class News {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'text' })
  title: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field()
  @Column({ type: 'text' })
  readMoreContent: string;

  @Field()
  @Column({ type: 'text' })
  sourceURLFormate: string;

  @Field()
  @Column({ type: 'text' })
  sourceURL: string;

  @Field()
  @Column({ type: 'text' })
  url: string;

  @Field()
  @Column()
  author: string;

  @Field(() => String, { defaultValue: 'active' })
  @Column({ default: 'active' })
  status: string;

  @Field(() => String, { defaultValue: 'en' })
  @Column({ default: 'en' })
  language: string;

  @Field(() => String, { defaultValue: 'normal' })
  @Column({ default: 'normal' })
  priority: string;

  @Field(() => [Report], { nullable: true })
  @OneToMany(() => Report, (report) => report.news)
  reports?: Report[];

  @Field(() => GraphQLISODateTime)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishedAt: Date;
}
