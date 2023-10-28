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
  app.enableCors({
    origin: [
      'http://localhost:8080',
      'https://hay-baselhack-dev.vercel.app',
      'https://hay-baselhack.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
