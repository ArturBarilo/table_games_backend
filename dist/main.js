"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const nest_winston_1 = require("nest-winston");
const nest_winston_2 = require("nest-winston");
const winston = require("winston");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const PORT = process.env.PORT || 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_2.WinstonModule.createLogger({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_2.utilities.format.nestLike('MyApp', {
                        colors: true,
                        prettyPrint: true,
                    })),
                })
            ]
        })
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Table games backend')
        .setDescription('Some description')
        .setVersion('1.0.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/docs', app, document);
    app.useLogger(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));
    app.use(cookieParser());
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map