"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const operators_1 = require("rxjs/operators");
let HttpClient = class HttpClient {
    constructor(http, ngHttpConfig) {
        this.http = http;
        this.ngHttpConfig = ngHttpConfig;
        this.beforeHooks = ngHttpConfig.beforeHook ? [ngHttpConfig.beforeHook] : [];
        this.afterHooks = ngHttpConfig.afterHook ? [ngHttpConfig.afterHook] : [];
        this.errorHooks = ngHttpConfig.errorHook ? [ngHttpConfig.errorHook] : [];
        this.baseUrl = ngHttpConfig.baseUrl;
    }
    init(baseUrl) {
        this.baseUrl = baseUrl;
    }
    get(url, options) {
        let opts = this.build(http_1.RequestMethod.Get, url, options);
        return this.request(url, opts);
    }
    put(url, body, options) {
        let opts = this.build(http_1.RequestMethod.Put, url, options, body);
        return this.request(url, opts);
    }
    post(url, body, options) {
        let opts = this.build(http_1.RequestMethod.Post, url, options, body);
        return this.request(url, opts);
    }
    delete(url, options) {
        let opts = this.build(http_1.RequestMethod.Delete, url, options);
        return this.request(url, opts);
    }
    patch(url, body, options) {
        let opts = this.build(http_1.RequestMethod.Patch, url, options, body);
        return this.request(url, opts);
    }
    request(url, options) {
        let req;
        if (typeof url === 'string') {
            let reqOpt = new http_1.RequestOptions(options);
            reqOpt.url = url;
            req = new http_1.Request(reqOpt);
        }
        else {
            req = url;
        }
        return this.beforeRequest(req)
            .pipe(operators_1.flatMap((req) => this.http.request(req)), operators_1.map((res) => this.afterCall(res)), operators_1.catchError(error => {
            this.errorHandler(error);
            return rxjs_1.throwError(error.json());
        }));
    }
    build(method, url, options, body) {
        let aBody = body ? body : options && options.body ? options.body : undefined;
        let opts = {
            method: method,
            url: url,
            headers: options && options.headers ? options.headers : new http_1.Headers(),
            search: options && options.search ? options.search : undefined,
            body: aBody
        };
        return opts;
    }
    addBeforeHook(func) {
        this.beforeHooks.push(func);
    }
    addAfterHook(func) {
        this.afterHooks.push(func);
    }
    beforeRequest(req) {
        if (this.baseUrl) {
            req.url = `${this.baseUrl}/${req.url}`;
        }
        if (this.beforeHooks.length) {
            return rxjs_1.from(this.beforeHooks.reduce((previousValue, currentValue) => {
                return previousValue
                    .then((res) => {
                    return currentValue(res);
                });
            }, Promise.resolve(req)));
        }
        else {
            return rxjs_1.of(req);
        }
    }
    afterCall(res) {
        this.afterHooks.forEach((hook) => {
            res = hook(res);
        });
        return res;
    }
    errorHandler(res) {
        if (this.errorHooks.length) {
            this.errorHooks.forEach(hook => {
                res = hook(res);
            });
            return res;
        }
        return res;
    }
};
HttpClient = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject('ngHttpConfig')),
    __metadata("design:paramtypes", [http_1.Http, Object])
], HttpClient);
exports.HttpClient = HttpClient;
