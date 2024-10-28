import { QstashModuleOptions } from './qstash-module-options.interface';

export interface QstashOptionsFactory {
  createQstashModuleOptions(): Promise<QstashModuleOptions> | QstashModuleOptions;
}
