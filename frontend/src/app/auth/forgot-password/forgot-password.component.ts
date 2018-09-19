import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Notificator } from '../../shared/components/notificator';

@Component({
    selector: 'pf-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    forgotpasswordForm: FormGroup;
    isValidFormSubmitted = null;
    errorMessage: string;

    constructor(private router: Router,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.initPasswordForm();
    }

    onSubmit(value: string) {
        this.isValidFormSubmitted = false;
        if (this.forgotpasswordForm.invalid) {
            return;
        }
        Notificator.emit({
            severity: 'success',
            summary: 'Success!',
            detail: 'Emails has been sent!'
        });
        this.router.navigate(['/login']);
        this.isValidFormSubmitted = true;
    }

    private initPasswordForm() {
        this.forgotpasswordForm = this.fb.group({
            'email': new FormControl('', Validators.compose([
                Validators.email,
                Validators.required
            ]))
        });
    }
}
