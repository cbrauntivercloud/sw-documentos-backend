"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const configuration_1 = __importDefault(require("./config/configuration"));
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: "postgres",
                    host: configService.get("database.host"),
                    port: configService.get("database.port"),
                    username: configService.get("database.username"),
                    password: configService.get("database.password"),
                    database: configService.get("database.database"),
                    entities: [__dirname + "/**/*.entity{.ts,.js}"],
                    synchronize: configService.get("NODE_ENV") !== "production",
                    migrationsRun: configService.get("NODE_ENV") === "production",
                    migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
                    cli: {
                        migrationsDir: "src/migrations",
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
