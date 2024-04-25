import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function (form: HTMLFormElement) {
            form.addEventListener(
                'submit',
                function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                },
                false
            );
        });
    }
}
