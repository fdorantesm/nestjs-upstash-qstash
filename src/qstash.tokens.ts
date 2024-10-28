import {
  QSTASH_MODULE_CONNECTION,
  QSTASH_MODULE_CONNECTION_TOKEN,
  QSTASH_MODULE_OPTIONS_TOKEN,
} from "./qstash.constants";

import { Client } from "@upstash/qstash";
import type { QstashClientConfig } from "src/interfaces/qstash-client-config.interface";

export function createQstashConnection(config: QstashClientConfig): Client {
  return new Client(config);
}

export function getQstashConnectionToken(connection?: string): string {
  return `${
    connection || QSTASH_MODULE_CONNECTION
  }_${QSTASH_MODULE_CONNECTION_TOKEN}`;
}

export function getQstashOptionsToken(connection?: string): string {
  return `${
    connection || QSTASH_MODULE_CONNECTION
  }_${QSTASH_MODULE_OPTIONS_TOKEN}`;
}
