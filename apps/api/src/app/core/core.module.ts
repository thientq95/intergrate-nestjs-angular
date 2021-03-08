import { HttpModule, HttpService, Module } from "@nestjs/common";
import { ApiService } from "./services/api.service";

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    controllers: [],
    providers: [
        ApiService
    ],
})
export class CoreModule { }