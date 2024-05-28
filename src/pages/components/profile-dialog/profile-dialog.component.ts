import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
        public dialogRef: MatDialogRef<ProfileDialogComponent>,
        private ssoService: SsoService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        try {
            this.ssoService.getGoogleUser().then((res: IUser) => {
                this.userService.getUserBySsoId(res.ssoId).then((user) => {
                    this.user = user[0];
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
            });
        } catch (err) {
            // do nothing
        }
    }

    async saveProfile() {
        await this.userService.upsertUser(this.user);
        this.dialogRef.close();
    }
}
