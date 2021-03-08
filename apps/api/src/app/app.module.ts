import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Catalog } from './entities/catalog.entity';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CatalogModule } from './modules/catalog/catalog.module';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './modules/news/news.module';
import { News } from './entities/news.entity';
import { TasksService } from './core/services/task.service';
import { UploadModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { RolesGuard } from './shared/roles/role.guard';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'thien2009',
            database: 'news',
            entities: [Catalog, News],
            autoLoadEntities: true,
            synchronize: true,
        }),
        ConfigModule,
        ScheduleModule.forRoot(),
        CatalogModule,
        NewsModule,
        UploadModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        AuthService,
        TasksService,
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('news');
    }
}
