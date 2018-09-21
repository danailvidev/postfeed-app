import { Component, OnInit } from '@angular/core';
import { environment as env } from '@env/environment';

@Component({
    selector: 'pf-about',
    templateUrl: 'about.component.html'
})

export class AboutComponent implements OnInit {
    versions = Object.entries(env.versions).map(([key, value]) => ({ key, value }));

    constructor() { }

    ngOnInit() { }
}