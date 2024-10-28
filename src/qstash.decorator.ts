import { Inject } from "@nestjs/common";
import { getQstashConnectionToken } from "./qstash.tokens";

export const InjectQstash = (connection?) => {
  return Inject(getQstashConnectionToken(connection));
};
