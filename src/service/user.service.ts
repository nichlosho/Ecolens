import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService {
    public override endpoint = `users`;

    public async upsertUser(user: IUser): Promise<void> {
        try {
            const url = `${this.fullUrl}`;
            await this.http.put<IUser>(url, user).toPromise();
        } catch (error) {
            // console.error('Error saving user profile', error);
        }
    }
    public async getUserBySsoId(ssoId: string): Promise<IUser> {
        try {
            const url = `${this.fullUrl}?ssoId=${ssoId}`;
            return await this.http.get<IUser>(url).toPromise();
        } catch (error) {
            console.error('Error getting user by sso Id', error);
        }
    }
}
