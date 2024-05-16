import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBackendBaseUrl } from '../helper/backendUrl';
import { IService } from '../interfaces/IService';

@Injectable()
export class BaseService implements IService {
    public readonly baseUrl = getBackendBaseUrl();
    public endpoint = ``;

    constructor(protected http: HttpClient) {}

    public get fullUrl(): string {
        return `${this.baseUrl}/${this.endpoint}`;
    }
}
