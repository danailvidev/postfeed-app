import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Notificator } from '../../shared/components/notificator';

@Component({
    selector: 'pf-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    isValidFormSubmitted = null;
    errorMessage: string;

    constructor(
        private auth: AuthService,
        private router: Router,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.initRegisterForm();
    }

    onSubmit(value: string) {
        this.isValidFormSubmitted = false;
        if (this.registerForm.invalid) {
            return;
        }
        this.registerIn(value);
        this.isValidFormSubmitted = true;
    }

    registerIn(value) {
        this.auth.registerUser(value).subscribe((data: any) => {
            this.errorMessage = '';
            Notificator.emit({
                severity: 'success',
                summary: 'Success!',
                detail: 'You have successfully registered in.'
            });
            this.router.navigate(['/post-feed']);
        }, e => {
            this.errorMessage = e.error.message;
        });
    }

    private initRegisterForm() {
        this.registerForm = this.fb.group({
            'email': new FormControl('', Validators.compose([
                Validators.email,
                Validators.required
            ])),
            'password': new FormControl('', Validators.compose([
                Validators.required,
            ]))
        });
    }

}
