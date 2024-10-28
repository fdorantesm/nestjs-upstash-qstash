import { DynamicModule, Module } from "@nestjs/common";
import {
  QstashModuleAsyncOptions,
  QstashModuleOptions,
} from "./interfaces/qstash-module-options.interface";

import { QstashCoreModule } from "./qstash.core-module";

@Module({})
export class QstashModule {
  static forRoot(
    options: QstashModuleOptions,
    connection?: string
  ): DynamicModule {
    return {
      global: true,
      module: QstashModule,
      imports: [QstashCoreModule.forRoot(options, connection)],
      exports: [QstashCoreModule],
    };
  }

  static async forRootAsync(
    options: QstashModuleAsyncOptions,
    connection?: string
  ): Promise<DynamicModule> {
    return {
      global: true,
      module: QstashModule,
      imports: [QstashCoreModule.forRootAsync(options, connection)],
      exports: [QstashCoreModule],
    };
  }

  /**
   * @deprecated Use forRootAsync method instead. This method will be removed next version.
   */
  static async registerAsync(
    options: QstashModuleAsyncOptions,
    connection?: string
  ): Promise<DynamicModule> {
    return this.forRootAsync(options, connection);
  }
}
