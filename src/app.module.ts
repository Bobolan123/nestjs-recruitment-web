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
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'multer.config';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './error.interceptor';
import { SkillsModule } from './skills/skills.module';
import { Skill } from './skills/entities/skill.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'andhungbui00',
      username: 'postgres',
      entities: [User, Role, Resume, Job, Skill, Company, Api],
      database: 'Recruitment',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    CompanyModule,
    JobModule,
    ResumeModule,
    RoleModule,
    ApiModule,
    AuthModule,
    ConfigModule.forRoot(),
    MulterModule.register(multerConfig),
    SkillsModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },],
})
export class AppModule {}
