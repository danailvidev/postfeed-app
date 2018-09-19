import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'show-errors',
  template: `
    <ul *ngIf="shouldShowErrors()">
      <li *ngFor="let error of listOfErrors()">{{error}}</li>
    </ul>
  `,
  styles: [`
    ul {
      padding: 11px;
    }
    ul > li {
        color:red;
        list-style-type:none;
    }
    ul > li:before {
        font-weight: bold;
        margin-right: 5px;
        content:"!";
    }
  `]
})
export class FormErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'This field is required',
    'email': () => 'Please enter valid email',
    'digit': (params) => params.message,
    'uppercase': (params) => params.message,
    'lowercase': (params) => params.message,
    'minLength': (params) => params.message
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return FormErrorsComponent.errorMessages[type](params);
  }

}
