import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBackendBaseUrl } from '../helper/backendUrl';

@Injectable()
export class SsoService {
    private readonly baseUrl = getBackendBaseUrl();

    constructor(protected http: HttpClient) {}

    public async signInWithGoogle(): Promise<void> {
        try {
            const endpoint = 'auth/google';
            const url = this.getFullUrl(endpoint);
            const response = await this.http.get(url).toPromise();
            console.log(response);
        } catch (error) {
            console.error('Error fetching product category:', error);
        }
    }

    private getFullUrl(endpoint: string): string {
        return `${this.baseUrl}/${endpoint}`;
    }
}
