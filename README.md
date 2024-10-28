# NestJS Qstash Module

## Description

A Qstash client for NestJS

### Installation

```bash
yarn add nestjs-upstash-qstash
```

```bash
npm i nestjs-upstash-qstash
```

---

<br>

### Configuration

<br>

Entry module:

```ts
@Module({
  imports: [
    QstashModule.register({
      token: "<QSTASH_TOKEN>";
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

<br>

Entry module:

```ts
@Module({
  imports: [
    QstashModule.registerAsync({
    imports: [ConfigModule.forFeature(config)],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
        const { token } = config.get<QstashClientConfig>('qstash');
        return {
          token
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

---

<br>

### Usage

<br>

Inject qstash client into a service:

```ts
@Injectable()
export class AppService {
  constructor(@InjectPolly() private readonly qStash: QstashClient) {}

  sayHello() {
    return this.qStash.publishJSON({
      url: 'https://api.awesomeapp.com/v1/greets',
      body: {
        name: 'John Doe',
        message: 'Lorem ipsum',
      }
    });
  }
}
```

In the controller...

```ts
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public sayHello() {
    return this.appService.sayHello();
  }
}
```

---

<br>

<br>

<div align="center">
    <a href="https://github.com/fdorantesm" target="_blank">
        <img src=https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white alt=github style="margin-bottom: 5px;" />
    </a>
    <a href="https://twitter.com/fdorantesm" target="_blank">
        <img src=https://img.shields.io/badge/twitter-%2300acee.svg?&style=for-the-badge&logo=twitter&logoColor=white alt=twitter style="margin-bottom: 5px;" />
    </a>
    <a href="https://linkedin.com/in/fdorantesm" target="_blank">
        <img src=https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white alt=linkedin style="margin-bottom: 5px;" />
    </a>
    <a href="https://www.youtube.com/user/FernandoDorantes" target="_blank">
        <img src=https://img.shields.io/badge/youtube-%23EE4831.svg?&style=for-the-badge&logo=youtube&logoColor=white alt=youtube style="margin-bottom: 5px;" />
    </a>
    <a href="https://stackoverflow.com/users/6484286" target="_blank">
        <img src=https://img.shields.io/badge/stackoverflow-%23F28032.svg?&style=for-the-badge&logo=stackoverflow&logoColor=white alt=stackoverflow style="margin-bottom: 5px;" />
    </a>
    <a href="https://codepen.com/fdorantesm" target="_blank">
        <img src=https://img.shields.io/badge/codepen-%23131417.svg?&style=for-the-badge&logo=codepen&logoColor=white alt=codepen style="margin-bottom: 5px;" />
    </a>
</div>

<br/>  

<div align="center">
    <a href="https://paypal.me/fdorantesm" target="_blank" style="display: inline-block;">
        <img src="https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square&logo=paypal" align="center" />
    </a>
</div>  

