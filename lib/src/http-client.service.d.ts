import { Observable } from 'rxjs';
import { NgHttpConfig, BeforeHookFunction, AfterHookFunction } from './http-client.config';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
export declare class HttpClient {
    private http;
    private ngHttpConfig;
    private baseUrl;
    private beforeHooks;
    private errorHooks;
    private afterHooks;
    constructor(http: Http, ngHttpConfig: NgHttpConfig);
    init(baseUrl?: string): void;
    get(url: string, options?: RequestOptionsArgs): Observable<Response>;
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    private request(url, options?);
    private build(method, url, options, body?);
    addBeforeHook(func: BeforeHookFunction): void;
    addAfterHook(func: AfterHookFunction): void;
    private beforeRequest(req);
    private afterCall(res);
    private errorHandler(res);
}
