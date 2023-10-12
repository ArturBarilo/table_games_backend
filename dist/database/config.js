module.exports = {
    development: {
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: 'postgres',
        password: 'qwe',
        database: 'table-games',
    },
    test: {
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: 'qwe',
        database: 'table-games',
    },
    production: {
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: 'qwe',
        database: 'table-games',
    },
};
//# sourceMappingURL=config.js.map