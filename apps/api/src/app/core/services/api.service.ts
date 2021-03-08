import { Injectable, HttpService } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class ApiService {
    constructor(private httpService: HttpService) { }

    get(): Observable<any> {
        return this.httpService.get('http://localhost:3000/cats');
    }

    post(): Observable<any> {
        return this.httpService.get('http://localhost:3000/cats');
    }
}