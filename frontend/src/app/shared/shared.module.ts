import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { FormErrorsComponent } from './components/form-errors.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,

        // components
        FormErrorsComponent
    ],
    declarations: [FormErrorsComponent]
})
export class SharedModule { }
