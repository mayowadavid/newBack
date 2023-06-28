import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { GroupsModule } from './groups/groups.module';
import { CategoryItemsModule } from './category-items/category-items.module';
import { TaskModule } from './task/task.module';
import { TrackingUrlModule } from './tracking-url/tracking-url.module';
import { FilesModule } from './files/files.module';
import { DatabaseConfig } from './database.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { ClickDataModule } from './click-data/click-data.module';
import { PlanModule } from './plan/plan.module';
import { InformationItemModule } from './information-item/information-item.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      ignoreEnvFile: true,
    }),
    UsersModule,
    ProjectsModule,
    GroupsModule,
    CategoryItemsModule,
    TaskModule,
    TrackingUrlModule,
    FilesModule,
    ClickDataModule,
    PlanModule,
    InformationItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
