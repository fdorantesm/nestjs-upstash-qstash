import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { QstashModuleAsyncOptions, QstashModuleOptions } from "./interfaces";
import {
  createQstashConnection,
  getQstashConnectionToken,
  getQstashOptionsToken,
} from "./qstash.tokens";

import { QstashOptionsFactory } from "./interfaces/qstash-module-factory-options";

@Global()
@Module({})
export class QstashCoreModule {
  /* forRoot */
  static forRoot(
    options: QstashModuleOptions,
    connection?: string
  ): DynamicModule {
    const qStashOptionsProvider: Provider = {
      provide: getQstashOptionsToken(connection),
      useValue: options,
    };

    const qStashConnectionProvider: Provider = {
      provide: getQstashConnectionToken(connection),
      useValue: createQstashConnection(options),
    };

    return {
      module: QstashCoreModule,
      providers: [qStashOptionsProvider, qStashConnectionProvider],
      exports: [qStashOptionsProvider, qStashConnectionProvider],
    };
  }

  /* forRootAsync */
  public static forRootAsync(
    options: QstashModuleAsyncOptions,
    connection: string
  ): DynamicModule {
    const qStashConnectionProvider: Provider = {
      provide: getQstashConnectionToken(connection),
      useFactory(options: QstashModuleOptions) {
        return createQstashConnection(options);
      },
      inject: [getQstashOptionsToken(connection)],
    };

    return {
      module: QstashCoreModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options, connection),
        qStashConnectionProvider,
      ],
      exports: [qStashConnectionProvider],
    };
  }

  /* createAsyncProviders */
  public static createAsyncProviders(
    options: QstashModuleAsyncOptions,
    connection?: string
  ): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        "Invalid configuration. Must provide useFactory, useClass or useExisting"
      );
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, connection)];
    }

    return [
      this.createAsyncOptionsProvider(options, connection),
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  /* createAsyncOptionsProvider */
  public static createAsyncOptionsProvider(
    options: QstashModuleAsyncOptions,
    connection?: string
  ): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error(
        "Invalid configuration. Must provide useFactory, useClass or useExisting"
      );
    }

    if (options.useFactory) {
      return {
        provide: getQstashOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: getQstashOptionsToken(connection),
      useFactory: async (
        optionsFactory: QstashOptionsFactory
      ): Promise<QstashModuleOptions> => {
        return await optionsFactory.createQstashModuleOptions();
      },
      inject: [options.useClass || options.useExisting],
    };
  }
}
