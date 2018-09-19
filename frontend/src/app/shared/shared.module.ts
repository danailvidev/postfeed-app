import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// third
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/primeng';

// components
import { FormErrorsComponent } from './components/form-errors.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ToastModule,

        // components
        FormErrorsComponent
    ],
    declarations: [FormErrorsComponent],
    providers: [
        MessageService
    ]
})
export class SharedModule { }
