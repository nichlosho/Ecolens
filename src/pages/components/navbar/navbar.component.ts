import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../../interfaces/IUser';
import { SsoService } from '../../../service/sso.service';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
    public user: IUser;
    constructor(private ssoService: SsoService, public dialog: MatDialog) {}

    ngOnInit(): void {
        try {
            this.ssoService.getGoogleUser().then((res: IUser) => {
                this.user = res;
            });
        } catch (err) {
            // do nothing
        }
    }
    logoutGoogleUser() {
        this.ssoService.logoutGoogleUser();
    }
    openDialog(): void {
        this.dialog.open(ProfileDialogComponent, {
            width: '750px',
            height: '1000px',
        });
    }
}
