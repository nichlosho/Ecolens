import { environment } from '../../environments/environment';

export function getBackendBaseUrl(): string {
    const isProduction = window.location.hostname !== 'localhost';
    return isProduction
        ? 'https://ecolens.onrender.com'
        : `${environment.baseUrl}:${environment.backendPort}`;
}
