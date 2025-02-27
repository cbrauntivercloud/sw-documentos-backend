"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: Number.parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DB_HOST,
        port: Number.parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    },
});
