import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import session from "express-session";

// eslint-disable-next-line @typescript-eslint/no-var-requires
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true //remove non-exists property in dto object
  }))
  await app.listen(3000);
}
bootstrap();
