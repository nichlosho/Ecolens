import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService {
    public override endpoint = `users`;

    public async upsertUser(user: IUser): Promise<void> {
        try {
            console.log('upsertUser', user);
            const url = `${this.fullUrl}`;
            await this.http.put<IUser>(url, user).toPromise();
        } catch (error) {
            console.error('Error saving user profile', error);
        }
    }
}
