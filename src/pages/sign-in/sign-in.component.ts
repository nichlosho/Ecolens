import { Component } from '@angular/core';
import { getBackendBaseUrl } from '../../helper/urlHelper';
import { SsoService } from '../../service/sso.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
    constructor(private ssoService: SsoService) {}

    signInWithGoogle() {
        window.open(`${getBackendBaseUrl()}/auth/google`, '_blank');
    }
}
