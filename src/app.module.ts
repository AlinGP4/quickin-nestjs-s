import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ContratsModule } from './components/contrats/contrats.module';
import { PropertiesModule } from './components/properties/properties.module';
import { UsersModule } from './components/users/users.module';
import { DashboardModule } from './components/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:  ['env/.env', 'env/.pro.env'],
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_IP,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DB,
      entities: [
        '**/*.entity.js'
      ],
      synchronize: process.env.DATABASE_SYNC === '1',
    }),
    ContratsModule,
    PropertiesModule,
    UsersModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
