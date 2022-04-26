declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
      AUTH0_SECRET: string;
      AUTH0_BASE_URL: string;
      AUTH0_ISSUER_BASE_URL: string;
      AUTH0_CLIENT_ID: string;
      AUTH0_CLIENT_SECRET: string;

      UPSTASH_KAFKA_REST_URL: string;
      UPSTASH_KAFKA_REST_USERNAME: string;
      UPSTASH_KAFKA_REST_PASSWORD: string;
    }
  }
}
