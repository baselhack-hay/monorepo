import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import genFunc from 'connect-pg-simple';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const PostgresqlStore = genFunc(session);
  const sessionStore = new PostgresqlStore({
    conString:
      'postgres://default:bF5S2DdGhnot@ep-shrill-lake-84036745.eu-central-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require',
  });

  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: 'auto',
        maxAge: 1000 * 60 * 60 * 2,
      },
      store: sessionStore,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    origin: [
      'http://localhost:8080',
      'https://hay-baselhack-dev.vercel.app',
      'https://hay-baselhack.vercel.app',
      'https://baselhack-proxy.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('HAY API')
    .setDescription('HAY API documentation')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addServer('https://hay-backend-dev.vercel.app', 'Develpment')
    // .addServer('https://hay-backend.vercel.app/', 'Production')
    .addServer('https://baselhack-proxy.vercel.app/', 'Production')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);
  await app.listen(3000);
}
bootstrap();
