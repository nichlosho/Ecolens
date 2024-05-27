import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBackendBaseUrl } from '../helper/urlHelper';
import { IService } from '../interfaces/IService';

@Injectable()
export class BaseService implements IService {
    public readonly baseUrl = getBackendBaseUrl();
    public endpoint = ``;
    public get fullUrl(): string {
        return `${this.baseUrl}/${this.endpoint}`;
    }

    constructor(protected http: HttpClient) {}
}
