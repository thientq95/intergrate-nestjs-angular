export interface IAppConfig {
    env: {
        name: string;
    };
    logging: {
        console: boolean;
        appInsights: boolean;
    };
    resourceUrl: string;
    apiServer: string;
    sso: string;
    version: string;
}
