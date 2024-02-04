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
import { LevelModule } from './level/level.module';
import { User } from './user/entities/user.entity';
import { Role } from './role/entities/role.entity';
import { Resume } from './resume/entities/resume.entity';
import { Level } from './level/entities/level.entity';
import { Job } from './job/entities/job.entity';
import { Company } from './company/entities/company.entity';
import { Api } from './api/entities/api.entity';
import { AuthModule } from './auth/auth.module';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'andhungbui00',
      username: 'postgres',
      entities: [User, Role, Resume, Level, Job, Company, Api],
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
    LevelModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy],
})
export class AppModule {}
