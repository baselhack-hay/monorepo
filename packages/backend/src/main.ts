import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({ secret: 'my-secret', resave: false, saveUninitialized: false }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // app.enableCors({
  //   origin: true,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type, Accept',
  // });
  await app.listen(3000);
}
bootstrap();
