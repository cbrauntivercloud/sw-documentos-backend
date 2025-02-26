"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const entities_1 = require("./user/entities");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const port = configService.get('DB_PORT');
                    if (!port) {
                        throw new Error('DB_PORT is not defined in environment variables');
                    }
                    return {
                        type: 'postgres',
                        host: configService.get('DB_HOST') || 'localhost',
                        port: parseInt(port, 10),
                        username: configService.get('DB_USERNAME') || 'postgres',
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_NAME') || 'sw_documentos',
                        entities: [entities_1.User, entities_1.Role, entities_1.Document, entities_1.Paragraph, entities_1.ParagraphMetadata],
                        synchronize: configService.get('NODE_ENV') !== 'production',
                        autoLoadEntities: true,
                    };
                },
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
