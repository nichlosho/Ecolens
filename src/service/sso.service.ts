import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getBackendBaseUrl } from '../helper/urlHelper';

@Injectable()
export class SsoService {
    private readonly baseUrl = getBackendBaseUrl();

    constructor(protected http: HttpClient) {}

    public async signInWithGoogle(): Promise<void> {
        try {
            const endpoint = 'auth/google';
            const url = this.getFullUrl(endpoint);
            await this.http.get(url, { withCredentials: true }).toPromise();
        } catch (error) {
            console.error('Error signing into google:', error);
        }
    }

    public async getGoogleUser(): Promise<unknown> {
        try {
            const endpoint = 'auth/google/user';
            const url = this.getFullUrl(endpoint);
            const response = await this.http
                .get(url, { withCredentials: true })
                .toPromise();
            return response;
        } catch (error) {
            //console.error('Error getting google user:', error);
        }
    }

    public async signOutGoogleUser(): Promise<void> {
        try {
            const endpoint = 'auth/google/signOut';
            const url = this.getFullUrl(endpoint);
            await this.http.get(url, { withCredentials: true }).toPromise();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    private getFullUrl(endpoint: string): string {
        return `${this.baseUrl}/${endpoint}`;
    }
}
