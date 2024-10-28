export interface QstashClientConfig {
  baseUrl?: string;
  token: string;
  retry?: RetryConfig;
}

export type RetryConfig = {
  retries?: number;
  backoff?: (retryCount: number) => number;
};
