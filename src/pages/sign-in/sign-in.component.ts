import { Component } from '@angular/core';
import { SsoService } from '../../service/sso.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
    constructor(private ssoService: SsoService) {}

    signInWithGoogle() {
        this.ssoService.signInWithGoogle();
        // Implement Google SSO authentication logic here
        // For example, redirect to a Google login page
        // window.location.href =
        //     'https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=openid%20email%20profile';
    }
}
