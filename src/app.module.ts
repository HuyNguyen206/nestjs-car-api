import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { ReportModule } from "./report/report.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/user.entity";
import { Report } from "./report/report.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    ReportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DB_NAME'),
          entities: [User, Report],
          synchronize: true
      })
    })
  //   TypeOrmModule.forRoot({
  //   type: 'sqlite',
  //   database: 'db.sqlite',
  //   entities: [User, Report],
  //   synchronize: true
  // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
