import { join } from 'path';
import { Module } from '@nestjs/common';
import { OtpModule } from './otp/otp.module';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { News } from './news/entities/news.entity';
import { User } from './users/entities/user.entity';
import { ReportsModule } from './reports/reports.module';
import { Report } from './reports/entities/report.entity';
import { MobileNumber } from './otp/mobile-number.entity';
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/entities/article.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        port: 3306,
        password: '',
        type: 'mysql',
        username: 'root',
        host: 'localhost',
        synchronize: true,
        autoLoadEntities: true,
        database: 'mdr_inshortdb',
        entities: [News, User, Report, Article, MobileNumber],
      }),
    }),
    OtpModule,
    NewsModule,
    AuthModule,
    UsersModule,
    ReportsModule,
    ArticlesModule,
  ],
})
export class AppModule {}
