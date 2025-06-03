export interface PostgresSqlConfigOptions {
  dbUsername: string;
  dbPassword: string;
  dbHost: string;
  dbPort: string;
  dbName: string;
  dbEntities: Array<any>;
}
