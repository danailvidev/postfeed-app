import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'pf-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    userform: FormGroup;
    isValidFormSubmitted = null;
    errorMessage: string;

    constructor(
        private auth: AuthService,
        private router: Router,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.initUserForm();
    }

    onSubmit(value: string) {
        this.isValidFormSubmitted = false;
        if (this.userform.invalid) {
            return;
        }
        this.signIn(value);
        this.isValidFormSubmitted = true;
    }

    signIn(value) {
        this.auth.loginUser(value).subscribe((data: any) => {
            this.errorMessage = '';
            this.router.navigate(['/post-feed']);
        }, e => {
            this.errorMessage = e.error.message;
        });
    }

    private initUserForm() {
        this.userform = this.fb.group({
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
