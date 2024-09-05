import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { ResumeModule } from './resume/resume.module';
import { RoleModule } from './role/role.module';
import { ApiModule } from './api/api.module';
import { User } from './user/entities/user.entity';
import { Role } from './role/entities/role.entity';
import { Resume } from './resume/entities/resume.entity';
import { Job } from './job/entities/job.entity';
import { Company } from './company/entities/company.entity';
import { Api } from './api/entities/api.entity';
import { AuthModule } from './auth/auth.module';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionFilter } from './error.interceptor';
import { SkillsModule } from './skills/skills.module';
import { Skill } from './skills/entities/skill.entity';
import { join } from 'path';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ReviewModule } from './review/review.module';
import { PostingTypeModule } from './posting_type/posting_type.module';
import { LocationModule } from './location/location.module';
import { CoinTransactionModule } from './coin_transaction/coin_transaction.module';
import { UserSkillLevelModule } from './user_skill_level/user_skill_level.module';
import { CoinTransaction } from './coin_transaction/entities/coin_transaction.entity';
import { UserSkillLevel } from './user_skill_level/entities/user_skill_level.entity';
import { PostingType } from './posting_type/entities/posting_type.entity';
import { Review } from './review/entities/review.entity';
import { Location } from './location/entities/location.entity';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('HOST_DB'),
        port: config.get<number>('PORT_DB'),
        password: config.get('PASSWORD_DB'),
        username: config.get('USERNAME_DB'),
        entities: [
          User,
          Role,
          Resume,
          Job,
          Skill,
          Company,
          Api,
          CoinTransaction,
          UserSkillLevel,
          PostingType,
          Review,
          Location,
        ],
        database: 'Recruitment',
        synchronize: true,
        logging: false,
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    CompanyModule,
    JobModule,
    ResumeModule,
    RoleModule,
    ApiModule,
    AuthModule,
    ReviewModule,
    PostingTypeModule,
    LocationModule,
    CoinTransactionModule,
    UserSkillLevelModule,
    FilesModule,
    SkillsModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // MulterModule.register(multerConfig),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        // transport: config.get('MAIL_TRANSPORT'),
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'templates/email'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
 
    //Public sources
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '..', 'public'),
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LocalStrategy,
    // {
    //   provide: APP_FILTER,
    //   useClass: GlobalExceptionFilter,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule {}
