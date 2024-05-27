import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../interfaces/IUser';
import { SsoService } from '../../../service/sso.service';
import { UserService } from '../../../service/user.service';

@Component({
    selector: 'app-profile-dialog',
    templateUrl: './profile-dialog.component.html',
    styleUrl: './profile-dialog.component.scss',
})
export class ProfileDialogComponent implements OnInit {
    public user: IUser;
    constructor(
        private ssoService: SsoService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        try {
            this.ssoService.getGoogleUser().then((res: IUser) => {
                this.user = res;
                if (!this.user.address) {
                    this.user.address = {
                        street: '',
                        city: '',
                        state: '',
                        country: '',
                        postalCode: '',
                    };
                }
            });
        } catch (err) {
            // do nothing
        }
    }

    async saveProfile() {
        await this.userService.upsertUser(this.user);
    }
}
