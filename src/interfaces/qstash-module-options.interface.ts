import { ModuleMetadata, Type } from "@nestjs/common/interfaces";

import type { QstashClientConfig } from "src/interfaces/qstash-client-config.interface";
import { QstashOptionsFactory } from "./qstash-module-factory-options";

export interface QstashModuleOptions extends QstashClientConfig {}

export interface QstashModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useExisting?: Type<QstashOptionsFactory>;
  useClass?: Type<QstashOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<QstashModuleOptions> | QstashModuleOptions;
  inject?: any[];
}
